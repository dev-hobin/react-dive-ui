import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type Item = {
  value: string;
  disabled: boolean;
};

export type Orientation = "vertical" | "horizontal";

export type ActivationMode = "manual" | "automatic";

export type Context = {
  id: string;
  value: Item["value"];
  focusedValue: Item["value"] | null;
  itemMap: Map<Item["value"], Item>;
  activationMode: ActivationMode;
  orientation: Orientation;
};

export type Events =
  | { type: "TRIGGER.FOCUSED"; value: Item["value"] }
  | { type: "TRIGGER.BLURRED" }
  | { type: "TRIGGER.FOCUS.NEXT" }
  | { type: "TRIGGER.FOCUS.PREV" }
  | { type: "ITEM.ACTIVATE"; value: Item["value"] }
  | { type: "SET.ITEM.DISABLED"; value: Item["value"]; disabled: boolean };

export type Actions =
  | {
      type: "setFocusedValue";
      params: { value: Item["value"] | null };
    }
  | { type: "focusNextTrigger" }
  | { type: "focusPrevTrigger" }
  | { type: "setValue"; params: { value: Item["value"] } }
  | { type: "onChange" }
  | {
      type: "setItemDisabled";
      params: { value: Item["value"]; disabled: boolean };
    };

export type Guards =
  | {
      type: "isItemDisabled";
      params: { value: Item["value"] };
    }
  | { type: "isAutomaticMode" };

export type Input = Pick<Context, "id" | "value"> &
  Partial<
    Pick<Context, "value" | "itemMap" | "activationMode" | "orientation">
  >;

export type Service = ActorRefFrom<typeof machine>;
