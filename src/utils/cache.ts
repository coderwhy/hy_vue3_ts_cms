enum CacheType {
  local = 'local',
  session = 'session'
}

class HYCache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.local ? localStorage : sessionStorage
  }

  setCache<T>(key: string, value: T) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  getCache<T>(key: string): T | undefined {
    const value = this.storage.getItem(key)
    if (!value) return undefined

    try {
      return JSON.parse(value) as T
    } catch {
      this.deleteCache(key)
      return undefined
    }
  }

  deleteCache(key: string) {
    this.storage.removeItem(key)
  }

  clearCache() {
    this.storage.clear()
  }
}

const localCache = new HYCache(CacheType.local)
const sessionCache = new HYCache(CacheType.session)

export { localCache, sessionCache }
