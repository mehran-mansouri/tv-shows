import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GenresOverview from './GenresOverview.vue'

describe('GenresOverview.vue', () => {
  it('renders nothing when genres are empty', () => {
    const wrapper = mount(GenresOverview, {
      props: {
        genres: []
      }
    })

    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('renders GenreCarousel for each genre', () => {
    const genres = [
      { title: 'Drama', shows: [] },
      { title: 'Action', shows: [] }
    ]
    const wrapper = mount(GenresOverview, {
      props: {
        genres: genres as any
      },
      global: {
        stubs: {
          GenreCarousel: true
        }
      }
    })

    const carousels = wrapper.findAllComponents({ name: 'GenreCarousel' })
    expect(carousels).toHaveLength(genres.length)
  })
})
