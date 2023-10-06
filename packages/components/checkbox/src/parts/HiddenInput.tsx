import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";
import { useCheckboxContext } from "../checkbox-provider";

type HiddenInputProps = ComponentPropsWithoutRef<typeof dive.input>;
export const HiddenInput = forwardRef<HTMLInputElement, HiddenInputProps>(
  (props, ref) => {
    const context = useCheckboxContext();

    const { hiddenInputProps } = context.props;

    const mergedProps = mergeProps(hiddenInputProps, props);
    return (
      <dive.input
        {...mergedProps}
        onChange={composeEventHandlers(
          props.onChange,
          hiddenInputProps.onChange
        )}
        ref={ref}
      />
    );
  }
);

HiddenInput.displayName = "Checkbox.HiddenInput";
