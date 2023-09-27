import { Context } from "./types";

export const dom = {
  getPanelId: (context: Context) => `dialog::${context.id}::panel`,
  getTriggerId: (context: Context) => `dialog::${context.id}::trigger`,

  getPanelEl: (context: Context) => {
    return document.getElementById(dom.getPanelId(context));
  },
  getTriggerEl: (context: Context) => {
    return document.getElementById(dom.getTriggerId(context));
  },
};
