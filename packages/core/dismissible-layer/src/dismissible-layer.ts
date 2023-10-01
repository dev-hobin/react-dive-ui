export type Layer = {
  element: HTMLElement;
  dismiss: () => void;
  modal: boolean;
};

class DismissManager {
  private layerMap: Map<Layer["element"], Layer> = new Map();

  register(layer: Layer) {
    this.layerMap.set(layer.element, layer);
  }

  unregister(element: Layer["element"]) {
    this.layerMap.delete(element);
  }

  isElementOfNestedLayer(element: Layer["element"], target: HTMLElement) {
    const index = this.getIndex(element);
    if (index === -1) return false;

    const layers = this.getLayers();
    return !!layers.find((l, i) => i > index && l.element.contains(target));
  }

  dismiss(element: Layer["element"]) {
    if (this.isUnderModal(element)) return;

    const layers = this.getLayers();
    const index = this.getIndex(element);
    const layer = layers[index];
    const dismissLayers = layer.modal
      ? layers.splice(index)
      : layers.splice(index, 1);

    dismissLayers.reverse().forEach((l) => {
      l.dismiss();
      this.unregister(l.element);
    });
  }

  private isUnderModal(element: Layer["element"]) {
    const layers = this.getLayers();
    const index = this.getIndex(element);
    if (index === -1) return false;

    return !!layers.find((l, i) => i > index && l.modal);
  }

  private getIndex(element: Layer["element"]) {
    return this.getLayers().findIndex((l) => l.element === element);
  }

  private getLayers() {
    return Array.from(this.layerMap.values());
  }
}

const dismissManager = new DismissManager();

export type DismissHandlerProps = {
  layer: Layer;
  options?: {
    dismissOnOutsideClick?: boolean;
    dismissOnEscape?: boolean;
    exclude?: HTMLElement[];
  };
};
export function dismissHandler(props: DismissHandlerProps) {
  const { layer, options } = props;
  dismissManager.register(layer);

  const doc = layer.element.ownerDocument;

  const outsideClickHandler = (ev: MouseEvent) => {
    const target = ev.target;
    if (!(target instanceof HTMLElement)) return;

    if (
      options?.exclude?.find((el) => el.contains(target)) ||
      layer.element.contains(target) ||
      dismissManager.isElementOfNestedLayer(layer.element, target)
    ) {
      return;
    }

    dismissManager.dismiss(layer.element);
  };

  const escapeHandler = (ev: KeyboardEvent) => {
    if (ev.key !== "Escape") return;

    const target = ev.target;
    if (!(target instanceof HTMLElement)) return;

    if (
      !layer.element.contains(target) ||
      dismissManager.isElementOfNestedLayer(layer.element, target)
    ) {
      return;
    }

    dismissManager.dismiss(layer.element);
  };

  doc.addEventListener("click", outsideClickHandler, { capture: true });
  doc.addEventListener("keydown", escapeHandler);

  return () => {
    doc.removeEventListener("click", outsideClickHandler, { capture: true });
    doc.removeEventListener("keydown", escapeHandler);
    dismissManager.unregister(layer.element);
  };
}
