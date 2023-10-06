import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { useDialogContext } from "../dialog-provider";

type BackdropProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  (props, ref) => {
    const context = useDialogContext();
    const { backdropProps } = context.props;

    const mergedProps = mergeProps(backdropProps, props);
    return <dive.div {...mergedProps} ref={ref} />;
  }
);

Backdrop.displayName = "Dialog.Backdrop";
