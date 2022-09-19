<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
// @ts-expect-error let me do it
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module'
import { Toast } from 'vant'
import type { IndexableType, PromiseExtended } from 'dexie'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import type { CollectionsItem } from '../../../../mock/detail/index'
import type { DownloadRes } from '~/utils/downloadFile'
import { downloadFile } from '~/utils/downloadFile'
import type { GltfModels } from '~/db'
import { db } from '~/db'

const screenDom = ref<HTMLElement | null>(null)
const loading = ref<boolean>(true)
const detail = ref<CollectionsItem | null>(null)

let scene: THREE.Scene
let group: THREE.Group
let animationId: number
let camera: THREE.PerspectiveCamera | THREE.Camera
let renderer: THREE.WebGLRenderer
let control: OrbitControls
let dracoLoader: DRACOLoader
let ktx2Loader: KTX2Loader
let gltfLoader: GLTFLoader
let width: number
let height: number
let pmremGenerator: THREE.PMREMGenerator

function reset() {
  if (animationId)
    cancelAnimationFrame(animationId)

  if (scene)
    scene.clear()

  if (renderer) {
    // NOTE: 强制 webgl 上下文丢失
    renderer.forceContextLoss()
    renderer.clear()
  }
}

function start() {
  dracoLoader = new DRACOLoader()
  ktx2Loader = new KTX2Loader()
  gltfLoader = new GLTFLoader()

  scene = new THREE.Scene()
  group = new THREE.Group()
  width = screenDom.value!.clientWidth
  height = screenDom.value!.clientHeight

  camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 1000)

  scene.add(camera)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  screenDom.value!.appendChild(renderer.domElement)

  pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()

  control = new OrbitControls(camera, renderer.domElement)
  control.enabled = false // NOTE: 可以控制是否旋转
  control.autoRotate = true
  control.autoRotateSpeed = 3
  control.enableZoom = true
  control.enablePan = false
  control.minDistance = 10
  control.maxDistance = 20
}

function updateLight() {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3)

  // 平行光
  const directionalLight1 = new THREE.DirectionalLight(0xFFFFFF, 2.5)
  directionalLight1.position.set(0.5, 0, 0.866)

  camera.add(ambientLight, directionalLight1)

  renderer.toneMappingExposure = 1
}

function updateEnvironment() {
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture
}

function updateTextureEncoding() {
  group.traverse((child) => {
    // @ts-expect-error let me do it
    if (child.isMesh) {
      // @ts-expect-error let me do it
      if (child.material.map)
      // @ts-expect-error let me do it
        child.material.map.encoding = THREE.sRGBEncoding

      // @ts-expect-error let me do it
      if (child.material.emissiveMap)
      // @ts-expect-error let me do it
        child.material.emissiveMap.encoding = THREE.sRGBEncoding

      // @ts-expect-error let me do it
      if (child.material.map || child.material.emissiveMap)
      // @ts-expect-error let me do it
        child.material.needsUpdate = true
    }
  })
}

