<template>
  <div>
    <div class="overview">
      <div class="image-container">
        <img :src="showDetails.image?.original" class="image" />
      </div>
      <div class="show-info">
        <div class="title">{{ showDetails.name }} {{ showDetails.premiered.slice(0, 4) }}</div>
        <div class="rating">
          <img :src="StarSvg" alt="rating icon" class="rating-icon" />
          {{ showDetails.rating.average }}
        </div>
        <div class="duration">
          <img :src="TimeIcon" class="duration-icon" alt="time icon" />
          {{ showDetails.runtime }} minutes
        </div>
        <GenreTags :tags="showDetails.genres" />
        <div v-if="showDetails.network">Network: {{ showDetails.network.name }}</div>
        <div v-html="showDetails.summary" class="summary"></div>
      </div>
    </div>
    <CastCards :cast="showDetails._embedded.cast" />
  </div>
</template>

<script setup lang="ts">
import type { ShowDetails } from '@/types'
import StarSvg from '@/assets/star-svg.svg'
import TimeIcon from '@/assets/time.svg'
import CastCards from '@/components/details/CastCards.vue'
import GenreTags from '@/components/details/GenreTags.vue'

interface Props {
  showDetails: ShowDetails
}

defineProps<Props>()
</script>

<style scoped lang="scss">
@use '@/styles/tokens' as tokens;

.overview {
  display: flex;

  @media only screen and (max-width: tokens.$breakpoint-sm) {
    flex-wrap: wrap;
  }
}

.image {
  width: 100%;

  &-container {
    max-width: 400px;
    margin: auto;
  }
}

.show-info {
  padding: tokens.$spacing-100;

  & > * {
    margin-bottom: tokens.$spacing-100;
  }

  .title {
    font-size: tokens.$font-size-200;
    font-weight: 700;
  }

  .rating {
    font-size: tokens.$font-size-150;
    font-weight: 700;
    &-icon {
      margin-bottom: -#{tokens.$spacing-25};
      width: 24px;
    }
  }

  .duration {
    font-size: tokens.$font-size-125;

    &-icon {
      width: 24px;
      margin-bottom: -#{tokens.$spacing-25};
    }
  }

  .summary {
    line-height: 1.2;
    text-align: justify;
  }
}
</style>
