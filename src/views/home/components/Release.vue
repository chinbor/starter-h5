<script setup lang="ts">
// https://dayjs.gitee.io/docs/zh-CN/display/format
import { useCountDown } from '~/hooks/useCountDown'
import type { ReleasesItem } from '~/api/home/index'
import { getReleases } from '~/api/home/index'

const { dayJsFormat } = useCountDown()

interface ListType {
  normalTime: number
  children: ReleasesItem[]
}

const router = useRouter()
const list = ref<ListType[]>([])
const loading = ref<boolean>(true)
const finished = ref<boolean>(false)
let _page = 1
const _pageSize = 4

function clusterSorting(arr: ReleasesItem[]) {
  // 1. 遍历concat后的数据，寻找是否存在于list中，若存在则添加进去，否则新增
  arr.forEach((item1) => {
    // -1代表未找到
    const idx = list.value.findIndex((item2) => {
      return item1.normalTime === item2.normalTime
    })

    // 找到
    if (~idx) {
      list.value[idx].children.push(item1)
    }
    else {
      list.value.push({
        normalTime: item1.normalTime,
        children: [item1],
      })
    }
  })

  // 2. 排序
  list.value.sort((a, b) => {
    return b.normalTime - a.normalTime
  })
}

const onLoad = () => {
  getReleases({
    page: _page,
    size: _pageSize,
  }).then((res) => {
    // 聚类外加排序
    clusterSorting(res.list)

    // 加载状态结束
    loading.value = false

    _page++

    // 数据全部加载完成
    if (res.list.length < _pageSize)
      finished.value = true
  })
}

const reset = () => {
  loading.value = true
  finished.value = false
  list.value = []
  _page = 1

  onLoad()
}

const toDetail = (id: string) => {
  router.push(`/detail/${id}`)
}

defineExpose({
  reset,
})
</script>

<template>
  <van-list v-model:loading="loading" :finished="finished" finished-text="---- 没有更多了 ----" @load="onLoad">
    <div v-for="item in list" :key="item.normalTime" class="time-line">
      <div class="date">
        {{ dayJsFormat(item.normalTime, 'M月D日 HH:mm') }}
      </div>
      <div v-for="child in item.children" :key="child.id" class="collection">
        <div class="card flex" @click="toDetail(child.id)">
          <div class="img">
            <zo-img lazy :src="child.url" />
          </div>
          <div class="detail flex">
            <div class="name">
              {{ child.title }}
            </div>
            <div v-if="child.advanceTime" class="desc">
              优先购：{{ dayJsFormat(child.advanceTime, 'M月D日 HH:mm') }}
            </div>
            <div class="remark flex">
              <div class="price flex">
                <span>￥</span>
                <span>{{ child.price }}</span>
              </div>
              <div class="bardge">
                <span>限量</span>
                <span>{{ child.limit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-list>
</template>

<style lang="scss" scoped>
.time-line {
  animation: fade 0.4s linear;

  .date {
    position: relative;
    font-size: 16px;
    font-weight: 700;
    padding-left: 19px;
    box-sizing: border-box;
    color: #F4CE69;

    &::before {
      position: absolute;
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #F4CE69;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      border-radius: 50%;
    }
  }

  .collection {
    position: relative;
    padding-left: 19px;
    padding-bottom: 8px;
    padding-right: 2px;
    box-sizing: border-box;

    &:last-child {
      padding-bottom: 29px;
    }

    &:nth-child(2) {
      padding-top: 20px;
    }

    &::before {
      position: absolute;
      content: '';
      display: inline-block;
      width: 1px;
      height: 100%;
      background-color: #F4CE69;
      top: 50%;
      transform: translateY(-50%);
      left: 2.5px;
      border-radius: 50%;
    }

    .card {
      width: 100%;
      height: 124px;
      background-color: #1A1A1C;
      border-radius: 10px;
      border: 1px solid rgba(48, 48, 52, 1);
      overflow: hidden;

      .img {
        width: 124px;
        height: 100%;
      }

      .detail {
        flex-direction: column;
        justify-content: space-between;
        width: 200px;
        padding: 16px 12px 8px 12px;
        box-sizing: border-box;

        .name {
          color: #FFFEFA;
          font-size: 16px;
          font-weight: 700;
          width: 100%;
          @include multi-ellipsis(1);
        }

        .desc {
          margin-top: 18px;
          width: 100%;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 8px;
          background-color: #303034;
          font-size: 12px;
          color: #229453;
        }

        .remark {
          margin-top: 12px;
          height: 21px;
          align-items: flex-end;
          justify-content: space-between;

          .price {
            color: #FFFEFA;
            align-items: center;
            height: 16px;
            line-height: 16px;

            & span:first-child {
              font-size: 12px;
              font-weight: 700;

            }

            & span:last-child {
              font-size: 16px;
              font-weight: 700;
            }

          }

          .bardge {
            font-size: 12px;

            & span:first-child {
              padding: 4px 8px;
              color: #303034;
              background-color: #B2BBBE;
            }

            & span:last-child {
              padding: 4px 8px;
              color: #FFFEFA;
              background-color: #F4CE69;
            }
          }
        }
      }
    }
  }

}
</style>
