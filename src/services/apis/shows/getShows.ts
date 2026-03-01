import HttpClient from '@/services/http';
import type { Show } from '@/types';

const getShows = async () => {
  const { data, error } = await HttpClient.get<Show[]>('/shows');

  return {
    data,
    error,
  };
};

export default getShows;
