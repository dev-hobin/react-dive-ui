import { createIdFactory } from "./factory";

export const dom = {
  findTrigger: (id: string, value: string) => {
    const idFactory = createIdFactory(id);
    const triggerId = idFactory.createTriggerId(value);

    return document.getElementById(triggerId);
  },
  findTriggers: (id: string) => {
    return Array.from<HTMLElement>(
      document
        .getElementById(id)
        ?.querySelectorAll('[role="tab"]:not([data-disabled])') ?? []
    );
  },
};
