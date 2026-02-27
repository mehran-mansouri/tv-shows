<template>
  <ShowDetails v-if="showDetails" :showDetails="showDetails"/>
</template>

<script setup lang="ts">
import useShowDetails from '@/composables/useShowDetails'
import ShowDetails from '@/components/details/ShowDetails.vue';
import { useHead } from '@unhead/vue'
import { computed } from 'vue'

const { showDetails, isLoading, hasError } = useShowDetails()

const title = computed(() => showDetails.value?.name ?? 'Show details')
useHead({
  title,
  meta: [{ name: 'description', content: 'Details of the shows' }],
})
</script>

<style scoped></style>
