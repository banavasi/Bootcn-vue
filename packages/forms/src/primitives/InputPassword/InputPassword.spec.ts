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
});
