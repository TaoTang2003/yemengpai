<template>
  <dynamic-post :post="post" detailed></dynamic-post>
</template>

<script>
import DynamicPost from '@/components/yemengpai/dynamic-post/dynamic-post.vue'
import store from '@/store'

export default {
  data () {
    return {}
  },
  components: {
    DynamicPost,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    post () {
      return store.state.dynamic.posts.find(post => post.id === this.id)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
