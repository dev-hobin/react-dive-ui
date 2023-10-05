import { useContext } from "react";
import { AccordionContext } from "./AccordionProvider";

export function useAccordionContext() {
  const accordion = useContext(AccordionContext);
  if (!accordion) throw new Error("AccordionProvider를 찾지 못했습니다");
  return accordion;
}
