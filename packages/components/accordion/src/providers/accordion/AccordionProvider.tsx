import { ReactNode } from "react";
import { AccordionStore } from "../../useAccordion";
import { AccordionStoreContext } from "./context";

type AccordionStoreProviderProps = {
  store: AccordionStore;
  children: ReactNode;
};
export function AccordionStoreProvider({
  store,
  children,
}: AccordionStoreProviderProps) {
  return (
    <AccordionStoreContext.Provider value={store}>
      {children}
    </AccordionStoreContext.Provider>
  );
}
