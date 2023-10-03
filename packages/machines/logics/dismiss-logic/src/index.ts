import { dismissHandler } from "@react-dive-ui/dismissible-layer";
import { fromCallback } from "xstate";

export type DismissLogicOptions = {
  getElement: () => HTMLElement | null;
  dismiss: () => void;
  modal: boolean;
  exclude?: Array<(() => HTMLElement | null) | HTMLElement>;
};
export const dismissLogic = fromCallback<any, DismissLogicOptions>(
  ({ input }) => {
    const cleanups: Array<() => void> = [];

    const rId = requestAnimationFrame(() => {
      const element = input.getElement();
      if (!element) return;

      const excludeElements = (input.exclude ?? [])
        .map((v) => (typeof v === "function" ? v() : v))
        .filter((v): v is HTMLElement => !!v);

      cleanups.push(() => cancelAnimationFrame(rId));
      cleanups.push(
        dismissHandler({
          layer: {
            element,
            dismiss: input.dismiss,
            modal: input.modal,
          },
          options: {
            exclude: excludeElements,
          },
        })
      );
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }
);
