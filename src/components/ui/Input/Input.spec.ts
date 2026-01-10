import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { Input } from "./index";

describe("Input", () => {
  describe("Basic Rendering", () => {
    it("renders an input element with id", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
        },
      });

      const input = wrapper.find("input");
      expect(input.exists()).toBe(true);
      expect(input.attributes("id")).toBe("test-input");
    });

    it("renders with label", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          label: "Test Label",
        },
      });

      const label = wrapper.find("label");
      expect(label.exists()).toBe(true);
      expect(label.text()).toContain("Test Label");
      expect(label.attributes("for")).toBe("test-input");
    });

    it("renders without label when not provided", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
        },
      });

      expect(wrapper.find("label").exists()).toBe(false);
    });
  });

  describe("Input Types", () => {
    it("renders with text type by default", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
        },
      });

      expect(wrapper.find("input").attributes("type")).toBe("text");
    });

    it("renders with email type", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          type: "email",
        },
      });

      expect(wrapper.find("input").attributes("type")).toBe("email");
    });

    it("renders with password type", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          type: "password",
        },
      });

      expect(wrapper.find("input").attributes("type")).toBe("password");
    });
  });

  describe("Attributes", () => {
    it("applies placeholder", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          placeholder: "Enter text",
        },
      });

      expect(wrapper.find("input").attributes("placeholder")).toBe("Enter text");
    });

    it("applies name attribute", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          name: "test-name",
        },
      });

      expect(wrapper.find("input").attributes("name")).toBe("test-name");
    });

    it("applies required attribute", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          required: true,
        },
      });

      expect(wrapper.find("input").attributes("required")).toBeDefined();
      expect(wrapper.find("input").attributes("aria-required")).toBe("true");
    });

    it("applies disabled attribute", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          disabled: true,
        },
      });

      expect(wrapper.find("input").attributes("disabled")).toBeDefined();
    });

    it("applies readonly attribute", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          readonly: true,
        },
      });

      expect(wrapper.find("input").attributes("readonly")).toBeDefined();
    });
  });

  describe("Error States", () => {
    it("shows error message from error prop", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          error: "This field is required",
        },
      });

      expect(wrapper.text()).toContain("This field is required");
      expect(wrapper.find("input").classes()).toContain("is-invalid");
      expect(wrapper.find("input").attributes("aria-invalid")).toBe("true");
    });

    it("shows first error from errors array", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          errors: ["Error 1", "Error 2"],
        },
      });

      expect(wrapper.text()).toContain("Error 1");
      expect(wrapper.find("input").classes()).toContain("is-invalid");
    });

    it("sets aria-describedby with error id", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          error: "Error message",
        },
      });

      expect(wrapper.find("input").attributes("aria-describedby")).toContain("test-input-error");
      expect(wrapper.find("#test-input-error").exists()).toBe(true);
    });
  });

  describe("Help Text", () => {
    it("shows help text", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          helpText: "This is help text",
        },
      });

      expect(wrapper.text()).toContain("This is help text");
      expect(wrapper.find(".form-text").exists()).toBe(true);
    });

    it("hides help text when error is present", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          helpText: "Help text",
          error: "Error message",
        },
      });

      expect(wrapper.text()).not.toContain("Help text");
      expect(wrapper.text()).toContain("Error message");
    });

    it("includes help text id in aria-describedby", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          helpText: "Help text",
        },
      });

      expect(wrapper.find("input").attributes("aria-describedby")).toContain("test-input-help");
    });
  });

  describe("Optional Badge", () => {
    it("shows optional badge when optional is true", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          label: "Test Label",
          optional: true,
        },
      });

      expect(wrapper.find(".badge").exists()).toBe(true);
      expect(wrapper.find(".badge").text()).toBe("Optional");
    });

    it("uses custom optional text", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          label: "Test Label",
          optional: true,
          optionalText: "Not required",
        },
      });

      expect(wrapper.find(".badge").text()).toBe("Not required");
    });

    it("does not show optional badge when optional is false", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          label: "Test Label",
          optional: false,
        },
      });

      expect(wrapper.find(".badge").exists()).toBe(false);
    });
  });

  describe("v-model", () => {
    it("supports v-model binding", async () => {
      let modelValue = "initial value";
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          modelValue,
          "onUpdate:modelValue": (value: string | number | undefined) => {
            modelValue = value as string;
            wrapper.setProps({ modelValue: value });
          },
        },
      });

      const input = wrapper.find("input");
      expect((input.element as HTMLInputElement).value).toBe("initial value");

      await input.setValue("new value");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["new value"]);
    });
  });

  describe("Events", () => {
    it("emits blur event", async () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
        },
      });

      await wrapper.find("input").trigger("blur");
      expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("emits focus event", async () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
        },
      });

      await wrapper.find("input").trigger("focus");
      expect(wrapper.emitted("focus")).toBeTruthy();
    });
  });

  describe("Slots", () => {
    it("renders button slot", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
        },
        slots: {
          button: '<button type="button">Click</button>',
        },
      });

      expect(wrapper.find("button").exists()).toBe(true);
      expect(wrapper.find("button").text()).toBe("Click");
    });

    it("renders message slot", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
        },
        slots: {
          message: "<span>Custom message</span>",
        },
      });

      expect(wrapper.text()).toContain("Custom message");
    });

    it("renders label-suffix slot", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          label: "Test Label",
        },
        slots: {
          "label-suffix": '<span class="text-danger">*</span>',
        },
      });

      expect(wrapper.find("label .text-danger").exists()).toBe(true);
    });
  });

  describe("Custom Classes", () => {
    it("applies custom class to wrapper", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          class: "custom-wrapper-class",
        },
      });

      expect(wrapper.find('[data-slot="input-field"]').classes()).toContain("custom-wrapper-class");
    });

    it("applies custom class to input", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          inputClass: "custom-input-class",
        },
      });

      expect(wrapper.find("input").classes()).toContain("custom-input-class");
    });

    it("applies custom label class", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          label: "Test Label",
          labelClass: "custom-label-class",
        },
      });

      expect(wrapper.find("label").classes()).toContain("custom-label-class");
    });
  });

  describe("Autocomplete", () => {
    it('uses new-password when autocomplete is "off"', () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          autocomplete: "off",
        },
      });

      expect(wrapper.find("input").attributes("autocomplete")).toBe("new-password");
    });

    it("uses provided autocomplete value", () => {
      const wrapper = mount(Input, {
        props: {
          id: "test-input",
          autocomplete: "email",
        },
      });

      expect(wrapper.find("input").attributes("autocomplete")).toBe("email");
    });
  });
});
