import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button } from '.'
import { h } from 'vue'

const testVariants = {
  variant: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    warning: 'btn-warning',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark',
    'outline-primary': 'btn-outline-primary',
    'outline-secondary': 'btn-outline-secondary',
    'outline-success': 'btn-outline-success',
    'outline-danger': 'btn-outline-danger',
    'outline-warning': 'btn-outline-warning',
    'outline-info': 'btn-outline-info',
    'outline-light': 'btn-outline-light',
    'outline-dark': 'btn-outline-dark',
    link: 'btn-link',
  },
  size: {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  },
}

describe('Button.vue', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me'
      }
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toBe('Click Me')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain(testVariants.variant.primary) // default variant
  })

  // Test all solid variants
  const solidVariants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] as const
  solidVariants.forEach(variant => {
    it(`renders with variant: ${variant}`, () => {
      const wrapper = mount(Button, {
        props: { variant },
        slots: { default: `Button ${variant}` }
      })
      const expectedClass = testVariants.variant[variant];
      expect(wrapper.classes()).toContain(expectedClass)
      expect(wrapper.text()).toBe(`Button ${variant}`)
    })
  })

  // Test all outline variants
  const outlineVariants = [
    'outline-primary',
    'outline-secondary',
    'outline-success',
    'outline-danger',
    'outline-warning',
    'outline-info',
    'outline-light',
    'outline-dark'
  ] as const
  outlineVariants.forEach(variant => {
    it(`renders with variant: ${variant}`, () => {
      const wrapper = mount(Button, {
        props: { variant },
        slots: { default: `Button ${variant}` }
      })
      const expectedClass = testVariants.variant[variant];
      expect(wrapper.classes()).toContain(expectedClass)
      expect(wrapper.text()).toBe(`Button ${variant}`)
    })
  })

  // Test link variant
  it('renders with variant: link', () => {
    const wrapper = mount(Button, {
      props: { variant: 'link' },
      slots: { default: 'Link Button' }
    })
    expect(wrapper.classes()).toContain('btn-link')
    expect(wrapper.text()).toBe('Link Button')
  })

  // Test all sizes
  const sizesToTest = Object.keys(testVariants.size) as Array<keyof typeof testVariants.size>
  sizesToTest.forEach(size => {
    it(`renders with size: ${size}`, () => {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: `Button ${size}` }
      })
      const expectedClass = testVariants.size[size];
      if (expectedClass) {
        expect(wrapper.classes()).toContain(expectedClass)
      }
      expect(wrapper.text()).toBe(`Button ${size}`)
    })
  })

  it('renders with custom class', () => {
    const wrapper = mount(Button, {
      props: { class: 'custom-class' },
      slots: { default: 'Custom Class Button' }
    })
    expect(wrapper.classes()).toContain('custom-class')
    expect(wrapper.text()).toBe('Custom Class Button')
  })

  it('renders slot content correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '<span>Slot Content</span>'
      }
    })
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.html()).toContain('<span>Slot Content</span>')
  })

  it('renders child component when "asChild" is true', () => {
    const ChildComponent = {
      template: '<div data-child="true"><slot/></div>',
    }
    const wrapper = mount(Button, {
      props: { asChild: true },
      slots: {
        default: h(ChildComponent, null, {default: () => "Child Content"})
      }
    })
    expect(wrapper.find('button').exists()).toBe(false)
    const child = wrapper.find('[data-child="true"]')
    expect(child.exists()).toBe(true)
    expect(child.text()).toBe('Child Content')
    expect(child.classes()).toContain('btn')
    expect(child.classes()).toContain(testVariants.variant.primary)
  })

  it('applies defaultVariants from cva when no variant or size props are passed', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Default Button' }
    })
    expect(wrapper.classes()).toContain(testVariants.variant.primary)
  })

  it('renders with danger variant and lg size', () => {
    const wrapper = mount(Button, {
      props: { variant: 'danger', size: 'lg' },
      slots: { default: 'Danger Large' }
    })
    expect(wrapper.classes()).toContain(testVariants.variant.danger)
    expect(wrapper.classes()).toContain(testVariants.size.lg)
    expect(wrapper.text()).toBe('Danger Large')
  })

  it('handles disabled state', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled Button' }
    })
    expect(wrapper.find('button').element.disabled).toBe(true)
  })

  it('shows loading spinner when loading is true', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Loading Button' }
    })
    const spinner = wrapper.find('.spinner-border')
    expect(spinner.exists()).toBe(true)
    expect(spinner.classes()).toContain('spinner-border-sm')
  })

  it('disables button when loading is true', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Loading Button' }
    })
    expect(wrapper.find('button').element.disabled).toBe(true)
  })

  it('does not show spinner when loading is false', () => {
    const wrapper = mount(Button, {
      props: { loading: false },
      slots: { default: 'Normal Button' }
    })
    const spinner = wrapper.find('.spinner-border')
    expect(spinner.exists()).toBe(false)
  })

  it('shows both spinner and content when loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Loading...' }
    })
    expect(wrapper.find('.spinner-border').exists()).toBe(true)
    expect(wrapper.text()).toContain('Loading...')
  })
})
