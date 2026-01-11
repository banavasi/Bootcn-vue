import type { Preview } from "@storybook/vue3";

// Import theme stylesheets
import "../src/assets/styles/bootstrap-theme.scss";
import "../src/assets/styles/rds-theme.scss";

// Theme switcher decorator
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withTheme = (story: any, context: any) => {
  const theme = context.globals.theme || "bootstrap";

  // Apply theme class to body
  if (typeof document !== "undefined") {
    document.body.classList.remove("theme-bootstrap", "theme-rds");
    document.body.classList.add(`theme-${theme}`);
  }

  return story();
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Design system theme",
      defaultValue: "bootstrap",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "bootstrap", title: "Bootstrap", icon: "circlehollow" },
          { value: "rds", title: "RDS (ASU EdPlus)", icon: "circle" },
        ],
        dynamicTitle: true,
      },
    },
  },
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
