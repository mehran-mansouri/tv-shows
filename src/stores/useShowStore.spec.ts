import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useShowStore } from './useShowStore'

describe('useShowStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default values', () => {
    const store = useShowStore()
    expect(store.genres).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.hasError).toBe(false)
  })

  it('updates state correctly', () => {
    const store = useShowStore()
    const mockGenres = [{ name: 'Drama', shows: [] }] as any

    store.genres = mockGenres
    store.isLoading = true
    store.hasError = true

    expect(store.genres).toEqual(mockGenres)
    expect(store.isLoading).toBe(true)
    expect(store.hasError).toBe(true)
  })
})
