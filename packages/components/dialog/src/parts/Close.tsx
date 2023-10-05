import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useDialogContext } from "../dialog-provider";

type CloseProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Close = forwardRef<HTMLButtonElement, CloseProps>((props, ref) => {
  const context = useDialogContext();

  const { closeProps } = context.props;
  return <dive.button {...closeProps} {...props} ref={ref} />;
});

Close.displayName = "Dialog.Close";
