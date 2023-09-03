import { MachineContext } from "./types";

export const dom = {
  getRootId: (context: MachineContext) =>
    context.ids?.root ?? `accordion:${context.id}`,
  getItemId: (context: MachineContext, value: string) =>
    context.ids?.item(value) ?? `accordion:${context.id}:item:${value}`,
  getTriggerId: (context: MachineContext, value: string) =>
    context.ids?.trigger(value) ?? `accordion:${context.id}:trigger:${value}`,
  getPanelId: (context: MachineContext, value: string) =>
    context.ids?.panel(value) ?? `accordion:${context.id}:panel:${value}`,

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
};
