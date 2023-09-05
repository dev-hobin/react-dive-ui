import { MachineContext } from "./types";

export const dom = {
  getRootId: (context: MachineContext) =>
    context.ids?.root ?? `tabs:${context.id}`,
  getListId: (context: MachineContext) =>
    context.ids?.list ?? `tabs:${context.id}:list`,
  getTriggerId: (context: MachineContext, value: string) =>
    context.ids?.trigger?.(value) ?? `tabs:${context.id}:trigger:${value}`,
  getPanelId: (context: MachineContext, value: string) =>
    context.ids?.panel?.(value) ?? `tabs:${context.id}:panel:${value}`,

  getRootEl: (context: MachineContext) =>
    document.getElementById(dom.getRootId(context)),
  getTriggerEls: (context: MachineContext) => {
    return Array.from<HTMLElement>(
      dom
        .getRootEl(context)
        ?.querySelectorAll(
          `[aria-controls][data-part='trigger']:not([disabled])`
        ) ?? []
    );
  },
  getTriggerEl: (context: MachineContext, value: string) =>
    document.getElementById(dom.getTriggerId(context, value)),
  getFirstTriggerEl: (context: MachineContext) => {
    return dom.getTriggerEls(context)[0];
  },
  getLastTriggerEl: (context: MachineContext) => {
    return dom.getTriggerEls(context).at(-1);
  },
  getPanelEl: (context: MachineContext, value: string) =>
    document.getElementById(dom.getPanelId(context, value)),
};
