import {
  dismissLogic,
  DismissLogicOptions,
} from "@react-dive-ui/dismiss-logic";
import {
  focusTrapLogic,
  FocusTrapLogicOptions,
} from "@react-dive-ui/focus-trap-logic";
import { assign, createMachine, fromCallback, raise } from "xstate";

import { Context, Events, Input } from "./types";
import { dom } from "./dom";

type ScrollLockOptions = {
  enabled: boolean;
};
const scrollLockLogic = fromCallback<any, ScrollLockOptions>(({ input }) => {
  const { enabled } = input;
  if (!enabled) return;

  const overflow = getComputedStyle(document.body).overflow;

  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = overflow;
  };
});

type InertLogicOptions = {
  id: string;
  getElement: () => HTMLElement | undefined | null;
  enabled: boolean;
};
const inertLogic = fromCallback<any, InertLogicOptions>(({ input }) => {
  if (!input.enabled) return;

  const cleanups: Array<() => void> = [];
  const rId = requestAnimationFrame(() => {
    const element = input.getElement();
    if (!element) return;

    const treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node) => {
          if (!(node instanceof Element)) {
            return NodeFilter.FILTER_SKIP;
          }
          if (node.tagName === "STYLE" || node.tagName === "SCRIPT") {
            return NodeFilter.FILTER_SKIP;
          }
          if (
            node.id === input.id ||
            node.closest(`#${CSS.escape(input.id)}`)
          ) {
            return NodeFilter.FILTER_SKIP;
          }

          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const elements: Element[] = [];
    while (treeWalker.nextNode()) {
      const currentNode = treeWalker.currentNode as Element;
      if (!currentNode.closest("[inert]")) {
        currentNode.setAttribute("inert", "");
        elements.push(currentNode);
      }
    }
    cleanups.push(() => {
      elements.forEach((el) => el.removeAttribute("inert"));
    });
  });
  cleanups.push(() => cancelAnimationFrame(rId));

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
});

export const machine = createMachine(
  {
    id: "Dialog",
    initial: "setup",
    context: ({ input }) => ({
      id: input.id,
      type: input.type,
      open: input.open ?? false,
      initialFocusEl: input.initialFocusEl ?? (() => null),
      scrollLock: input.scrollLock ?? true,
      metaElements: {
        title: false,
        description: false,
      },
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
              getElement: () => dom.getPanelEl(context),
              dismiss: () => self.send({ type: "CLOSE" }),
              modal: context.type === "modal",
              exclude: [() => dom.getTriggerEl(context)],
            }),
          },
          {
            src: "focusTrapLogic",
            input: ({ context }) => ({
              getElement: () => dom.getPanelEl(context),
              getInitialFocusElement: context.initialFocusEl,
            }),
          },
          {
            src: "scrollLockLogic",
            input: ({ context }) => ({
              enabled: context.scrollLock ?? context.type === "modal",
            }),
          },
          {
            id: "inertLogic",
            src: "inertLogic",
            input: ({ context }) => ({
              id: dom.getPanelId(context),
              getElement: () => dom.getPanelEl(context),
              enabled: context.type === "modal",
            }),
          },
        ],
        entry: ["checkRenderedMetaElements"],
        on: {
          CLOSE: {
            target: "closed",
            actions: [{ type: "setIsOpen", params: { open: false } }],
          },
          "UPDATE.META_ELEMENTS": {
            actions: ["updateMetaElements"],
          },
        },
      },
      closed: {
        on: {
          OPEN: {
            target: "opened",
            actions: [{ type: "setIsOpen", params: { open: true } }],
          },
        },
      },
    },
    types: {
      events: {} as Events,
      context: {} as Context,
      input: {} as Input,

      actions: {} as
        | { type: "setIsOpen"; params: { open: boolean } }
        | { type: "checkRenderedMetaElements" }
        | { type: "updateMetaElements" },

      actors: {} as
        | {
            src: "dismissLogic";
            logic: typeof dismissLogic;
            input: DismissLogicOptions;
          }
        | {
            src: "scrollLockLogic";
            logic: typeof scrollLockLogic;
            input: ScrollLockOptions;
          }
        | {
            src: "focusTrapLogic";
            logic: typeof focusTrapLogic;
            input: FocusTrapLogicOptions;
          }
        | {
            src: "inertLogic";
            logic: typeof inertLogic;
            input: InertLogicOptions;
          },
    },
  },
  {
    actions: {
      setIsOpen: assign(({ action }) => ({ open: action.params.open })),
      checkRenderedMetaElements: raise(
        { type: "UPDATE.META_ELEMENTS" },
        { delay: 0 }
      ),
      updateMetaElements: assign(({ context }) => ({
        metaElements: {
          title: !!dom.getTitleEl(context),
          description: !!dom.getDescriptionEl(context),
        },
      })),
    },
    guards: { isOpen: ({ context }) => context.open },
    actors: {
      dismissLogic: dismissLogic,
      scrollLockLogic: scrollLockLogic,
      focusTrapLogic: focusTrapLogic,
      inertLogic: inertLogic,
    },
  }
);
