<script setup lang="ts">
import { Toast } from 'vant'
import type { CollectionsItem } from '../../../mock/detail/index'
import BottomFooter from './components/Footer.vue'
import Poster from './components/Poster.vue'
import ThreeBooth from './components/ThreeBooth.vue'
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
  Toast.fail('功能正在开发中')
}

const share = async () => {
  Toast.fail('功能正在开发中')
  // const link = `${window.location.protocol}//${window.location.host}/home`

  // posterRef.value.draw(
  //   // 跳转到详情页，由于存在返回首页所以需要增加 back=home
  //   link,
  //   {
  //     type: 'jumpDetailPoster',
  //     canvasOptions: {
  //       width: 375,
  //       height: 563,
  //       dpr: 1,
  //       el: '#myCanvas',
  //     },
  //     qrcodeOptions: {
  //       errorCorrectionLevel: 'H',
  //       width: 68,
  //       margin: 2,
  //       scale: 1,
  //       rendererOpts: {
  //         quality: 1,
  //       },
  //       type: 'image/jpeg',
  //     },
  //   },
  //   {
  //     headUrl: detail.value?.cover,
  //     collectionName: detail.value?.name,
  //   },
  // )
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
      <!-- 背景简介 -->
      <div class="bg-intro">
        <div class="box">
          <div class="title">
            背景简介
            <SvgIcon name="detail-react-bg" class="icon" />
          </div>
          <div class="content">
            {{ detail?.bgIntro }}
          </div>
        </div>
      </div>
      <!-- 设计师简介 -->
      <div class="designer-intro">
        <div class="box">
          <div class="title">
            设计师简介
            <SvgIcon name="detail-react-bg" class="icon" />
          </div>
          <div class="content">
            <h1 class="name">
              {{ detail?.designerIntro.name }}
            </h1>
            <div>
              {{ detail?.designerIntro.desc }}
            </div>
          </div>
        </div>
      </div>
      <!-- 作品简介 -->
      <div class="work-intro">
        <div class="box">
          <div class="title">
            作品简介
            <SvgIcon name="detail-react-bg" class="icon" />
          </div>
          <div class="content">
            {{ detail?.workIntro }}
          </div>
        </div>
      </div>
      <!-- 权益介绍 -->
      <div class="rights-intro">
        <div class="box">
          <div class="title">
            权益介绍
            <SvgIcon name="detail-react-bg" class="icon" />
          </div>
          <div class="content">
            {{ detail?.rightsIntro }}
          </div>
        </div>
      </div>
      <!-- 发行说明 -->
      <div class="release-notes">
        <div class="box">
          <div class="title">
            发行说明
            <SvgIcon name="detail-react-bg" class="icon" />
          </div>
          <div class="content">
            {{ detail?.releaseNotes.content }}
          </div>
          <div class="tags flex">
            <div v-for="tag in detail?.releaseNotes.tags" :key="tag.name" class="tag flex">
              <SvgIcon :name="tag.icon" class="tag-icon" color="#EEDDB2" />
              {{ tag.name }}
            </div>
          </div>
        </div>
      </div>
      <!-- 购买须知 -->
      <div class="purchase-notes">
        <div class="box">
          <div class="title">
            购买须知
            <SvgIcon name="detail-react-bg" class="icon" />
          </div>
          <div class="content">
            {{ detail?.purchaseNotes }}
          </div>
        </div>
      </div>
      <!-- baidu logo -->
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
    height: 613px;
  }

  .purchase-notes,
  .release-notes,
  .bg-intro,
  .designer-intro,
  .work-intro,
  .rights-intro {
    width: 343px;
    margin: 0 auto;
    background-color: #491C18;
    border-radius: 8px;
    margin-top: 16px;
    padding: 16px 0;
    box-sizing: border-box;

    .box {
      width: 311px;
      height: auto;
      margin: 0 auto;
    }
  }

  .purchase-notes,
  .release-notes,
  .bg-intro,
  .designer-intro,
  .work-intro,
  .rights-intro {
    .box {
      .title {
        font-size: 16px;
        color: #EEDDB2;
        position: relative;

        .icon {
          position: absolute;
          width: 16px;
          height: 16px;
          top: -2px;
          left: -7px;
        }
      }

      .content {
        margin-top: 16px;
        font-size: 12px;
        color: #ECC08F;
        line-height: 24px;
        white-space: break-spaces;
      }
    }
  }

  .release-notes {
    .tags {
      margin-top: 28px;
      font-size: 12px;
      color: #EEDDB2;

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

  .designer-intro {
    .box {
      .content {
        .name {
          font-size: 18px;
          font-weight: 700;
          color: #EEDDB2;
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
