import { Context } from "./types";

export const dom = {
  getControlId: (context: Context, value: string) =>
    `checkbox::control::${context.id}::${value}`,
  getLabelId: (context: Context, value: string) =>
    `checkbox::label::${context.id}::${value}`,
  getHiddenInputId: (context: Context, value: string) =>
    `checkbox::hidden-input::${context.id}::${value}`,
};
