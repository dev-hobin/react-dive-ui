export type Layer = {
  id: string;
  type: "modal" | "non-modal";
  element: HTMLElement;
  dismiss: () => void;
  parentId?: Layer["id"];
  childIds?: Layer["id"][];
};

class DismissManager {
  private layerMap: Map<Layer["id"], Layer> = new Map();

  registerLayer(layer: Layer) {
    this.layerMap.set(layer.id, layer);

    const parentId = layer.parentId;
    if (!parentId) return;

    console.log("parentId", parentId);

    const parentLayer = this.layerMap.get(parentId);
    if (!parentLayer) return;

    this.layerMap.set(parentId, {
      ...parentLayer,
      childIds: [...(parentLayer.childIds ?? []), layer.id],
    });
  }

  unregister(id: string) {
    const layer = this.layerMap.get(id);

    if (layer?.parentId) {
      const parentId = layer.parentId;
      const parentLayer = this.layerMap.get(parentId);
      if (parentLayer) {
        this.layerMap.set(parentId, {
          ...parentLayer,
          childIds: parentLayer.childIds?.filter((childId) => childId !== id),
        });
      }
    }

    this.layerMap.delete(id);
  }

  handleDismiss(id: Layer["id"]) {
    if (!this.isDismissible(id)) return;

    const index = this.getIndex(id);
    const layers = this.getLayers();
    const layer = layers[index];
    const dismissLayers =
      layer.type === "modal" ? layers.splice(index) : layers.splice(index, 1);

    dismissLayers.reverse().forEach((l) => {
      l.dismiss();
      this.unregister(l.id);
    });
  }

  private isDismissible(id: Layer["id"]) {
    const layer = this.layerMap.get(id);
    if (!layer) return false;

    return !this.isUnderModal(layer);
  }

  private isUnderModal(layer: Layer) {
    const index = this.getIndex(layer.id);
    return !!this.getLayers().find((l, i) => i > index && l.type === "modal");
  }

  private getIndex(id: Layer["id"]) {
    const layers = Array.from(this.layerMap.values());
    return layers.findIndex((l) => l.id === id);
  }

  getNestedLayers(id: Layer["id"]) {
    const result: Layer[] = [];

    const search = (id: Layer["id"]) => {
      const layer = this.layerMap.get(id);
      if (layer) {
        result.push(layer);
        layer.childIds?.forEach((childId) => {
          search(childId);
        });
      }
    };

    const layer = this.layerMap.get(id);
    if (!layer) return result;
    else search(layer.id);

    return result;
  }

  private getLayers() {
    return Array.from(this.layerMap.values());
  }
}

export const dismissManager = new DismissManager();
