<script>
import store from '@/store'
import utils from '@/utils'

export default {
  onLaunch () {
    setTimeout(() => {
      (async () => {
        while (true) {
          await store.dispatch('system/fetchInfo')
          await utils.timer.sleep(1)
        }
      })()
    }, 0)

    if (!store.state.user.token) {
      uni.showLoading({
        title: '登录中...',
        mask: true,
      })
      wx.login({
        success (res) {
          (async () => {
            try {
              await store.dispatch('user/loginWx', {code: res.code})
              await store.dispatch('user/fetchCurrentInfo')
              uni.hideLoading()
            } catch {
              await wx.exitMiniProgram({})
            }
          })()
        },
        fail () {
          wx.exitMiniProgram({})
        },
      })
    } else {
      store.dispatch('user/fetchCurrentInfo')
    }
  },
}
</script>

<style>
page {
  background-color: #141414;
}

text {
  color: #fff;
}
</style>
