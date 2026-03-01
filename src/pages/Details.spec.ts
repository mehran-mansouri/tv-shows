import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Details from './Details.vue';
import { ref } from 'vue';

// Mock useShowDetails
const mockUseShowDetails = {
  isLoading: ref(false),
  showDetails: ref(null),
  hasError: ref(false),
};

vi.mock('@/composables/useShowDetails', () => ({
  default: () => mockUseShowDetails,
}));

// Mock useHead
vi.mock('@unhead/vue', () => ({
  useHead: vi.fn(),
}));

describe('Details.vue snapshot', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseShowDetails.isLoading.value = false;
    mockUseShowDetails.showDetails.value = null;
    mockUseShowDetails.hasError.value = false;
  });

  it('renders loading state correctly', () => {
    mockUseShowDetails.isLoading.value = true;
    const wrapper = mount(Details, {
      global: {
        stubs: {
          ShimmerComponent: true,
          ShowDetails: true,
          ErrorComponent: true,
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders error state correctly', () => {
    mockUseShowDetails.hasError.value = true;
    const wrapper = mount(Details, {
      global: {
        stubs: {
          ShimmerComponent: true,
          ShowDetails: true,
          ErrorComponent: true,
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders show details correctly', () => {
    mockUseShowDetails.showDetails.value = {
      id: 1,
      name: 'Breaking Bad',
      premiered: '2008-01-20',
    } as any;
    const wrapper = mount(Details, {
      global: {
        stubs: {
          ShimmerComponent: true,
          ShowDetails: true,
          ErrorComponent: true,
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
