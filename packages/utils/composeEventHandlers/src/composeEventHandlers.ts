import { EventHandler } from "react";

export function composeEventHandlers<Event extends React.SyntheticEvent>(
  theirEventHandler?: EventHandler<Event>,
  ourEventHandler?: EventHandler<Event>
) {
  return function handleEvent(event: Event) {
    theirEventHandler?.(event);

    if (!event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
