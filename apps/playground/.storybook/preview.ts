import type { Preview } from "@storybook/vue3";

// Import Bootstrap theme
import "../src/assets/styles/bootstrap-theme.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
