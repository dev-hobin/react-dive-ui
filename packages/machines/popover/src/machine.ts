import { createMachine, fromCallback } from "xstate";
import {
  dismissLogic,
  DismissLogicOptions,
} from "@react-dive-ui/dismiss-logic";
import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  offset,
  arrow,
} from "@floating-ui/dom";

import { Context, Events, FloatingOptions, Input } from "./types";
import { dom } from "./dom";

type FloatingLogicOptions = {
  referenceEl: () => HTMLElement | null;
  floatingEl: () => HTMLElement | null;
  arrowEl?: () => HTMLElement | null;
  floatOptions?: Partial<FloatingOptions>;
};
const floatingLogic = fromCallback<any, FloatingLogicOptions>(({ input }) => {
  const cleanups: Array<() => void> = [];
  const rId = requestAnimationFrame(() => {
    const referenceEl = input.referenceEl();
    const floatingEl = input.floatingEl();
    const arrowEl = input.arrowEl?.();
    const floatingOptions = input.floatOptions ?? {
      placement: "bottom-start",
      offset: 0,
      shiftPadding: 0,
      arrowPadding: 0,
      arrowLength: 0,
    };

    if (!referenceEl || !floatingEl) return;

    const updatePosition = () => {
      computePosition(referenceEl, floatingEl, {
        placement: floatingOptions.placement,
        middleware: [
          offset(floatingOptions.offset),
          flip(),
          shift({ padding: floatingOptions.shiftPadding }),
          arrowEl
            ? arrow({ element: arrowEl, padding: floatingOptions.arrowPadding })
            : undefined,
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(floatingEl.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        if (arrowEl) {
          const arrowData = middlewareData.arrow;
          const arrowX = arrowData?.x;
          const arrowY = arrowData?.y;

          const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
          }[placement.split("-")[0]] as string;

          Object.assign(arrowEl.style, {
            left: arrowX != null ? `${arrowX}px` : "",
            top: arrowY != null ? `${arrowY}px` : "",
            right: "",
            bottom: "",
            [staticSide]: `-${floatingOptions.arrowLength}px`,
          });
        }
      });
    };

    cleanups.push(() => cancelAnimationFrame(rId));
    cleanups.push(autoUpdate(referenceEl, floatingEl, updatePosition));
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
});

export const machine = createMachine(
  {
    id: "Popover",
    initial: "setup",
    context: ({ input }) => ({
      id: input.id,
      isOpen: input.isOpen ?? false,
      floatingOptions: input.floatingOptions ?? {},
    }),
    states: {
      setup: {
        always: [
          {
            guard: "isOpen",
            target: "opened",
          },
          { target: "closed" },
        ],
      },
      opened: {
        invoke: [
          {
            src: "dismissLogic",
            input: ({ context, self }) => ({
              dismiss: () => self.send({ type: "CLOSE" }),
              exclude: [() => dom.getTriggerEl(context)],
              getElement: () => dom.getPanelEl(context),
              modal: false,
            }),
          },
          {
            src: "floatingLogic",
            input: ({ context }) => ({
              referenceEl: () => dom.getTriggerEl(context),
              floatingEl: () => dom.getPanelEl(context),
              arrowEl: () => dom.getArrowEl(context),
              floatOptions: context.floatingOptions,
            }),
          },
        ],
        on: {
          CLOSE: {
            target: "closed",
          },
          TOGGLE: {
            target: "closed",
          },
        },
      },
      closed: {
        on: {
          OPEN: {
            target: "opened",
          },
          TOGGLE: {
            target: "opened",
          },
        },
      },
    },
    types: {
      events: {} as Events,
      context: {} as Context,
      input: {} as Input,
      guards: {} as { type: "isOpen" },
      actors: {} as
        | {
            src: "floatingLogic";
            logic: typeof floatingLogic;
            input: FloatingLogicOptions;
          }
        | {
            src: "dismissLogic";
            logic: typeof dismissLogic;
            input: DismissLogicOptions;
          },
    },
  },
  {
    guards: {
      isOpen: ({ context }) => context.isOpen,
    },
    actors: {
      dismissLogic: dismissLogic,
      floatingLogic: floatingLogic,
    },
  }
);
