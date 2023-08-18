import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useItem, useProps } from "./providers";

type TriggerProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const item = useItem();
    const { getTriggerProps } = useProps();

    return (
      <dive.button
        ref={ref}
        {...props}
        {...getTriggerProps(item.value)}
        // onClick={(ev) => {
        //   props.onClick?.(ev);
        //   if (!ev.defaultPrevented) {
        //     toggle(item.value);
        //   }
        // }}
        // onKeyDown={(ev) => {
        //   props.onKeyDown?.(ev);
        //   if (!ev.defaultPrevented) {
        //   }
        // }}
      />
    );
  }
);
Trigger.displayName = "Accordion.Trigger";
