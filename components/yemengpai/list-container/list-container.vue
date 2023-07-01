<template>
  <view class="list-container" :style="extraStyle">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    extraStyle: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style scoped lang="scss">
.list-container {
  background: #212121;
  display: flex;
  flex-direction: column;
}
</style>
