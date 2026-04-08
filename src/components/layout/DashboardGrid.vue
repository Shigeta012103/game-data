<script setup lang="ts">
</script>

<template>
  <main class="dashboard-grid">
    <slot />
  </main>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
