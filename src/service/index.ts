import HYRequest from './request'
import { BASE_URL1, TIME_OUT1 } from './config'
import { localCache } from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL1,
  timeout: TIME_OUT1,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default hyRequest
