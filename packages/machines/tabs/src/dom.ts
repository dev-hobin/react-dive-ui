import { Context, Item } from "./types";

export const dom = {
  getRootId: (context: Context) => `tabs::root::${context.id}`,
  getListId: (context: Context) => `tabs::list::${context.id}`,
  getTriggerId: (context: Context, value: Item["value"]) =>
    `tabs::trigger::${context.id}::${value}`,
  getPanelId: (context: Context, value: Item["value"]) =>
    `tabs::panel::${context.id}::${value}`,

  getTriggerEls: (context: Context) => {
    return Array.from<HTMLElement>(
      document.querySelectorAll(
        `[data-ownedby=${CSS.escape(dom.getRootId(context))}]:not([disabled])`
      )
    );
  },
};
