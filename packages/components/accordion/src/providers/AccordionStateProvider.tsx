import { createContext, ReactNode, useContext } from "react";
import { UseAccordionReturn } from "../useAccordion";

type AccordionState = UseAccordionReturn["state"];
const AccordionStateContext = createContext<AccordionState | undefined>(
  undefined
);

export function AccordionStateProvider({
  value,
  children,
}: {
  value: AccordionState;
  children: ReactNode;
}) {
  return (
    <AccordionStateContext.Provider value={value}>
      {children}
    </AccordionStateContext.Provider>
  );
}

export function useAccordionState() {
  const value = useContext(AccordionStateContext);

  if (!value) {
    throw new Error(
      "useAccordionState 는 Accordion 컴포넌트 안에서 쓰여야 합니다"
    );
  }

  return value;
}
