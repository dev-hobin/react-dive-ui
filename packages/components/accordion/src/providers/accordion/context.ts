import { createContext } from "react";
import { AccordionStore } from "../../useAccordion";

export const AccordionStoreContext = createContext<AccordionStore | undefined>(
  undefined
);
