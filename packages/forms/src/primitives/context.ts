import type { InjectionKey, Ref } from "vue";

export interface InputContext {
  id: Ref<string>;
  invalid: Ref<boolean>;
  disabled: Ref<boolean>;
  required: Ref<boolean>;
  errorId: Ref<string>;
  helpId: Ref<string>;
}

export const INPUT_INJECTION_KEY = Symbol("INPUT_CONTEXT") as InjectionKey<InputContext>;
