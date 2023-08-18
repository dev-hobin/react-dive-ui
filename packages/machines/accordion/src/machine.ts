import { createMachine, assign } from "xstate";
import { MachineContext, MachineEvents } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "Accordion",
    context: ({ input = {} }) => ({
      id: input.id,
      type: input.type ?? "single",
      itemMap: {},
      orientation: input.orientation ?? "vertical",
      collapsible: input.collapsible ?? true,
      disabled: input.disabled ?? false,
      value: input.value ?? [],
      focusedItemValue: undefined,
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
          "TRIGGER.FOCUS": {
            target: "idle",
            actions: ["setFocusedItemValue"],
          },
          "TRIGGER.BLUR": {
            target: "idle",
            actions: ["unsetFocusedItemValue"],
          },
        },
      },
    },
    on: {
      "FOCUS.NEXT": {
        target: "#Accordion",
        actions: ["focusNext"],
      },
      "FOCUS.PREVIOUS": {
        target: "#Accordion",
        actions: ["focusPrevious"],
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
      setFocusedItemValue: assign(({ context, event }) => {
        if (event.type !== "TRIGGER.FOCUS") return context;
        const { value } = event;
        return { focusedItemValue: value };
      }),
      unsetFocusedItemValue: assign(({ context, event }) => {
        if (event.type !== "TRIGGER.BLUR") return context;
        return { focusedItemValue: undefined };
      }),
      focusNext: ({ context, event }) => {
        if (event.type !== "FOCUS.NEXT") return;
        const currentFocusedTriggerEl = dom.findFocusedTrigger(context.id);
        if (!currentFocusedTriggerEl) return;

        const triggerEls = dom.findTriggers(context.id);

        const currentIndex = triggerEls.indexOf(currentFocusedTriggerEl);
        if (currentIndex === -1) return;

        const nextTrigger = triggerEls[currentIndex + 1];
        if (nextTrigger) {
          nextTrigger.focus();
        } else {
          triggerEls[0].focus();
        }
      },
      focusPrevious: ({ context, event }) => {
        if (event.type !== "FOCUS.PREVIOUS") return;
        const currentFocusedTriggerEl = dom.findFocusedTrigger(context.id);
        if (!currentFocusedTriggerEl) return;

        const triggerEls = dom.findTriggers(context.id);

        const currentIndex = triggerEls.indexOf(currentFocusedTriggerEl);
        if (currentIndex === -1) return;

        const previousTrigger = triggerEls[currentIndex - 1];
        if (previousTrigger) {
          previousTrigger.focus();
        } else {
          triggerEls[triggerEls.length - 1].focus();
        }
      },
    },
  }
);
