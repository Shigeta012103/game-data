<script setup lang="ts">
defineProps<{
  progress: number
}>()
</script>

<template>
  <div class="loading-spinner" role="status" aria-live="polite">
    <div class="spinner" aria-hidden="true"></div>
    <p class="progress-text">{{ progress }}%</p>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color, #2e303a);
  border-top-color: var(--accent, #8b5cf6);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.progress-text {
  color: var(--text-secondary, #9ca3af);
  font-size: 0.875rem;
  font-family: var(--mono, monospace);
}
</style>
