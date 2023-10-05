import { Context, Item } from "./types";

export const dom = {
  getGroupId: (context: Context) => `radio-group::${context.id}::group`,
  getRadioId: (context: Context, value: Item["value"]) =>
    `radio-group::${context.id}::radio::${value}`,
  getLabelId: (context: Context, value: Item["value"]) =>
    `radio-group::${context.id}::label::${value}`,
  getHiddenInputId: (context: Context, value: Item["value"]) =>
    `radio-group::${context.id}::hidden-input::${value}`,

  getRadioEl: (context: Context, value: Item["value"]) => {
    const selector = `#${CSS.escape(
      dom.getRadioId(context, value)
    )}:not([disabled])`;

    return document.querySelector<HTMLElement>(selector);
  },
  getRadioEls: (context: Context) => {
    return Array.from<HTMLElement>(
      document.querySelectorAll(
        `[data-ownedby=${CSS.escape(dom.getGroupId(context))}]:not([disabled])`
      )
    );
  },
};
