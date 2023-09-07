import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { RadioProvider } from "../providers/radio";
import { useRadioGroupStore } from "../providers/radio-group";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";

type RadioProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value" | "disabled"
> & { value: string; disabled?: boolean; labelled?: boolean };
export const Radio = forwardRef<HTMLButtonElement, RadioProps>((props, ref) => {
  const { value, disabled = false, labelled = false, ...restProps } = props;

  const store = useRadioGroupStore();
  const { getRadioProps } = store.props;
  const { onClick, onFocus, onBlur, onKeyDown, ...radioProps } = getRadioProps(
    value,
    disabled,
    labelled
  );

  const mergedProps = mergeProps(radioProps, restProps);
  return (
    <RadioProvider value={value} disabled={disabled}>
      <dive.button
        {...mergedProps}
        onClick={composeEventHandlers(props.onClick, onClick)}
        onFocus={composeEventHandlers(props.onFocus, onFocus)}
        onBlur={composeEventHandlers(props.onBlur, onBlur)}
        onKeyDown={composeEventHandlers(props.onKeyDown, onKeyDown)}
        ref={ref}
      />
    </RadioProvider>
  );
});

Radio.displayName = "RadioGroup.Radio";
