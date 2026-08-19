export type PageFormValue = string | number | boolean | string[] | null | undefined

export type PageFormData = Record<string, PageFormValue>

export interface ISelectOption {
  id: number | string
  name: string
}

export type FormItemType = 'input' | 'password' | 'date-picker' | 'select' | 'custom'

export interface IFormItem {
  label: string
  prop: string
  type: FormItemType
  placeholder?: string
  initialValue?: PageFormValue
  options?: ISelectOption[]
  slotName?: string
}

export interface IPageSearchConfig {
  pageName: string
  formItems: IFormItem[]
}

export type TableColumnType = 'normal' | 'time' | 'handler' | 'selection' | 'index'

export interface ITableColumn {
  type?: TableColumnType
  prop?: string
  label: string
  width?: string | number
  [key: string]: unknown
}

export interface IPageContentConfig {
  pageName: string
  header?: {
    title: string
    btnTitle: string
  }
  propsList: ITableColumn[]
  childrenProps?: Record<string, unknown>
}

export interface IPageModalConfig {
  pageName: string
  title: string
  formItems: IFormItem[]
}

export type PageRecord = Record<string, unknown>
