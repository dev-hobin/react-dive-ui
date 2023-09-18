export type Item = {
  value: string;
  disabled: boolean;
};

export type Orientation = "vertical" | "horizontal";

export type ActivationMode = "manual" | "automatic";

export type Context = {
  id: string;
  value: Item["value"] | null;
  focusedValue: Item["value"] | null;
  itemMap: Map<Item["value"], Item>;
  activationMode: ActivationMode;
  orientation: Orientation;
};

export type Input = Pick<Context, "id"> &
  Partial<
    Pick<Context, "value" | "itemMap" | "activationMode" | "orientation">
  >;
