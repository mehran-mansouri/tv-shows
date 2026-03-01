<script setup lang="ts">
import Chip from 'primevue/chip'
import ScreenReader from '@/components/screen-reader/ScreenReader.vue'

interface Props {
  tags: string[]
}

defineProps<Props>()
</script>

<template>
  <div>
    <ScreenReader>Genres</ScreenReader>
    <Chip v-for="tag in tags" :key="tag" :label="tag" class="tag" />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/tokens' as tokens;

.tag {
  margin: 0 tokens.$spacing-25;
}
</style>
