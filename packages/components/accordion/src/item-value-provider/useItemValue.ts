import { useContext } from "react";
import { ItemValueContext } from "./ItemValueProvider";

export function useItemValue() {
  const value = useContext(ItemValueContext);
  return value;
}
