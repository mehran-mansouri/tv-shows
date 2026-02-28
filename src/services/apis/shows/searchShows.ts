import HttpClient from '@/services/http'
import type { Show } from '@/types'

interface SearchResult {
  score: number;
  show: Show;
}

const searchShows = async (searchTerm: string) => {
  const { data, error } = await HttpClient.get<SearchResult[]>(`/search/shows?q=${searchTerm}`)

  return {
    data: data ?? [],
    error,
  }
}

export default searchShows
