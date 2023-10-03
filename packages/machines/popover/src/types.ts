import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type Service = ActorRefFrom<typeof machine>;

export type Send = Service["send"];

export type Context = {
  id: string;
  isOpen: boolean;
};

export type Input = Pick<Context, "id"> & Partial<Pick<Context, "isOpen">>;

export type Events = { type: "OPEN" } | { type: "CLOSE" } | { type: "TOGGLE" };
