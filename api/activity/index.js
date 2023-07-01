import config from '@/config'
import request from '@/api/req'

const prefixUrl = config.apiUrl + 'api/v1/activity/'

export default {
  async offlineList (data) {
    return await request({
      url: prefixUrl + 'list/offline',
      method: 'GET',
      data: data,
    })
  }
}
