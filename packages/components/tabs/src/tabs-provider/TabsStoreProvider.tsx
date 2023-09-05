import { ReactNode } from "react";
import { TabsStore } from "../useTabs";
import { TabsStoreContext } from "./context";

type TabsStoreProviderProps = {
  store: TabsStore;
  children: ReactNode;
};
export function TabsStoreProvider({ store, children }: TabsStoreProviderProps) {
  return (
    <TabsStoreContext.Provider value={store}>
      {children}
    </TabsStoreContext.Provider>
  );
}
