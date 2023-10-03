import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type Service = ActorRefFrom<typeof machine>;
export type Send = Service["send"];

export type Context = {
  id: string;
  open: boolean;
  type: "modal" | "non-modal";
  initialFocusEl: () => HTMLElement | null;
  scrollLock: boolean;
};

export type Input = Pick<Context, "id" | "type"> &
  Partial<Pick<Context, "open" | "initialFocusEl" | "scrollLock">>;

export type Events = { type: "OPEN" } | { type: "CLOSE" };
