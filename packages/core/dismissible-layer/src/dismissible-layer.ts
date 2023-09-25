export interface Layer {
  type: "modal" | "non-modal";
  id: string;
  dismiss: () => void;
}

class DismissManager {
  private layers: Layer[] = [];

  register(layer: Layer) {
    this.layers.push(layer);
  }

  dismiss(id: string) {
    const index = this.layers.findIndex((l) => l.id === id);
    if (index === -1) return;

    const layer = this.layers[index];
    // 모달 타입인 경우 가장 위에 쌓인 모달이 아니면 dismiss 동작 X
    if (!this.isTopModalLayer(layer)) return;

    const dismissLayers =
      layer.type === "modal"
        ? this.layers.splice(index)
        : this.layers.splice(index, 1);

    dismissLayers
      .slice()
      .reverse()
      .forEach((l) => l.dismiss());
  }

  private isTopModalLayer(layer: Layer) {
    if (layer.type === "non-modal") return false;

    const topModalLayer = this.layers
      .slice()
      .reverse()
      .find((l) => l.type === "modal");

    return topModalLayer === layer;
  }
}

export const dismissManager = new DismissManager();
