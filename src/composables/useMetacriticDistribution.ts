import { computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { RawgGame } from '../types/rawg'
import type { BoxPlotEntry } from '../types/chart'
import { fiveNumberSummary } from '../utils/aggregation'

const DEFAULT_MIN_SAMPLE_SIZE = 10
const MEDIAN_INDEX = 2

interface MetacriticDistributionResult {
  boxPlotEntries: ComputedRef<BoxPlotEntry[]>
  genres: ComputedRef<string[]>
}

function groupScoresByGenre(games: RawgGame[]): Map<string, number[]> {
  const genreScores = new Map<string, number[]>()

  for (const game of games) {
    if (game.metacritic === null || !game.genres) continue

    for (const genreRef of game.genres) {
      const scores = genreScores.get(genreRef.name) ?? []
      scores.push(game.metacritic)
      genreScores.set(genreRef.name, scores)
    }
  }

  return genreScores
}

export function useMetacriticDistribution(
  metacriticGames: Ref<RawgGame[]>,
  minSampleSize: number = DEFAULT_MIN_SAMPLE_SIZE,
): MetacriticDistributionResult {
  const boxPlotEntries = computed<BoxPlotEntry[]>(() => {
    const genreScores = groupScoresByGenre(metacriticGames.value)

    const entries: BoxPlotEntry[] = []
    for (const [genre, scores] of genreScores) {
      if (scores.length < minSampleSize) continue

      entries.push({
        genre,
        summary: fiveNumberSummary(scores),
      })
    }

    entries.sort((a, b) => b.summary[MEDIAN_INDEX] - a.summary[MEDIAN_INDEX])
    return entries
  })

  const genres = computed<string[]>(() =>
    boxPlotEntries.value.map((entry) => entry.genre),
  )

  return { boxPlotEntries, genres }
}
