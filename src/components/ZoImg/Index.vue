<script setup lang="ts">
defineProps({
  lazy: {
    type: Boolean,
    default: false,
  },
  // 支持两种（1.src是 v-bind的，需要 import 图片）
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  // fill contain cover none scale-down
  fit: {
    type: String,
    default: 'cover',
  },
  bgColor: {
    type: String,
    default: 'rgba(219, 219, 219, 1)',
  },
})

const emits = defineEmits(['error', 'load'])

const isError = ref<boolean>(false)

const onError = (e: Event) => {
  isError.value = true
  emits('error')
}

const onLoaded = (e: Event) => {
  emits('load')
}
</script>

<template>
  <img v-if="!isError" v-lazy="{ lazy, error: onError, load: onLoaded }" :src="src" :alt="alt">
  <div v-else class="error-img flex-center-horizontal">
    <SvgIcon class="error" name="img-error" />
  </div>
</template>

<style lang="scss" scoped>
// 必须添加，否则刚开始会出现裂开图片的闪动！！
img[src=''],
img:not([src]) {
  opacity: 0;
}

img {
  width: 100%;
  height: 100%;
  object-fit: v-bind(fit);
  background-color: v-bind(bgColor);
}

.error-img {
  width: 100%;
  height: 100%;
  background-color: #f2f3f5;

  .error {
    width: 60px;
    height: 60px;
  }
}
</style>
