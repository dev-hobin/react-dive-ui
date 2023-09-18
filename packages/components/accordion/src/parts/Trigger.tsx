import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useService } from "../service-provider";
import { useItemValue } from "../item-value-provider";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value"
> & { value?: string };
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const service = useService();
    const itemValue = useItemValue() ?? props.value;

    if (!itemValue) {
      throw new Error(
        "Accordion.Trigger 컴포넌트는 value 속성을 필요로 합니다."
      );
    }
    return (
      <dive.button
        {...props}
        ref={ref}
        onClick={() => service.send({ type: "ITEM.TOGGLE", value: itemValue })}
      />
    );
  }
);

Trigger.displayName = "Accordion.Trigger";
