import { createContext } from "react";
import { RadioGroupStore } from "../../useRadioGroup";

export const RadioGroupStoreContext = createContext<
  RadioGroupStore | undefined
>(undefined);
