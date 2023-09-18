export type Item = {
  value: string;
  disabled: boolean;
};

export type Context = {
  id: string;
  type: "single" | "multiple";
  focusedValue: Item["value"] | null;
  expandedValues: Item["value"][];
  itemMap: Map<Item["value"], Item>;
  collapsible: boolean;
  orientation: "vertical" | "horizontal";
};

export type Input = Pick<Context, "id" | "type"> &
  Partial<
    Pick<Context, "expandedValues" | "itemMap" | "collapsible" | "orientation">
  >;

export type Events =
  | { type: "ITEM.EXPAND"; value: Item["value"] }
  | { type: "ITEM.COLLAPSE"; value: Item["value"] }
  | { type: "ITEM.TOGGLE"; value: Item["value"] };

export type Actions =
  | { type: "addToExpandedValues"; params: { value: Item["value"] } }
  | { type: "removeFromExpandedValues"; params: { value: Item["value"] } }
  | { type: "toggleValueInExpandedValues"; params: { value: Item["value"] } }
  | { type: "resetExpandedValuesWith"; params: { value: Item["value"] } };

export type Guards =
  | { type: "isItemDisabled"; params: { value: Item["value"] } }
  | { type: "isExpandedItem"; params: { value: Item["value"] } }
  | { type: "isSingleType" }
  | { type: "hasExpandedItem" }
  | { type: "isCollapsible" };
