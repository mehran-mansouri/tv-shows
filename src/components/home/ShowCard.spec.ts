import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowCard from './ShowCard.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('ShowCard.vue', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/:id', component: { template: '<div>Details</div>' } }],
  })

  const show = {
    id: 1,
    name: 'Breaking Bad',
    summary: '<p>A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.</p>',
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg'
    },
    rating: {
      average: 9.2
    },
    genres: ['Drama', 'Crime', 'Thriller']
  }

  it('renders correctly', () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: show as any
      },
      global: {
        plugins: [router],
        directives: {
          lazy: () => {}
        }
      }
    })

    expect(wrapper.find('.title').text()).toBe(show.name)
    expect(wrapper.find('.summary').html()).toContain(show.summary)
    expect(wrapper.find('.footer').text()).toContain(show.rating.average.toString())
  })

  it('has correct link to details page', () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: show as any
      },
      global: {
        plugins: [router],
        directives: {
          lazy: () => {}
        }
      }
    })

    const link = wrapper.findComponent({ name: 'RouterLink' })
    expect(link.props('to')).toBe('/1')
  })
})
