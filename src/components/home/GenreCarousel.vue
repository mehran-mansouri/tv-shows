<template>
  <div>
    <h2> {{ genre.title }} </h2>
    <Carousel
      :value="genre.shows"
      :num-visible="5"
      :num-scroll="4"
      :responsive-options
      :show-indicators="false"
    >
      <template #item="{ data }">
        <ShowCard :show="data" />
      </template>
    </Carousel>
    <hr />
  </div>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import ShowCard from '@/components/home/ShowCard.vue'
import type { Genre } from '@/types';

interface Props {
  genre: Genre;
}

defineProps<Props>()

const responsiveOptions = [
  {
    breakpoint: '1400px',
    numVisible: 4,
    numScroll: 3,
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 2,
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1,
  },
];
</script>
