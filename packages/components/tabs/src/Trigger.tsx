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

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value" | "disabled"
> & {
  value: string;
  disabled?: boolean;
};
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { value, disabled } = props;

    const events = useEvents();
    const { getTriggerProps } = useProps();
    const { onClick, onKeyDown, ...triggerProps } = getTriggerProps(value);

    const initial = useRef({ value, disabled });
    useLayoutEffect(() => {
      if (initial.current.disabled === undefined) return;
      const { value, disabled } = initial.current;
      events.setTabDisabled(value, disabled);
    }, [initial, events.setTabDisabled]);

    const mergedProps = mergeProps(triggerProps, props);
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
