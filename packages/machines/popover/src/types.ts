import { ActorRefFrom } from "xstate";
import { Placement } from "@floating-ui/dom";
import { machine } from "./machine";

export type Service = ActorRefFrom<typeof machine>;

export type Send = Service["send"];

export type Context = {
  id: string;
  isOpen: boolean;
  floatingOptions: Partial<FloatingOptions>;
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

export type Events = { type: "OPEN" } | { type: "CLOSE" } | { type: "TOGGLE" };
