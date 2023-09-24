import { Context, Item } from "./types";

export const dom = {
  getRadioId: (context: Context, value: Item["value"]) =>
    `radio-group::${context.id}::radio::${value}`,
  getLabelId: (context: Context, value: Item["value"]) =>
    `radio-group::${context.id}::label::${value}`,
};
