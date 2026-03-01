import type { ShowDetails } from '@/types';
import { onMounted, ref, watch } from 'vue';
import getShowDetails from '@/services/apis/shows/getShowDetails.ts';
import { useRoute } from 'vue-router';

export default function () {
  const route = useRoute();

  const showDetails = ref<ShowDetails>();
  const hasError = ref(false);
  const isLoading = ref(false);

  const fetchDetails = async () => {
    try {
      isLoading.value = true;
      const id = route.params.id as string;
      const isIdValid = /^\d+$/.test(id);
      if (!isIdValid) {
        hasError.value = true;
        return;
      }
      const { data, error } = await getShowDetails(id);
      if (error) {
        hasError.value = true;
      }
      if (data) {
        showDetails.value = data;
      }
    } catch (e) {
      hasError.value = true;
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(async () => {
    await fetchDetails();
  });

  watch(() => route.params.id, fetchDetails);

  return {
    showDetails,
    hasError,
    isLoading,
  };
}
