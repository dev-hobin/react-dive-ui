const meta = {
  title: "Component/Dialog",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default = () => {
  return (
    <div>
      <button type="button" data-part="trigger">
        Trigger
      </button>

      <div data-part="portal">
        <div data-part="overlay"></div>
        <div data-part="panel">
          <h2 data-part="title">Title</h2>
          <p data-part="description">description</p>
          <button type="button" data-part="close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
