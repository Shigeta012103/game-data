import { ref } from 'vue'
import type { RawgGame } from '../types/rawg'
import { fetchGamesByYear, fetchGamesWithMetacritic } from '../api/rawg'
import { useCache } from './useCache'

export function useGamesQuery() {
  const games = ref<RawgGame[]>([])
  const metacriticGames = ref<RawgGame[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const progress = ref(0)

  const cache = useCache<RawgGame[]>()

  async function fetchYearRange(
    startYear: number,
    endYear: number,
  ): Promise<void> {
    isLoading.value = true
    error.value = null
    progress.value = 0

    const allGames: RawgGame[] = []
    const allMetacriticGames: RawgGame[] = []
    const totalYears = endYear - startYear + 1

    try {
      for (let year = startYear; year <= endYear; year++) {
        const [yearGames, yearMetacritic] = await Promise.all([
          fetchCachedYear(year, 'games'),
          fetchCachedYear(year, 'metacritic'),
        ])
        allGames.push(...yearGames)
        allMetacriticGames.push(...yearMetacritic)
        progress.value = Math.round(
          ((year - startYear + 1) / totalYears) * 100,
        )
      }
      games.value = allGames
      metacriticGames.value = allMetacriticGames
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'データの取得に失敗しました'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCachedYear(
    year: number,
    type: 'games' | 'metacritic',
  ): Promise<RawgGame[]> {
    const cacheKey = `${type}:${year}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const fetcher =
      type === 'games' ? fetchGamesByYear : fetchGamesWithMetacritic
    const result = await fetcher(year)
    cache.set(cacheKey, result)
    return result
  }

  return {
    games,
    metacriticGames,
    isLoading,
    error,
    progress,
    fetchYearRange,
  }
}
