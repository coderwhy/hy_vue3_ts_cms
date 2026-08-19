import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface HYInstanceInterceptors<T = AxiosResponse, D = unknown> {
  requestInterceptor?: (config: AxiosRequestConfig<D>) => AxiosRequestConfig<D>
  requestInterceptorCatch?: (err: unknown) => unknown
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: unknown) => unknown
}

interface HYRequestConfig<T = AxiosResponse, D = unknown> extends AxiosRequestConfig<D> {
  interceptors?: HYInstanceInterceptors<T, D>
}

class HYRequest {
  instance: AxiosInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // 全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    // 实例的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )
  }

  async request<T = unknown, D = unknown>(config: HYRequestConfig<T, D>): Promise<T> {
    let requestConfig = config

    if (requestConfig.interceptors?.requestInterceptor) {
      requestConfig = requestConfig.interceptors.requestInterceptor(requestConfig)
    }

    try {
      let response = (await this.instance.request<unknown, T, D>(requestConfig)) as T
      if (requestConfig.interceptors?.responseInterceptor) {
        response = requestConfig.interceptors.responseInterceptor(response)
      }
      return response
    } catch (error: unknown) {
      if (requestConfig.interceptors?.responseInterceptorCatch) {
        throw await requestConfig.interceptors.responseInterceptorCatch(error)
      }
      throw error
    }
  }

  get<T = unknown, D = unknown>(config: HYRequestConfig<T, D>) {
    return this.request<T, D>({ ...config, method: 'GET' })
  }

  post<T = unknown, D = unknown>(config: HYRequestConfig<T, D>) {
    return this.request<T, D>({ ...config, method: 'POST' })
  }

  delete<T = unknown, D = unknown>(config: HYRequestConfig<T, D>) {
    return this.request<T, D>({ ...config, method: 'DELETE' })
  }

  patch<T = unknown, D = unknown>(config: HYRequestConfig<T, D>) {
    return this.request<T, D>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
