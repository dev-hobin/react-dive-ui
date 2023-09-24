import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type RadioProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Radio = forwardRef<HTMLButtonElement, RadioProps>((props, ref) => {
  return <dive.button {...props} ref={ref} />;
});

Radio.displayName = "RadioGroup.Radio";
