<script setup lang="ts"></script>

<template>
  <div>default layout</div>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '../styles/tokens' as tokens;

.container {
  margin: 0 tokens.$spacing-100;

  & > * {
    margin: auto;
    max-width: 1980px;
  }
}
</style>
