#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import * as prompts from "@clack/prompts";
import pc from "picocolors";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

async function main() {
  console.clear();
  prompts.intro(pc.bgCyan(pc.black(" Create New Module ")));

  // Get module name
  const moduleName = await prompts.text({
    message: "What is the module name?",
    placeholder: "alerts",
    validate: (value) => {
      if (!value) return "Module name is required";
      if (!/^[a-z-]+$/.test(value)) return "Use lowercase letters and hyphens only";
      const modulePath = path.join(rootDir, "packages", value);
      if (fs.existsSync(modulePath)) return `Module '${value}' already exists`;
      return undefined;
    },
  });

  if (prompts.isCancel(moduleName)) {
    prompts.cancel("Operation cancelled");
    process.exit(0);
  }

  // Get description
  const description = await prompts.text({
    message: "Package description?",
    placeholder: `Accessible, customizable ${moduleName} components`,
  });

  if (prompts.isCancel(description)) {
    prompts.cancel("Operation cancelled");
    process.exit(0);
  }

  // Get component name
  const componentName = await prompts.text({
    message: "First component name? (PascalCase)",
    placeholder: "Alert",
    validate: (value) => {
      if (!value) return "Component name is required";
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) return "Use PascalCase (e.g., Alert, AlertDialog)";
      return undefined;
    },
  });

  if (prompts.isCancel(componentName)) {
    prompts.cancel("Operation cancelled");
    process.exit(0);
  }

  // Get author from git config
  let author = "Shashank Shandilya";
  try {
    author = execSync("git config user.name", { encoding: "utf-8" }).trim();
  } catch (e) {
    // Use default if git config fails
  }

  const confirmedAuthor = await prompts.text({
    message: "Author name?",
    initialValue: author,
  });

  if (prompts.isCancel(confirmedAuthor)) {
    prompts.cancel("Operation cancelled");
    process.exit(0);
  }

  const spinner = prompts.spinner();
  spinner.start("Creating module structure...");

  const modulePath = path.join(rootDir, "packages", String(moduleName));
  const componentPath = path.join(modulePath, "src", String(componentName));

  try {
    // Create directory structure
    await fs.ensureDir(componentPath);

    // Create package.json
    const packageJson = {
      name: `@bootcn-vue/${moduleName}`,
      version: "0.1.0",
      description: String(description),
      type: "module",
      main: "./dist/index.js",
      module: "./dist/index.js",
      types: "./dist/index.d.ts",
      exports: {
        ".": {
          types: "./dist/index.d.ts",
          import: "./dist/index.js",
        },
        [`./${componentName}`]: {
          types: `./src/${componentName}/index.d.ts`,
          import: `./src/${componentName}/index.ts`,
        },
      },
      files: ["dist", "src"],
      scripts: {
        build: "tsup",
        dev: "tsup --watch",
        clean: "rm -rf dist",
        "type-check": "tsc --noEmit",
        lint: "eslint src --fix",
        test: "vitest run",
        "test:watch": "vitest",
      },
      dependencies: {
        "@bootcn-vue/core": "workspace:*",
        "reka-ui": "^2.2.1",
      },
      devDependencies: {
        "@vitejs/plugin-vue": "^5.2.0",
        "@vue/test-utils": "^2.4.6",
        jsdom: "^26.0.0",
        tsup: "^8.3.5",
        typescript: "~5.8.0",
        "unplugin-vue": "^7.1.0",
        vitest: "^3.1.1",
        vue: "^3.5.13",
      },
      peerDependencies: {
        bootstrap: "^5.3.0",
        vue: "^3.5.0",
      },
      publishConfig: {
        access: "public",
        provenance: true,
      },
      repository: {
        type: "git",
        url: "https://github.com/banavasi/Bootcn-vue.git",
        directory: `packages/${moduleName}`,
      },
      homepage: `https://banavasi.github.io/Bootcn-vue/?path=/docs/components-${componentName.toLowerCase()}--docs`,
      bugs: {
        url: "https://github.com/banavasi/Bootcn-vue/issues",
      },
      keywords: ["vue", "vue3", "bootstrap", String(moduleName), "components"],
      author: String(confirmedAuthor),
      license: "MIT",
    };

    await fs.writeJson(path.join(modulePath, "package.json"), packageJson, { spaces: 2 });
    spinner.message("Created package.json");

    // Create README.md
    const readme = `# @bootcn-vue/${moduleName}

${description}

## Installation

\`\`\`bash
# Using the CLI (recommended)
npx @bootcn-vue/cli add ${componentName.toLowerCase()}

# Or install the package
pnpm add @bootcn-vue/${moduleName}
\`\`\`

## Usage

\`\`\`vue
<script setup lang="ts">
import { ${componentName} } from "@bootcn-vue/${moduleName}";
</script>

<template>
  <${componentName}>
    <!-- Your content here -->
  </${componentName}>
</template>
\`\`\`

## Components

- \`${componentName}\` - Main ${componentName.toLowerCase()} component

## Documentation

See [Storybook](https://banavasi.github.io/Bootcn-vue/?path=/docs/components-${componentName.toLowerCase()}--docs) for interactive examples and API documentation.

## License

MIT
`;

    await fs.writeFile(path.join(modulePath, "README.md"), readme);
    spinner.message("Created README.md");

    // Create CHANGELOG.md
    const changelog = `# @bootcn-vue/${moduleName}

## 0.1.0

### Minor Changes

- Initial release of ${componentName} component
`;

    await fs.writeFile(path.join(modulePath, "CHANGELOG.md"), changelog);
    spinner.message("Created CHANGELOG.md");

    // Create tsconfig.json
    const tsconfig = {
      extends: "../../tsconfig.base.json",
      compilerOptions: {
        composite: true,
        outDir: "./dist",
        rootDir: "./src",
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist", "**/*.spec.ts"],
    };

    await fs.writeJson(path.join(modulePath, "tsconfig.json"), tsconfig, { spaces: 2 });
    spinner.message("Created tsconfig.json");

    // Create tsup.config.ts
    const tsupConfig = `import { defineConfig } from "tsup";
import { unplugin } from "unplugin-vue/tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["vue", "@bootcn-vue/core", "reka-ui"],
  plugins: [unplugin()],
});
`;

    await fs.writeFile(path.join(modulePath, "tsup.config.ts"), tsupConfig);
    spinner.message("Created tsup.config.ts");

    // Create vitest.config.ts
    const vitestConfig = `import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
`;

    await fs.writeFile(path.join(modulePath, "vitest.config.ts"), vitestConfig);
    spinner.message("Created vitest.config.ts");

    // Create env.d.ts
    const envDts = `/// <reference types="vite/client" />
`;

    await fs.writeFile(path.join(modulePath, "src", "env.d.ts"), envDts);

    // Create component Vue file
    const componentVue = `<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "@bootcn-vue/core";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <Primitive v-bind="delegatedProps" :class="cn('${componentName.toLowerCase()}', props.class)">
    <slot />
  </Primitive>
</template>
`;

    await fs.writeFile(path.join(componentPath, `${componentName}.vue`), componentVue);
    spinner.message(`Created ${componentName}.vue`);

    // Create component index.ts
    const componentIndex = `import { cva, type VariantProps } from "@bootcn-vue/core";

export { default as ${componentName} } from "./${componentName}.vue";

export const ${componentName.toLowerCase()}Variants = cva("${componentName.toLowerCase()}", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ${componentName}Variants = VariantProps<typeof ${componentName.toLowerCase()}Variants>;
`;

    await fs.writeFile(path.join(componentPath, "index.ts"), componentIndex);
    spinner.message(`Created ${componentName}/index.ts`);

    // Create component test
    const componentTest = `import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { ${componentName} } from "./index";

describe("${componentName}", () => {
  it("renders correctly", () => {
    const wrapper = mount(${componentName}, {
      slots: {
        default: "Test content",
      },
    });

    expect(wrapper.text()).toBe("Test content");
  });

  it("applies custom classes", () => {
    const wrapper = mount(${componentName}, {
      props: {
        class: "custom-class",
      },
    });

    expect(wrapper.classes()).toContain("custom-class");
  });
});
`;

    await fs.writeFile(path.join(componentPath, `${componentName}.spec.ts`), componentTest);
    spinner.message(`Created ${componentName}.spec.ts`);

    // Create barrel export
    const barrelExport = `export * from "./${componentName}";
`;

    await fs.writeFile(path.join(modulePath, "src", "index.ts"), barrelExport);
    spinner.message("Created src/index.ts");

    // Create Storybook story
    const storyPath = path.join(
      rootDir,
      "apps",
      "playground",
      "src",
      "stories",
      `${componentName}.stories.ts`,
    );

    const story = `import type { Meta, StoryObj } from "@storybook/vue3";
import { ${componentName} } from "@bootcn-vue/${moduleName}";

const meta = {
  title: "Components/${componentName}",
  component: ${componentName},
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default"],
    },
  },
  args: {
    variant: "default",
  },
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { ${componentName} },
    setup() {
      return { args };
    },
    template: \`
      <${componentName} v-bind="args">
        ${componentName} Content
      </${componentName}>
    \`,
  }),
};
`;

    await fs.writeFile(storyPath, story);
    spinner.message(`Created ${componentName}.stories.ts`);

    spinner.stop(pc.green("✓ Module created successfully!"));

    prompts.outro(pc.cyan("Next steps:"));
    console.log();
    console.log(pc.dim("  1. Install dependencies:"));
    console.log(pc.bold(`     pnpm install`));
    console.log();
    console.log(pc.dim("  2. Build the module:"));
    console.log(pc.bold(`     pnpm turbo build --filter=@bootcn-vue/${moduleName}`));
    console.log();
    console.log(pc.dim("  3. Start Storybook:"));
    console.log(pc.bold(`     pnpm dev`));
    console.log();
    console.log(pc.dim("  4. Run tests:"));
    console.log(pc.bold(`     pnpm test --filter=@bootcn-vue/${moduleName}`));
    console.log();
  } catch (error) {
    spinner.stop(pc.red("✗ Failed to create module"));
    if (error instanceof Error) {
      prompts.outro(pc.red(error.message));
    }
    process.exit(1);
  }
}

main();
