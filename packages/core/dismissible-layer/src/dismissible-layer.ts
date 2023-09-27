export type Layer = {
  id: string;
  type: "modal" | "non-modal";
  element: HTMLElement;
  dismiss: () => void;
};

class DismissManager {
  private layers: Layer[] = [];

  add(layer: Layer) {
    this.layers.push(layer);
    console.log("layers", this.layers);
  }

  remove(id: string) {
    this.layers = this.layers.filter((l) => l.id !== id);
  }

  isUnderModal(id: string) {
    const index = this.layers.findIndex((l) => l.id === id);
    return !!this.layers.find((l, i) => i > index && l.type === "modal");
  }

  dismiss(node: Node) {
    for (let i = this.layers.length - 1; i >= 0; i--) {
      const layer = this.layers[i];

      if (layer.element.contains(node)) {
        return;
      }

      layer.dismiss();
      this.remove(layer.id);

      if (layer.type === "modal") {
        return;
      }
    }
  }
}

export const dismissManager = new DismissManager();
