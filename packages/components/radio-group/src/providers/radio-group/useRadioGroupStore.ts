import { useContext } from "react";
import { RadioGroupStoreContext } from "./context";

export function useRadioGroupStore() {
  const store = useContext(RadioGroupStoreContext);
  if (!store) throw new Error("RadioGroupStoreProvider를 찾지 못했습니다.");
  return store;
}
