import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ScreenReader from './ScreenReader.vue';

describe('ScreenReader.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(ScreenReader, {
      slots: {
        default: 'Skip to content',
      },
    });
    expect(wrapper.text()).toBe('Skip to content');
    expect(wrapper.find('span').classes()).toContain('sr-only');
  });

  it('has visually hidden styles', () => {
    // We can't easily test CSS in unit tests without a real browser and getComputedStyle,
    // but we can verify the class is present.
    const wrapper = mount(ScreenReader);
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.find('span').classes()).toContain('sr-only');
  });
});
