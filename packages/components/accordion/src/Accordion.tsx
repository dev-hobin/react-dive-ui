import { Root } from "./Root";
import { Content } from "./Content";
import { Heading } from "./Heading";
import { Item } from "./Item";
import { Trigger } from "./Trigger";

export const Accordion = Object.assign(Root, {
  Content,
  Heading,
  Item,
  Trigger,
});

Accordion.displayName = "Accordion";
