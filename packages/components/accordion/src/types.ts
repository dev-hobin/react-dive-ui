interface CommonAccordionOption {
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
}

export interface SingleAccordionOption extends CommonAccordionOption {
  type: "single";
  defaultValue?: string;
  collapsible?: boolean;
}
export interface MultipleAccordionOption extends CommonAccordionOption {
  type: "multiple";
  defaultValue?: string[];
}
