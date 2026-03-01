import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CastCards from './CastCards.vue';
import type { Cast } from '@/types';

describe('CastCards.vue', () => {
  const mockCast: Partial<Cast>[] = [
    {
      person: {
        id: 1,
        name: 'Actor 1',
        image: { medium: 'actor1.jpg', original: 'actor1-large.jpg' },
      } as any,
    },
    {
      person: {
        id: 2,
        name: 'Actor 2',
        image: null as any,
      } as any,
    },
  ];

  it('renders "Top cast" header when cast is provided', () => {
    const wrapper = mount(CastCards, {
      props: {
        cast: mockCast as Cast[],
      },
    });
    expect(wrapper.find('.header').text()).toBe('Top cast');
  });

  it('renders the correct number of cast members', () => {
    const wrapper = mount(CastCards, {
      props: {
        cast: mockCast as Cast[],
      },
    });
    const cards = wrapper.findAll('.cast-card');
    expect(cards).toHaveLength(2);
  });

  it('renders cast member name', () => {
    const wrapper = mount(CastCards, {
      props: {
        cast: mockCast as Cast[],
      },
    });
    expect(wrapper.text()).toContain('Actor 1');
    expect(wrapper.text()).toContain('Actor 2');
  });

  it('uses the provided image if available', () => {
    const wrapper = mount(CastCards, {
      props: {
        cast: [mockCast[0]] as Cast[],
      },
    });
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('actor1.jpg');
    expect(img.attributes('alt')).toBe('image of Actor 1');
  });

  it('uses the default avatar if no image is available', () => {
    const wrapper = mount(CastCards, {
      props: {
        cast: [mockCast[1]] as Cast[],
      },
    });
    const img = wrapper.find('img');
    // AvatarIcon is imported as a string in the component
    expect(img.attributes('src')).toBeDefined();
    expect(img.attributes('src')).not.toBe('null');
  });

  it('renders nothing when cast is empty', () => {
    const wrapper = mount(CastCards, {
      props: {
        cast: [],
      },
    });
    expect(wrapper.find('.container').exists()).toBe(false);
  });

  it('renders nothing when cast is null', () => {
    const wrapper = mount(CastCards, {
      props: {
        cast: null as unknown as Cast[],
      },
    });
    expect(wrapper.find('.container').exists()).toBe(false);
  });
});
