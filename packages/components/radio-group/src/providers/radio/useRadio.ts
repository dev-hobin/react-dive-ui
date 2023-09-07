import { useContext } from "react";
import { RadioContext } from "./context";

export function useRadio() {
  const value = useContext(RadioContext);
  if (!value) {
    throw new Error("RadioProvider를 찾지 못했습니다.");
  }
  return value;
}
