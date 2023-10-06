import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";
import { useCheckboxContext } from "../checkbox-provider";

type ControlProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Control = forwardRef<HTMLButtonElement, ControlProps>(
  (props, ref) => {
    const context = useCheckboxContext();

    const { controlProps } = context.props;

    const mergedProps = mergeProps(controlProps, props);

    return (
      <dive.button
        {...mergedProps}
        onClick={composeEventHandlers(props.onClick, controlProps.onClick)}
        ref={ref}
      />
    );
  }
);

Control.displayName = "Checkbox.Control";
