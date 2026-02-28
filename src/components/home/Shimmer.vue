<template>
  <div class="shimmer-carousel" v-for="i in 3" :key="i">
    <Skeleton width="100px" height="50px" />
    <div class="shimmer-container">
      <Skeleton v-for="j in 5" :key="j" width="200px" height="300px" class="shimmer-item" />
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

defineOptions({
  name: 'ShimmerComponent',
})
</script>

<style scoped lang="scss">
@use '@/styles/tokens' as tokens;

.shimmer {
  &-carousel {
    margin-top: tokens.$font-size-100;
  }

  &-container {
    display: flex;
    padding-left: tokens.$spacing-200;
    margin-top: tokens.$spacing-100;
    gap: tokens.$spacing-400;
    justify-content: space-evenly;
  }

  &-item {
    flex-shrink: 0;
  }
}
</style>
