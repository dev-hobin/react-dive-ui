import { useContext } from "react";
import { ItemContext } from "./context";

export function useItem() {
  const item = useContext(ItemContext);
  if (!item) throw new Error("ItemProvider를 찾지 못했습니다.");
  return item;
}
