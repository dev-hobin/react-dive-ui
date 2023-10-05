import { ActorRefFrom, StateFrom } from "xstate";
import { machine } from "./machine";

export type Service = ActorRefFrom<typeof machine>;

export type Send = Service["send"];

export type State = StateFrom<typeof machine>;

export type Context = {
  id: string;
  open: boolean;
  type: "modal" | "non-modal";
  initialFocusEl: () => HTMLElement | null;
  scrollLock: boolean;
  metaElements: {
    title: boolean;
    description: boolean;
  };
};

export type Input = Pick<Context, "id" | "type"> &
  Partial<Pick<Context, "open" | "initialFocusEl" | "scrollLock">>;

export type Events =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "UPDATE.META_ELEMENTS" };
