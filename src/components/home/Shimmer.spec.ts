import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Shimmer from './Shimmer.vue';
import Skeleton from 'primevue/skeleton';
import PrimeVue from 'primevue/config';

describe('Shimmer.vue', () => {
  it('renders the correct structure with skeletons', () => {
    const wrapper = mount(Shimmer, {
      global: {
        plugins: [PrimeVue],
        components: {
          Skeleton,
        },
      },
    });

    // It has 3 carousel blocks
    const carouselBlocks = wrapper.findAll('.shimmer-carousel');
    expect(carouselBlocks).toHaveLength(3);

    // Each carousel block has skeletons
    // 3 blocks * (1 header + 5 items) = 18 skeletons total
    const skeletons = wrapper.findAllComponents(Skeleton);
    expect(skeletons).toHaveLength(18);

    // Check for the header skeleton in each block
    carouselBlocks.forEach((block) => {
      expect(block.findComponent(Skeleton).props('width')).toBe('100px');
      const container = block.find('.shimmer-container');
      expect(container.exists()).toBe(true);
      const containerSkeletons = container.findAllComponents(Skeleton);
      expect(containerSkeletons).toHaveLength(5);
    });
  });
});
