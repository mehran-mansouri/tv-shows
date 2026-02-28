import type { ShowDetails } from '@/types'
import { onMounted, ref } from 'vue'
import getShowDetails from '@/services/apis/shows/getShowDetails.ts'
import { useRoute } from 'vue-router'

export default function () {
  const route = useRoute()
  const id = route.params.id as string

  const showDetails =ref<ShowDetails>()
  const hasError = ref(false)
  const isLoading = ref(false);

  const fetchDetails = async () => {
    try {
      isLoading.value = true
      const isIdValid = /^\d+$/.test(id)
      if (!isIdValid) {
        hasError.value = true
        return
      }
      const { data, error } = await getShowDetails(id)
      if (error) {
        hasError.value = true
      }
      if (data) {
        showDetails.value = data
      }
    } catch (e) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  onMounted(async () => {
    await fetchDetails();
  });

  return {
    showDetails,
    hasError,
    isLoading,
  }
}
