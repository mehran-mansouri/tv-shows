import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import useShows from './useShows'
import getShows from '@/services/apis/shows/getShows'
import groupShowsByGenre from '@/utils/groupShowsByGenre'

// Mock dependencies
vi.mock('@/services/apis/shows/getShows')
vi.mock('@/utils/groupShowsByGenre')

const TestComponent = defineComponent({
  setup() {
    return { ...useShows() }
  },
  template: '<div></div>'
})

describe('useShows', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetches shows on mount if genres are empty', async () => {
    const mockShows = [{ id: 1, name: 'Show 1' }]
    const mockGenres = [{ name: 'Drama', shows: mockShows }]

    ;(getShows as any).mockResolvedValue({ data: mockShows, error: null })
    ;(groupShowsByGenre as any).mockReturnValue(mockGenres)

    const wrapper = mount(TestComponent)

    // Initially loading should be true because of onMounted logic
    expect(wrapper.vm.isLoading).toBe(true)

    // Wait for the async operation in onMounted
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    await nextTick()

    expect(getShows).toHaveBeenCalled()
    expect(groupShowsByGenre).toHaveBeenCalledWith(mockShows)
    expect(wrapper.vm.genres).toEqual(mockGenres)
    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.vm.hasError).toBe(false)
  })

  it('does not fetch shows if genres are already populated', async () => {
    const mockGenres = [{ name: 'Drama', shows: [] }]

    // Setup store with initial data
    const { useShowStore } = await import('@/stores/useShowStore')
    const store = useShowStore()
    store.genres = mockGenres as any

    mount(TestComponent)

    expect(getShows).not.toHaveBeenCalled()
  })

  it('sets hasError to true when API fails', async () => {
    ;(getShows as any).mockResolvedValue({ data: null, error: 'API Error' })
    ;(groupShowsByGenre as any).mockReturnValue([])

    const wrapper = mount(TestComponent)

    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    await nextTick()

    expect(wrapper.vm.hasError).toBe(true)
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
