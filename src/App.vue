<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useGamesQuery } from './composables/useGamesQuery'
import { usePlatformTrend } from './composables/usePlatformTrend'
import { useGenreTrend } from './composables/useGenreTrend'
import { useReleaseCalendar } from './composables/useReleaseCalendar'
import { useMetacriticDistribution } from './composables/useMetacriticDistribution'
import { DEFAULT_START_YEAR, DEFAULT_END_YEAR } from './api/constants'
import DashboardHeader from './components/layout/DashboardHeader.vue'
import DashboardGrid from './components/layout/DashboardGrid.vue'
import PlatformShareChart from './components/charts/PlatformShareChart.vue'
import GenreTrendChart from './components/charts/GenreTrendChart.vue'
import ReleaseCalendarChart from './components/charts/ReleaseCalendarChart.vue'
import MetacriticBoxPlot from './components/charts/MetacriticBoxPlot.vue'

const startYear = ref(DEFAULT_START_YEAR)
const endYear = ref(DEFAULT_END_YEAR)
const calendarYear = ref(DEFAULT_END_YEAR)

const {
  games, metacriticGames, isLoading, error, progress, fetchYearRange,
} = useGamesQuery()

const { series: platformSeries, years: platformYears } = usePlatformTrend(games)
const { series: genreSeries, years: genreYears } = useGenreTrend(games)
const { heatmapData, maxCount } = useReleaseCalendar(games, calendarYear)
const { boxPlotEntries } = useMetacriticDistribution(metacriticGames)

function handleStartYearUpdate(year: number): void {
  startYear.value = year
}

function handleEndYearUpdate(year: number): void {
  endYear.value = year
  calendarYear.value = year
}

watch([startYear, endYear], ([newStart, newEnd]) => {
  fetchYearRange(newStart, newEnd)
})

onMounted(() => {
  fetchYearRange(startYear.value, endYear.value)
})
</script>

<template>
  <div class="dashboard">
    <DashboardHeader
      :is-loading="isLoading"
      :error="error"
      :progress="progress"
      :start-year="startYear"
      :end-year="endYear"
      @update:start-year="handleStartYearUpdate"
      @update:end-year="handleEndYearUpdate"
    />
    <DashboardGrid>
      <div class="chart-card">
        <h2>プラットフォーム勢力図</h2>
        <PlatformShareChart
          v-if="!isLoading && platformSeries.length > 0"
          :series="platformSeries"
          :years="platformYears"
        />
      </div>
      <div class="chart-card">
        <h2>ジャンルの盛衰</h2>
        <GenreTrendChart
          v-if="!isLoading && genreSeries.length > 0"
          :series="genreSeries"
          :years="genreYears"
        />
      </div>
      <div class="chart-card">
        <h2>月別リリースカレンダー ({{ calendarYear }})</h2>
        <ReleaseCalendarChart
          v-if="!isLoading && heatmapData.length > 0"
          :heatmap-data="heatmapData"
          :year="calendarYear"
          :max-count="maxCount"
        />
      </div>
      <div class="chart-card">
        <h2>メタスコア分布</h2>
        <MetacriticBoxPlot
          v-if="!isLoading && boxPlotEntries.length > 0"
          :entries="boxPlotEntries"
        />
      </div>
    </DashboardGrid>
  </div>
</template>
