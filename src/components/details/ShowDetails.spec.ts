import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowDetails from './ShowDetails.vue'
import type { ShowDetails as IShowDetails } from '@/types'
import PrimeVue from 'primevue/config'

describe('ShowDetails.vue', () => {
  const mockShowDetails: Partial<IShowDetails> = {
    id: 1,
    name: 'Test Show',
    premiered: '2021-01-01',
    rating: { average: 8.5 },
    runtime: 60,
    genres: ['Action', 'Drama'],
    summary: '<p>Test Summary</p>',
    image: { original: 'original.jpg', medium: 'medium.jpg' },
    network: { name: 'Test Network' } as any,
    _embedded: {
      cast: [
        {
          person: { id: 1, name: 'Actor 1', image: { medium: 'actor1.jpg' } } as any,
          character: { name: 'Char 1' } as any
        }
      ]
    } as any
  }

  it('renders show title and year', () => {
    const wrapper = mount(ShowDetails, {
      props: {
        showDetails: mockShowDetails as IShowDetails
      },
      global: {
        plugins: [PrimeVue],
        stubs: {
          GenreTags: true,
          CastCards: true
        }
      }
    })
    expect(wrapper.find('.title').text()).toBe('Test Show 2021')
  })

  it('renders rating correctly', () => {
    const wrapper = mount(ShowDetails, {
      props: {
        showDetails: mockShowDetails as IShowDetails
      },
      global: {
        plugins: [PrimeVue],
        stubs: {
          GenreTags: true,
          CastCards: true
        }
      }
    })
    expect(wrapper.find('.rating').text()).toContain('8.5')
  })

  it('renders runtime correctly', () => {
    const wrapper = mount(ShowDetails, {
      props: {
        showDetails: mockShowDetails as IShowDetails
      },
      global: {
        plugins: [PrimeVue],
        stubs: {
          GenreTags: true,
          CastCards: true
        }
      }
    })
    expect(wrapper.find('.duration').text()).toContain('60 minutes')
  })

  it('renders network name if available', () => {
    const wrapper = mount(ShowDetails, {
      props: {
        showDetails: mockShowDetails as IShowDetails
      },
      global: {
        plugins: [PrimeVue],
        stubs: {
          GenreTags: true,
          CastCards: true
        }
      }
    })
    expect(wrapper.text()).toContain('Network: Test Network')
  })

  it('does not render network if not available', () => {
    const showWithoutNetwork = { ...mockShowDetails, network: null }
    const wrapper = mount(ShowDetails, {
      props: {
        showDetails: showWithoutNetwork as unknown as IShowDetails
      },
      global: {
        plugins: [PrimeVue],
        stubs: {
          GenreTags: true,
          CastCards: true
        }
      }
    })
    expect(wrapper.text()).not.toContain('Network:')
  })

  it('renders summary as HTML', () => {
    const wrapper = mount(ShowDetails, {
      props: {
        showDetails: mockShowDetails as IShowDetails
      },
      global: {
        plugins: [PrimeVue],
        stubs: {
          GenreTags: true,
          CastCards: true
        }
      }
    })
    expect(wrapper.find('.summary').html()).toContain('<p>Test Summary</p>')
  })
})
