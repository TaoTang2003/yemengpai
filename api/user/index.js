import config from '@/config'
import request from '@/api/req'

const prefixUrl = config.apiUrl + 'api/v1/user/'

export default {
  async loginWx (data) {
    return await request({
      url: prefixUrl + 'login/wx',
      method: 'POST',
      data: data,
    })
  },
  async tags () {
    return await request({
      url: prefixUrl + 'tags',
      method: 'GET',
    })
  },
  async detail (data) {
    return await request({
      url: prefixUrl + 'detail/' + data.id,
      method: 'GET',
    })
  },
  async edit (data) {
    return await request({
      url: prefixUrl + 'edit/' + data.id,
      method: 'POST',
      data: data,
    })
  },
  async list (data) {
    return await request({
      url: prefixUrl + 'list',
      method: 'GET',
      data: data,
    })
  },
  async upload (data) {
    return await request({
      url: prefixUrl + 'upload',
      method: 'POST',
      data: data,
    })
  },
}
