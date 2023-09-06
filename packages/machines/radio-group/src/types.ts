import { ActorRefFrom, StateFrom } from "xstate";
import { machine } from "./machine";

export type MachineState = StateFrom<typeof machine>;
export type MachineSend = ActorRefFrom<typeof machine>["send"];
export type MachineContext = {
  id: string;
  ids: ElementIds | null;
  value: string;
  focusedValue: string | null;
  disabled: boolean;
  orientation: "vertical" | "horizontal";
  form: FormOption | null;
};

export type ElementIds = Partial<{
  group: string;
  radio(value: string): string;
  label(value: string): string;
  indicator(value: string): string;
}>;

export type FormOption = {
  name: string;
  required?: boolean;
  readonly?: boolean;
};

export type MachineEvent =
  | { type: "RADIO.FOCUS"; value: string }
  | { type: "RADIO.BLUR" }
  | { type: "RADIO.SELECT"; value: string }
  | { type: "RADIO.SELECT.NEXT" }
  | { type: "RADIO.SELECT.PREV" }
  | { type: "CONTEXT.SET"; context: Partial<MachineContext> };

export type ChangeDetails = {
  value: string | null;
};

export type FocusChangeDetails = {
  value: string | null;
};
