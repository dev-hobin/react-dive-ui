import { accordionMachine, connect } from "@react-dive-ui/accordion-machine";
import { useActor } from "@xstate/react";

export const Accordion = () => {
  const [state, send] = useActor(accordionMachine, {
    input: {
      id: "accordion",
      ids: {
        root: "test-root-1",
        item(value: string) {
          return `test-item-${value}`;
        },
      },
      type: "single",
      orientation: "horizontal",
      collapsible: false,
    },
  });
  const { rootProps, getItemProps, getTriggerProps, getPanelProps } = connect(
    state,
    send
  );

  console.log("------------------------");
  console.log("state.value", state.value);
  console.log("state.context", state.context);

  return (
    <div {...rootProps}>
      <div {...getItemProps("value-1")}>
        <h3>
          <button {...getTriggerProps("value-1")}>value-1-trigger</button>
        </h3>
        <div {...getPanelProps("value-1")}>value-1-panel</div>
      </div>
      <div {...getItemProps("value-2")}>
        <h3>
          <button {...getTriggerProps("value-2")}>value-1-trigger</button>
        </h3>
        <div {...getPanelProps("value-2")}>value-1-panel</div>
      </div>
      <div {...getItemProps("value-3")}>
        <h3>
          <button {...getTriggerProps("value-3")}>value-1-trigger</button>
        </h3>
        <div {...getPanelProps("value-3")}>value-1-panel</div>
      </div>
    </div>
  );
};
