import { createContext, ReactNode, useContext } from "react";
import { UseAccordionReturn } from "../useAccordion";

type AccordionEvents = UseAccordionReturn["events"];
const AccordionEventsContext = createContext<AccordionEvents | undefined>(
  undefined
);

export function AccordionEventsProvider({
  value,
  children,
}: {
  value: AccordionEvents;
  children: ReactNode;
}) {
  return (
    <AccordionEventsContext.Provider value={value}>
      {children}
    </AccordionEventsContext.Provider>
  );
}

export function useAccordionEvents() {
  const value = useContext(AccordionEventsContext);

  if (!value) {
    throw new Error(
      "useAccordionEvents 는 Accordion 컴포넌트 안에서 쓰여야 합니다"
    );
  }

  return value;
}
