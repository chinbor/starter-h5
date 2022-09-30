<template>
  <div class="home">
    <!-- 几个背景 花纹 -->
    <SvgIcon name="home-bg1" class="home-bg1" />
    <SvgIcon name="home-bg2" class="home-bg2" />
    <SvgIcon name="home-bg3" class="home-bg3" />
    <SvgIcon name="home-bg4" class="home-bg4" />
    <SvgIcon name="home-bg5" class="home-bg5" />
    <SvgIcon name="home-bg6" class="home-bg6" />
    <SvgIcon name="home-bg7" class="home-bg7" />
    <SvgIcon name="home-bg8" class="home-bg8" color="#280300" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100vh;
  padding-top: 16px;
  box-sizing: border-box;

  .home-bg1,
  .home-bg2,
  .home-bg3,
  .home-bg4,
  .home-bg5,
  .home-bg6,
  .home-bg7,
  .home-bg8 {
    position: absolute;
  }

  .home-bg1 {
    top: 74px;
    left: 0;
    width: 183.24px;
    height: 37.05px;
  }

  .home-bg2 {
    top: 167px;
    right: 0;
    width: 250px;
    height: 50px;
  }

  .home-bg3 {
    top: 265px;
    left: 0;
    width: 183px;
    height: 37px;
  }

  .home-bg4 {
    top: 366px;
    right: 0;
    width: 215px;
    height: 38px;
  }

  .home-bg5 {
    top: 488px;
    left: 0;
    width: 215px;
    height: 38px;
  }

  .home-bg6 {
    top: 577px;
    right: 0;
    width: 183px;
    height: 37px;
  }

  .home-bg7 {
    top: 604px;
    right: 0;
    width: 253px;
    height: 49px;
  }

  .home-bg8 {
    bottom: 0;
    width: 100%;
    height: 125px;
  }
}
</style>
