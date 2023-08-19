import { createContext, ReactNode, useContext } from "react";
import type { UseTabsReturn } from "../useTabs";

type TabsState = UseTabsReturn["state"];
const TabsStateContext = createContext<TabsState | undefined>(undefined);

export function TabsStateProvider({
  value,
  children,
}: {
  value: TabsState;
  children: ReactNode;
}) {
  return (
    <TabsStateContext.Provider value={value}>
      {children}
    </TabsStateContext.Provider>
  );
}

export function useTabsState() {
  const value = useContext(TabsStateContext);

  if (!value) {
    throw new Error("useTabsState 는 Tabs 컴포넌트 안에서 쓰여야 합니다");
  }

  return value;
}
