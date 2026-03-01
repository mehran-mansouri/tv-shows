import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import useSearch from './useSearch'
import searchShows from '@/services/apis/shows/searchShows'

// Mock dependencies
vi.mock('@/services/apis/shows/searchShows')

const TestComponent = defineComponent({
  setup() {
    return { ...useSearch() }
  },
  template: '<div></div>'
})

describe('useSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  it('initializes with default values', () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.vm.searchTerm).toBe('')
    expect(wrapper.vm.suggestions).toEqual([])
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('fetches suggestions when searchTerm changes (with debounce)', async () => {
    const mockData = [
      { show: { id: 1, name: 'Show 1' } },
      { show: { id: 2, name: 'Show 2' } }
    ]
    ;(searchShows as any).mockResolvedValue({ data: mockData, error: null })

    const wrapper = mount(TestComponent)

    wrapper.vm.searchTerm = 'Breaking'

    await nextTick()

    // Fast-forward debounce time (500ms)
    vi.advanceTimersByTime(500)

    // Wait for the async operation
    await nextTick()
    await Promise.resolve() // wait for search() promise
    await nextTick()

    expect(searchShows).toHaveBeenCalledWith('Breaking')
    expect(wrapper.vm.suggestions).toEqual([{ id: 1, name: 'Show 1' }, { id: 2, name: 'Show 2' }])
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('does not fetch if searchTerm is empty in search function', async () => {
    const wrapper = mount(TestComponent)
    await wrapper.vm.search()
    expect(searchShows).not.toHaveBeenCalled()
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('sets isLoading to false even if API fails', async () => {
    ;(searchShows as any).mockResolvedValue({ data: [], error: 'API Error' })

    const wrapper = mount(TestComponent)
    wrapper.vm.searchTerm = 'Test'

    await nextTick()
    vi.advanceTimersByTime(500)
    await nextTick()
    await Promise.resolve()
    await nextTick()

    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.vm.suggestions).toEqual([])
  })
})
