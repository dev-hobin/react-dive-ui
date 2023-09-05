import type { Preview } from "@storybook/react";
import "../styles/global.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "gray",
      values: [
        {
          name: "white",
          value: "#ffffff",
        },
        {
          name: "gray",
          value: "#fafaf9",
        },
        {
          name: "dark",
          value: "#333333",
        },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
