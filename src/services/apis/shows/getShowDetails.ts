import HttpClient from '@/services/http';
import type { ShowDetails } from '@/types';

const getShowDetails = async (id: string) => {
  const { data, error } = await HttpClient.get<ShowDetails>(`/shows/${id}?embed=cast`);

  return {
    data,
    error,
  };
};

export default getShowDetails;
