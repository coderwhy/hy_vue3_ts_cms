import axios from 'axios'
import HYRequest from './request'
import { BASE_URL1, TIME_OUT1 } from './config'
import router, { resetDynamicRoutes } from '@/router'
import { clearAuthCache } from '@/utils/auth'
import { localCache } from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL1,
  timeout: TIME_OUT1,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache<string>('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return Promise.reject(err)
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        clearAuthCache()
        resetDynamicRoutes()
        if (router.currentRoute.value.path !== '/login') {
          void router.push('/login')
        }
      }
      return Promise.reject(err)
    }
  }
})

export default hyRequest
