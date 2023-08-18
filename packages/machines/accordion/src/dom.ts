export const dom = {
  findFocusedTrigger: (id: string) =>
    document
      .getElementById(id)
      ?.querySelector<HTMLElement>('[data-part="trigger"][data-focused]'),
  findTriggers: (id: string) =>
    Array.from<HTMLElement>(
      document
        .getElementById(id)
        ?.querySelectorAll('[data-part="trigger"]:not([data-disabled])') ?? []
    ),
};
