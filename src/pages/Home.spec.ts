import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Home from './Home.vue';
import { ref } from 'vue';

// Mock useShows
const mockUseShows = {
  isLoading: ref(false),
  genres: ref([]),
  hasError: ref(false),
};

vi.mock('@/composables/useShows', () => ({
  default: () => mockUseShows,
}));

// Mock useHead
vi.mock('@unhead/vue', () => ({
  useHead: vi.fn(),
}));

describe('Home.vue snapshot', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseShows.isLoading.value = false;
    mockUseShows.genres.value = [];
    mockUseShows.hasError.value = false;
  });

  it('renders loading state correctly', () => {
    mockUseShows.isLoading.value = true;
    const wrapper = mount(Home, {
      global: {
        stubs: {
          Shimmer: true,
          GenresOverview: true,
          ErrorComponent: true,
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders error state correctly', () => {
    mockUseShows.hasError.value = true;
    const wrapper = mount(Home, {
      global: {
        stubs: {
          Shimmer: true,
          GenresOverview: true,
          ErrorComponent: true,
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders genres overview correctly', () => {
    mockUseShows.genres.value = [{ title: 'Drama', shows: [] }] as any;
    const wrapper = mount(Home, {
      global: {
        stubs: {
          Shimmer: true,
          GenresOverview: true,
          ErrorComponent: true,
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
