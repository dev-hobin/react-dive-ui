import { ReactNode, createContext } from "react";
import type { Service } from "@react-dive-ui/accordion-machine";

export const ServiceContext = createContext<Service | undefined>(undefined);

type ServiceProviderProps = { children: ReactNode; service: Service };
export const ServiceProvider = ({
  children,
  service,
}: ServiceProviderProps) => {
  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};
