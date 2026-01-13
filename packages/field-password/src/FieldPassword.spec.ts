import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { FieldPassword } from "./index";

describe("FieldPassword", () => {
  it("renders label, input, and toggle button", () => {
    const wrapper = mount(FieldPassword, {
      props: {
        id: "test-pwd",
        label: "Password",
      },
    });

    expect(wrapper.find("label").text()).toBe("Password");
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("supports v-model binding", async () => {
    const wrapper = mount(FieldPassword, {
      props: {
        id: "test-pwd",
        label: "Password",
        modelValue: "",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("newpassword");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["newpassword"]);
  });

  it("shows error message when provided", () => {
    const wrapper = mount(FieldPassword, {
      props: {
        id: "test-pwd",
        label: "Password",
        error: "Password is required",
      },
    });

    expect(wrapper.text()).toContain("Password is required");
    expect(wrapper.find(".is-invalid").exists()).toBe(true);
  });

  it("shows help text when provided", () => {
    const wrapper = mount(FieldPassword, {
      props: {
        id: "test-pwd",
        label: "Password",
        helpText: "Must be at least 8 characters",
      },
    });

    expect(wrapper.text()).toContain("Must be at least 8 characters");
  });

  it("passes helper slot content through", () => {
    const wrapper = mount(FieldPassword, {
      props: {
        id: "test-pwd",
        label: "Password",
      },
      slots: {
        helper: '<div class="requirements">Requirements list</div>',
      },
    });

    expect(wrapper.find(".requirements").exists()).toBe(true);
    expect(wrapper.find(".requirements").text()).toBe("Requirements list");
  });

  it("respects required prop", () => {
    const wrapper = mount(FieldPassword, {
      props: {
        id: "test-pwd",
        label: "Password",
        required: true,
      },
    });

    const input = wrapper.find("input");
    expect(input.attributes("required")).toBeDefined();
  });

  it("respects disabled prop", () => {
    const wrapper = mount(FieldPassword, {
      props: {
        id: "test-pwd",
        label: "Password",
        disabled: true,
      },
    });

    const input = wrapper.find("input");
    expect(input.attributes("disabled")).toBeDefined();
  });

  it("respects readonly prop", () => {
    const wrapper = mount(FieldPassword, {
      props: {
        id: "test-pwd",
        label: "Password",
        readonly: true,
      },
    });

    const input = wrapper.find("input");
    expect(input.attributes("readonly")).toBeDefined();
  });
});
