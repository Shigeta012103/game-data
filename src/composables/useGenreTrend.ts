import { computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { RawgGame } from '../types/rawg'
import type { GenreSeries } from '../types/chart'

interface GenreTrendResult {
  series: ComputedRef<GenreSeries[]>
  years: ComputedRef<number[]>
  genres: ComputedRef<string[]>
}

const DEFAULT_TOP_N = 8

export function useGenreTrend(
  games: Ref<RawgGame[]>,
  topN: number = DEFAULT_TOP_N,
): GenreTrendResult {
  const years = computed<number[]>(() => {
    const yearSet = new Set<number>()
    for (const game of games.value) {
      const year = extractYear(game)
      if (year !== null) {
        yearSet.add(year)
      }
    }
    return [...yearSet].sort((a, b) => a - b)
  })

  const series = computed<GenreSeries[]>(() => {
    const yearList = years.value
    if (yearList.length === 0) return []

    const genreYearCounts = buildGenreYearCounts(games.value)
    const topGenres = selectTopGenres(genreYearCounts, topN)
    const yearIndexMap = buildYearIndexMap(yearList)

    return topGenres.map((genre) => ({
      genre,
      counts: buildCountsForGenre(
        genreYearCounts.get(genre)!,
        yearList,
        yearIndexMap,
      ),
    }))
  })

  const genres = computed<string[]>(() => series.value.map((s) => s.genre))

  return { series, years, genres }
}

function extractYear(game: RawgGame): number | null {
  if (!game.released || !game.genres || game.genres.length === 0) return null
  const year = parseInt(game.released.substring(0, 4), 10)
  return Number.isNaN(year) ? null : year
}

function buildGenreYearCounts(
  games: RawgGame[],
): Map<string, Map<number, number>> {
  const genreYearCounts = new Map<string, Map<number, number>>()

  for (const game of games) {
    const year = extractYear(game)
    if (year === null) continue

    for (const genreRef of game.genres!) {
      const yearCounts =
        genreYearCounts.get(genreRef.name) ?? new Map<number, number>()
      yearCounts.set(year, (yearCounts.get(year) ?? 0) + 1)
      genreYearCounts.set(genreRef.name, yearCounts)
    }
  }

  return genreYearCounts
}

function selectTopGenres(
  genreYearCounts: Map<string, Map<number, number>>,
  topN: number,
): string[] {
  const genreTotals: Array<{ genre: string; total: number }> = []

  for (const [genre, yearCounts] of genreYearCounts) {
    let total = 0
    for (const count of yearCounts.values()) {
      total += count
    }
    genreTotals.push({ genre, total })
  }

  genreTotals.sort((a, b) => b.total - a.total)
  return genreTotals.slice(0, topN).map((entry) => entry.genre)
}

function buildYearIndexMap(yearList: number[]): Map<number, number> {
  const indexMap = new Map<number, number>()
  for (let i = 0; i < yearList.length; i++) {
    indexMap.set(yearList[i], i)
  }
  return indexMap
}

function buildCountsForGenre(
  yearCounts: Map<number, number>,
  yearList: number[],
  yearIndexMap: Map<number, number>,
): number[] {
  const counts = new Array<number>(yearList.length).fill(0)
  for (const [year, count] of yearCounts) {
    const index = yearIndexMap.get(year)
    if (index !== undefined) {
      counts[index] = count
    }
  }
  return counts
}
