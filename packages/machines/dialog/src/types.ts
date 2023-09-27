import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type Service = ActorRefFrom<typeof machine>;
export type Send = Service["send"];

export type Context = {
  id: string;
  open: boolean;
  type: "modal" | "non-modal";
  initialFocusEl: () => HTMLElement | undefined;
};
export type Events = { type: "OPEN" } | { type: "CLOSE" };