async function load() {
  // 设置解析文件代码路径
  dracoLoader.setDecoderPath('./draco/gltf/')

  ktx2Loader.setTranscoderPath('./basis')

  // 设置解析loader
  gltfLoader.setDRACOLoader(dracoLoader)

  gltfLoader.setKTX2Loader(ktx2Loader.detectSupport(renderer))

  gltfLoader.setMeshoptDecoder(MeshoptDecoder)

  try {
    const modelUrls = detail.value?.modelUrls
    const dbPromises: Promise<GltfModels | undefined>[] = []
    const downLoadPromises: Promise<DownloadRes>[] = []
    const gltfModelsPromises: Promise<GLTF>[] = []
    const putPromises: PromiseExtended<IndexableType>[] = []

    if (modelUrls) {
      modelUrls.forEach((url) => {
        dbPromises.push(db.getByKey(url))
      })

      // 1. 查询是否存在
      const dbResults = await Promise.all(dbPromises)

      dbResults.forEach((queryResult, idx) => {
        // 不存在添加进下载数组
        if (!queryResult) { downLoadPromises.push(downloadFile(modelUrls[idx])) }

        // 存在添加进模型加载数组
        else {
          const url = URL.createObjectURL(queryResult.blob)

          const promise = new Promise<GLTF>((resolve) => {
            gltfLoader.load(url, (gltf: GLTF) => {
              resolve(gltf)
            })
          })

          gltfModelsPromises.push(promise)
        }
      })

      // 2. 执行下载（不存在于indexDb的模型）
      const downLoadresult = await Promise.all(downLoadPromises)

      if (downLoadresult && downLoadresult.length) {
        downLoadresult.forEach((res) => {
          // 下载完毕添加进数据库更新数组
          putPromises.push(db.updateRecord({
            fileName: res.url,
            blob: res.blob,
          }))

          const url = URL.createObjectURL(res.blob)

          const promise = new Promise<GLTF>((resolve) => {
            gltfLoader.load(url, (gltf: GLTF) => {
              resolve(gltf)
            })
          })

          // 添加进模型加载数组
          gltfModelsPromises.push(promise)
        })
      }

      // 3. 数据库增加操作
      await Promise.all(putPromises)

      // 4. 加载模型
      const gltfs = await Promise.all(gltfModelsPromises)

      // 5. 关闭loading
      loading.value = false

      // 6. 添加模型到 group
      gltfs.forEach((gltf) => {
        group.add(gltf.scene)
      })

      // 7. 对group分组中的所有 scene对象统一缩放
      group.scale.set(0.05, 0.05, 0.05)

      // 8. 进行居中
      const box = new THREE.Box3().setFromObject(group)
      const center = box.getCenter(new THREE.Vector3())

      control.reset()

      group.position.x += (group.position.x - center.x)
      group.position.y += (group.position.y - center.y + 0.5)
      group.position.z += (group.position.z - center.z)

      // 9. 添加进场景
      scene.add(group)

      // 10. 设置相机
      camera.position.set(0, 0, 15)
      camera.lookAt(scene.position)
    }
  }
  catch (err) {
    console.error(err)
    Toast.fail('模型文件加载失败')
  }
}

function render(_time?: number) {
  animationId = requestAnimationFrame(render)
  control!.update()
  renderer!.render(scene!, camera!)
}

async function init(data: CollectionsItem) {
  detail.value = data

  await nextTick()

  start()

  load()

  updateLight()

  updateEnvironment()

  updateTextureEncoding()

  render()
}

onBeforeUnmount(() => {
  // NOTE: 一定要reset！！，否则在移动端会报 webgl loss context的错误（导致页面闪动然后黑屏）
  reset()
})

defineExpose({
  init,
})
</script>

<template>
  <div v-if="detail" ref="screenDom" class="three">
    <div v-if="loading" class="spinner">
      <div class="bounce1" />
      <div class="bounce2" />
      <div class="bounce3" />
    </div>
    <div class="desc">
      <div class="name">
        {{ detail.name }}
      </div>
      <div class="tag">
        <span>限量</span>
        <span>{{ detail.numbers }}件</span>
      </div>
      <div class="tips flex">
        <SvgIcon name="collection-lock" class="lock" />
        购买即可体验内容
      </div>
    </div>
    <div class="mask" />
  </div>
</template>

<style lang="scss" scoped>
@keyframes bouncedelay {

  0%,
  80%,
  100% {
    transform: scale(0.0);
  }

  40% {
    transform: scale(1.0);
  }
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  text-align: center;
}

.spinner>div {
  width: 7px;
  height: 7px;
  margin: 0 1px;
  background-color: var(--van-gray-5);
  border-radius: 100%;
  display: inline-block;
  animation: bouncedelay 1.4s infinite ease-in-out;
  animation-fill-mode: both;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
}
</style>

<style lang="scss" scoped>
.three {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('~/assets/images/collection-blood-bg.png') no-repeat center;
  background-size: 100%;

  .desc {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 295px;
    height: 103px;
    text-align: center;
    padding: 0px 12px 0 12px;
    box-sizing: border-box;

    .name {
      margin-top: 8px;
      color: rgba(255, 254, 250, 1);
      font-size: 20px;
      @include multi-ellipsis();
    }

    .tag {
      font-size: 12px;
      margin-top: 12px;

      span {
        padding: 4px 8px;
        box-sizing: border-box;
      }

      span:first-child {
        color: #303034;
        background-color: #B2BBBE;
      }

      span:last-child {
        padding: 4px 8px;
        color: #FFFEFA;
        background-color: #F4CE69;
      }
    }

    .tips {
      margin-top: 13px;
      font-size: 12px;
      color: #FFFFFF;
      justify-content: center;
      align-items: center;
      line-height: 14px;

      .lock {
        width: 14px;
        height: 14px;
        margin-right: 4px;
      }
    }
  }
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
