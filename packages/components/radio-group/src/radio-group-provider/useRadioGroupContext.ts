import { useContext } from "react";
import { RadioGroupContext } from "./RadioGroupProvider";

export function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error("RadioGroupProvider를 찾지 못했습니다");
  return context;
}
