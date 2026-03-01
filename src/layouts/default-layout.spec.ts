import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from './default-layout.vue'

describe('default-layout.vue snapshot', () => {
  it('renders correctly with slot content', () => {
    const wrapper = mount(DefaultLayout, {
      slots: {
        default: '<div>Main Content</div>'
      },
      global: {
        stubs: {
          Header: true
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
