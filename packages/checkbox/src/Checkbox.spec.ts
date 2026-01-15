import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { Checkbox } from ".";

describe("Checkbox", () => {
  describe("State Rendering", () => {
    it("renders with data-slot attribute", () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: null },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.exists()).toBe(true);
    });

    it("has unchecked aria-checked when modelValue is null", () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: null },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.attributes("aria-checked")).toBe("false");
    });

    it("has unchecked aria-checked when modelValue is N", () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: "N" },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.attributes("aria-checked")).toBe("false");
    });

    it("has checked aria-checked when modelValue is Y", () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: "Y" },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      expect(checkbox.attributes("aria-checked")).toBe("true");
    });
  });

  describe("Interaction", () => {
    it("emits update:modelValue with Y when clicked while unchecked (null)", async () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: null },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      await checkbox.trigger("click");

      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["Y"]);
    });

    it("emits update:modelValue with Y when clicked while unchecked (N)", async () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: "N" },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      await checkbox.trigger("click");

      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["Y"]);
    });

    it("emits update:modelValue with N when clicked while checked (Y)", async () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: "Y" },
      });

      const checkbox = wrapper.find('[data-slot="checkbox"]');
      await checkbox.trigger("click");

      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["N"]);
    });
  });
});
