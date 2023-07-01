import config from '@/config'
import request from '@/api/req'

const prefixUrl = config.apiUrl + 'api/v1/dynamic/'

export default {
  async list (data) {
    return await request({
      url: prefixUrl + 'list',
      method: 'GET',
      data: data,
    })
  },
  async detail (data) {
    return await request({
      url: prefixUrl + 'detail/' + data.id,
      method: 'GET',
      data: data,
    })
  },
  async create (data) {
    return await request({
      url: prefixUrl + 'create',
      method: 'POST',
      data: data,
    })
  },
  async read (data) {
    return await request({
      url: prefixUrl + 'read/' + data.id,
      method: 'POST',
    })
  },
  async edit (data) {
    return await request({
      url: prefixUrl + 'edit/' + data.id,
      method: 'POST',
      data: delete data.id && data,
    })
  },
  async del (data) {
    return await request({
      url: prefixUrl + 'delete/' + data.id,
      method: 'DELETE',
    })
  },
  async like (data) {
    return await request({
      url: prefixUrl + 'like/' + data.id,
      method: 'POST',
    })
  },
  async unlike (data) {
    return await request({
      url: prefixUrl + 'unlike/' + data.id,
      method: 'POST',
    })
  },
  async comment (data) {
    return await request({
      url: prefixUrl + 'comment/' + data.id,
      method: 'POST',
      data: delete data.id && data,
    })
  },
}
