<template>
  <scroll-view @scrolltolower="loadMore()">
    <dynamic-post :on-tap="() => onPostClick(post)"
                  v-for="(post, index) in posts"
                  :key="index"
                  :post="post"/>
  </scroll-view>
  <tui-nomore v-if="!isLoading" background-color="#141414"></tui-nomore>
</template>

<script>
import TuiNomore from '@/components/thorui/tui-nomore/tui-nomore.vue'
import DynamicPost from '@/components/yemengpai/dynamic-post/dynamic-post.vue'
import store from '@/store'

export default {
  components: {
    TuiNomore,
    DynamicPost,
  },
  data () {
    return {
      limit: 10,
      isLoading: true
    }
  },
  methods: {
    onPostClick (post) {
      uni.navigateTo({
        url: `/pages/dynamic/detail?id=${post.id}`,
      })
    },
    loadMore () {
      if (this.isLoading) {
        return
      }

      this.isLoading = true
      ;(async () => {
        try {
          await store.dispatch('dynamic/fetchPosts', {
            limit: this.limit,
            minId: this.posts.length > 0 ? this.posts[this.posts.length - 1].id : '0',
          })
        } finally {
          this.isLoading = false
        }
      })()
    }
  },
  computed: {
    posts () {
      return store.state.dynamic.posts
    },
  },
  onPullDownRefresh() {
    this.isLoading = true
    ;(async () => {
      try {
        await store.dispatch('dynamic/refreshPosts')
      } finally {
        uni.stopPullDownRefresh()
        this.isLoading = false
      }
    })()
  },
  onLoad() {
    this.isLoading = true
    ;(async () => {
      try {
        if (this.posts.length === 0) {
          uni.showLoading({
            title: '加载中',
            mask: true,
          })
        }
        await store.dispatch('dynamic/refreshPosts')
      } finally {
        uni.hideLoading()
        this.isLoading = false
      }
    })()
  }
}
</script>

<style scoped lang="scss">
</style>
