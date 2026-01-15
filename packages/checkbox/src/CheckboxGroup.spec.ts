import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { CheckboxGroup, CheckboxGroupItem } from ".";

describe("CheckboxGroup", () => {
  describe("Rendering", () => {
    it("renders with data-slot attribute", () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [] },
      });

      const group = wrapper.find('[data-slot="checkbox-group"]');
      expect(group.exists()).toBe(true);
    });

    it("has role=group for accessibility", () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [] },
      });

      const group = wrapper.find('[data-slot="checkbox-group"]');
      expect(group.attributes("role")).toBe("group");
    });

    it("applies default spacing class (gap-space-xs)", () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [] },
      });

      const group = wrapper.find('[data-slot="checkbox-group"]');
      expect(group.classes()).toContain("gap-space-xs");
    });

    it("applies custom spacing classes", () => {
      const spacings: Array<"xs" | "sm" | "md" | "lg" | "xl"> = ["xs", "sm", "md", "lg", "xl"];
      const expectedClasses = [
        "gap-space-xxs",
        "gap-space-xs",
        "gap-space-sm",
        "gap-space-md",
        "gap-space-lg",
      ];

      spacings.forEach((spacing, index) => {
        const wrapper = mount(CheckboxGroup, {
          props: { modelValue: [], spacing },
        });

        const group = wrapper.find('[data-slot="checkbox-group"]');
        expect(group.classes()).toContain(expectedClasses[index]);
      });
    });

    it("applies vertical layout classes", () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [] },
      });

      const group = wrapper.find('[data-slot="checkbox-group"]');
      expect(group.classes()).toContain("d-flex");
      expect(group.classes()).toContain("flex-column");
    });

    it("applies custom class", () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [], class: "my-custom-class" },
      });

      const group = wrapper.find('[data-slot="checkbox-group"]');
      expect(group.classes()).toContain("my-custom-class");
    });
  });

  describe("Group with Items", () => {
    it("renders multiple CheckboxGroupItem components", () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [] },
        slots: {
          default: `
            <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
            <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
            <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
          `,
        },
        global: {
          components: { CheckboxGroupItem },
        },
      });

      const items = wrapper.findAll('[data-slot="checkbox-group-item"]');
      expect(items.length).toBe(3);
    });

    it("pre-selects items based on modelValue", () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: ["option2"] },
        slots: {
          default: `
            <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
            <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
            <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
          `,
        },
        global: {
          components: { CheckboxGroupItem },
        },
      });

      const items = wrapper.findAll('[data-slot="checkbox"]');
      expect(items[0].attributes("aria-checked")).toBe("false");
      expect(items[1].attributes("aria-checked")).toBe("true");
      expect(items[2].attributes("aria-checked")).toBe("false");
    });

    it("emits update:modelValue when item is selected", async () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [] },
        slots: {
          default: `
            <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
            <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
          `,
        },
        global: {
          components: { CheckboxGroupItem },
        },
      });

      const firstCheckbox = wrapper.findAll('[data-slot="checkbox"]')[0];
      await firstCheckbox.trigger("click");

      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["option1"]]);
    });

    it("emits update:modelValue when item is deselected", async () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: ["option1", "option2"] },
        slots: {
          default: `
            <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
            <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
          `,
        },
        global: {
          components: { CheckboxGroupItem },
        },
      });

      const firstCheckbox = wrapper.findAll('[data-slot="checkbox"]')[0];
      await firstCheckbox.trigger("click");

      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["option2"]]);
    });

    it("allows multiple selections", async () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [] },
        slots: {
          default: `
            <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
            <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
            <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
          `,
        },
        global: {
          components: { CheckboxGroupItem },
        },
      });

      const checkboxes = wrapper.findAll('[data-slot="checkbox"]');
      await checkboxes[0].trigger("click");
      await checkboxes[1].trigger("click");

      const emittedEvents = wrapper.emitted("update:modelValue");
      expect(emittedEvents?.[0]).toEqual([["option1"]]);
      expect(emittedEvents?.[1]).toEqual([["option1", "option2"]]);
    });
  });

  describe("Props Inheritance", () => {
    it("passes variant prop to child checkboxes", () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [], variant: "success" },
        slots: {
          default: `
            <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
          `,
        },
        global: {
          components: { CheckboxGroupItem },
        },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.classes()).toContain("checkbox-success");
    });

    it("passes size prop to child checkboxes", () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [], size: "lg" },
        slots: {
          default: `
            <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
          `,
        },
        global: {
          components: { CheckboxGroupItem },
        },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.classes()).toContain("checkbox-lg");
    });

    it("passes disabled prop to child checkboxes", () => {
      const wrapper = mount(CheckboxGroup, {
        props: { modelValue: [], disabled: true },
        slots: {
          default: `
            <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
          `,
        },
        global: {
          components: { CheckboxGroupItem },
        },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.attributes("data-disabled")).toBeDefined();
    });
  });
});

