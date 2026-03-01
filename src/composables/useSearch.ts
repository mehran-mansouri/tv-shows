import { ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import searchShows from '../services/apis/shows/searchShows';
import type { Show } from '@/types';

export default function () {
  const searchTerm = ref('');
  const suggestions = ref<Show[]>([]);
  const isLoading = ref(false);

  const search = async () => {
    if (searchTerm.value) {
      isLoading.value = true;
      const { data } = await searchShows(searchTerm.value);
      suggestions.value = data.map((item) => ({ ...item.show }));
    }
    isLoading.value = false;
  };

  const debouncedSearch = useDebounceFn(() => search(), 500);

  watch(searchTerm, async () => {
    isLoading.value = true;
    await debouncedSearch();
  });

  return {
    isLoading,
    search,
    searchTerm,
    suggestions,
  };
}
