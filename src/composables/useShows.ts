import { onMounted } from 'vue';
import getShows from '@/services/apis/shows/getShows';
import { useShowStore } from '@/stores/useShowStore';
import { storeToRefs } from 'pinia';
import groupShowsByGenre from '@/utils/groupShowsByGenre';

export default function () {
  const showStore = useShowStore();
  const { genres, isLoading, hasError } = storeToRefs(showStore);

  onMounted(async () => {
    if (genres.value.length === 0) {
      // fetch shows if they haven't fetched before
      isLoading.value = true;
      const { data, error } = await getShows();
      hasError.value = Boolean(error);
      genres.value = groupShowsByGenre(data ?? []);
      isLoading.value = false;
    }
  });

  return {
    genres,
    isLoading,
    hasError,
  };
}
