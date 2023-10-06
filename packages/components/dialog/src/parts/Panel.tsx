import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useDialogContext } from "../dialog-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type PanelProps = ComponentPropsWithoutRef<typeof dive.article>;
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const context = useDialogContext();
  const { panelProps } = context.props;

  const mergedProps = mergeProps(panelProps, props);
  return <dive.article {...mergedProps} ref={ref} />;
});

Panel.displayName = "Dialog.Panel";
