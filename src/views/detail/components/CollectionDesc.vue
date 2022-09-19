<script setup lang="ts">
import type { PropType } from 'vue'
import type { CollectionsItem } from '../../../../mock/detail/index'

defineProps({
  data: {
    type: Object as PropType<CollectionsItem | null>,
    required: true,
  },
  title: {
    type: String,
    default: '藏品描述',
  },
})
</script>

<template>
  <div class="collection-desc">
    <div class="title">
      {{ title }}
    </div>
    <div v-if="data" class="imgs">
      <div v-for="img, index in data.imgs" :key="index" class="img">
        <!-- NOTE: bg-color为 透明 是 因为 父元素 border-radius，那么img存在背景色 会出现 边沿色彩突出 -->
        <zo-img :src="img" bg-color="transparent" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection-desc {
  width: 100%;

  .title {
    font-size: 16px;
    color: #FFFEFA;
  }

  .imgs {
    margin-top: 16px;
    width: 100%;
    border-radius: 12px;
    box-sizing: border-box;
    overflow: hidden;

    .img {
      width: 100%;
    }
  }
}
</style>
