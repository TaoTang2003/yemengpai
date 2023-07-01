import api from '@/api'

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  mutations: {
    setPosts (state, posts) {
      state.posts = posts
    },
  },
  actions: {
    async fetchPosts (ctx, data) {
      const posts = (await api.dynamic.list(data)).data.posts
      ctx.commit('setPosts', [...ctx.state.posts, ...posts])
    },
    async refreshPosts (ctx) {
      const posts = (await api.dynamic.list({})).data.posts
      ctx.commit('setPosts', posts)
    },
  },
}
