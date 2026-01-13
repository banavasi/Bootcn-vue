import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { FieldPassword } from "./index";

describe("FieldPassword", () => {
  it("renders correctly", () => {
    const wrapper = mount(FieldPassword, {
      slots: {
        default: "Test content",
      },
    });

    expect(wrapper.text()).toBe("Test content");
  });

  it("applies custom classes", () => {
    const wrapper = mount(FieldPassword, {
      props: {
        class: "custom-class",
      },
    });

    expect(wrapper.classes()).toContain("custom-class");
  });
});
