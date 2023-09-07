import { Group, Radio, Label, Indicator } from "./parts";
import { RadioGroupStoreProvider } from "./providers/radio-group";

export const RadioGroup = Object.assign(
  {},
  {
    Provider: RadioGroupStoreProvider,
    Group,
    Radio,
    Label,
    Indicator,
  }
);
