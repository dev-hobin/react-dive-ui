import { ActorRefFrom } from "xstate";
import { machine } from "@react-dive-ui/accordion-machine";

export type Service = ActorRefFrom<typeof machine>;
