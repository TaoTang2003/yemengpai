import config from '@/config'
import request from '@/api/req'

const prefixUrl = config.apiUrl + 'api/v1/dynamic/'

export default {
  async home () {
    return await request({
      url: prefixUrl + 'home',
      method: 'GET',
    })
  },
}
