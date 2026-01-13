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
});
