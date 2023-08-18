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

type CommonProps = ComponentPropsWithoutRef<typeof dive.div>;
type ConditionalProps =
  | {
      logic?: undefined;
      option: AccordionOption;
    }
  | {
      logic: UseAccordionReturn;
      option?: never;
    };

type RootProps = CommonProps & ConditionalProps;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const { logic, option, ...restProps } = props;
  const accordion = logic ?? useAccordion(option);
  const componentProps = useAccordionProps(accordion);

  return (
    <AccordionEventsProvider value={accordion.events}>
      <AccordionStateProvider value={accordion.state}>
        <AccordionPropsProvider value={componentProps}>
          <dive.div {...restProps} {...componentProps.rootProps} ref={ref} />
        </AccordionPropsProvider>
      </AccordionStateProvider>
    </AccordionEventsProvider>
  );
});

Root.displayName = "Accordion.Root";
