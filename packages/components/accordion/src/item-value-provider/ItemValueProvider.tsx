import { ReactNode, createContext } from "react";

export const ItemValueContext = createContext<string | undefined>(undefined);

type ItemValueProviderProps = { children: ReactNode; value: string };
export const ItemValueProvider = ({
  children,
  value,
}: ItemValueProviderProps) => {
  return (
    <ItemValueContext.Provider value={value}>
      {children}
    </ItemValueContext.Provider>
  );
};
