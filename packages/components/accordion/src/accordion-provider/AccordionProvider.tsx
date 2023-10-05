import { ReactNode, createContext } from "react";
import { AccordionOptions, useAccordion } from "../useAccordion";

export const AccordionContext = createContext<
  ReturnType<typeof useAccordion> | undefined
>(undefined);

type AccordionProviderProps = { children: ReactNode } & AccordionOptions;
export const AccordionProvider = ({
  children,
  ...options
}: AccordionProviderProps) => {
  const accordion = useAccordion(options);

  return (
    <AccordionContext.Provider value={accordion}>
      {children}
    </AccordionContext.Provider>
  );
};
