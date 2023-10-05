import { useContext } from "react";
import { PopoverContext } from "./PopoverProvider";

export function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverProvider를 찾지 못했습니다");
  return context;
}
