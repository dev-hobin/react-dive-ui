import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { usePopoverContext } from "../popover-provider";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";

type CloseProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Close = forwardRef<HTMLButtonElement, CloseProps>((props, ref) => {
  const context = usePopoverContext();
  const { closeProps } = context.props;

  const mergedProps = mergeProps(closeProps, props);
  return (
    <dive.button
      {...mergedProps}
      onClick={composeEventHandlers(props.onClick, closeProps.onClick)}
      ref={ref}
    />
  );
});

Close.displayName = "Popover.Close";
