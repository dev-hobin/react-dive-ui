import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadioGroupContext } from "../radio-group-provider";
import { useItem } from "../item-provider";

type RadioProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Radio = forwardRef<HTMLButtonElement, RadioProps>((props, ref) => {
  const context = useRadioGroupContext();
  const item = useItem();

  const { getRadioProps } = context.props;
  return <dive.button {...getRadioProps(item)} {...props} ref={ref} />;
});

Radio.displayName = "RadioGroup.Radio";
