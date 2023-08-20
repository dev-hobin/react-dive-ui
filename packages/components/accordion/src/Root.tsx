import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import {
  AccordionOption,
  UseAccordionReturn,
  useAccordion,
} from "./useAccordion";
import { useAccordionProps } from "./useAccordionProps";
import {
  AccordionEventsProvider,
  AccordionPropsProvider,
  AccordionStateProvider,
} from "./providers";
import { mergeProps } from "@react-dive-ui/merge-props";

type CommonProps = ComponentPropsWithoutRef<typeof dive.div>;
type ConditionalProps =
  | {
      logic?: never;
      option: AccordionOption;
    }
  | {
      logic: UseAccordionReturn;
      option?: never;
    };

type RootProps = CommonProps & ConditionalProps;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const { logic, option, ...restProps } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const accordion = logic ?? useAccordion(option);
  const componentProps = useAccordionProps(accordion);

  const mergedProps = mergeProps(componentProps.rootProps, restProps);

  return (
    <AccordionEventsProvider value={accordion.events}>
      <AccordionStateProvider value={accordion.state}>
        <AccordionPropsProvider value={componentProps}>
          <dive.div {...mergedProps} ref={ref} />
        </AccordionPropsProvider>
      </AccordionStateProvider>
    </AccordionEventsProvider>
  );
});

Root.displayName = "Accordion.Root";
