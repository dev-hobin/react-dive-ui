import { Control, Label, HiddenInput } from "./parts";
import { CheckboxProvider } from "./checkbox-provider";

export const Checkbox = Object.assign(
  {},
  { Provider: CheckboxProvider, Control, Label, HiddenInput }
);
