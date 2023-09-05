import { ActorRefFrom, StateFrom } from "xstate";
import { machine } from "./machine";

export type MachineState = StateFrom<typeof machine>;
export type MachineSend = ActorRefFrom<typeof machine>["send"];
export type MachineContext = {
  id: string;
  ids?: ElementIds;
  value: string | null;
  focusedValue: string | null;
  orientation: "horizontal" | "vertical";
  activationMode: "automatic" | "manual";
};

export type ElementIds = Partial<{
  root: string;
  list: string;
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
  | { type: "TRIGGER.ACTIVATE"; value: string }
  | { type: "PANEL.FOCUS.CURRENT" }
  | { type: "CONTEXT.SET"; context: Partial<MachineContext> };
