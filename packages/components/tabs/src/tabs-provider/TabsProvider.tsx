import { ReactNode, createContext } from "react";
import { TabsOptions, useTabs } from "../useTabs";

export const TabsContext = createContext<
  ReturnType<typeof useTabs> | undefined
>(undefined);

type TabsProviderProps = { children: ReactNode } & TabsOptions;
export const TabsProvider = ({ children, ...options }: TabsProviderProps) => {
  const tabs = useTabs(options);
  return <TabsContext.Provider value={tabs}>{children}</TabsContext.Provider>;
};
