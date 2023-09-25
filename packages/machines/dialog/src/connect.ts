import { properties } from "@react-dive-ui/properties";

import type { Service } from "./types";

export function connect(service: Service) {
  const send = service.send;

  return {
    triggerProps: properties.button({
      type: "button",
      onClick: () => {
        send({ type: "OPEN" });
      },
    }),
    closeProps: properties.button({
      type: "button",
      onClick: () => {
        send({ type: "CLOSE" });
      },
    }),
  };
}
