import { useContext } from "react";
import { TabsStoreContext } from "./context";

export function useTabsStore() {
  const store = useContext(TabsStoreContext);
  if (!store) throw new Error("TabsStoreProvider를 찾지 못했습니다.");
  return store;
}
