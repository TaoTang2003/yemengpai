import api from '@/api'

export default {
  namespaced: true,
  state: {
    token: '',
    currentUser: {},

    users: {},
    tags: [],
  },
  mutations: {
    clearInfo(state) {
      state.users = {}
    },
    setInfo (state, data) {
      for (const user of data.users) {
        for (const tag of user.tags) {
          if (!state.users[tag]) {
            state.users[tag] = []
          }

          let exists = false
          state.users[tag].map((item) => {
            if (item.id === user.id) {
              exists = true
              return user
            }
            return item
          })
          if (exists) {
            continue
          }
          state.users[tag].push(user)
        }
        state.users[user.id] = user
      }
    },
    setCurrentInfo (state, info) {
      state.currentUser = info
    },
    setTags (state, tags) {
      state.tags = tags
    },
    setToken (state, token) {
      state.token = token
    },
  },
  actions: {
    async fetchInfo (ctx, data) {
      ctx.commit('setInfo', (await api.user.list(data)).data)
    },
    async fetchCurrentInfo (ctx) {
      ctx.commit('setCurrentInfo', (await api.user.detail({ id: '0' })).data)
    },
    async fetchTags (ctx) {
      ctx.commit('setTags', (await api.user.tags()).data.tags)
    },
    async loginWx (ctx, data) {
      const resp = await api.user.loginWx(data)
      ctx.commit('setToken', resp.data.token)
    },
  },
}
