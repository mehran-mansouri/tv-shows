<script setup lang="ts">
import Chip from "primevue/chip";
interface Props {
  tags: string[];
}

defineProps<Props>();
</script>

<template>
  <Chip v-for="tag in tags" :key="tag" :label="tag" class="tag" />
</template>

<style scoped lang="scss">
@use "@/styles/tokens" as tokens;

.tag {
  margin: 0 tokens.$spacing-25;
}
</style>
