import { ReactNode } from "react";

import { Item, ItemContext } from "./context";

type ItemProviderProps = {
  value: Item["value"];
  disabled: Item["disabled"];
  children: ReactNode;
};
export function ItemProvider({ value, disabled, children }: ItemProviderProps) {
  return (
    <ItemContext.Provider value={{ value, disabled }}>
      {children}
    </ItemContext.Provider>
  );
}
