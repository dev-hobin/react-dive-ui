import {
  ComponentPropsWithoutRef,
  forwardRef,
  useLayoutEffect,
  useRef,
} from "react";
import { ItemProvider, useAccordionEvents, useProps } from "./providers";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { useLatestValue } from "@react-dive-ui/use-latest-value";

type ItemProps = ComponentPropsWithoutRef<typeof dive.section> & {
  value: string;
  disabled?: boolean;
};
export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { value, disabled, ...restProps } = props;
  const initialProps = useLatestValue({ value, disabled });

  const { _send } = useAccordionEvents();
  const { getItemProps } = useProps();

  const mergedProps = mergeProps(getItemProps(initialProps.value), restProps);

  useLayoutEffect(() => {
    const { value, disabled } = initialProps;

    _send({
      type: "ITEM.REGISTER",
      item: {
        value,
        isDisabled: disabled ?? false,
      },
    });

    return () => {
      _send({ type: "ITEM.UNREGISTER", value });
    };
  }, [initialProps, _send]);

  return (
    <ItemProvider value={value}>
      <dive.section {...mergedProps} ref={ref} />
    </ItemProvider>
  );
});

Item.displayName = "Accordion.Item";
