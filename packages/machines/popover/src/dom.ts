import { Context } from "./types";

export const dom = {
  getTriggerId: (context: Context) => `popover::${context.id}::trigger`,
  getArrowId: (context: Context) => `popover::${context.id}::arrow`,
  getPanelId: (context: Context) => `popover::${context.id}::panel`,
  getCloseId: (context: Context) => `popover::${context.id}::close`,
  getTitleId: (context: Context) => `popover::${context.id}::title`,
  getDescriptionId: (context: Context) => `popover::${context.id}::description`,

  getTriggerEl: (context: Context) =>
    document.getElementById(dom.getTriggerId(context)),
  getArrowEl: (context: Context) =>
    document.getElementById(dom.getArrowId(context)),
  getPanelEl: (context: Context) =>
    document.getElementById(dom.getPanelId(context)),
  getTitleEl: (context: Context) =>
    document.getElementById(dom.getTitleId(context)),
  getDescriptionEl: (context: Context) =>
    document.getElementById(dom.getDescriptionId(context)),
};
