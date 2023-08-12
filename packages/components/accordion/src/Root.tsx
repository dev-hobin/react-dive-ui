import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { AccordionEventsProvider, AccordionStateProvider } from "./providers";

import { type AccordionOption, useAccordion } from "./useAccordion";
import { type MultipleAccordion, SingleAccordion } from "./types";

type RootProps = Omit<
  ComponentPropsWithoutRef<typeof dive.div>,
  "defaultValue"
> &
  AccordionOption;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  if (props.type === "single") {
    return <SingleAccordionRoot {...props} ref={ref} />;
  } else {
    return <MultipleAccordionRoot {...props} ref={ref} />;
  }
});
Root.displayName = "Accordion.Root";

type SingleAccordionRootProps = Omit<
  ComponentPropsWithoutRef<typeof dive.div>,
  "defaultValue"
> &
  SingleAccordion;
const SingleAccordionRoot = forwardRef<
  HTMLDivElement,
  SingleAccordionRootProps
>((props, ref) => {
  const {
    type,
    collapsible,
    defaultValue,
    disabled,
    orientation,

    ...restProps
  } = props;

  const { state, events } = useAccordion({
    type,
    collapsible,
    defaultValue,
    disabled,
    orientation,
  });

  console.log(state);

  return (
    <AccordionEventsProvider value={events}>
      <AccordionStateProvider value={state}>
        <dive.div {...restProps} ref={ref} />
      </AccordionStateProvider>
    </AccordionEventsProvider>
  );
});

type MultipleAccordionRootProps = Omit<
  ComponentPropsWithoutRef<typeof dive.div>,
  "defaultValue"
> &
  MultipleAccordion;
const MultipleAccordionRoot = forwardRef<
  HTMLDivElement,
  MultipleAccordionRootProps
>((props, ref) => {
  const {
    type,
    defaultValue,
    disabled,
    orientation,

    ...restProps
  } = props;

  const { state, events } = useAccordion({
    type,
    defaultValue,
    disabled,
    orientation,
  });

  return (
    <AccordionEventsProvider value={events}>
      <AccordionStateProvider value={state}>
        <dive.div {...restProps} ref={ref} />
      </AccordionStateProvider>
    </AccordionEventsProvider>
  );
});
