import { createFocusTrap } from "focus-trap";
import { fromCallback } from "xstate";

export type FocusTrapLogicOptions = {
  getElement: () => HTMLElement | undefined | null;
  getInitialFocusElement?: () => HTMLElement | undefined | null;
};
export const focusTrapLogic = fromCallback<any, FocusTrapLogicOptions>(
  ({ input }) => {
    const cleanups: Array<() => void> = [];
    const rId = requestAnimationFrame(() => {
      const element = input.getElement();
      if (!element) return;

      const trap = createFocusTrap(element, {
        fallbackFocus: element,
        initialFocus: input.getInitialFocusElement?.() ?? undefined,
        escapeDeactivates: false,
      });
      trap.activate();

      cleanups.push(() => cancelAnimationFrame(rId));
      cleanups.push(() => trap.deactivate());
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }
);
