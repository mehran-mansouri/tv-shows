import type { Show, Genre } from '@/types'

const groupShowsByGenre = (shows: Show[]): Genre[] => {
  const map = new Map<string, Show[]>();
  for (const show of shows) {
    // Normalize genres: filter out empty/null/whitespace values
    const validGenres = show.genres?.map(g => g?.trim()).filter(g => g) ?? [];

    // If no valid genres, skip this show entirely
    if (validGenres.length === 0) continue;

    for (const genre of validGenres) {
      let list = map.get(genre);
      if (!list) {
        list = [];
        map.set(genre, list);
      }
      list.push(show);
    }
  }

  return Array.from(map, ([genre, shows]) => ({ title: genre, shows }))
}

export default groupShowsByGenre;
