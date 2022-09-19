<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  bgColor: {
    type: String as PropType<string>,
    default: '#131824',
  },
  title: {
    type: String as PropType<string>,
    default: 'nav',
  },
  titleColor: {
    type: String as PropType<string>,
    default: '#FFFEFA',
  },
  backColor: {
    type: String as PropType<string>,
    default: '#FFFEFA',
  },
  fixed: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  zIndex: {
    type: Number as PropType<number>,
    default: 1,
  },
})

const router = useRouter()
const route = useRoute()

// 分享类型为 share
const { back: backTo } = route.query

const back = () => {
  if (backTo === 'home')
    router.replace('/home')

  else
    router.back()
}
</script>

<template>
  <nav class="nav flex" :class="{ fixed }">
    <div class="left flex" @click="back">
      <!-- NOTE: 若外部自定义left插槽内容且存在点击事件，请 @click.stop防止冒泡 -->
      <slot name="left">
        <span />
      </slot>
    </div>

    <div class="title flex">
      <slot name="title">
        <p>{{ title }}</p>
      </slot>
    </div>

    <div class="right flex">
      <slot name="right">
        <span />
      </slot>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  height: 44px;
  width: 100%;
  background-color: v-bind(bgColor);
  align-items: center;

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: v-bind(zIndex);
  }

  .left,
  .title,
  .right {
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .left,
  .right {
    width: 56px;
  }

  .left {
    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-top: 2px solid v-bind(backColor);
      border-right: 2px solid v-bind(backColor);
      transform: rotate(-135deg);
    }
  }

  .title {
    flex: 1 1;
    overflow: hidden;
    font-size: 17px;
    color: v-bind(titleColor);

    p {
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
  }
}
</style>
