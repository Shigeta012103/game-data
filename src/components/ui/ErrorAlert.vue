<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="error-alert" role="alert">
    <span class="error-icon" aria-hidden="true">!</span>
    <p class="error-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.error-alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border: 1px solid #991b1b;
  border-radius: 8px;
  background: rgba(153, 27, 27, 0.15);
  color: #fca5a5;
}

.error-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #991b1b;
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.error-message {
  font-size: 0.875rem;
  line-height: 1.4;
}
</style>
