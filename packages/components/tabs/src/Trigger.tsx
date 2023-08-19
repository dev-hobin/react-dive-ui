import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useProps } from "./providers";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "../../../utils/composeEventHandlers/dist";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value"
> & {
  value: string;
};
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { value, ...restProps } = props;
    const { getTriggerProps } = useProps();
    const { onClick, ...triggerProps } = getTriggerProps(value);

    const mergedProps = mergeProps(triggerProps, restProps);

    return (
      <dive.button
        type="button"
        {...mergedProps}
        ref={ref}
        onClick={composeEventHandlers(props.onClick, onClick)}
      />
    );
  }
);

Trigger.displayName = "Tabs.Trigger";
