import { ActorRefFrom, StateFrom } from "xstate";
import { machine } from "./machine";

export type MachineState = StateFrom<typeof machine>;
export type MachineSend = ActorRefFrom<typeof machine>["send"];
export type MachineContext = {
  // TODO
};

export type ElementIds = Partial<{
  // TODO
}>;

export type MachineEvent = { type: string };

export type ChangeDetails = {
  value: string | null;
};

export type FocusChangeDetails = {
  value: string | null;
};
