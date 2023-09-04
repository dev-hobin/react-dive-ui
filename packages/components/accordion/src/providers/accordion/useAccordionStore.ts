import { useContext } from "react";
import { AccordionStoreContext } from "./context";

export function useAccordionStore() {
  const store = useContext(AccordionStoreContext);
  if (!store) throw new Error("AccordionStoreProvider를 찾지 못했습니다.");
  return store;
}
