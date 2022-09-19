<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { BannerItem } from '../../../mock/home/index'
import Collection from './components/Collection.vue'
import Release from './components/Release.vue'
import { usePosition } from '~/hooks/usePosition'
import { getBanners } from '~/api/home/index'

const router = useRouter()
const containerTarget = usePosition()
const pullLoading = ref<boolean>(false)
const skeletonLoading = ref<boolean>(true)
const active = ref<number>(1)
const collectionRef = ref<any>(null)
const releaseRef = ref<any>(null)
const banners = ref<BannerItem[]>([])

const tabs = [
  {
    type: 1,
    name: '数藏精选',
  },
  {
    type: 2,
    name: '发售日历',
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
  active.value = type
}

const toByType = (type: number, link?: string, title?: string) => {
  const routeTo = (params: RouteLocationRaw) => {
    return () => {
      router.push(
        params,
      )
    }
  }

  // const openHref = (link: string) => {
  //   return () => {
  //     window.location.href = link
  //   }
  // }

  const typeMap: Record<number, () => void> = {
    // 招募令推文（微信推文存在问题就是）
    1: routeTo({
      path: '/iframe',
      query: {
        link,
        title,
      },
    }),
    // 欢迎加入三国数藏
    2: routeTo('/welcomeTo'),
    // 转增及购买须知
    3: routeTo('/transferInstructions'),
  }

  typeMap[type]()
}

getBanners().then((res) => {
  skeletonLoading.value = false

  banners.value = res.banners
})
</script>

<template>
  <div class="home">
    <van-skeleton class="skeleton" :row="5" :loading="skeletonLoading">
      <van-pull-refresh
        ref="containerTarget" v-model="pullLoading" class="pull-refresh" success-text="刷新成功"
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
            <div class="tab-header flex-align-center">
              <template v-for="tab in tabs" :key="tab.type">
                <div class="tab-item" :class="{ active: active === tab.type }" @click="tabChange(tab.type)">
                  {{ tab.name }}
                </div>
              </template>
            </div>
            <div class="tab-content">
              <!-- 数藏精选 -->
              <keep-alive>
                <Collection v-if="active === tabs[0].type" ref="collectionRef" class="collection" />
              </keep-alive>
              <!-- 发售日历 -->
              <keep-alive>
                <Release v-if="active === tabs[1].type" ref="releaseRef" class="release" />
              </keep-alive>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </van-skeleton>
  </div>
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
.home {
  height: 100vh;
  padding-top: 16px;
  box-sizing: border-box;

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
        box-sizing: border-box;
        padding: 2px;
        background-color: rgba(219, 219, 219, 1);
        overflow: hidden;

        .img {
          border-radius: 8px;
          overflow: hidden;
          width: 339px;
          height: 176px;
        }
      }

      .tabs {
        font-size: 18px;
        color: rgba(178, 187, 190, 1);
        font-weight: 500;

        .tab-header {
          background-color: $primary-color;
          position: sticky;
          z-index: 1;
          top: 0;
          left: 0;
          margin-top: 26px;
          padding-bottom: 20px;
          // height: 50px;
        }

        .tab-item {
          margin-right: 26px;
          letter-spacing: 2px;
        }

        .tab-item.active {
          position: relative;
          color: rgba(255, 254, 250, 1);
          font-size: 20px;
          font-weight: 700;

          &::after {
            content: '';
            display: inline-block;
            position: absolute;
            z-index: -1;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 8px;
            background: linear-gradient(135.5deg, rgba(228, 63, 255, 1) 0%, rgba(6, 121, 255, 1) 100%);
          }
        }
      }
    }
  }
}
</style>
