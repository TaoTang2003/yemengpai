<template>
  <view class="dynamic" @tap="onTap">
    <view class="dynamic-header" @tap="onHeaderTap">
      <view class="dynamic-header__avatar">
        <image :src="post.authorInfo.avatar"></image>
      </view>
      <view class="dynamic-header__basic">
        <view class="dynamic-header__basic__first-text">{{ post.authorInfo.name }}</view>
        <view class="dynamic-header__basic__second-text">{{ publishedAt }}</view>
      </view>
    </view>
    <view class="dynamic-body">
      <view class="dynamic-body__text-container">
        <view class="dynamic-body__text-container__text">{{ post.text }}</view>
      </view>
      <view class="dynamic-body__resource-container">
        <template v-for="(resource, index) in post.resources" :key="index">
          <image mode="widthFix" v-if="resource.type === 'image'" :src="resource.src"
                 @tap.stop="imagePreview(resource.src)"></image>
        </template>
      </view>
    </view>
    <view class="dynamic-footer">
      <view class="dynamic-footer__text">浏览{{ post.readCount }}次</view>
      <view class="dynamic-footer__control-panel">
        <image src="@/static/icons/thumb_up_FILL0_wght400_GRAD0_opsz48.png"></image>
        <image src="@/static/icons/chat_bubble_FILL0_wght400_GRAD0_opsz48.png"></image>
      </view>
      <view style="clear: both;"></view>
    </view>
    <view class="dynamic-comment">
      <view class="dynamic-comment__likes" v-if="post.likes.length > 0">
        <image class="dynamic-comment__likes__icon"
               src="@/static/icons/thumb_up_FILL1_wght400_GRAD0_opsz48.png"></image>
        <view class="dynamic-comment__likes__text-container">
          <view class="dynamic-comment__likes__text-container__text">
            <template v-for="(like, index) in post.likes" :key="index">
              <template v-if="index !== post.likes.length - 1">
                {{ like }}、
              </template>
              <template v-else>
                {{ like }}
              </template>
            </template>
          </view>
        </view>
        <view style="clear: both;"></view>
      </view>
      <view class="dynamic-comment__comments" v-if="post.comments.length > 0">
        <view class="dynamic-comment__comments__comment" v-for="(comment, index) in post.comments" :key="index">
          <view class="dynamic-comment__comments__comment__name">{{ comment.name }}:</view>
          <view class="dynamic-comment__comments__comment__content">{{ comment.content }}</view>
        </view>
      </view>
      <view class="dynamic-comment__comment-input">
        <input type="text" placeholder="评论" disabled
               :style="{'margin-top': (post.comments.length > 0 || post.likes.length > 0) ? '20rpx' : '0' }"/>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    post: {
      type: Object,
      default: {},
    },
    detailed: {
      type: Boolean,
      default: false,
    },
    onTap: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    imagePreview (src) {
      uni.previewImage({
        urls: this.post.resources.filter(resource => resource.type === 'image').map(resource => resource.src),
        current: src,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
        },
      })
    },

    onHeaderTap () {
      uni.navigateTo({
        url: `/pages/explore/detail`,
      })
    },
  },
  computed: {
    publishedAt () {
      const date = new Date(this.post.publishedAt)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}.${month}.${day}`
    },
  },
}
</script>

<style lang="scss" scoped>
.dynamic {
  padding: 46rpx;
  background-color: #212121;

  .dynamic-header {
    display: flex;

    .dynamic-header__avatar {
      image {
        display: block;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
    }

    .dynamic-header__basic {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin-left: 20rpx;

      .dynamic-header__basic__second-text {
        color: #999;
        font-size: 24rpx;
      }

      .dynamic-header__basic__first-text {
        color: #fff;
        font-size: 28rpx;
        margin-bottom: 10rpx;
      }
    }
  }

  .dynamic-body {
    margin-top: 30rpx;

    .dynamic-body__text-container {
      margin-bottom: 10rpx;

      .dynamic-body__text-container__text {
        color: #fff;
        font-size: 28rpx;
      }
    }

    .dynamic-body__resource-container {
      width: 100%;
      display: flex;
      gap: 20rpx;
      flex-wrap: wrap;

      image {
        display: block;
        width: calc((100% - 20rpx * 2) / 3);

        &:only-child {
          width: 100%;
        }
      }
    }
  }

  .dynamic-footer {
    margin-top: 30rpx;

    .dynamic-footer__text {
      color: #999;
      font-size: 24rpx;
      float: left;
    }

    .dynamic-footer__control-panel {
      float: right;
      display: flex;
      gap: 50rpx;

      image {
        display: block;
        width: 50rpx;
        height: 50rpx;
      }
    }
  }

  .dynamic-comment {
    margin-top: 50rpx;

    .dynamic-comment__likes {
      .dynamic-comment__likes__icon {
        display: block;
        width: 30rpx;
        height: 30rpx;
        float: left;
        margin-right: 10rpx;
      }

      .dynamic-comment__likes__text-container {
        .dynamic-comment__likes__text-container__text {
          color: #fff;
          font-size: 24rpx;
        }
      }
    }

    .dynamic-comment__comments {
      .dynamic-comment__comments__comment {
        display: flex;
        font-size: 24rpx;
        color: #fff;

        .dynamic-comment__comments__comment__name {
          margin-right: 10rpx;
        }
      }
    }

    .dynamic-comment__comment-input {
      display: block;
      font-size: 24rpx;
      background: #2b2b2b;
      padding-left: 30rpx;
      color: #999;
      border-radius: 20rpx;
    }
  }
}
</style>
