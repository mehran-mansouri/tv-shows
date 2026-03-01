<template>
  <div class="error-container">
    <img :src="ErrorIcon" class="error-icon" alt="error-icon" />
    <h2>We can’t reach this page</h2>
    <p>Try reloading or go back to where you came from</p>
  </div>
</template>

<script setup lang="ts">
import ErrorIcon from '@/assets/error.svg';

defineOptions({
  name: 'ErrorComponent',
});
</script>

<style scoped lang="scss">
.error {
  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &-icon {
    width: 320px;
  }
}
</style>
