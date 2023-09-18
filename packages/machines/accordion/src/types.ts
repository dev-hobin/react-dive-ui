import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type Item = {
  value: string;
  disabled: boolean;
};

export type Orientation = "vertical" | "horizontal";

export type Context = {
  id: string;
  type: "single" | "multiple";
  focusedValue: Item["value"] | null;
  expandedValues: Item["value"][];
  itemMap: Map<Item["value"], Item>;
  collapsible: boolean;
  orientation: Orientation;
};

export type Input = Pick<Context, "id" | "type"> &
  Partial<
    Pick<Context, "expandedValues" | "itemMap" | "collapsible" | "orientation">
  >;

export type Events =
  | { type: "ITEM.EXPAND"; value: Item["value"] }
  | { type: "ITEM.COLLAPSE"; value: Item["value"] }
  | { type: "ITEM.TOGGLE"; value: Item["value"] }
  | { type: "SET.ITEM.DISABLED"; value: Item["value"]; disabled: boolean };

export type Actions =
  | { type: "addToExpandedValues"; params: { value: Item["value"] } }
  | { type: "removeFromExpandedValues"; params: { value: Item["value"] } }
  | { type: "toggleValueInExpandedValues"; params: { value: Item["value"] } }
  | { type: "resetExpandedValuesWith"; params: { value: Item["value"] } }
  | {
      type: "setItemDisabled";
      params: { value: Item["value"]; disabled: boolean };
    };

export type Guards =
  | { type: "isItemDisabled"; params: { value: Item["value"] } }
  | { type: "isExpandedItem"; params: { value: Item["value"] } }
  | { type: "isSingleType" }
  | { type: "hasExpandedItem" }
  | { type: "isCollapsible" };

export type Service = ActorRefFrom<typeof machine>;
