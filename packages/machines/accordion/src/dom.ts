import { Context, Item } from "./types";

export const dom = {
  getRootId: (context: Context) => `accordion::root::${context.id}`,
  getTriggerId: (context: Context, value: Item["value"]) =>
    `accordion::trigger::${context.id}::${value}`,
  getHeadingId: (context: Context, value: Item["value"]) =>
    `accordion::heading::${context.id}::${value}`,
  getPanelId: (context: Context, value: Item["value"]) =>
    `accordion::panel::${context.id}::${value}`,
};
