import { ActorRefFrom, StateFrom } from "xstate";
import { machine } from "./machine";

export type MachineState = StateFrom<typeof machine>;

export type MachineSend = ActorRefFrom<typeof machine>["send"];

export type MachineContext = {
  id: string;
  ids: ElementIds | null;
  type: "single" | "multiple";
  expandedValues: string[];
  collapsible: boolean;
  orientation: "vertical" | "horizontal";
  focusedValue: string | null;
};

export type MachineGuard =
  | { type: "isItemExpanded"; params: { value: string } }
  | { type: "isSingleType" }
  | { type: "isCollapsible" }
  | { type: "isLastTrigger" }
  | { type: "isFirstTrigger" };

export type MachineAction =
  | { type: "switchItem"; params: { value: string } }
  | { type: "expandItem"; params: { value: string } }
  | { type: "collapseItem"; params: { value: string } }
  | { type: "setFocusedItem"; params: { value: string } }
  | { type: "unsetFocusedItem" }
  | { type: "focusNextTrigger" }
  | { type: "focusPrevTrigger" }
  | { type: "focusFirstTrigger" }
  | { type: "focusLastTrigger" }
  // template
  | { type: "onChange" }
  | { type: "onFocusChange" };

export type UserInput = Required<Pick<MachineContext, "id" | "type">> &
  Partial<
    Pick<
      MachineContext,
      "ids" | "expandedValues" | "collapsible" | "orientation"
    >
  >;

export type ElementIds = Partial<{
  root: string;
  item(value: string): string;
  heading(value: string): string;
  trigger(value: string): string;
  panel(value: string): string;
}>;

export type MachineEvent =
  | { type: "TRIGGER.FOCUS"; value: string }
  | { type: "TRIGGER.BLUR" }
  | { type: "TRIGGER.FOCUS.NEXT" }
  | { type: "TRIGGER.FOCUS.PREV" }
  | { type: "TRIGGER.FOCUS.FIRST" }
  | { type: "TRIGGER.FOCUS.LAST" }
  | { type: "ITEM.TOGGLE"; value: string }
  | { type: "ITEM.EXPAND"; value: string }
  | { type: "ITEM.COLLAPSE"; value: string };

export type ChangeDetails = {
  value: string[];
};

export type FocusChangeDetails = {
  value: string | null;
};
