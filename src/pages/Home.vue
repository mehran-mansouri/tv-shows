<script setup lang="ts">
import GenresOverview from '@/components/home/GenresOverview.vue'
import useShows from '@/composables/useShows'
import { useHead } from '@unhead/vue'

defineOptions({
  name: 'HomePage',
})

const { isLoading, genres, hasError } = useShows()

useHead({
  title: 'Home page',
  meta: [{ name: 'description', content: 'Overview of the shows' }],
})
</script>

<template>
  <GenresOverview :genres />
</template>
