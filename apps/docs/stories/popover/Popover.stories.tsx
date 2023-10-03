import { usePopover } from "@react-dive-ui/popover";
import { createPortal } from "react-dom";

const meta = {
  title: "Component/Popover",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default = () => {
  const { state } = usePopover();

  return (
    <div>
      <button type="button">Toggle Popover</button>

      {state.status === "opened" &&
        createPortal(<article>Popover Content</article>, document.body)}
    </div>
  );
};
