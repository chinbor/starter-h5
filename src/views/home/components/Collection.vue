<script setup lang="ts">
import { deltaTime24h, useCountDown } from '~/hooks/useCountDown'
import type { CollectionsItem } from '~/api/home/index'
import { getCollections } from '~/api/home/index'

const router = useRouter()
const loading = ref<boolean>(true)
const finished = ref<boolean>(false)
const list = ref<CollectionsItem[]>([])
const { countDown, dayJsFormat, durationFormat } = useCountDown()
const _pageSize = 4
let _page = 1

const onLoad = () => {
  getCollections({
    page: _page,
    size: _pageSize,
  }).then((res) => {
    _page++

    // 加载状态结束
    loading.value = false

    // 更新数据
    list.value = list.value.concat(res.list)

    if (res.list.length < _pageSize)
      finished.value = true
  })
}

const toDetail = (id: string) => {
  router.push(`/detail/${id}`)
}

const reset = async () => {
  _page = 1
  loading.value = true
  finished.value = false
  list.value = []

  onLoad()
}

defineExpose({
  reset,
})
</script>

<template>
  <van-list v-model:loading="loading" :finished="finished" finished-text="---- 没有更多了 ----" @load="onLoad">
    <div v-for="item in list" :key="item.id" class="card" @click="toDetail(item.id)">
      <div class="img">
        <div class="wrapper">
          <zo-img lazy :src="item.url" />
          <!-- NOTE: 这里很重要，逻辑一定要仔细看。 handleTag参数为 开售时间、售罄的状态 -->
          <span v-if="item.isSoldOut" class="sold-out tag">已售罄</span>
          <template v-else>
            <span v-if="countDown(item.time) <= 0" class="tag hot">
              <SvgIcon name="home-hot" class="hot-icon" />火热抢购中
            </span>
            <span v-else-if="countDown(item.time) > 0 && countDown(item.time) <= deltaTime24h" class="coming-soon tag">
              {{ `即将开售 ${durationFormat(countDown(item.time), 'HH:mm:ss')}` }}
            </span>
            <span v-else class="tag on-sale">
              {{ `${dayJsFormat(item.time, 'M月D日 HH:mm')} 开售` }}
            </span>
          </template>
        </div>
      </div>
      <div class="footer flex">
        <div class="title flex-center">
          {{ item.name }}
          <SvgIcon v-if="item.type === 2" name="home-collection-3d" class="icon" />
        </div>
        <div class="detail flex">
          <div class="bardge">
            <span>限量</span>
            <span>{{ item.numbers }}件</span>
          </div>
          <div class="price flex">
            <span>￥</span><span>{{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </van-list>
</template>

<style lang="scss" scoped>
.card {
  height: 431px;
  margin-bottom: 16px;
  // 页面返回会有闪动效果，所以这里注释
  // animation: fade 0.4s linear;
  border-radius: 8px;
  overflow: hidden;
  background: #491C18;
  backdrop-filter: blur(4px);

  .img {
    padding: 2px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 343px;
    background-color: #EEDDB2;
    border-radius: 8px;

    .wrapper {
      position: relative;
      width: 339px;
      height: 339px;
      border-radius: 8px;
      box-sizing: border-box;
      overflow: hidden;

      .tag {
        display: flex;
        align-items: center;
        padding: 6px 12px;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 14px;
        background-color: rgba(19, 24, 36, 0.25);
        border-radius: 0 0 8px 0;
      }

      .hot {
        color: #FF6B00;

        .hot-icon {
          width: 18px;
          height: 18px;
        }
      }

      .coming-soon {
        color: #20A162;
      }

      .sold-out {
        color: #B2BBBE;
      }

      .on-sale {
        color: #F4CE69;
      }
    }
  }

  .footer {
    color: #EEDDB2;
    padding: 16px 16px 12px 16px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;

    .title {
      font-size: 20px;
      font-weight: 700;
      width: 90%;
      @include multi-ellipsis(1);

      .icon {
        width: 12px;
        height: 12px;
      }
    }

    .detail {
      margin-top: 10px;
      align-items: center;
      justify-content: space-between;
      height: 28px;

      .bardge {
        font-size: 12px;

        & span:first-child {
          padding: 2px 4px;
          color: #5A3E19;
          border: 1px solid rgba(238,221,178,1);
          background: linear-gradient(90deg, rgba(236,192,143,1) 0%, rgba(238,221,178,1) 100%);
          border-radius: 3px 0 0 3px;
        }

        & span:last-child {
          padding: 2px 8px;
          color: #EEDDB2;
          border: 1px solid rgba(238,221,178,1);
          box-sizing: border-box;
          border-radius: 0 3px 3px 0;
        }
      }

      .price {
        font-size: 16px;
        font-weight: 700;
        line-height: 28px;
        height: 24px;
        align-items: center;

        & span:last-child {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
