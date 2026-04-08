<script setup lang="ts">
import VChart from 'vue-echarts'
import { computed } from 'vue'
import type { BoxPlotEntry } from '../../types/chart'

const METACRITIC_MIN_SCORE = 0
const METACRITIC_MAX_SCORE = 100
const MIN_INDEX = 0
const Q1_INDEX = 1
const MEDIAN_INDEX = 2
const Q3_INDEX = 3
const MAX_INDEX = 4
const CHART_HEIGHT_PER_GENRE = 40
const CHART_MIN_HEIGHT = 300
const CHART_BOTTOM_PADDING = 60

const props = defineProps<{
  entries: BoxPlotEntry[]
}>()

const chartHeight = computed(() => {
  const calculated = props.entries.length * CHART_HEIGHT_PER_GENRE + CHART_BOTTOM_PADDING
  return Math.max(calculated, CHART_MIN_HEIGHT)
})

const genres = computed(() =>
  props.entries.map((entry) => entry.genre),
)

const boxPlotData = computed(() =>
  props.entries.map((entry) => entry.summary),
)

const chartOption = computed(() => ({
  tooltip: {
    trigger: 'item' as const,
    formatter(params: { dataIndex: number }) {
      const entry = props.entries[params.dataIndex]
      if (!entry) return ''

      const [min, q1, median, q3, max] = entry.summary
      return [
        `<strong>${entry.genre}</strong>`,
        `Min: ${min}`,
        `Q1: ${q1}`,
        `Median: ${median}`,
        `Q3: ${q3}`,
        `Max: ${max}`,
      ].join('<br>')
    },
  },
  grid: {
    left: '20%',
    right: '10%',
    top: '5%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'value' as const,
    min: METACRITIC_MIN_SCORE,
    max: METACRITIC_MAX_SCORE,
    name: 'Metacritic Score',
    nameTextStyle: { color: '#c9d1d9' },
    axisLabel: { color: '#8b949e' },
    splitLine: { lineStyle: { color: '#21262d' } },
  },
  yAxis: {
    type: 'category' as const,
    data: genres.value,
    axisLabel: { color: '#c9d1d9' },
  },
  series: [
    {
      type: 'boxplot',
      data: boxPlotData.value.map((summary) => [
        summary[MIN_INDEX],
        summary[Q1_INDEX],
        summary[MEDIAN_INDEX],
        summary[Q3_INDEX],
        summary[MAX_INDEX],
      ]),
      itemStyle: {
        color: '#1f6feb',
        borderColor: '#58a6ff',
      },
    },
  ],
}))
</script>

<template>
  <VChart
    :option="chartOption"
    :style="{ height: `${chartHeight}px`, width: '100%' }"
    autoresize
    aria-label="ジャンル別メタスコア分布の箱ひげ図"
  />
</template>
