import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useAccordionEvents, useItem } from "./providers";

type TriggerProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>((props) => {
  const { toggle } = useAccordionEvents();
  const item = useItem();

  return (
    <dive.button
      {...props}
      onClick={(ev) => {
        props.onClick?.(ev);
        if (!ev.defaultPrevented) {
          toggle(item.value);
        }
      }}
      onKeyDown={(ev) => {
        props.onKeyDown?.(ev);
        if (!ev.defaultPrevented) {
        }
      }}
    />
  );
});
Trigger.displayName = "Accordion.Trigger";
