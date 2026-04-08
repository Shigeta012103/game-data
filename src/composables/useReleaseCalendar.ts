import { computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { RawgGame } from '../types/rawg'
import type { HeatmapDataPoint } from '../types/chart'
import { extractYearMonth } from '../utils/date'

interface ReleaseCalendarResult {
  heatmapData: ComputedRef<HeatmapDataPoint[]>
  maxCount: ComputedRef<number>
}

export function useReleaseCalendar(
  games: Ref<RawgGame[]>,
  selectedYear: Ref<number>,
): ReleaseCalendarResult {
  const heatmapData = computed<HeatmapDataPoint[]>(() => {
    const countMap = new Map<string, number>()

    for (const game of games.value) {
      if (!game.released) continue

      const { year } = extractYearMonth(game.released)
      if (year !== selectedYear.value) continue

      const current = countMap.get(game.released) ?? 0
      countMap.set(game.released, current + 1)
    }

    return Array.from(countMap.entries()).map(
      ([dateString, count]): HeatmapDataPoint => [dateString, count],
    )
  })

  const maxCount = computed<number>(() => {
    if (heatmapData.value.length === 0) return 0

    return Math.max(...heatmapData.value.map(([, count]) => count))
  })

  return { heatmapData, maxCount }
}
