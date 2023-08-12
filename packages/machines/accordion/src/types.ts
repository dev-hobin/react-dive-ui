export type Context = {
  values: string[];
  type: "single" | "multiple";
  collapsible: boolean;
  disabled: boolean;
  orientation: "vertical" | "horizontal";
};

export type Events = { type: "ITEM.TOGGLE"; value: string };
