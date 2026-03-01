<template>
  <div v-if="cast?.length > 0" class="container">
    <div class="header">Top cast</div>
    <ul class="cards-wrapper">
      <li v-for="item in cast" :key="item.person.id" class="cast-card">
        <img
          :src="item.person.image?.medium ?? AvatarIcon"
          :alt="`image of ${item.person.name}`"
          class="cast-image"
        />
        <div>
          {{ item.person.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Cast } from '@/types'
import AvatarIcon from '@/assets/avatar.svg'

interface Props {
  cast: Cast[]
}

defineProps<Props>()
</script>

<style scoped lang="scss">
@use '@/styles/tokens' as tokens;

.header {
  font-size: tokens.$font-size-150;
  font-weight: bold;
  margin: tokens.$spacing-100 0;
}

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: tokens.$spacing-50;
  justify-content: flex-start;
  list-style: none;
  padding: 0;
}

.cast {
  &-card {
    margin: tokens.$spacing-100 0;
    text-align: center;
    width: 200px;
  }

  &-image {
    aspect-ratio: 42 / 59;
    border-radius: tokens.$border-radius-100;
    width: 100%;
  }
}
</style>
