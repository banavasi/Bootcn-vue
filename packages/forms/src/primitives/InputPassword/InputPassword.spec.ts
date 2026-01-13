import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { InputPassword } from "./index";
import { InputRoot } from "../InputRoot";
import { h } from "vue";

describe("InputPassword", () => {
  it("renders with type password by default", () => {
    const wrapper = mount(InputRoot, {
      props: { id: "test-pwd" },
      slots: {
        default: () => h(InputPassword),
      },
    });

    const input = wrapper.find('input[type="password"]');
    expect(input.exists()).toBe(true);
  });

  it("toggles between password and text type when button clicked", async () => {
    const wrapper = mount(InputRoot, {
      props: { id: "test-pwd" },
      slots: {
        default: () => h(InputPassword),
      },
    });

    const input = wrapper.find("input");
    const button = wrapper.find("button");

    expect(input.attributes("type")).toBe("password");

    await button.trigger("click");
    expect(input.attributes("type")).toBe("text");

    await button.trigger("click");
    expect(input.attributes("type")).toBe("password");
  });

  it("shows eye icon when password is hidden", () => {
    const wrapper = mount(InputRoot, {
      props: { id: "test-pwd" },
      slots: {
        default: () => h(InputPassword),
      },
    });

    const button = wrapper.find("button");
    expect(button.attributes("aria-label")).toBe("Show password");
  });

  it("shows eye-slash icon when password is visible", async () => {
    const wrapper = mount(InputRoot, {
      props: { id: "test-pwd" },
      slots: {
        default: () => h(InputPassword),
      },
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(button.attributes("aria-label")).toBe("Hide password");
  });

  it("preserves cursor position when toggling visibility", async () => {
    const wrapper = mount(InputRoot, {
      props: { id: "test-pwd", modelValue: "password123" },
      slots: {
        default: () => h(InputPassword),
      },
    });

    const input = wrapper.find("input").element as HTMLInputElement;
    const button = wrapper.find("button");

    // Set cursor to middle of text
    input.setSelectionRange(5, 5);
    const cursorBefore = input.selectionStart;

    await button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(input.selectionStart).toBe(cursorBefore);
  });

  it("disables toggle button when input is disabled", () => {
    const wrapper = mount(InputRoot, {
      props: { id: "test-pwd", disabled: true },
      slots: {
        default: () => h(InputPassword),
      },
    });

    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("renders helper slot content", () => {
    const wrapper = mount(InputRoot, {
      props: { id: "test-pwd" },
      slots: {
        default: () =>
          h(InputPassword, null, {
            helper: () => h("div", { class: "helper-content" }, "Password requirements"),
          }),
      },
    });

    expect(wrapper.find(".helper-content").exists()).toBe(true);
    expect(wrapper.find(".helper-content").text()).toBe("Password requirements");
  });

  it("has button type='button' to prevent form submission", () => {
    const wrapper = mount(InputRoot, {
      props: { id: "test-pwd" },
      slots: {
        default: () => h(InputPassword),
      },
    });

    const button = wrapper.find("button");
    expect(button.attributes("type")).toBe("button");
  });
});
