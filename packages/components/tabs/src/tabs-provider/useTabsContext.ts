import { useContext } from "react";
import { TabsContext } from "./TabsProvider";

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsProvider를 찾지 못했습니다");
  return context;
}
