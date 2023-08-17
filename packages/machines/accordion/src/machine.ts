import { createMachine, assign } from "xstate";
import { MachineContext, MachineEvents } from "./types";

export const machine = createMachine(
  {
    id: "Accordion",
    context: ({ input = {} }) => ({
      type: input.type ?? "single",
      itemMap: {},
      orientation: input.orientation ?? "vertical",
      collapsible: input.collapsible ?? true,
      disabled: input.disabled ?? false,
      value: input.value ?? [],
    }),
    initial: "idle",
    states: {
      idle: {
        on: {
          "ITEM.REGISTER": {
            target: "idle",
            actions: ["registerItem"],
          },
          "ITEM.UNREGISTER": {
            target: "idle",
            actions: ["unregisterItem"],
          },
          "ITEM.TOGGLE": {
            target: "idle",
            actions: ["toggleItem"],
          },
          "ITEM.OPEN": {
            target: "idle",
            actions: ["openItem"],
          },
          "ITEM.CLOSE": {
            target: "idle",
            actions: ["closeItem"],
          },
        },
      },
    },
    types: {
      events: {} as MachineEvents,
      context: {} as MachineContext,
    },
  },
  {
    actions: {
      registerItem: assign({
        itemMap: ({ context, event }) => {
          if (event.type !== "ITEM.REGISTER") return context.itemMap;
          const item = event.item;
          context.itemMap[item.value] = item;
          return { ...context.itemMap };
        },
      }),
      unregisterItem: assign({
        itemMap: ({ context, event }) => {
          if (event.type !== "ITEM.UNREGISTER") return context.itemMap;
          const itemKey = event.value;
          delete context.itemMap[itemKey];
          return { ...context.itemMap };
        },
      }),
      toggleItem: assign(({ context, event }) => {
        if (event.type !== "ITEM.TOGGLE") return context;
        const { type, collapsible, value: currentOpened } = context;
        const { value } = event;

        if (type === "single") {
          const currentOpenedValue = currentOpened[0];
          // 이미 열려있는 아이템
          if (currentOpenedValue === value) {
            // collapse 가능하면 아이템 닫기
            if (collapsible) return { value: [] };
            // collapse 불가능하면 기존 상태 유지
            else return { value: currentOpened };
          } else {
            // 열려있는 아이템 변경
            return { value: [value] };
          }
        } else {
          const currentOpenedValues = currentOpened;
          if (currentOpenedValues.includes(value)) {
            return { value: currentOpenedValues.filter((v) => v !== value) };
          } else {
            return { value: [...currentOpenedValues, value] };
          }
        }
      }),
      openItem: assign(({ context, event }) => {
        if (event.type !== "ITEM.OPEN") return context;
        const { type, value: currentOpened } = context;
        const { value } = event;

        if (currentOpened.includes(value)) return context;
        if (type === "single") {
          return { value: [value] };
        } else {
          return { value: [...currentOpened, value] };
        }
      }),
      closeItem: assign(({ context, event }) => {
        if (event.type !== "ITEM.CLOSE") return context;
        const { type, value: currentOpened, collapsible } = context;
        const { value } = event;

        if (!currentOpened.includes(value)) return context;

        if (type === "single") {
          if (collapsible) return { value: [] };
          return { value: currentOpened };
        } else {
          return { value: currentOpened.filter((v) => v !== value) };
        }
      }),
    },
  }
);
