<template>
  <view :class="`member-card ${detailed ? 'member-card--detailed' : ''}`" @tap="onTap" hover-class="member-card--hover">
    <view class="member-card__header">
      <view class="member-card__left">
        <view class="member-card__avatar">
          <image src="@/static/images/product/1.jpg"></image>
        </view>
      </view>
      <view class="member-card__right">
        <view class="member-card__basic">
          <view>
            <view>
              <text class="member-card__name">姓名</text>
              <text class="member-card__address">地址</text>
            </view>
            <view>
              <text class="member-card__pos">职位</text>
            </view>
          </view>
        </view>
      </view>

      <view style="clear: both;"></view>
    </view>
    <view class="member-card__body">
      <view class="member-card__item">
        <view class="member-card__title">
          <text class="member-card__title-text">简介</text>
        </view>
        <view class="member-card__content">
          <text
              :class="`member-card__content-text ${detailed ? '' : 'member-card__content-text--undetailed' }`">
            简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
          </text>
        </view>
      </view>
      <view class="member-card__item">
        <view class="member-card__title">
          <text class="member-card__title-text">诉求</text>
        </view>
        <view class="member-card__content">
          <text
              :class="`member-card__content-text ${detailed ? '' : 'member-card__content-text--undetailed' }`">
            诉求
          </text>
        </view>
      </view>
      <view class="member-card__item">
        <view class="member-card__title">
          <text class="member-card__title-text">优势</text>
        </view>
        <view class="member-card__content">
          <text
              :class="`member-card__content-text ${detailed ? '' : 'member-card__content-text--undetailed' }`">
            优势
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    onTap: {
      type: Function,
      default: () => {},
    },
    detailed: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.member-card {
  padding: 20rpx;
  border-radius: 20rpx;
  background-color: #212121;

  &--detailed {
    padding: 46rpx;
    border-radius: 0;
  }

  &--hover {
    background: #2b2b2b;
  }

  .member-card__avatar {
    display: block;
    width: 100%;
    height: 100rpx;

    image {
      display: block;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }
  }

  .member-card__header {
    color: #fff;
    font-size: 26rpx;

    .member-card__left {
      float: left;
      margin-right: 20rpx;
    }

    .member-card__right {
      float: left;

      .member-card__name {
        font-weight: bold;
        margin-right: 30rpx;
      }

      .member-card__address {
        color: #999;
        font-size: 20rpx;
      }

      .member-card__pos {
        font-size: 24rpx;
      }

      .member-card__basic > view > view {
        margin-bottom: 8rpx;
      }

      .member-card__basic {
        height: 100rpx;
        display: flex;
        align-items: center;
      }
    }
  }

  .member-card__body {
    margin-top: 20rpx;

    .member-card__item {
      display: flex;
      margin-top: 10rpx;

      .member-card__title-text {
        font-size: 24rpx;
      }

      .member-card__content-text {
        font-size: 24rpx;
        color: #999;
        display: -webkit-box;
      }

      .member-card__content-text--undetailed {
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .member-card__title {
        display: flex;
        flex: 1;
      }

      .member-card__content {
        flex: 5;
      }

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
