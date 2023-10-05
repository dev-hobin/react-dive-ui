import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { ItemProp } from "@react-dive-ui/tabs-machine";
import { useTabsContext } from "../tabs-provider";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  keyof ItemProp
> &
  ItemProp;

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { value, disabled = false, ...restProps } = props;
    const context = useTabsContext();

    const { getTriggerProps } = context.props;
    return (
      <dive.button
        {...getTriggerProps({ value, disabled })}
        {...restProps}
        ref={ref}
      />
    );
  }
);

Trigger.displayName = "Tabs.Trigger";
