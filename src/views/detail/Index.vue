<script setup lang="ts">
import type { CollectionsItem } from '../../../mock/detail/index'
import BottomFooter from './components/Footer.vue'
import Poster from './components/Poster.vue'
import ThreeBooth from './components/ThreeBooth.vue'
import CollectionDesc from './components/CollectionDesc.vue'
import { getCollection } from '~/api/detail/index'
// import { tracker } from '~/utils/tracker'

// NOTE: 没办法像区块查询页面一样做假缓存，因为THREEjS的 底层 webgl需要手动释放，
// 否则 若使用keepalive，实际 webgl 存在于缓存中，会导致 loss context错误
// 于是乎这个页面还是采取每次都刷新，当然只要不存在像 THREEjS的 底层 webgl这种的问题，那么还是可以使用假缓存方案的

const route = useRoute()
const detail = ref<CollectionsItem | null>(null)
const loading = ref<boolean>(true)
const posterRef = ref<any>(null)
const threeRef = ref<any>(null)

// tracker.login('12313123')

const buy = () => {
  // TODO: 1. 是否登录 2. 是否实名
}

const share = async () => {
  posterRef.value.draw(
    // 跳转到详情页，由于存在返回首页所以需要增加 back=home
    'http://localhost:5173/#/home',
    {
      type: 'jumpDetailPoster',
      canvasOptions: {
        width: 375,
        height: 563,
        dpr: 1,
        el: '#myCanvas',
      },
      qrcodeOptions: {
        errorCorrectionLevel: 'H',
        width: 68,
        margin: 2,
        scale: 1,
        rendererOpts: {
          quality: 1,
        },
        type: 'image/jpeg',
      },
    },
    {
      headUrl: detail.value?.cover,
      collectionName: detail.value?.name,
    },
  )
}

getCollection({
  id: route.params.id as string,
}).then((res) => {
  detail.value = res.collection
  loading.value = false

  nextTick(() => {
    threeRef.value.init(res.collection)
  })
})
</script>

<template>
  <div v-if="loading" class="loading-page">
    <van-loading class="loading" />
  </div>

  <div v-else class="detail">
    <zo-header title="" bg-color="transparent">
      <template #right>
        <SvgIcon name="detail-share" class="share-icon" @click="share" />
      </template>
    </zo-header>
    <div class="wrapper">
      <div class="three-booth">
        <ThreeBooth ref="threeRef" />
      </div>
      <div class="desc">
        <div class="box">
          <CollectionDesc :data="detail" />
        </div>
      </div>
      <div class="purchase-notes">
        <div class="box">
          <div class="title">
            购买须知
          </div>
          <div class="content">
            {{ detail?.purchaseNotes }}
          </div>
        </div>
      </div>
      <div class="release-notes">
        <div class="box">
          <div class="title">
            发行说明
          </div>
          <div class="content">
            {{ detail?.releaseNotes.content }}
          </div>
          <div class="tags flex">
            <div v-for="tag in detail?.releaseNotes.tags" :key="tag.name" class="tag flex">
              <SvgIcon :name="tag.icon" class="tag-icon" />
              {{ tag.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="logo flex-center-horizontal">
        <SvgIcon name="super-chain-logo" class="logo-icon" />
      </div>
    </div>
    <BottomFooter :data="detail" @buy="buy" />
    <Poster ref="posterRef" />
  </div>
</template>

<style lang="scss" scoped>
.share-icon {
  width: 22px;
  height: 22px;
}

.wrapper {
  padding-bottom: 110px;

  .three-booth {
    width: 375px;
    height: 620px;
  }

  .desc,
  .purchase-notes,
  .release-notes {
    width: 343px;
    margin: 0 auto;
    margin-top: 8px;
    background-color: #1A1A1C;
    border-radius: 8px;
    padding: 16px 0;
    box-sizing: border-box;

    .box {
      width: 311px;
      height: auto;
      margin: 0 auto;
    }
  }

  .purchase-notes,
  .release-notes {
    .box {
      .title {
        font-size: 16px;
        color: #FFFEFA;
      }

      .content {
        margin-top: 16px;
        font-size: 12px;
        color: #C5C6D0;
        line-height: 24px;
      }
    }
  }

  .release-notes {
    .tags {
      margin-top: 28px;
      font-size: 12px;
      color: #898989;

      .tag {
        flex: 1 1;
        flex-direction: column;
        align-items: center;

        .tag-icon {
          width: 50px;
          height: 50px;
          margin-bottom: 8px;
        }
      }
    }
  }

  .logo {
    height: 73px;

    .logo-icon {
      width: 236px;
      height: 33px;
    }
  }
}

.loading-page {
  width: 100vw;
  height: 100vh;

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
