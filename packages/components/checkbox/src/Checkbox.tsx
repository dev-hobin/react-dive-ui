import { Control, Label, HiddenInput } from "./parts";
import { ServiceProvider } from "./service-provider";

export const Checkbox = Object.assign(
  {},
  { Provider: ServiceProvider, Control, Label, HiddenInput }
);
