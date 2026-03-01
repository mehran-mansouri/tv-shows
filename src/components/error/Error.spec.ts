import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Error from './Error.vue';

describe('Error.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(Error);

    expect(wrapper.find('.error-container').exists()).toBe(true);
    expect(wrapper.find('.error-icon').exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('We can’t reach this page');
    expect(wrapper.find('p').text()).toBe('Try reloading or go back to where you came from');
  });
});
