import { describe, it, expect } from 'vitest';
import groupShowsByGenre from './groupShowsByGenre';
import type { Show } from '@/types';

describe('groupShowsByGenre', () => {
  const mockShows: Partial<Show>[] = [
    {
      id: 1,
      name: 'Show A',
      genres: ['Action', 'Drama'],
      rating: { average: 8.5 },
    },
    {
      id: 2,
      name: 'Show B',
      genres: ['Action', 'Comedy'],
      rating: { average: 9.0 },
    },
    {
      id: 3,
      name: 'Show C',
      genres: ['Drama'],
      rating: { average: 7.5 },
    },
    {
      id: 4,
      name: 'Show D',
      genres: ['  Action  ', ''], // Testing trim and empty genre
      rating: { average: 8.0 },
    },
  ];

  it('should group shows by genre correctly', () => {
    const result = groupShowsByGenre(mockShows as Show[]);

    expect(result).toHaveLength(3);

    const actionGenre = result.find((g) => g.title === 'Action');
    expect(actionGenre).toBeDefined();
    expect(actionGenre?.shows).toHaveLength(3); // Show A, Show B, Show D

    const dramaGenre = result.find((g) => g.title === 'Drama');
    expect(dramaGenre).toBeDefined();
    expect(dramaGenre?.shows).toHaveLength(2); // Show A, Show C

    const comedyGenre = result.find((g) => g.title === 'Comedy');
    expect(comedyGenre).toBeDefined();
    expect(comedyGenre?.shows).toHaveLength(1); // Show B
  });

  it('should sort shows within each genre by rating in descending order', () => {
    const result = groupShowsByGenre(mockShows as Show[]);

    const actionGenre = result.find((g) => g.title === 'Action');
    expect(actionGenre).toBeDefined();
    // @ts-expect-error unit test
    expect(actionGenre.shows[0]?.name).toBe('Show B'); // 9.0

    const dramaGenre = result.find((g) => g.title === 'Drama');
    expect(dramaGenre).toBeDefined();
    // @ts-expect-error unit test
    expect(dramaGenre.shows[0]?.name).toBe('Show A'); // 8.5
    // @ts-expect-error unit test
    expect(dramaGenre.shows[1]?.name).toBe('Show C'); // 7.5
  });

  it('should handle shows with no genres', () => {
    const showsWithoutGenres: Partial<Show>[] = [
      { id: 5, name: 'Show E', genres: [], rating: { average: 5.0 } },
    ];
    const result = groupShowsByGenre(showsWithoutGenres as Show[]);
    expect(result).toHaveLength(0);
  });

  it('should handle empty input', () => {
    const result = groupShowsByGenre([]);
    expect(result).toHaveLength(0);
  });

  it('should handle shows with null/undefined genres safely', () => {
    const showsWithNullGenres: Partial<Show>[] = [
      { id: 6, name: 'Show F', genres: undefined as unknown as string[], rating: { average: 5.0 } },
    ];
    const result = groupShowsByGenre(showsWithNullGenres as Show[]);
    expect(result).toHaveLength(0);
  });
});
