import { ReactNode, createContext } from "react";

import type { Item } from "@react-dive-ui/accordion-machine";

export const ItemContext = createContext<Item | undefined>(undefined);

type ItemProviderProps = {
  children: ReactNode;
  value: string;
  disabled?: boolean;
};
export const ItemProvider = ({
  children,
  value,
  disabled = false,
}: ItemProviderProps) => {
  return (
    <ItemContext.Provider value={{ value, disabled }}>
      {children}
    </ItemContext.Provider>
  );
};
