import { useContext } from "react";
import { CheckboxContext } from "./CheckboxProvider";

export function useCheckboxContext() {
  const context = useContext(CheckboxContext);
  if (!context) throw new Error("CheckboxProvider를 찾지 못했습니다");
  return context;
}
