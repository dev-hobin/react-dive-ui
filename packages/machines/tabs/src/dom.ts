import { Context, Item } from "./types";

export const dom = {
  getRootId: (context: Context) => `tabs::root::${context.id}`,
  getTriggerId: (context: Context, value: Item["value"]) =>
    `tabs::trigger::${context.id}::${value}`,
  getPanelId: (context: Context, value: Item["value"]) =>
    `tabs::panel::${context.id}::${value}`,
  getListId: (context: Context, value: Item["value"]) =>
    `tabs::list::${context.id}::${value}`,

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
