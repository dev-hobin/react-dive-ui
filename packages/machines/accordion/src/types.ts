export type AccordionType = "single" | "multiple";
export type AccordionOrientation = "vertical" | "horizontal";

export interface AccordionItem {
  value: string | number;
  isDisabled: boolean;
}

export type MachineContext = {
  type: AccordionType;
  orientation: AccordionOrientation;
  collapsible: boolean;
  disabled: boolean;
  itemMap: Record<AccordionItem["value"], AccordionItem>;
  value: AccordionItem["value"][];
};

export type MachineEvents =
  | { type: "ITEM.REGISTER"; item: AccordionItem }
  | { type: "ITEM.UNREGISTER"; value: AccordionItem["value"] }
  | { type: "ITEM.TOGGLE"; value: AccordionItem["value"] }
  | { type: "ITEM.OPEN"; value: AccordionItem["value"] }
  | { type: "ITEM.CLOSE"; value: AccordionItem["value"] };
// | {
//     type: "ITEM.UPDATE";
//     value: AccordionItem["value"];
//     updated: Partial<AccordionItem>;
//   };
