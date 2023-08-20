import { ComponentPropsWithoutRef, forwardRef, useLayoutEffect } from "react";
import { dive } from "@react-dive-ui/dive";
import { useEvents, useProps } from "./providers";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "../../../utils/composeEventHandlers/dist";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value" | "disabled"
> & {
  value: string;
  disabled?: boolean;
};
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { value, disabled, ...restProps } = props;

    const { setTabDisabled } = useEvents();
    const { getTriggerProps } = useProps();
    const { onClick, onKeyDown, onFocus, onBlur, ...triggerProps } =
      getTriggerProps(value);
    const mergedProps = mergeProps(triggerProps, restProps);

    useLayoutEffect(() => {
      if (disabled === undefined) return;
      setTabDisabled(value, disabled);
    }, [disabled, setTabDisabled, value]);

    return (
      <dive.button
        {...mergedProps}
        ref={ref}
        onClick={composeEventHandlers(props.onClick, onClick)}
        onKeyDown={composeEventHandlers(props.onKeyDown, onKeyDown)}
        onFocus={composeEventHandlers(props.onFocus, onFocus)}
        onBlur={composeEventHandlers(props.onBlur, onBlur)}
      />
    );
  }
);

Trigger.displayName = "Tabs.Trigger";
