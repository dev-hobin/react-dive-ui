import { Context } from "./types";

export const dom = {
  getPanelId: (context: Context) => `dialog::${context.id}::panel`,
  getBackdropId: (context: Context) => `dialog::${context.id}::backdrop`,
  getTriggerId: (context: Context) => `dialog::${context.id}::trigger`,
  getCloseId: (context: Context) => `dialog::${context.id}::close`,
  getTitleId: (context: Context) => `dialog::${context.id}::title`,
  getDescriptionId: (context: Context) => `dialog::${context.id}::description`,

  getPanelEl: (context: Context) => {
    return document.getElementById(dom.getPanelId(context));
  },
  getTriggerEl: (context: Context) => {
    return document.getElementById(dom.getTriggerId(context));
  },
};
