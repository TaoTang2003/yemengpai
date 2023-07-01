import store from '@/store'
import base64 from '@/utils/base64/base64'

export default function request (options) {
  const header = {}
  if (store.state.user.token) {
    header['Authorization'] = `Basic ${base64.btoa(store.state.user.token)}`
  }

  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      header,
      dataType: 'json',
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
