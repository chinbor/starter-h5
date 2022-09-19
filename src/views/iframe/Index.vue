<script setup lang="ts">
const route = useRoute()
const { title, link } = route.query
</script>

<template>
  <div class="iframe">
    <zo-header :title="title as string" />
    <div class="wrapper">
      <iframe :src="link as string" frameborder="0" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.iframe {
  height: calc(100vh - $nav-height);
  margin-top: $nav-height;

  .wrapper {
    width: 100%;
    height: 100%;

    iframe {
      width: 100%;
      height: 100%;
    }
  }

}
</style>
