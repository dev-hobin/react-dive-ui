export type MachineContext = {
  type: "single" | "multiple";
  expandedValues: string[];
  collapsible: boolean;
  orientation: "vertical" | "horizontal";
  focusedValue: string | null;
};

export type MachineEvent =
  | { type: "TRIGGER.FOCUS"; value: string }
  | { type: "TRIGGER.BLUR" }
  | { type: "TRIGGER.FOCUS.NEXT" }
  | { type: "TRIGGER.FOCUS.PREV" }
  | { type: "TRIGGER.FOCUS.FIRST" }
  | { type: "TRIGGER.FOCUS.END" }
  | { type: "ITEM.TOGGLE"; value: string }
  | { type: "ITEM.EXPAND"; value: string }
  | { type: "ITEM.COLLAPSE"; value: string };
