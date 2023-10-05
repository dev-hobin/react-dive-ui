import { ActorRefFrom, StateFrom } from "xstate";
import { machine } from "./machine";

export type Item = { value: string; disabled: boolean };

export type Orientation = "horizontal" | "vertical";

export type Service = ActorRefFrom<typeof machine>;

export type State = StateFrom<typeof machine>;

export type Send = Service["send"];

export type Status = "idle" | "focused";

export type Context = {
  id: string;
  focusedValue: Item["value"] | null;
  selectedValue: Item["value"] | null;
  orientation: Orientation;
  disabled: boolean;
};
