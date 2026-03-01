import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GenreTags from './GenreTags.vue';
import PrimeVue from 'primevue/config';

describe('GenreTags.vue', () => {
  const tags = ['Action', 'Drama', 'Comedy'];

  it('renders correctly with tags', () => {
    const wrapper = mount(GenreTags, {
      props: {
        tags,
      },
      global: {
        plugins: [PrimeVue],
        stubs: {
          ScreenReader: true,
        },
      },
    });

    const chips = wrapper.findAll('.p-chip');
    expect(chips).toHaveLength(tags.length);

    tags.forEach((tag, index) => {
      const chip = chips[index];
      expect(chip).toBeDefined();
    });
  });

  it('renders nothing when tags are empty', () => {
    const wrapper = mount(GenreTags, {
      props: {
        tags: [],
      },
      global: {
        plugins: [PrimeVue],
        stubs: {
          ScreenReader: true,
        },
      },
    });

    const chips = wrapper.findAll('.p-chip');
    expect(chips).toHaveLength(0);
  });
});
