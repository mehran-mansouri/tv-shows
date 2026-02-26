<template>
  <div v-if="genres.length > 0">
    <div v-for="genre of genres" :key="genre.title">
      <GenreCarousel :genre />
    </div>
  </div>
</template>

<script setup lang="ts">
import GenreCarousel from '@/components/home/GenreCarousel.vue'
import type { Genre } from '@/types';

interface Props {
  genres: Genre[];
}

defineProps<Props>();
</script>
