<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  startYear: number
  endYear: number
  minYear: number
  maxYear: number
}>()

const emit = defineEmits<{
  'update:startYear': [year: number]
  'update:endYear': [year: number]
}>()

const startYearOptions = computed<number[]>(() => {
  const options: number[] = []
  for (let year = props.minYear; year <= props.maxYear; year++) {
    options.push(year)
  }
  return options
})

const endYearOptions = computed<number[]>(() => {
  const options: number[] = []
  for (let year = props.startYear; year <= props.maxYear; year++) {
    options.push(year)
  }
  return options
})

function handleStartYearChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  const selectedYear = parseInt(target.value, 10)
  emit('update:startYear', selectedYear)

  if (selectedYear > props.endYear) {
    emit('update:endYear', selectedYear)
  }
}

function handleEndYearChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  emit('update:endYear', parseInt(target.value, 10))
}
</script>

<template>
  <div class="date-range-selector">
    <div class="select-group">
      <label for="start-year-select" class="select-label">開始年</label>
      <select
        id="start-year-select"
        :value="props.startYear"
        class="year-select"
        @change="handleStartYearChange"
      >
        <option
          v-for="year in startYearOptions"
          :key="year"
          :value="year"
        >
          {{ year }}
        </option>
      </select>
    </div>

    <span class="range-separator" aria-hidden="true">-</span>

    <div class="select-group">
      <label for="end-year-select" class="select-label">終了年</label>
      <select
        id="end-year-select"
        :value="props.endYear"
        class="year-select"
        @change="handleEndYearChange"
      >
        <option
          v-for="year in endYearOptions"
          :key="year"
          :value="year"
        >
          {{ year }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.date-range-selector {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.select-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.year-select {
  appearance: none;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.375rem 2rem 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-family: var(--sans);
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M3 5l3 3 3-3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
}

.year-select:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.year-select:hover {
  border-color: var(--accent);
}

.range-separator {
  color: var(--text-secondary);
  padding-bottom: 0.375rem;
  font-size: 0.875rem;
}
</style>
