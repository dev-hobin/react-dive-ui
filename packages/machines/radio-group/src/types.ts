import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type Item = { value: string };

export type Service = ActorRefFrom<typeof machine>;

export type Status = "idle" | "focused";
