const configuredBaseUrl = import.meta.env.VITE_BASE_URL?.trim()
const configuredTimeout = Number(import.meta.env.VITE_TIME_OUT)

export const BASE_URL1 = configuredBaseUrl || 'http://123.207.32.32:5000'
export const TIME_OUT1 =
  Number.isFinite(configuredTimeout) && configuredTimeout > 0 ? configuredTimeout : 10000
