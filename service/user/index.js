import api from '@/api'
import store from '@/store'

export default {
  editProfile (data) {
    uni.showModal({
      title: '提示',
      content: '是否保存修改？',
      success: (res) => {
        if (!res.confirm) {
          return
        }

        uni.showLoading({
          title: '保存中...',
          mask: true,
        })
        ;(async () => {
          let resp
          try {
            resp = await api.user.edit(data)
            if (resp.code === 200) {
              await store.dispatch('user/fetchCurrentInfo')
            }
          } finally {
            uni.hideLoading()

            if (resp.code === 200) {
              uni.showToast({
                title: '保存成功',
                icon: 'success',
              })
            } else {
              uni.showToast({
                title: data.msg,
                icon: 'error',
              })
            }
          }
        })()
      },
    })
  },
}
