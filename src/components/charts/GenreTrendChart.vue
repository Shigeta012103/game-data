<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type {
  TooltipComponentOption,
  LegendComponentOption,
  GridComponentOption,
} from 'echarts/components'
import type { GenreSeries } from '../../types/chart'

type ChartOption = ComposeOption<
  | LineSeriesOption
  | TooltipComponentOption
  | LegendComponentOption
  | GridComponentOption
>

const props = defineProps<{
  series: GenreSeries[]
  years: number[]
}>()

const AREA_OPACITY = 0.4

const chartOption = computed<ChartOption>(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(30, 31, 42, 0.95)',
    borderColor: '#2e303a',
    textStyle: { color: '#f3f4f6', fontSize: 13 },
  },
  legend: {
    type: 'scroll',
    top: 0,
    textStyle: { color: '#9ca3af' },
    pageTextStyle: { color: '#9ca3af' },
    pageIconColor: '#9ca3af',
    pageIconInactiveColor: '#4b5563',
  },
  grid: {
    left: 48,
    right: 16,
    top: 40,
    bottom: 24,
    containLabel: false,
  },
  xAxis: {
    type: 'category',
    data: props.years.map(String),
    axisLabel: { color: '#9ca3af' },
    axisLine: { lineStyle: { color: '#2e303a' } },
  },
  yAxis: {
    type: 'value',
    name: 'ゲーム数',
    nameTextStyle: { color: '#9ca3af' },
    axisLabel: { color: '#9ca3af' },
    splitLine: { lineStyle: { color: '#2e303a' } },
  },
  series: props.series.map(
    (s): LineSeriesOption => ({
      name: s.genre,
      type: 'line',
      stack: 'genre',
      areaStyle: { opacity: AREA_OPACITY },
      emphasis: { focus: 'series' },
      data: s.counts,
      smooth: true,
    }),
  ),
}))
</script>

<template>
  <VChart
    :option="chartOption"
    autoresize
    class="genre-trend-chart"
    aria-label="ジャンル別ゲーム数の推移チャート"
  />
</template>

<style scoped>
.genre-trend-chart {
  width: 100%;
  min-height: 320px;
  flex: 1;
}
</style>
