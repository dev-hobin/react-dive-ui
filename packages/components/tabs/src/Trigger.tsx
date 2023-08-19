import {
  ComponentPropsWithoutRef,
  forwardRef,
  useLayoutEffect,
  useRef,
} from "react";
import { dive } from "@react-dive-ui/dive";
import { useEvents, useProps, useTabsState } from "./providers";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "../../../utils/composeEventHandlers/dist";
import { useLatestValue } from "@react-dive-ui/use-latest-value";

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
    const initialProps = useLatestValue({ value, disabled });

    const events = useEvents();
    const { getTriggerProps } = useProps();
    const { onClick, onKeyDown, ...triggerProps } = getTriggerProps(value);
    const mergedProps = mergeProps(triggerProps, restProps);

    useLayoutEffect(() => {
      if (initialProps.disabled === undefined) return;
      const { value, disabled } = initialProps;
      events.setTabDisabled(value, disabled);
    }, [initialProps, events.setTabDisabled]);

    return (
      <dive.button
        {...mergedProps}
        ref={ref}
        onClick={composeEventHandlers(props.onClick, onClick)}
        onKeyDown={composeEventHandlers(props.onKeyDown, onKeyDown)}
      />
    );
  }
);

Trigger.displayName = "Tabs.Trigger";
