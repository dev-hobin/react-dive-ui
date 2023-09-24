import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type Item = { value: string; labelledby: boolean };
export type ItemOption = Pick<Item, "value"> &
  Partial<Pick<Item, "labelledby">>;

export type Service = ActorRefFrom<typeof machine>;
export type Status = "idle" | "focused";
export type Context = {
  id: string;
  focusedValue: Item["value"] | null;
  selectedValue: Item["value"] | null;
  itemMap: Map<Item["value"], Item>;
};
