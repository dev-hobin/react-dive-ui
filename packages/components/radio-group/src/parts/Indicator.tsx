import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadio } from "../providers/radio";
import { useRadioGroupStore } from "../providers/radio-group";
import { mergeProps } from "@react-dive-ui/merge-props";

type IndicatorProps = ComponentPropsWithoutRef<typeof dive.span>;
export const Indicator = forwardRef<HTMLElement, IndicatorProps>(
  (props, ref) => {
    const radio = useRadio();
    const store = useRadioGroupStore();

    const { getIndicatorProps } = store.props;

    const mergedProps = mergeProps(
      getIndicatorProps(radio.value, radio.disabled),
      props
    );
    return <dive.span {...mergedProps} ref={ref} />;
  }
);

Indicator.displayName = "RadioGroup.Indicator";
