<script setup lang="ts">
import VChart from 'vue-echarts'
import { computed } from 'vue'
import type { HeatmapDataPoint } from '../../types/chart'

const CALENDAR_CELL_SIZE = 13
const CALENDAR_TOP_OFFSET = 60
const CALENDAR_LEFT_OFFSET = 50
const CALENDAR_RIGHT_OFFSET = 30
const CHART_HEIGHT = 210
const VISUAL_MAP_ITEM_WIDTH = 12
const VISUAL_MAP_ITEM_HEIGHT = 120
const DAY_LABEL_FONT_SIZE = 10
const MONTH_LABEL_FONT_SIZE = 11

const props = defineProps<{
  heatmapData: HeatmapDataPoint[]
  year: number
  maxCount: number
}>()

const chartOption = computed(() => ({
  tooltip: {
    formatter(params: { value: [string, number] }) {
      const [date, count] = params.value
      return `${date}: ${count} releases`
    },
  },
  visualMap: {
    min: 0,
    max: props.maxCount || 1,
    type: 'continuous' as const,
    orient: 'vertical' as const,
    left: 'right',
    top: 'center',
    inRange: {
      color: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    },
    textStyle: { color: '#c9d1d9' },
    itemWidth: VISUAL_MAP_ITEM_WIDTH,
    itemHeight: VISUAL_MAP_ITEM_HEIGHT,
  },
  calendar: {
    top: CALENDAR_TOP_OFFSET,
    left: CALENDAR_LEFT_OFFSET,
    right: CALENDAR_RIGHT_OFFSET,
    range: String(props.year),
    cellSize: CALENDAR_CELL_SIZE,
    splitLine: { show: false },
    itemStyle: {
      borderWidth: 2,
      borderColor: '#0d1117',
      color: '#161b22',
    },
    dayLabel: {
      color: '#8b949e',
      fontSize: DAY_LABEL_FONT_SIZE,
    },
    monthLabel: {
      color: '#c9d1d9',
      fontSize: MONTH_LABEL_FONT_SIZE,
    },
    yearLabel: {
      color: '#c9d1d9',
    },
  },
  series: [
    {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: props.heatmapData,
    },
  ],
}))
</script>

<template>
  <VChart
    :option="chartOption"
    :style="{ height: `${CHART_HEIGHT}px`, width: '100%' }"
    autoresize
    aria-label="月別リリースカレンダーヒートマップ"
  />
</template>
