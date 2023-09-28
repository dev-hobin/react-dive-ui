import { ActorRefFrom } from "xstate";
import { machine } from "./machine";
import { Layer } from "@react-dive-ui/dismissible-layer";

export type Service = ActorRefFrom<typeof machine>;
export type Send = Service["send"];

export type Context = {
  id: string;
  open: boolean;
  type: "modal" | "non-modal";
  initialFocusEl: () => HTMLElement | undefined;
  parentLayerId: Layer["id"] | null;
  childLayerIds: Layer["id"][] | null;
};
export type Events = { type: "OPEN" } | { type: "CLOSE" };
