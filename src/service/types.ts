export interface IApiResponse<T> {
  code: number
  data: T
}

export interface IPaginatedData<T> {
  list: T[]
  totalCount: number
}
