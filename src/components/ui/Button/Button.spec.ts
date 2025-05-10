import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button } from '.' // Assuming Button.vue exports Button and buttonVariants are in index.ts
import { h } from 'vue' // For testing 'asChild'

const testVariants = {
  variant: {
    default:'btn-primary',
    destructive:'btn-danger',
    outline:'btn-outline',
    secondary:'btn-secondary',
    ghost:'btn-ghost',
  },
  size: {
    default: 'btn-default',
    sm: 'btn-sm',
    lg: 'btn-lg',
    icon: 'btn-icon',
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
    expect(wrapper.classes()).toContain(testVariants.variant.default) // default variant
    expect(wrapper.classes()).toContain(testVariants.size.default)   // default size
  })

  // Test all variants
  const variantsToTest = Object.keys(testVariants.variant) as Array<keyof typeof testVariants.variant>
  variantsToTest.forEach(variant => {
    it(`renders with variant: ${String(variant)}`, () => {
      const wrapper = mount(Button, {
        props: { variant },
        slots: { default: `Button ${String(variant)}` }
      })
      const expectedClass = testVariants.variant[variant];
      expect(wrapper.classes()).toContain(expectedClass)
      expect(wrapper.text()).toBe(`Button ${String(variant)}`)
    })
  })

  // Test all sizes
  const sizesToTest = Object.keys(testVariants.size) as Array<keyof typeof testVariants.size>
  sizesToTest.forEach(size => {
    it(`renders with size: ${String(size)}`, () => {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: `Button ${String(size)}` }
      })
      const expectedClass = testVariants.size[size];
      expect(wrapper.classes()).toContain(expectedClass)
      expect(wrapper.text()).toBe(`Button ${String(size)}`)
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
    expect(child.classes()).toContain(testVariants.variant.default)
    expect(child.classes()).toContain(testVariants.size.default)
  })

  it('applies defaultVariants from cva when no variant or size props are passed', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Default Button' }
    })
    expect(wrapper.classes()).toContain(testVariants.variant.default)
    expect(wrapper.classes()).toContain(testVariants.size.default)
  })

  it('renders with destructive variant and lg size', () => {
    const wrapper = mount(Button, {
      props: { variant: 'destructive', size: 'lg' },
      slots: { default: 'Destructive Large' }
    })
    expect(wrapper.classes()).toContain(testVariants.variant.destructive)
    expect(wrapper.classes()).toContain(testVariants.size.lg)
    expect(wrapper.text()).toBe('Destructive Large')
  })

});