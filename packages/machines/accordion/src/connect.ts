import { MachineSend, MachineState } from "./types";
import { properties } from "@react-dive-ui/properties";

export function connect(state: MachineState, send: MachineSend) {
  return { state, send };
}
