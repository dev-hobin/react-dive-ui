import { ReactNode, createContext } from "react";
import { Service } from "../types";

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
