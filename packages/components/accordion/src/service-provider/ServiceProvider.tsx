import { ReactNode, createContext } from "react";
import type { Service } from "@react-dive-ui/accordion-machine";
import { AccordionOptions, useAccordion } from "../useAccordion";

export const ServiceContext = createContext<Service | undefined>(undefined);

type ServiceProviderProps = { children: ReactNode } & AccordionOptions;
export const ServiceProvider = ({
  children,
  ...options
}: ServiceProviderProps) => {
  const { service } = useAccordion(options);

  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};
