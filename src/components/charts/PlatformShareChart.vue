<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type {
  GridComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
} from 'echarts/components'
import type { PlatformShareSeries } from '../../types/chart'

type ChartOption = ComposeOption<
  | LineSeriesOption
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
>

const props = defineProps<{
  series: PlatformShareSeries[]
  years: number[]
}>()

const chartOption = computed<ChartOption>(() => ({
  backgroundColor: 'transparent',
  legend: {
    top: 0,
    textStyle: { color: '#f3f4f6' },
    data: props.series.map((s) => s.platform),
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: 40,
    right: 20,
    bottom: 20,
    left: 50,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: props.years.map(String),
    axisLabel: { color: '#9ca3af' },
    axisLine: { lineStyle: { color: '#2e303a' } },
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#9ca3af' },
    splitLine: { lineStyle: { color: '#2e303a' } },
  },
  series: props.series.map((s) => ({
    name: s.platform,
    type: 'line' as const,
    data: s.counts,
    smooth: true,
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: { color: s.colorHex, width: 2 },
    itemStyle: { color: s.colorHex },
  })),
}))
</script>

<template>
  <v-chart
    :option="chartOption"
    autoresize
    class="platform-chart"
    aria-label="プラットフォーム別ゲーム数の推移チャート"
  />
</template>

<style scoped>
.platform-chart {
  width: 100%;
  flex: 1;
  min-height: 280px;
}
</style>
