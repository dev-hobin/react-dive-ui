import { ActorRefFrom, StateFrom } from "xstate";
import { Placement } from "@floating-ui/dom";
import { machine } from "./machine";

export type Service = ActorRefFrom<typeof machine>;

export type Send = Service["send"];

export type State = StateFrom<typeof machine>;

export type Status = "setup" | "opened" | "closed";

export type Context = {
  id: string;
  isOpen: boolean;
  floatingOptions: Partial<FloatingOptions>;
  metaElements: {
    title: boolean;
    description: boolean;
  };
};

export type FloatingOptions = {
  placement: Placement;
  offset: number;
  shiftPadding: number;
  arrowPadding: number;
  arrowLength: number;
};

export type Input = Pick<Context, "id"> &
  Partial<Pick<Context, "isOpen" | "floatingOptions">>;

export type Events =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "UPDATE.META_ELEMENTS" };
