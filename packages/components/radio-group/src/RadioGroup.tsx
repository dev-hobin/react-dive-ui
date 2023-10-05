import { ItemProvider } from "./item-provider";
import { Group, Radio, HiddenInput, Label, Indicator } from "./parts";
import { RadioGroupProvider } from "./radio-group-provider";

export const RadioGroup = Object.assign(
  {},
  {
    Provider: RadioGroupProvider,
    ItemProvider: ItemProvider,
    Group,
    Radio,
    Label,
    HiddenInput,
    Indicator,
  }
);
