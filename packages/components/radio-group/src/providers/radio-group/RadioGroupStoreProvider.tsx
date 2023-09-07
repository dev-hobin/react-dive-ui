import { ReactNode } from "react";
import { RadioGroupStore } from "../../useRadioGroup";
import { RadioGroupStoreContext } from "./context";

type RadioGroupStoreProviderProps = {
  store: RadioGroupStore;
  children: ReactNode;
};
export function RadioGroupStoreProvider({
  store,
  children,
}: RadioGroupStoreProviderProps) {
  return (
    <RadioGroupStoreContext.Provider value={store}>
      {children}
    </RadioGroupStoreContext.Provider>
  );
}
