<template>
  <Shimmer v-if="isLoading" />
  <template v-else>
    <ErrorComponent v-if="hasError"/>
    <GenresOverview v-else :genres />
  </template>
</template>

<script setup lang="ts">
import GenresOverview from '@/components/home/GenresOverview.vue'
import useShows from '@/composables/useShows'
import { useHead } from '@unhead/vue'
import Shimmer from '@/components/home/Shimmer.vue'
import ErrorComponent from '@/components/error/Error.vue'

defineOptions({
  name: 'HomePage',
})

const { isLoading, genres, hasError } = useShows()

useHead({
  title: 'Home page',
  meta: [{ name: 'description', content: 'Overview of the shows' }],
})
</script>
