<script setup lang="ts">
import { useAppStore } from '~/stores/modules/app'

const appStore = useAppStore()

const cachedPages = computed(() => {
  return appStore.getCachedPages
})
</script>

<template>
  <div class="app">
    <!-- keep-alive 默认缓存两层路由，这里使用了自己的一个糟蹋逻辑完成，但是还存在一个问题就是页面会触发两次 -->
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" v-if="cachedPages.includes(route.name as string)" :key="$route.fullPath" />
      </keep-alive>
      <component :is="Component" v-if="!cachedPages.includes(route.name as string)" :key="$route.fullPath" />
    </router-view>
  </div>
</template>
