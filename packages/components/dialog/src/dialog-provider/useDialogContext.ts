import { useContext } from "react";
import { DialogContext } from "./DialogProvider";

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogProvider를 찾지 못했습니다");
  return context;
}
