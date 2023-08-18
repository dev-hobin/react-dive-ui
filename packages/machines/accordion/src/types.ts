export type AccordionType = "single" | "multiple";
export type AccordionOrientation = "vertical" | "horizontal";

export interface AccordionItem {
  value: string | number;
  isDisabled: boolean;
}

export type MachineContext = {
  id: string;
  type: AccordionType;
  orientation: AccordionOrientation;
  collapsible: boolean;
  disabled: boolean;
  itemMap: Record<AccordionItem["value"], AccordionItem>;
  value: AccordionItem["value"][];
  focusedItemValue: AccordionItem["value"] | undefined;
};

export type MachineEvents =
  | { type: "ROOT.SET.DISABLED"; disabled: boolean }
  | { type: "ITEM.REGISTER"; item: AccordionItem }
  | { type: "ITEM.UNREGISTER"; value: AccordionItem["value"] }
  | { type: "ITEM.TOGGLE"; value: AccordionItem["value"] }
  | { type: "ITEM.OPEN"; value: AccordionItem["value"] }
  | { type: "ITEM.CLOSE"; value: AccordionItem["value"] }
  | {
      type: "ITEM.SET.DISABLED";
      value: AccordionItem["value"];
      disabled: boolean;
    }
  | { type: "TRIGGER.FOCUS"; value: AccordionItem["value"] }
  | { type: "TRIGGER.BLUR" }
  | { type: "FOCUS.NEXT" }
  | { type: "FOCUS.PREVIOUS" };
