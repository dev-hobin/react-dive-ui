import { AccordionStoreProvider } from "./providers/accordion";
import { Root, Item, Heading, Trigger, Panel } from "./parts";

export const Accordion = Object.assign(
  {},
  { Provider: AccordionStoreProvider, Root, Item, Heading, Trigger, Panel }
);
