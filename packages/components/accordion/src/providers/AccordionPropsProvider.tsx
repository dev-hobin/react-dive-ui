import { createContext, ReactNode, useContext } from "react";
import { AccordionProps } from "../useAccordionProps";

const AccordionPropsContext = createContext<AccordionProps | undefined>(
  undefined
);

export function AccordionPropsProvider({
  value,
  children,
}: {
  value: AccordionProps;
  children: ReactNode;
}) {
  return (
    <AccordionPropsContext.Provider value={value}>
      {children}
    </AccordionPropsContext.Provider>
  );
}

export function useProps() {
  const value = useContext(AccordionPropsContext);

  if (!value) {
    throw new Error("useProps 는 Accordion 컴포넌트 안에서 쓰여야 합니다");
  }

  return value;
}
