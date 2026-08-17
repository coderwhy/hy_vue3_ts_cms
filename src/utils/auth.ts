import { localCache } from './cache'

const authCacheKeys = ['token', 'userInfo', 'userMenus', 'permissions', 'password'] as const

export function clearAuthCache() {
  for (const key of authCacheKeys) {
    localCache.deleteCache(key)
  }
}
