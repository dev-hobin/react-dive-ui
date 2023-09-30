export type Layer = {
  element: HTMLElement;
  dismiss: () => void;
  modal: boolean;
  branchFrom?: Layer["element"];
};

class DismissManager {
  private layerMap: Map<Layer["element"], Layer> = new Map();

  register(layer: Layer) {
    this.layerMap.set(layer.element, layer);
  }

  unregister(element: Layer["element"]) {
    this.layerMap.delete(element);
  }

  dismiss(element: Layer["element"]) {
    if (!this.isDismissible(element)) return;

    const index = this.getIndex(element);
    const layers = this.getLayers();
    const layer = layers[index];
    const dismissLayers = layer.modal
      ? layers.splice(index)
      : layers.splice(index, 1);

    dismissLayers.reverse().forEach((l) => {
      l.dismiss();
      this.unregister(l.element);
    });
  }

  isElementOfNestedLayer(element: Layer["element"], target: HTMLElement) {
    return this.getNestedLayers(element).find((l) =>
      l.element.contains(target)
    );
  }

  private isDismissible(element: Layer["element"]) {
    const layer = this.layerMap.get(element);
    if (!layer) return false;

    return !this.isUnderModal(element);
  }

  private isUnderModal(element: Layer["element"]) {
    const index = this.getIndex(element);
    return !!this.getLayers().find((l, i) => i > index && l.modal);
  }

  private getIndex(element: Layer["element"]) {
    const elements = Array.from(this.layerMap.keys());
    return elements.findIndex((l) => l === element);
  }

  private getNestedLayers(element: Layer["element"]) {
    const result: Layer[] = [];

    const index = this.getIndex(element);
    if (index === -1) return result;

    const candidates = Array.from(this.layerMap.values()).splice(index + 1);
    for (const layer of candidates) {
      if (element.contains(layer.element) || layer.branchFrom === element) {
        result.push(layer);
      }
    }

    return result;
  }

  private getLayers() {
    return Array.from(this.layerMap.values());
  }
}

export const dismissManager = new DismissManager();

type HandlerProps = {
  element: HTMLElement;
  dismiss: () => void;
  options: {
    enabled: Array<"outsideClick" | "escape">;
    modal?: boolean;
    onOutsideClick?: (ev: MouseEvent) => void;
    onEscape?: (ev: KeyboardEvent) => void;
    branchFrom?: HTMLElement;
  };
};
export function dismissHandler(props: HandlerProps) {
  const { element, dismiss, options } = props;

  dismissManager.register({
    element,
    dismiss,
    modal: options?.modal ?? false,
    branchFrom: options?.branchFrom,
  });

  const doc = element.ownerDocument;
  const outsideClickHandler = (ev: MouseEvent) => {
    const target = ev.target;
    if (!(target instanceof HTMLElement)) return;

    if (
      element.contains(target) ||
      dismissManager.isElementOfNestedLayer(element, target)
    ) {
      return;
    }

    options.onOutsideClick?.(ev);
    if (ev.defaultPrevented) return;

    dismissManager.dismiss(element);
  };
  const escapeHandler = (ev: KeyboardEvent) => {
    if (ev.key !== "Escape") return;
    const target = ev.target;

    if (!(target instanceof HTMLElement)) return;

    if (
      !element.contains(target) ||
      dismissManager.isElementOfNestedLayer(element, target)
    ) {
      return;
    }

    options.onEscape?.(ev);
    if (ev.defaultPrevented) return;

    dismissManager.dismiss(element);
  };

  if (options.enabled.includes("outsideClick") || options?.onOutsideClick) {
    doc.addEventListener("click", outsideClickHandler, {
      capture: true,
    });
  }
  if (options.enabled.includes("escape") || options?.onEscape) {
    doc.addEventListener("keydown", escapeHandler);
  }

  return () => {
    doc.removeEventListener("click", outsideClickHandler, {
      capture: true,
    });
    doc.removeEventListener("keydown", escapeHandler);
    dismissManager.unregister(element);
  };
}
