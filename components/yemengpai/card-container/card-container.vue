<template>
  <view class="card-container" :style="{ 'margin-top': marginTop }">
    <view class="card-container__inner" :style="{ padding: innerPadding }">
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      marginTop: {
        type: String,
        default: '0'
      },
      innerPadding: {
        type: String,
        default: '32rpx'
      }
    }
  }
</script>

<style scoped>
  .card-container {
    padding: 0 46rpx;
  }

  .card-container__inner {
    border-radius: 20rpx;
    background-color: #212121;
  }
</style>
