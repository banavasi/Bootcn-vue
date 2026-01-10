import type { Preview } from "@storybook/vue3";
import "../node_modules/@rds-vue-ui/rds-theme-base/style/rds-theme-base.scss";

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
