<script setup lang="ts">
import DateRangeSelector from '../ui/DateRangeSelector.vue'
import { MIN_YEAR } from '../../api/constants'

defineProps<{
  isLoading: boolean
  error: string | null
  progress: number
  startYear: number
  endYear: number
}>()

const emit = defineEmits<{
  'update:startYear': [year: number]
  'update:endYear': [year: number]
}>()

const CURRENT_YEAR = new Date().getFullYear()

function handleStartYearUpdate(year: number): void {
  emit('update:startYear', year)
}

function handleEndYearUpdate(year: number): void {
  emit('update:endYear', year)
}
</script>

<template>
  <header class="dashboard-header">
    <div class="header-top">
      <div class="header-title-area">
        <h1>Game Market Trends</h1>
        <p class="subtitle">
          RAWG API によるゲーム市場トレンドダッシュボード
        </p>
      </div>
      <DateRangeSelector
        :start-year="startYear"
        :end-year="endYear"
        :min-year="MIN_YEAR"
        :max-year="CURRENT_YEAR"
        @update:start-year="handleStartYearUpdate"
        @update:end-year="handleEndYearUpdate"
      />
    </div>

    <div
      v-if="isLoading"
      class="progress-bar-container"
      role="progressbar"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="データ読み込み中"
    >
      <div class="progress-bar-fill" :style="{ width: `${progress}%` }" />
      <span class="progress-text">{{ progress }}%</span>
    </div>

    <div v-if="error" class="error-banner" role="alert">
      {{ error }}
    </div>
  </header>
</template>

<style scoped>
.dashboard-header {
  margin-bottom: 2rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-title-area {
  display: flex;
  flex-direction: column;
}

.subtitle {
  color: var(--text-secondary);
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

.progress-bar-container {
  margin-top: 1rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  height: 24px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.progress-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-primary);
}

.error-banner {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #fca5a5;
  font-size: 0.875rem;
}
</style>
