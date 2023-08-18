export const dom = {
  findFocusedTrigger: (id: string) =>
    document.querySelector<HTMLElement>(
      `[data-dive-id="${id}"] [data-part="trigger"][data-focused]`
    ),
  findTriggers: (id: string) =>
    Array.from<HTMLElement>(
      document.querySelectorAll(
        `[data-dive-id="${id}"] [data-part="trigger"]:not([data-disabled])`
      )
    ),
};
