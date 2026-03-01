import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Genre } from '@/types';

export const useShowStore = defineStore('shows', () => {
  const genres = ref<Genre[]>([]);
  const isLoading = ref(false);
  const hasError = ref(false);

  return {
    genres,
    hasError,
    isLoading,
  };
});
