export function createIdFactory(id: string) {
  return {
    createRootId: () => id,
    createListId: (value: string) => `tabs::${id}::heading::${value}`,
    createTriggerId: (value: string) => `tabs::${id}::trigger::${value}`,
    createContentId: (value: string) => `tabs::${id}::content::${value}`,
  } as const;
}
