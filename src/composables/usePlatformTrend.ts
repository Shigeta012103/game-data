import { computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { RawgGame } from '../types/rawg'
import type { PlatformShareSeries } from '../types/chart'
import { PLATFORM_FAMILIES, PLATFORM_COLORS } from '../api/constants'
import { groupBy } from '../utils/aggregation'

interface PlatformTrendResult {
  series: ComputedRef<PlatformShareSeries[]>
  years: ComputedRef<number[]>
}

function extractYear(released: string): number {
  return parseInt(released.slice(0, 4), 10)
}

function hasReleasedAndPlatforms(game: RawgGame): boolean {
  return game.released !== null && game.platforms !== null
}

function getPlatformIds(game: RawgGame): number[] {
  if (!game.platforms) return []
  return game.platforms.map((platformRef) => platformRef.platform.id)
}

function belongsToFamily(platformIds: number[], familyIds: number[]): boolean {
  return platformIds.some((platformId) => familyIds.includes(platformId))
}

export function usePlatformTrend(games: Ref<RawgGame[]>): PlatformTrendResult {
  const years = computed<number[]>(() => {
    const validGames = games.value.filter(hasReleasedAndPlatforms)
    const yearSet = new Set(
      validGames.map((game) => extractYear(game.released!)),
    )
    return [...yearSet].sort((a, b) => a - b)
  })

  const series = computed<PlatformShareSeries[]>(() => {
    const validGames = games.value.filter(hasReleasedAndPlatforms)
    const gamesByYear = groupBy(validGames, (game) =>
      extractYear(game.released!).toString(),
    )
    const sortedYears = years.value

    return Object.entries(PLATFORM_FAMILIES).map(
      ([familyName, familyIds]) => {
        const counts = sortedYears.map((year) => {
          const yearGames = gamesByYear[year.toString()] ?? []
          return yearGames.filter((game) =>
            belongsToFamily(getPlatformIds(game), familyIds),
          ).length
        })

        return {
          platform: familyName,
          colorHex: PLATFORM_COLORS[familyName] ?? '#888888',
          counts,
        }
      },
    )
  })

  return { series, years }
}
