export type Context = { id: string; expanded: boolean; disabled: boolean };
export type Events =
  | { type: "TRIGGER.TOGGLE" }
  | { type: "TRIGGER.SHOW" }
  | { type: "TRIGGER.HIDE" }
  | { type: "EXPANDED.SET"; expanded: boolean }
  | { type: "CONTEXT.SET"; context: Partial<Context> };
