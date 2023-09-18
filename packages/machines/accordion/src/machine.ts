import { createMachine } from "xstate";

type Item = {
  value: string;
  disabled: boolean;
};

type Context = {
  id: string;
  type: "single" | "multiple";
  focusedValue: Item["value"] | null;
  expandedValues: Item["value"][];
  itemMap: Map<Item["value"], Item> | null;
  collapsible: boolean;
  orientation: "vertical" | "horizontal";
};

type Input = Pick<Context, "id" | "type"> &
  Partial<
    Pick<Context, "expandedValues" | "itemMap" | "collapsible" | "orientation">
  >;

export const machine = createMachine({
  id: "Accordion",
  initial: "idle",
  context: ({ input }) => ({
    id: input.id,
    type: input.type,
    focusedValue: null,
    expandedValues: input.expandedValues ?? [],
    itemMap: input.itemMap ?? new Map(),
    collapsible: input.collapsible ?? false,
    orientation: input.orientation ?? "vertical",
  }),
  states: {
    idle: {},
    focused: {},
  },
  on: {},
  types: {
    context: {} as Context,
    input: {} as Input,
  },
});
