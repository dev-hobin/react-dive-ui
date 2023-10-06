import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useRadioGroupContext } from "../radio-group-provider";
import { useItem } from "../item-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type IndicatorProps = ComponentPropsWithoutRef<typeof dive.span>;
export const Indicator = forwardRef<HTMLElement, IndicatorProps>(
  (props, ref) => {
    const context = useRadioGroupContext();
    const item = useItem();

    const { getIndicatorProps } = context.props;
    const indicatorProps = getIndicatorProps(item);

    const mergedProps = mergeProps(indicatorProps, props);
    return <dive.span {...mergedProps} ref={ref} />;
  }
);

Indicator.displayName = "RadioGroup.Indicator";
