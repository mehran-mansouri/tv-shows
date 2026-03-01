import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, reactive } from 'vue';
import useShowDetails from './useShowDetails';
import getShowDetails from '@/services/apis/shows/getShowDetails';
import { useRoute } from 'vue-router';

// Mock dependencies
vi.mock('@/services/apis/shows/getShowDetails');
vi.mock('vue-router');

const TestComponent = defineComponent({
  setup() {
    return { ...useShowDetails() };
  },
  template: '<div></div>',
});

describe('useShowDetails', () => {
  let mockRoute: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRoute = reactive({
      params: { id: '123' },
    });
    (useRoute as any).mockReturnValue(mockRoute);
  });

  it('fetches show details on mount', async () => {
    const mockData = { id: 123, name: 'Test Show' };
    (getShowDetails as any).mockResolvedValue({ data: mockData, error: null });

    const wrapper = mount(TestComponent);

    // Check loading state
    expect(wrapper.vm.isLoading).toBe(true);

    // Wait for the async operation in onMounted
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for macro-task (fetchDetails)
    await nextTick();

    expect(getShowDetails).toHaveBeenCalledWith('123');
    expect(wrapper.vm.showDetails).toEqual(mockData);
    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.vm.hasError).toBe(false);
  });

  it('sets hasError to true when API fails', async () => {
    (getShowDetails as any).mockResolvedValue({ data: null, error: 'API Error' });

    const wrapper = mount(TestComponent);
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await nextTick();

    expect(wrapper.vm.hasError).toBe(true);
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it('sets hasError to true for invalid ID', async () => {
    mockRoute.params.id = 'abc';
    const wrapper = mount(TestComponent);
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await nextTick();

    expect(getShowDetails).not.toHaveBeenCalled();
    expect(wrapper.vm.hasError).toBe(true);
  });

  it('updates details when route id changes', async () => {
    const mockData1 = { id: 123, name: 'Show 1' };
    const mockData2 = { id: 456, name: 'Show 2' };

    (getShowDetails as any)
      .mockResolvedValueOnce({ data: mockData1, error: null })
      .mockResolvedValueOnce({ data: mockData2, error: null });

    const wrapper = mount(TestComponent);
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await nextTick();

    expect(wrapper.vm.showDetails).toEqual(mockData1);

    // Simulate route change
    mockRoute.params.id = '456';

    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await nextTick();

    expect(getShowDetails).toHaveBeenCalledWith('456');
    expect(wrapper.vm.showDetails).toEqual(mockData2);
  });
});
