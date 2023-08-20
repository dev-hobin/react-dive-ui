export type MachineContext = {
  id: string;
  checked: boolean;
  disabled: boolean;
  required: boolean;
  name: string;
  value: string;
};

export type MachineEvents =
  | { type: "SWITCH.TOGGLE" }
  | { type: "SWITCH.ON" }
  | { type: "SWITCH.OFF" }
  | { type: "CONTEXT.UPDATE"; context: Partial<MachineContext> };
