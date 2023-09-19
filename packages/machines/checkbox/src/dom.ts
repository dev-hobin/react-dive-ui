import { Context } from "./types";

export const dom = {
  getControlId: (context: Context) => `checkbox::control::${context.id}`,
  getLabelId: (context: Context) => `checkbox::label::${context.id}`,
  getHiddenInputId: (context: Context) =>
    `checkbox::hidden-input::${context.id}`,

  getHiddenInputEl: (context: Context) =>
    document.getElementById(
      dom.getHiddenInputId(context)
    ) as HTMLInputElement | null,
};
