<script setup lang="ts">
import type { Options } from '~/utils/poster/drawPoster'
import { draw } from '~/utils/poster/drawPoster'

const showPoster = ref<boolean>(false)
const posterUrl = ref<string>('')

defineExpose({
  async draw(path: string, options: Options, params: Record<string, any>) {
    const base64url = await draw(path, options, params)

    if (base64url) {
      posterUrl.value = base64url
      showPoster.value = true
    }
  },
})
</script>

<template>
  <canvas id="myCanvas" />
  <van-popup v-model:show="showPoster" overlay-class="zo-popup-overlay" close-on-popstate :close-on-click-overlay="false" :duration="0.2">
    <div class="poster-img">
      <zo-img :src="posterUrl" />
    </div>
    <div class="desc">
      长按图片转发或保存
    </div>
    <div class="cancel" @click="showPoster = false">
      取消
    </div>
  </van-popup>
</template>

<style lang="scss">
.zo-popup-overlay {
  background: rgba(19, 24, 36, .5);
  backdrop-filter: blur(8px);
}

.zo-popup-overlay+.van-popup {
  background-color: transparent;
}
</style>

<style lang="scss" scoped>
canvas {
  width: 375px;
  height: 563px;
  position: absolute;
  top: -1999px;
  left: 0;
}

.poster-img {
  width: 37.5px * 7;
  height: 56.3px * 7;
}

.desc {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #FFFFFF;
}

.cancel {
  margin-top: 30px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-radius: 22px;
  background: rgba(48, 48, 52, 1);
  color: #FFFEFA;
  font-size: 20px;
}
</style>
