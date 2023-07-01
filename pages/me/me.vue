<template>
  <view class="me-page">
    <view class="me-page__header">
      <view class="me-page__header__me" @tap="onHeaderMeClick" hover-class="me-page__header__me--hover">
        <view class="me-page__header__me__avatar">
          <image :src="`${config.resourceUrl}${currentUser.avatarUrl}`"></image>
        </view>
        <view class="me-page__header__me__info">
          <view class="me-page__header__me__info__name">{{ currentUser.nickname }}</view>
        </view>
        <view class="me-page__header__me__arrow-right">&gt;</view>
      </view>
      <view class="me-page__header__info">
        <view class="me-page__header__info__item" hover-class="me-page__header__info__item--hover">
          <view class="me-page__header__info__item__content">0</view>
          <view class="me-page__header__info__item__title">获赞</view>
        </view>
        <view class="me-page__header__info__item" hover-class="me-page__header__info__item--hover">
          <view class="me-page__header__info__item__content">0</view>
          <view class="me-page__header__info__item__title">发布</view>
        </view>
        <view class="me-page__header__info__item" hover-class="me-page__header__info__item--hover">
          <view class="me-page__header__info__item__content">0</view>
          <view class="me-page__header__info__item__title">评论</view>
        </view>
      </view>
    </view>
    <list-container :extra-style="{'margin-top': '32rpx'}">
      <list-item>
        <template #icon>
          <image src="../../static/icons/face_FILL0_wght400_GRAD0_opsz48.svg"></image>
        </template>
        <template #title>成为会员</template>
      </list-item>
    </list-container>
    <list-container :extra-style="{'margin-top': '32rpx'}">
      <list-item>
        <template #icon>
          <image src="../../static/icons/help_FILL0_wght400_GRAD0_opsz48.svg"></image>
        </template>
        <template #title>常见问题</template>
      </list-item>
      <list-item open-type="contact">
        <template #icon>
          <image src="../../static/icons/support_agent_FILL0_wght400_GRAD0_opsz48.svg"></image>
        </template>
        <template #title>联系客服</template>
      </list-item>
    </list-container>
    <list-container :extra-style="{'margin-top': '32rpx'}">
      <list-item>
        <template #icon>
          <image src="../../static/icons/description_FILL0_wght400_GRAD0_opsz48.svg"></image>
        </template>
        <template #title>平台协议及政策</template>
      </list-item>
    </list-container>
  </view>
</template>

<script>
import ListContainer from '@/components/yemengpai/list-container/list-container.vue'
import ListItem from '@/components/yemengpai/list-item/list-item.vue'
import store from '@/store'
import config from '@/config'

export default {
  components: {
    'list-container': ListContainer,
    'list-item': ListItem,
  },
  data () {
    return {}
  },
  computed: {
    config () {
      return config
    },
    currentUser () {
      return store.state.user.currentUser
    }
  },
  methods: {
    onHeaderMeClick () {
      uni.navigateTo({
        url: '/pages/me/profileEdit/profileEdit',
      })
    },
  },
}
</script>

<style scoped lang="scss">
.me-page {
  .me-page__header {
    background: #212121;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .me-page__header__me {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 50rpx 46rpx;

      &--hover {
        background: #2b2b2b;
      }

      .me-page__header__me__avatar {
        image {
          display: block;
          width: 110rpx;
          height: 110rpx;
          border-radius: 50%;
        }

        margin-right: 32rpx;
      }

      .me-page__header__me__info {
        color: #fff;

        .me-page__header__me__info__name {
          font-size: 42rpx;
        }
      }

      .me-page__header__me__arrow-right {
        color: #999;
        font-size: 34rpx;
        margin-left: auto;
        font-weight: bold;
        font-family: serif;
      }
    }

    .me-page__header__info {
      display: flex;

      .me-page__header__info__item {
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;

        color: #fff;
        font-size: 28rpx;

        padding: 50rpx 0;

        &--hover {
          background: #2b2b2b;
        }

        .me-page__header__info__item__title {
          margin-top: 10rpx;
          color: #999;
        }
      }
    }
  }
}
</style>
