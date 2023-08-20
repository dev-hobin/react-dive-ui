export type TabsOrientation = "vertical" | "horizontal";
export type TabsActivationMode = "automatic" | "manual";

export type MachineContext = {
  id: string;
  orientation: TabsOrientation;
  activationMode: TabsActivationMode;
  focusedTab: string | undefined;
  value: string;
  disabledValues: string[];
};

export type MachineEvents =
  | { type: "TAB.ACTIVATE"; value: string }
  | { type: "TAB.NEXT" }
  | { type: "TAB.PREVIOUS" }
  | { type: "TAB.FOCUS"; value: string }
  | { type: "TAB.BLUR" }
  | { type: "TAB.SET.DISABLED"; value: string; disabled: boolean };
