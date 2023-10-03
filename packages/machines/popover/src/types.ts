import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type Service = ActorRefFrom<typeof machine>;

export type Send = Service["send"];

export type Context = {
  id: string;
};

export type Input = Pick<Context, "id">;

export type Events = { type: "OPEN" } | { type: "CLOSE" } | { type: "TOGGLE" };
