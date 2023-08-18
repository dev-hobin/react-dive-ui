import {
  ComponentPropsWithoutRef,
  forwardRef,
  useLayoutEffect,
  useRef,
} from "react";
import { ItemProvider, useAccordionEvents, useProps } from "./providers";
import { dive } from "@react-dive-ui/dive";

type ItemProps = ComponentPropsWithoutRef<typeof dive.section> & {
  value: string;
  disabled?: boolean;
};
export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { value, disabled, ...restProps } = props;
  const { _send } = useAccordionEvents();
  const { getItemProps } = useProps();

  const initial = useRef({ value, isDisabled: disabled });

  useLayoutEffect(() => {
    _send({
      type: "ITEM.REGISTER",
      item: {
        value: initial.current.value,
        isDisabled: initial.current.isDisabled ?? false,
      },
    });

    return () => {
      _send({ type: "ITEM.UNREGISTER", value: initial.current.value });
    };
  }, [_send]);

  return (
    <ItemProvider value={value}>
      <dive.section {...restProps} {...getItemProps(value)} ref={ref} />
    </ItemProvider>
  );
});

Item.displayName = "Accordion.Item";
