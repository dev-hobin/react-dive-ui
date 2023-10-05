import { useContext } from "react";
import { ItemContext } from "./ItemProvider";

export function useItem() {
  const value = useContext(ItemContext);
  if (value === undefined) {
    throw new Error("ItemProvider를 찾지 못했습니다");
  }
  return value;
}
