import { Context } from "./types";

export const dom = {
  getPanelId: (context: Context) => `dialog::${context.id}::panel`,

  getPanelEl: (context: Context) => {
    return document.getElementById(dom.getPanelId(context));
  },
};
