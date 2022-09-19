<script setup lang="ts">
import type { PropType } from 'vue'
import type { CollectionsItem } from '../../../../mock/detail/index'
import { deltaTime24h, useCountDown } from '~/hooks/useCountDown'

defineProps({
  data: {
    type: Object as PropType<CollectionsItem | null>,
    required: true,
  },
})

const emits = defineEmits(['buy'])

const { countDown, durationFormat, dayJsFormat } = useCountDown()

const buy = () => {
  emits('buy')
}
</script>

<template>
  <footer v-if="data">
    <div class="box flex">
      <div class="left flex">
        ￥<span>{{ data.price }}</span>
      </div>
      <div class="right">
        <!-- 是否售罄 ？ -->
        <div v-if="data.isSoldOut" class="sold-out">
          已售罄
        </div>
        <div v-else class="not-sold-out">
          <div v-if="data.advanceTime" class="advance-sale">
            <!-- 立即购买 -->
            <div v-if="countDown(data.advanceTime) <= 0" class="paying" @click="buy">
              立即购买
            </div>
            <!-- 提前开售 <= 24h 开启倒计时 -->
            <div
              v-else-if="countDown(data.advanceTime) > 0 && countDown(data.advanceTime) <= deltaTime24h"
              class="coming-soon flex"
            >
              <div class="top">
                提前开售
              </div>
              <div class="bottom">
                {{ durationFormat(countDown(data.advanceTime), 'HH:mm:ss') }}
              </div>
            </div>
            <!-- 提前开售 -->
            <div v-else class="on-sale flex">
              <div class="top">
                提前开售
              </div>
              <div class="bottom">
                {{ dayJsFormat(data.advanceTime, 'M月D日 HH:mm') }}
              </div>
            </div>
          </div>
          <div v-else class="normal-sale">
            <!-- 立即购买 -->
            <div v-if="countDown(data.normalTime) <= 0" class="paying" @click="buy">
              立即购买
            </div>
            <!-- 即将开售  <= 24h 开启倒计时 -->
            <div
              v-else-if="countDown(data.normalTime) > 0 && countDown(data.normalTime) <= deltaTime24h"
              class="coming-soon flex"
            >
              <div class="top">
                即将开售
              </div>
              <div class="bottom">
                {{ durationFormat(countDown(data.normalTime), 'HH:mm:ss') }}
              </div>
            </div>
            <!-- 即将开售 -->
            <div v-else class="on-sale flex">
              <div class="top">
                即将开售
              </div>
              <div class="bottom">
                {{ dayJsFormat(data.normalTime, 'M月D日 HH:mm') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 0;
  height: 94px;
  width: 100%;
  padding: 8px 24px 0 24px;
  box-sizing: border-box;
  background-color: $primary-color;

  .box {
    height: 44px;
    justify-content: space-between;

    .left {
      width: 160px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
      align-items: center;
      color: #FFFEFA;
      font-size: 12px;

      span {
        display: inline-block;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        font-size: 24px;
      }
    }

    .right {
      width: 160px;
      height: 100%;

      .sold-out {
        width: 100%;
        height: 100%;
        line-height: 44px;
        text-align: center;
        border-radius: 22px;
        background-color: #5E616D;
        font-size: 18px;
        color: #FFFEFA;
        letter-spacing: 2px;
        text-indent: 2px;
      }

      .not-sold-out {

        .advance-sale,
        .normal-sale {
          .paying {
            width: 100%;
            height: 100%;
            line-height: 44px;
            text-align: center;
            border-radius: 22px;
            background-color: #FFA60F;
            font-size: 18px;
            color: #FFFEFA;
            letter-spacing: 2px;
            text-indent: 2px;
          }

          .coming-soon,
          .on-sale {
            width: 100%;
            height: 100%;
            flex-direction: column;
            align-items: center;
            border-radius: 22px;
            background: rgba(178, 187, 190, 1);
            color: #FFFEFA;

            .top {
              font-size: 16px;
            }

            .bottom {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
