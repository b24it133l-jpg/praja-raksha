interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class SystemCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private readonly TTL = 1000 * 60 * 5; // 5 minutes

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const systemCache = new SystemCache();
