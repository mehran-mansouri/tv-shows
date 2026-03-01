import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GenreCarousel from './GenreCarousel.vue'
import PrimeVue from 'primevue/config'

describe('GenreCarousel.vue', () => {
  const genre = {
    title: 'Drama',
    shows: [
      { id: 1, name: 'Show 1' },
      { id: 2, name: 'Show 2' }
    ]
  }

  it('renders correctly', () => {
    const wrapper = mount(GenreCarousel, {
      props: {
        genre: genre as any
      },
      global: {
        plugins: [PrimeVue],
        stubs: {
          Carousel: {
            template: '<div><slot name="item" v-for="item in value" :data="item"></slot></div>',
            props: ['value']
          },
          ShowCard: true
        }
      }
    })

    expect(wrapper.find('h2').text()).toBe(genre.title)
    const showCards = wrapper.findAllComponents({ name: 'ShowCard' })
    expect(showCards).toHaveLength(genre.shows.length)
  })
})
