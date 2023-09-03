import { useAccordion } from "./useAccordion";

export const Accordion = () => {
  const { state, props } = useAccordion({
    id: "accordion",
    type: "single",
  });

  const {
    rootProps,
    getItemProps,
    getHeadingProps,
    getTriggerProps,
    getPanelProps,
  } = props;

  console.log("------------------------");
  console.log("state", state);

  return (
    <div {...rootProps}>
      <div {...getItemProps("value-1")}>
        <h3 {...getHeadingProps("value-1")}>
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
