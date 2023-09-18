import { forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useService } from "../service-provider";
import { useItemValue } from "../item-value-provider";

import type { ComponentPropsWithoutRef } from "react";
import { connect, type Item } from "@react-dive-ui/accordion-machine";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value"
> & { value?: Item["value"] };
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { value, ...restProps } = props;

    const service = useService();
    const itemValue = useItemValue() ?? value;

    if (!itemValue) {
      throw new Error(
        "Accordion.Trigger 컴포넌트는 value 속성을 필요로 합니다."
      );
    }

    const { getTriggerProps } = connect(service);
    const triggerProps = getTriggerProps(itemValue);
    return (
      <dive.button
        {...triggerProps}
        {...restProps}
        ref={ref}
        onClick={() => service.send({ type: "ITEM.TOGGLE", value: itemValue })}
      />
    );
  }
);

Trigger.displayName = "Accordion.Trigger";
