interface CommonAccordionOption {
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
}

export interface SingleAccordionOption extends CommonAccordionOption {
  defaultValue?: string;
  collapsible?: boolean;
}
export interface MultipleAccordionOption extends CommonAccordionOption {
  defaultValue?: string[];
}

export interface SingleAccordion extends SingleAccordionOption {
  type: "single";
}
export interface MultipleAccordion extends MultipleAccordionOption {
  type: "multiple";
}
