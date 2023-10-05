import { ItemProvider } from "./item-provider";
import { Root, Heading, Trigger, Panel } from "./parts";
import { AccordionProvider } from "./accordion-provider";

export const Accordion = Object.assign(
  {},
  {
    Provider: AccordionProvider,
    ItemProvider,
    Root,
    Heading,
    Trigger,
    Panel,
  }
);
