import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadioGroupContext } from "../radio-group-provider";
import { useItem } from "../item-provider";

type RadioProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Radio = forwardRef<HTMLButtonElement, RadioProps>((props, ref) => {
  const context = useRadioGroupContext();
  const item = useItem();

  const { getRadioProps } = context.props;
  const radioProps = getRadioProps(item);

  const mergedProps = mergeProps(radioProps, props);
  return (
    <dive.button
      {...mergedProps}
      onFocus={composeEventHandlers(props.onFocus, radioProps.onFocus)}
      onBlur={composeEventHandlers(props.onBlur, radioProps.onBlur)}
      onClick={composeEventHandlers(props.onClick, radioProps.onClick)}
      onKeyDown={composeEventHandlers(props.onKeyDown, radioProps.onKeyDown)}
      ref={ref}
    />
  );
});

Radio.displayName = "RadioGroup.Radio";
