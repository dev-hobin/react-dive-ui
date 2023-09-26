import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type Service = ActorRefFrom<typeof machine>;

export type Context = {
  id: string;
  open: boolean;
  initialFocusEl: () => HTMLElement | undefined;
};
export type Events = { type: "OPEN" } | { type: "CLOSE" };
