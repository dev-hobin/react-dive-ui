import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useDialogContext } from "../dialog-provider";

type PanelProps = ComponentPropsWithoutRef<typeof dive.article>;
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const context = useDialogContext();

  const { panelProps } = context.props;
  return <dive.article {...panelProps} {...props} ref={ref} />;
});

Panel.displayName = "Dialog.Panel";
