import { createContext, ReactNode, useContext } from "react";
import type { UseTabsReturn } from "../useTabs";

type TabsEvents = UseTabsReturn["events"];
const TabsEventsContext = createContext<TabsEvents | undefined>(undefined);

export function TabsEventsProvider({
  value,
  children,
}: {
  value: TabsEvents;
  children: ReactNode;
}) {
  return (
    <TabsEventsContext.Provider value={value}>
      {children}
    </TabsEventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(TabsEventsContext);

  if (!value) {
    throw new Error("useEvents 는 Tabs 컴포넌트 안에서 쓰여야 합니다");
  }

  return value;
}
