import type { Show, Genre } from '@/types'

const groupShowsByGenre = (shows: Show[]): Genre[] => {
  const map = new Map<string, Show[]>()

  for (const show of shows) {
    const genres = show.genres
    if (!genres) continue

    // Trim + filter invalid genres with minimal overhead
    for (let i = 0; i < genres.length; i++) {
      const g = genres[i]
      if (!g) continue

      const genre = g.trim()
      if (!genre) continue

      let list = map.get(genre)
      if (!list) {
        list = []
        map.set(genre, list)
      }
      list.push(show)
    }
  }

  // Convert map → array and sort each genre's shows in place
  const result: Genre[] = []
  for (const [genre, list] of map) {
    list.sort((a, b) => {
      const ra = a.rating?.average ?? 0
      const rb = b.rating?.average ?? 0
      return rb - ra // descending
    })

    result.push({ title: genre, shows: list })
  }

  return result
}

export default groupShowsByGenre;
