<template>
  <view style="padding: 0 46rpx">
    <tui-searchbar backgroundColor="transparent" inputBgColor="#242424" padding="0" disabled radius="20rpx"
                   height="75rpx" placeholder="搜索"/>
  </view>
  <scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-into-view="scrollViewId"
               :style="{ height: height + 'px', top: top + 'px' }">
    <view :id="`id_${index}`" v-for="(item, index) in tags" :key="index" class="tab-bar-item"
          :class="[currentTab === index ? 'active' : '']" :data-current="index" @tap.stop="switchNav">
      <text>{{ item }}</text>
    </view>
  </scroll-view>
  <template v-for="(tag, index) in tags" :key="index">
    <scroll-view scroll-y class="right-box" :style="{ height: height + 'px', top: top + 'px' }"
                 v-if="currentTab === index" @scrolltolower="">
      <view class="page-view">
        <view class="class-item">
          <template>
            <view>
              <view class="member-card-container" v-for="(item, index) in users[tag]" :key="index">
                <member-card @tap="onMemberCardClick"/>
              </view>
            </view>
          </template>
          <tui-nomore background-color="#141414"></tui-nomore>
        </view>
      </view>
    </scroll-view>
  </template>
</template>

<script>
import TuiNomore from '@/components/thorui/tui-nomore/tui-nomore.vue'
import TuiSearchbar from '@/components/thorui/tui-searchbar/tui-searchbar.vue'
import MemberCard from '@/components/yemengpai/member-card/member-card.vue'

import store from '@/store'

export default {
  data () {
    return {
      currentTab: 0,
      scrollViewId: 'id_0',
      loadingStatues: {},
    }
  },
  computed: {
    height () {
      return store.state.system.info.windowHeight - uni.upx2px(75) - uni.upx2px(32)
    },
    top () {
      return uni.upx2px(75) + uni.upx2px(32)
    },

    tags () {
      return store.state.user.tags
    },
    users () {
      return store.state.user.users
    },
  },
  components: {
    TuiNomore,
    TuiSearchbar,
    MemberCard,
  },
  methods: {
    switchNav: function (e) {
      let cur = e.currentTarget.dataset.current
      if (this.currentTab === cur) {
        return false
      }

      this.currentTab = cur
      this.checkCor()
    },
    checkCor: function () {
      if (this.currentTab > 6) {
        this.scrollViewId = `id_${this.currentTab - 2}`
      } else {
        this.scrollViewId = `id_0`
      }
    },

    onMemberCardClick () {
      uni.navigateTo({
        url: '/pages/explore/detail',
      })
    },

    isLoading(tag) {
    },
  },
  onLoad () {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
    ;(async () => {
      if (store.state.user.tags.length === 0) {
        await store.dispatch('user/fetchTags')
      } else {
        await store.dispatch('user/fetchTags')
        if (this.currentTab > this.tags.length - 1) {
          this.currentTab = this.tags.length - 1
        }
      }

      store.commit('user/clearInfo')
      await store.dispatch('user/fetchInfo', {
        'category': this.tags[this.currentTab],
      })

      uni.hideLoading()
    })()
  },
}
</script>

<style lang="scss" scoped>
:deep(.tui-loadmore-none) {
  margin-bottom: 0 !important;
}

.member-card-container {
  margin-bottom: 4%;

  &:last-child {
    margin-bottom: 0;
  }
}

.tab-view {
  width: 200rpx;
  position: fixed;
  left: 0;
  z-index: 10;
}

.tab-bar-item {
  width: 200rpx;
  height: 110rpx;
  background: #212121;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  color: #fff;
  font-weight: 400;
  padding: 0 15rpx;
  text-align: center;
}

.active {
  position: relative;
  background: #141414;
}

.active::before {
  content: '';
  position: absolute;
  border-left: 8rpx solid #443CAC;
  height: 30rpx;
  left: 0;
}

.right-box {
  width: 100%;
  position: fixed;
  padding-left: 223rpx;
  box-sizing: border-box;
  left: 0;
}

.page-view {
  width: 100%;
  overflow: hidden;
  padding-right: 23rpx;
  box-sizing: border-box;
}

.class-item {
  width: 100%;
  box-sizing: border-box;
}

</style>
