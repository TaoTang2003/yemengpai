export default {
  namespaced: true,
  state: {
    info: {
      windowHeight: 0,
    },
  },
  mutations: {
    setInfo (state, systemInfo) {
      state.info.windowHeight = systemInfo.windowHeight
    },
  },
  actions: {
    fetchInfo (ctx) {
      return new Promise(resolve => {
        uni.getSystemInfo({
          success (res) {
            ctx.commit('setInfo', res)
            resolve(res)
          },
        })
      })
    },
  },
}
