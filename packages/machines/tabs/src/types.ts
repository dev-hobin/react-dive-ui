export type TabsOrientation = "vertical" | "horizontal";
export type TabsActivationMode = "automatic" | "manual";

export type MachineContext = {
  id: string;
  orientation: TabsOrientation;
  activationMode: TabsActivationMode;
  value: string;
};

export type MachineEvents =
  | { type: "TAB.ACTIVATE"; value: string }
  | { type: "TAB.NEXT" }
  | { type: "TAB.PREVIOUS" };
