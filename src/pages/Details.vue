<template>
  <ShimmerComponent v-if="isLoading" />
  <template v-else>
    <ErrorComponent v-if="hasError" />
    <ShowDetails v-else-if="showDetails" :showDetails="showDetails" />
  </template>
</template>

<script setup lang="ts">
import useShowDetails from '@/composables/useShowDetails';
import ShowDetails from '@/components/details/ShowDetails.vue';
import ShimmerComponent from '@/components/details/Shimmer.vue';
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import ErrorComponent from '@/components/error/Error.vue';

defineOptions({
  name: 'ShowDetailPage',
});

const { showDetails, isLoading, hasError } = useShowDetails();

const title = computed(
  () => `${showDetails.value?.name} ${showDetails.value?.premiered.slice(0, 4)}`,
);
useHead({
  title,
  meta: [{ name: 'description', content: 'Details of the shows' }],
});
</script>
