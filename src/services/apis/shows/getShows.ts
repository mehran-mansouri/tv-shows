import HttpClient from '@/services/http'
import type { Show } from '@/types/Show';

const getShows = async () => {
  const { data, error } = await HttpClient.get<Show[]>('/shows');

  return {
    data,
    error,
  };
}

export default getShows
