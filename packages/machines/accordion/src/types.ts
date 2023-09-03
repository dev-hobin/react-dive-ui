import { ActorRefFrom, StateFrom } from "xstate";
import { machine } from "./machine";

export type MachineState = StateFrom<typeof machine>;
export type MachineSend = ActorRefFrom<typeof machine>["send"];
export type MachineContext = {
  id: string;
  ids?: ElementIds;
  type: "single" | "multiple";
  expandedValues: string[];
  collapsible: boolean;
  orientation: "vertical" | "horizontal";
  focusedValue: string | null;
};

type ElementIds = {
  root: string;
  item(value: string): string;
  trigger(value: string): string;
  panel(value: string): string;
};

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
