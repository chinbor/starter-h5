<script setup lang="ts">
import { cardList } from './config/index'
</script>

<template>
  <div class="transfer-instructions">
    <zo-header title="" />
    <div class="transfer-instructions-bg">
      <SvgIcon class="transfer-instructions-bg-icon" name="transfer-instructions-bg" />
    </div>
    <div class="wrapper">
      <div class="cards">
        <div v-for="card, idx in cardList" :key="idx" class="card">
          <div class="title">
            {{ card.title }}
          </div>
          <div class="spilt-line" />
          <div class="content">
            {{ card.content }}
          </div>
        </div>
      </div>
      <div class="warning flex">
        <SvgIcon name="it-is-a-warning" class="warning-icon" />
        <div class="words">
          我们不支持任何形式的数字藏品转卖行为。请勿相信任何以高收益投资理财等名义开展的不实宣传，谨防欺诈风险。
        </div>
      </div>
      <div class="powered-by flex-center-horizontal">
        <SvgIcon name="super-chain-logo" class="super-icon" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.transfer-instructions-bg {
  margin-top: $nav-height;
  text-align: right;

  .transfer-instructions-bg-icon {
    width: 345px;
    height: 290px;
    text-align: right;
  }
}

.wrapper {
  padding: 0 16px;

  .cards {
    margin-top: -74px;

    .card {
      position: relative;
      z-index: 0;
      width: 100%;
      background-color: rgba(52, 52, 52, 0.5);
      border-radius: 12px;
      padding: 20px 14px;
      box-sizing: border-box;
      margin-top: 20px;

      .title {
        font-size: 20px;
        color: #FFFEFA;
      }

      .spilt-line {
        margin-top: 16px;
        width: 13px;
        height: 2px;
        background-color: rgba($color: #B2BBBE, $alpha: 0.4);
      }

      .content {
        margin-top: 15px;
        font-size: 15px;
        color: #B2BBBE;
        line-height: 22.5px;
        white-space: pre-line;
        // letter-spacing: 1.4px;
      }

      &:first-child {
        margin-top: 0;
      }
    }
  }

  .warning {
    margin-top: 20px;
    .warning-icon {
      width: 12px;
      height: 12px;
      margin-top: 2px;
    }

    .words {
      flex: 1 1;
      margin-left: 4px;
      color: #FAEB29;
      font-size: 12px;
      // line-height: 13px;
    }
  }

  .powered-by {
    height: 120px;

    .super-icon {
      width: 236px;
      height: 33px;
    }
  }

}
</style>
