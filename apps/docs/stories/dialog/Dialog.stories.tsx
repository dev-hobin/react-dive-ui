import { useDialog, connect } from "@react-dive-ui/dialog";

const meta = {
  title: "Component/Dialog",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default = () => {
  const { state, service } = useDialog({ initialOpen: true });

  const { triggerProps, closeProps } = connect(service);
  return (
    <div>
      <button {...triggerProps}>Trigger</button>

      {state.open && (
        <div data-part="portal">
          <div data-part="overlay"></div>
          <div data-part="panel">
            <h2 data-part="title">Title</h2>
            <p data-part="description">description</p>
            <button {...closeProps}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
