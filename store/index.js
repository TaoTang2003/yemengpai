import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import system from '@/store/system'
import dynamic from '@/store/dynamic'
import user from '@/store/user'

const store = createStore({
  modules: {
    system,
    dynamic,
    user,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: k => wx.getStorageSync(k),
        setItem: (k, v) => wx.setStorageSync(k, v),
        removeItem: k => wx.removeStorageSync(k),
        clear: () => wx.clearStorageSync(),
      },
      key: 'store',
    })],
})
export default store
