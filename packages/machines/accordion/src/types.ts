import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type Item = {
  value: string;
  disabled: boolean;
};

export type Orientation = "vertical" | "horizontal";

export type Status = "idle" | "focused";

export type Context = {
  id: string;
  type: "single" | "multiple";
  focusedValue: Item["value"] | null;
  expandedValues: Item["value"][];
  collapsible: boolean;
  orientation: Orientation;
};

export type Input = Pick<Context, "id" | "type"> &
  Partial<Pick<Context, "expandedValues" | "collapsible" | "orientation">>;

export type Events =
  | { type: "ITEM.EXPAND"; value: Item["value"] }
  | { type: "ITEM.COLLAPSE"; value: Item["value"] }
  | { type: "ITEM.TOGGLE"; value: Item["value"] }
  | { type: "TRIGGER.FOCUSED"; value: Item["value"] }
  | { type: "TRIGGER.BLURRED" }
  | { type: "TRIGGER.FOCUS.NEXT" }
  | { type: "TRIGGER.FOCUS.PREV" };

export type Actions =
  | { type: "addToExpandedValues"; params: { value: Item["value"] } }
  | { type: "removeFromExpandedValues"; params: { value: Item["value"] } }
  | { type: "toggleValueInExpandedValues"; params: { value: Item["value"] } }
  | { type: "resetExpandedValuesWith"; params: { value: Item["value"] } }
  | { type: "setFocusedValue"; params: { value: Item["value"] | null } }
  | { type: "focusNextTrigger" }
  | { type: "focusPrevTrigger" }
  | { type: "onChange" };

export type Guards =
  | { type: "isItemDisabled"; params: { value: Item["value"] } }
  | { type: "isExpandedItem"; params: { value: Item["value"] } }
  | { type: "isSingleType" }
  | { type: "hasExpandedItem" }
  | { type: "isCollapsible" };

export type Service = ActorRefFrom<typeof machine>;
