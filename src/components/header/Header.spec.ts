import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from './Header.vue';
import PrimeVue from 'primevue/config';
import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';

import type { Show } from '@/types';

// Mock useSearch
const mockUseSearch = {
  isLoading: ref(false),
  searchTerm: ref(''),
  suggestions: ref<Show[]>([]),
  search: vi.fn(),
};

vi.mock('@/composables/useSearch', () => ({
  default: () => mockUseSearch,
}));

describe('Header.vue', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/:id', component: { template: '<div>Details</div>' } },
    ],
  });

  it('renders correctly', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [PrimeVue, router],
      },
    });

    expect(wrapper.find('.link').text()).toBe('Home');
    expect(wrapper.find('.search-field').exists()).toBe(true);
  });

  it('shows suggestions when searchTerm is not empty', async () => {
    mockUseSearch.searchTerm.value = 'Breaking';
    const wrapper = mount(Header, {
      global: {
        plugins: [PrimeVue, router],
      },
    });

    await wrapper.find('.search-field').trigger('focus');
    expect(wrapper.find('.suggestions-popup').exists()).toBe(true);
  });

  it('hides suggestions when searchTerm is empty', async () => {
    mockUseSearch.searchTerm.value = '';
    const wrapper = mount(Header, {
      global: {
        plugins: [PrimeVue, router],
      },
    });

    await wrapper.find('.search-field').trigger('focus');
    expect(wrapper.find('.suggestions-popup').exists()).toBe(false);
  });

  it('shows "no result found" when suggestions are empty', async () => {
    mockUseSearch.searchTerm.value = 'Unknown';
    mockUseSearch.suggestions.value = [];
    const wrapper = mount(Header, {
      global: {
        plugins: [PrimeVue, router],
      },
    });

    await wrapper.find('.search-field').trigger('focus');
    expect(wrapper.find('.suggestion-empty').text()).toBe('no result found');
  });

  it('renders suggestions correctly', async () => {
    mockUseSearch.searchTerm.value = 'Breaking';
    mockUseSearch.suggestions.value = [
      { id: 1, name: 'Breaking Bad', image: { medium: 'test.jpg' } } as Show,
    ];
    const wrapper = mount(Header, {
      global: {
        plugins: [PrimeVue, router],
      },
    });

    await wrapper.find('.search-field').trigger('focus');
    const suggestion = wrapper.find('.suggestion');
    expect(suggestion.exists()).toBe(true);
    expect(suggestion.text()).toBe('Breaking Bad');
    expect(suggestion.find('img').attributes('src')).toBe('test.jpg');
  });
});
