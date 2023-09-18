import { Context, Item } from "./types";

export const dom = {
  getRootId: (context: Context) => `accordion::root::${context.id}`,
  getTriggerId: (context: Context, value: Item["value"]) =>
    `accordion::trigger::${context.id}::${value}`,
  getHeadingId: (context: Context, value: Item["value"]) =>
    `accordion::heading::${context.id}::${value}`,
  getPanelId: (context: Context, value: Item["value"]) =>
    `accordion::panel::${context.id}::${value}`,

  getTriggerEls: (context: Context) => {
    const triggerValues = Array.from(context.itemMap.keys());

    const selector = triggerValues
      .map(
        (value) =>
          `#${CSS.escape(dom.getTriggerId(context, value))}:not([disabled])`
      )
      .join(", ");

    return Array.from<HTMLElement>(document.querySelectorAll(selector));
  },
};
