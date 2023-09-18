import { ItemValueProvider } from "./item-value-provider";
import { Root, Heading, Trigger, Panel } from "./parts";
import { ServiceProvider } from "./service-provider";

export const Accordion = Object.assign(
  {},
  {
    Provider: ServiceProvider,
    ItemProvider: ItemValueProvider,
    Root,
    Heading,
    Trigger,
    Panel,
  }
);
