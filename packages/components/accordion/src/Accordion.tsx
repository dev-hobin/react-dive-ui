import { ItemProvider } from "./item-provider";
import { Root, Heading, Trigger, Panel } from "./parts";
import { ServiceProvider } from "./service-provider";

export const Accordion = Object.assign(
  {},
  {
    Provider: ServiceProvider,
    ItemProvider,
    Root,
    Heading,
    Trigger,
    Panel,
  }
);
