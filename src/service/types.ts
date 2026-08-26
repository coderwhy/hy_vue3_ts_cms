import type { AxiosRequestConfig } from 'axios'

export interface IApiResponse<T> {
  code: number
  data: T
}

export interface IPaginatedData<T> {
  list: T[]
  totalCount: number
}

export type IRequestOptions = Pick<AxiosRequestConfig, 'signal'>
