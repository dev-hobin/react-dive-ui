import { createContext, ReactNode, useContext } from "react";
import type { TabsProps } from "../useTabsProps";

const TabsPropsContext = createContext<TabsProps | undefined>(undefined);

export function TabsPropsProvider({
  value,
  children,
}: {
  value: TabsProps;
  children: ReactNode;
}) {
  return (
    <TabsPropsContext.Provider value={value}>
      {children}
    </TabsPropsContext.Provider>
  );
}

export function useProps() {
  const value = useContext(TabsPropsContext);

  if (!value) {
    throw new Error("useProps 는 Tabs 컴포넌트 안에서 쓰여야 합니다");
  }

  return value;
}