describe("CheckboxGroupItem", () => {
  describe("Rendering", () => {
    it("renders with data-slot attribute", () => {
      const wrapper = mount(CheckboxGroupItem, {
        props: { value: "test" },
        slots: {
          default: "Test Item",
        },
        global: {
          provide: {
            checkboxGroup: {
              modelValue: { value: [] },
              variant: { value: "rds-dark-3" },
              size: { value: "md" },
              disabled: { value: false },
              updateValue: () => {},
            },
          },
        },
      });

      const item = wrapper.find('[data-slot="checkbox-group-item"]');
      expect(item.exists()).toBe(true);
    });

    it("renders as a label element", () => {
      const wrapper = mount(CheckboxGroupItem, {
        props: { value: "test" },
        slots: {
          default: "Test Item",
        },
        global: {
          provide: {
            checkboxGroup: {
              modelValue: { value: [] },
              variant: { value: "rds-dark-3" },
              size: { value: "md" },
              disabled: { value: false },
              updateValue: () => {},
            },
          },
        },
      });

      expect(wrapper.element.tagName).toBe("LABEL");
    });

    it("renders slot content", () => {
      const wrapper = mount(CheckboxGroupItem, {
        props: { value: "test" },
        slots: {
          default: "My Custom Label",
        },
        global: {
          provide: {
            checkboxGroup: {
              modelValue: { value: [] },
              variant: { value: "rds-dark-3" },
              size: { value: "md" },
              disabled: { value: false },
              updateValue: () => {},
            },
          },
        },
      });

      expect(wrapper.text()).toContain("My Custom Label");
    });

    it("has cursor-pointer class", () => {
      const wrapper = mount(CheckboxGroupItem, {
        props: { value: "test" },
        slots: {
          default: "Test",
        },
        global: {
          provide: {
            checkboxGroup: {
              modelValue: { value: [] },
              variant: { value: "rds-dark-3" },
              size: { value: "md" },
              disabled: { value: false },
              updateValue: () => {},
            },
          },
        },
      });

      const item = wrapper.find('[data-slot="checkbox-group-item"]');
      expect(item.classes()).toContain("cursor-pointer");
    });
  });

  describe("Checked State", () => {
    it("is unchecked when value not in modelValue", () => {
      const wrapper = mount(CheckboxGroupItem, {
        props: { value: "option1" },
        slots: {
          default: "Option 1",
        },
        global: {
          provide: {
            checkboxGroup: {
              modelValue: { value: [] },
              variant: { value: "rds-dark-3" },
              size: { value: "md" },
              disabled: { value: false },
              updateValue: () => {},
            },
          },
        },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.attributes("aria-checked")).toBe("false");
    });

    it("is checked when value is in modelValue", () => {
      const wrapper = mount(CheckboxGroupItem, {
        props: { value: "option1" },
        slots: {
          default: "Option 1",
        },
        global: {
          provide: {
            checkboxGroup: {
              modelValue: { value: ["option1"] },
              variant: { value: "rds-dark-3" },
              size: { value: "md" },
              disabled: { value: false },
              updateValue: () => {},
            },
          },
        },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.attributes("aria-checked")).toBe("true");
    });
  });

  describe("Disabled State", () => {
    it("respects group disabled prop", () => {
      const wrapper = mount(CheckboxGroupItem, {
        props: { value: "option1" },
        slots: {
          default: "Option 1",
        },
        global: {
          provide: {
            checkboxGroup: {
              modelValue: { value: [] },
              variant: { value: "rds-dark-3" },
              size: { value: "md" },
              disabled: { value: true },
              updateValue: () => {},
            },
          },
        },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.attributes("data-disabled")).toBeDefined();
    });

    it("respects item disabled prop over group", () => {
      const wrapper = mount(CheckboxGroupItem, {
        props: { value: "option1", disabled: true },
        slots: {
          default: "Option 1",
        },
        global: {
          provide: {
            checkboxGroup: {
              modelValue: { value: [] },
              variant: { value: "rds-dark-3" },
              size: { value: "md" },
              disabled: { value: false },
              updateValue: () => {},
            },
          },
        },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.attributes("data-disabled")).toBeDefined();
    });
  });
});
