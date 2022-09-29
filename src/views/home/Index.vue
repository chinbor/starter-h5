<script setup lang="ts">
// import type { RouteLocationRaw } from 'vue-router'
import { Toast } from 'vant'
import type { BannerItem } from '../../../mock/home/index'
import Collection from './components/Collection.vue'
// import Release from './components/Release.vue'
import CocreationFeatured from './components/CocreationFeatured.vue'
import ReleasePlan from './components/ReleasePlan.vue'
import Home from './components/Home.vue'
import { usePosition } from '~/hooks/usePosition'
import { getBanners } from '~/api/home/index'

// const router = useRouter()
const containerTarget = usePosition()
const pullLoading = ref<boolean>(false)
const skeletonLoading = ref<boolean>(true)
const active = ref<number>(1)
const collectionRef = ref<any>(null)
const extractRef = ref<any>(null)
const publishRef = ref<any>(null)
const releaseRef = ref<any>(null)
const tabRef = ref<HTMLDivElement | null>(null)
const banners = ref<BannerItem[]>([])

const tabs = [
  {
    type: 1,
    name: '招募令',
    icon: 'home-flag',
  },
  {
    type: 2,
    name: '共创精选',
    icon: 'home-extract',
  },
  {
    type: 3,
    name: '发行计划',
    icon: 'home-publish-plan',
  },
]

const onRefresh = () => {
  getBanners().then((res) => {
    banners.value = res.banners

    pullLoading.value = false

    if (active.value === 1)
      collectionRef.value.reset()

    if (active.value === 2)
      releaseRef.value.reset()
  })
}

const tabChange = (type: number) => {
  if (type === 2 || type === 3) {
    Toast.fail('敬请期待')
    return
  }

  active.value = type
}

const toByType = (type: number, link?: string, title?: string) => {
  // const routeTo = (params: RouteLocationRaw) => {
  //   return () => {
  //     router.push(
  //       params,
  //     )
  //   }
  // }

  // // const openHref = (link: string) => {
  // //   return () => {
  // //     window.location.href = link
  // //   }
  // // }

  // const typeMap: Record<number, () => void> = {
  //   // 招募令推文（微信推文存在问题就是）
  //   1: routeTo({
  //     path: '/iframe',
  //     query: {
  //       link,
  //       title,
  //     },
  //   }),
  //   // 欢迎加入三国数藏
  //   2: routeTo('/welcomeTo'),
  //   // 转增及购买须知
  //   3: routeTo('/transferInstructions'),
  // }

  // typeMap[type]()

  Toast.fail('敬请期待')
}

const { y: scrollY } = useScroll(containerTarget)
const top = ref<number>(0)

getBanners().then(async (res) => {
  skeletonLoading.value = false

  await nextTick()

  top.value = tabRef.value!.getBoundingClientRect().top

  banners.value = res.banners
})
</script>

<template>
  <Home>
    <van-skeleton class="skeleton" :row="5" :loading="skeletonLoading">
      <van-pull-refresh
        ref="containerTarget" v-model="pullLoading" class="pull-refresh" success-text="刷新成功"
        :disabled="false"
        @refresh="onRefresh"
      >
        <div class="container">
          <!-- swiper -->
          <van-swipe class="swiper" :autoplay="3000" indicator-color="#fff">
            <van-swipe-item
              v-for="banner in banners" :key="banner.type"
              @click="toByType(banner.type, banner.link, banner.title)"
            >
              <zo-img :src="banner.url" bg-color="transparent" class="img" />
            </van-swipe-item>
          </van-swipe>
          <!-- tab -->
          <div class="tabs">
            <!-- 减去16是因为home使用了 padding-top: 16px; -->
            <div ref="tabRef" class="tab-header flex-align-center" :class="{ sticky: scrollY >= top - 16 }">
              <template v-for="tab in tabs" :key="tab.type">
                <div class="tab-item" :class="{ active: active === tab.type }" @click="tabChange(tab.type)">
                  {{ tab.name }}
                  <SvgIcon v-if="active === tab.type" :name="tab.icon" class="icon" />
                </div>
              </template>
            </div>
            <div class="tab-content">
              <!-- 招募令 -->
              <keep-alive>
                <Collection v-if="active === tabs[0].type" ref="collectionRef" class="collection" />
              </keep-alive>
              <!-- 发售日历 -->
              <!-- <keep-alive>
                <Release v-if="active === tabs[1].type" ref="releaseRef" class="release" />
              </keep-alive> -->
              <!-- 共创精选 -->
              <keep-alive>
                <CocreationFeatured v-if="active === tabs[1].type" ref="extractRef" class="extract" />
              </keep-alive>
              <!-- 发行计划 -->
              <keep-alive>
                <ReleasePlan v-if="active === tabs[2].type" ref="publishRef" class="publish" />
              </keep-alive>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </van-skeleton>
  </Home>
</template>

<style lang="scss" scoped>
.skeleton {
  ::v-deep(.van-skeleton__row) {
    height: 431px;
    border-radius: 8px;
    width: 343px;
  }

  ::v-deep(.van-skeleton__row:nth-child(1)) {
    height: 180px;
  }

  ::v-deep(.van-skeleton__row:nth-child(2)) {
    width: 86px !important;
    height: 20px;
    display: inline-block;
    margin-right: 26px;
  }

  ::v-deep(.van-skeleton__row:nth-child(3)) {
    display: inline-block;
    width: 86px !important;
    height: 20px;
  }

  ::v-deep(.van-skeleton__row:nth-child(5)) {
    width: 100% !important;
  }
}
</style>

<style lang="scss" scoped>
.pull-refresh {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .container {
    width: 343px;
    margin: 0 auto;

    .swiper {
      border-radius: 8px;
      width: 100%;
      height: 180px;
      overflow: hidden;

      .img {
        border-radius: 8px;
        overflow: hidden;
        width: 339px;
        height: 176px;
      }
    }

    .tabs {
      font-size: 16px;
      color: #857F72;
      font-weight: 400;

      .tab-header {
        background-color: transparent;
        position: sticky;
        z-index: 2;
        top: 0;
        left: 0;
        padding-top: 20px;
        height: 30px;
        padding-bottom: 20px;

        &.sticky {
          background-color: $primary-color;
          // transition: all linear .1s;
        }
      }

      .tab-item {
        position: relative;
        margin-right: 26px;
        letter-spacing: 2px;

        .icon {
          width: 18px;
          height: 18px;
          position: absolute;
          z-index: 1;
          left: -5px;
          top: -5px;
        }
      }

      .tab-item.active {
        position: relative;
        color: #EEDDB2;
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
}
</style>
