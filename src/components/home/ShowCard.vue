<template>
  <div>
    <div class="wrapper">
      <RouterLink :to="`/${show.id}`" class="link">
        <div class="title">
          {{ show.name }}
        </div>
        <div class="summary" v-html="show.summary" />
        <img
          v-lazy="{ src: show.image?.medium, loading: LoadingImage }"
          alt="show poster"
          class="poster"
        />
        <div class="footer">
          <img :src="StarSvg" alt="rating icon" class="rating-icon" />
          {{ show.rating.average }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Show } from '@/types';
import { RouterLink } from 'vue-router';
import StarSvg from '@/assets/star-svg.svg';
import LoadingImage from '@/assets/loading-image.webp';

interface Props {
  show: Show;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use '@/styles/tokens' as tokens;

a {
  text-decoration: none;
}

.wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.link {
  &:hover {
    .poster {
      filter: brightness(0.25);
    }

    .summary {
      opacity: 1;
    }
  }
}

.title {
  background-color: tokens.$background-color-secondary;
  border-radius: tokens.$border-radius-100 tokens.$border-radius-100 0 0;
  color: tokens.$color-white;
  padding: tokens.$spacing-25 tokens.$spacing-50;
  margin: 0 tokens.$spacing-50;
  text-align: center;
}

.summary {
  color: tokens.$color-white;
  height: 255px;
  opacity: 0;
  overflow: hidden;
  padding: tokens.$spacing-50 tokens.$spacing-150;
  position: absolute;
  width: 200px;
  z-index: 1;
}

.poster {
  aspect-ratio: 42 / 56;
  border-radius: tokens.$border-radius-50;
  width: 210px;
}

.footer {
  align-items: center;
  background-color: tokens.$background-color-secondary;
  border-radius: 0 0 tokens.$border-radius-100 tokens.$border-radius-100;
  color: tokens.$color-white;
  display: flex;
  justify-content: center;
  padding: tokens.$spacing-25 tokens.$spacing-50;
  margin: -#{tokens.$spacing-25} tokens.$spacing-50 0;
  text-align: center;
}

.rating-icon {
  width: 22px;
  margin-right: tokens.$spacing-25;
}
</style>
