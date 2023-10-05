import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useRadioGroupContext } from "../radio-group-provider";
import { useItem } from "../item-provider";

type IndicatorProps = ComponentPropsWithoutRef<typeof dive.span>;
export const Indicator = forwardRef<HTMLElement, IndicatorProps>(
  (props, ref) => {
    const context = useRadioGroupContext();
    const item = useItem();

    const { getIndicatorProps } = context.props;
    return <dive.span {...getIndicatorProps(item)} {...props} ref={ref} />;
  }
);

Indicator.displayName = "RadioGroup.Indicator";
