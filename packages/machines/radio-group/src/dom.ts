import { MachineContext } from "./types";

export const dom = {
  getGroupId: (context: MachineContext) =>
    context.ids?.group ?? `radio-group:${context.id}:group`,
  getRadioId: (context: MachineContext, value: string) =>
    context.ids?.group ?? `radio-group:${context.id}:radio:${value}`,
  getLabelId: (context: MachineContext, value: string) =>
    context.ids?.group ?? `radio-group:${context.id}:label:${value}`,
  getIndicatorId: (context: MachineContext, value: string) =>
    context.ids?.group ?? `radio-group:${context.id}:indicator:${value}`,

  getGroupEl: (context: MachineContext) =>
    document.getElementById(dom.getGroupId(context)),
  getRadioEls: (context: MachineContext) => {
    return Array.from<HTMLElement>(
      dom
        .getGroupEl(context)
        ?.querySelectorAll(`[data-part='radio']:not([disabled])`) ?? []
    );
  },
  getRadioEl: (context: MachineContext, value: string) =>
    document.getElementById(dom.getRadioId(context, value)),
  getLabelEl: (context: MachineContext, value: string) =>
    document.getElementById(dom.getLabelId(context, value)),
};
