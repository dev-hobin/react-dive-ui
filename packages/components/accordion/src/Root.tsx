import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { AccordionEventsProvider, AccordionStateProvider } from "./providers";
import {
  AccordionOption,
  UseAccordionReturn,
  useAccordion,
} from "./useAccordion";

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
  const { events, state } = logic ?? useAccordion(option);

  return (
    <AccordionEventsProvider value={events}>
      <AccordionStateProvider value={state}>
        <dive.div {...restProps} ref={ref} />
      </AccordionStateProvider>
    </AccordionEventsProvider>
  );
});
Root.displayName = "Accordion.Root";
