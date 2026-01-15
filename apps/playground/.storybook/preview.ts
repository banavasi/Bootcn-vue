import type { Preview } from "@storybook/vue3";
import { TooltipProvider } from "reka-ui";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Add all icons to the library
library.add(fas, far, fab);

// Import Bootstrap theme
import "../src/assets/styles/bootstrap-theme.scss";

// Import FontAwesome CSS (for fallback/legacy usage)
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import forms package styles (required for form components)
import "@bootcn-vue/forms/dist/index.css";

const preview: Preview = {
  decorators: [
    (story) => ({
      components: { TooltipProvider, FontAwesomeIcon },
      setup() {
        return { story };
      },
      template: "<TooltipProvider><story /></TooltipProvider>",
    }),
  ],
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
