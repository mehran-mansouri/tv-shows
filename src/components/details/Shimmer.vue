<template>
  <div>
    <div class="overview">
      <div>
        <Skeleton width="200px" height="250px" class="image-mobile" />
        <Skeleton width="14vw" height="250px" class="image-desktop" />
      </div>
      <div class="show-info">
        <Skeleton width="140px" height="30px" />
        <Skeleton width="50px" height="30px" />
        <Skeleton width="100px" height="30px" />
        <Skeleton width="500px" height="100px" />
      </div>
    </div>
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

.overview {
  display: flex;

  @media only screen and (max-width: tokens.$breakpoint-sm) {
    flex-wrap: wrap;
  }
}

.show-info {
  padding: tokens.$spacing-100;

  & > * {
    margin-bottom: tokens.$spacing-100;
  }

  @media only screen and (max-width: tokens.$breakpoint-sm) {
    padding: tokens.$spacing-100 0;
  }
}

.image {
  &-mobile {
    @media only screen and (min-width: tokens.$breakpoint-sm) {
      display: none;
    }
  }

  &-desktop {
    @media only screen and (max-width: tokens.$breakpoint-sm) {
      display: none;
    }
  }
}
</style>
