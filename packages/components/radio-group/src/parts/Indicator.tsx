import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type IndicatorProps = Omit<
  ComponentPropsWithoutRef<typeof dive.div>,
  "value"
> & {
  value: string;
};
export const Indicator = forwardRef<HTMLElement, IndicatorProps>(
  (props, ref) => {
    return <dive.span {...props} ref={ref} />;
  }
);

Indicator.displayName = "RadioGroup.Indicator";
