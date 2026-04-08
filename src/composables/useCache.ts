import { CACHE_TTL_MS, CACHE_KEY_PREFIX } from '../api/constants'

interface CacheEntry<T> {
  timestamp: number
  payload: T
}

export function useCache<T>(ttlMs = CACHE_TTL_MS) {
  function buildKey(key: string): string {
    return `${CACHE_KEY_PREFIX}:${key}`
  }

  function get(key: string): T | null {
    const raw = localStorage.getItem(buildKey(key))
    if (!raw) return null

    try {
      const entry = JSON.parse(raw) as CacheEntry<T>
      if (Date.now() - entry.timestamp > ttlMs) {
        localStorage.removeItem(buildKey(key))
        return null
      }
      return entry.payload
    } catch {
      localStorage.removeItem(buildKey(key))
      return null
    }
  }

  function set(key: string, payload: T): void {
    const entry: CacheEntry<T> = { timestamp: Date.now(), payload }
    try {
      localStorage.setItem(buildKey(key), JSON.stringify(entry))
    } catch {
      // localStorage quota exceeded — continue without caching
    }
  }

  function has(key: string): boolean {
    return get(key) !== null
  }

  return { get, set, has }
}
