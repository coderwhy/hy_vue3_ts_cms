/// <reference types="vite/client" />

// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const component: DefineComponent
//   export default component
// }

declare module '*.mjs'

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_TIME_OUT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
