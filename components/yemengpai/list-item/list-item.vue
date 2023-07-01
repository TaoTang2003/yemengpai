<template>
  <view class="list-item" hover-class="list-item--hover" @tap="onTap">
    <view v-if="$slots.icon" class="list-item__icon">
      <slot name="icon"></slot>
    </view>
    <view v-if="$slots.title" class="list-item__title">
      <slot name="title"></slot>
    </view>
    <view v-if="$slots['right-text']" class="list-item__right-text">
      <slot name="right-text"></slot>
    </view>
    <view v-if="$slots['right-avatar']" class="list-item__right-avatar">
      <slot name="right-avatar"></slot>
    </view>
    <view class="list-item__right-arrow">&gt;</view>

    <button v-if="openType === 'contact'" open-type="contact" class="list-item__overlay"></button>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    onTap: {
      type: Function,
      default: () => {},
    },
    openType: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  font-size: 28rpx;
  padding: 32rpx 46rpx;
  position: relative;

  &--hover {
    background: #2b2b2b;
  }

  .list-item__icon {
    margin-right: 32rpx;

    &:deep(image) {
      display: block;
      width: 55rpx;
      height: 55rpx;
    }
  }

  .list-item__right-text {
    color: #999;
    margin-left: auto;

    & + .list-item__right-arrow {
      margin-left: 20rpx;
    }
  }

  .list-item__right-avatar {
    margin-left: auto;

    &:deep(image) {
      display: block;
      width: 100rpx;
      height: 100rpx;
      border-radius: 10%;
    }

    & + .list-item__right-arrow {
      margin-left: 20rpx;
    }
  }

  .list-item__right-arrow {
    color: #999;
    font-size: 34rpx;
    font-weight: bold;
    font-family: serif;
    margin-left: auto;
  }

  .list-item__overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    padding: 0;
    margin: 0;
  }
}
</style>
