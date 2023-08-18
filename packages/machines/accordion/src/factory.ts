import { AccordionItem } from "./types";

export function createIdFactory(id: string) {
  return {
    createRootId: () => id,
    createHeadingId: (value: AccordionItem["value"]) =>
      `accordion::${id}::heading::${value}`,
    createTriggerId: (value: AccordionItem["value"]) =>
      `accordion::${id}::trigger::${value}`,
    createItemId: (value: AccordionItem["value"]) =>
      `accordion::${id}::item::${value}`,
    createContentId: (value: AccordionItem["value"]) =>
      `accordion::${id}::content::${value}`,
  } as const;
}
