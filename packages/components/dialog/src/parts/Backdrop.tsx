import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useDialogContext } from "../dialog-provider";

type BackdropProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  (props, ref) => {
    const context = useDialogContext();

    const { backdropProps } = context.props;
    return <dive.div {...backdropProps} {...props} ref={ref} />;
  }
);

Backdrop.displayName = "Dialog.Backdrop";
