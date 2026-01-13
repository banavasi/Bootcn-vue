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
});
