import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import * as prompts from "@clack/prompts";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface ComponentRegistry {
  name: string;
  type: "component";
  files: string[];
  dependencies: string[];
}

const REGISTRY: Record<string, ComponentRegistry> = {
  button: {
    name: "Button",
    type: "component",
    files: ["Button.vue", "index.ts"],
    dependencies: ["@bootcn-vue/core"],
  },
};

export async function add(components: string[]) {
  console.log(pc.bold(pc.cyan("bootcn-vue add")));
  console.log();

  const cwd = process.cwd();

  try {
    // Check if bootcn.config.json exists
    const configPath = path.join(cwd, "bootcn.config.json");
    if (!fs.existsSync(configPath)) {
      throw new Error("bootcn.config.json not found. Please run 'bootcn-vue init' first.");
    }

    const config = await fs.readJson(configPath);
    const srcDir = config.srcDir || "src";
    const uiDir = path.join(cwd, srcDir, "components", "ui");

    prompts.intro(pc.bgCyan(pc.black(" bootcn-vue add ")));

    // If no components specified, show selector
    let selectedComponents = components;
    if (!components || components.length === 0) {
      const selection = await prompts.multiselect({
        message: "Which components would you like to add?",
        options: Object.keys(REGISTRY).map((key) => ({
          value: key,
          label: REGISTRY[key].name,
        })),
        required: true,
      });

      if (prompts.isCancel(selection)) {
        prompts.cancel("Operation cancelled");
        process.exit(0);
      }

      selectedComponents = selection as string[];
    }

    // Validate components
    for (const component of selectedComponents) {
      if (!REGISTRY[component]) {
        throw new Error(
          `Unknown component: ${component}. Available: ${Object.keys(REGISTRY).join(", ")}`,
        );
      }
    }

    const spinner = prompts.spinner();

    for (const componentKey of selectedComponents) {
      const component = REGISTRY[componentKey];
      spinner.start(`Installing ${component.name}...`);

      // Create component directory
      const componentDir = path.join(uiDir, component.name);
      await fs.ensureDir(componentDir);

      // Resolve source path - go up from cli/dist to packages/buttons/src/Button
      const cliDir = path.resolve(__dirname, "../..");
      const packagesDir = path.resolve(cliDir, "..", "buttons", "src", "Button");

      // Copy component files
      for (const file of component.files) {
        const sourcePath = path.join(packagesDir, file);
        const destPath = path.join(componentDir, file);

        if (!fs.existsSync(sourcePath)) {
          // If not found in local development, try reading from the published package
          // This handles the case when CLI is installed from npm
          try {
            const packagePath = path.resolve(
              cwd,
              "node_modules",
              "@bootcn-vue",
              "buttons",
              "src",
              "Button",
              file,
            );
            if (fs.existsSync(packagePath)) {
              let content = await fs.readFile(packagePath, "utf-8");
              content = transformImports(content);
              await fs.writeFile(destPath, content, "utf-8");
              continue;
            }
          } catch (e) {
            // Continue to error below
          }

          spinner.stop(pc.red(`✗ Source file not found: ${file}`));
          throw new Error(
            `Could not find component source files. Please ensure @bootcn-vue/buttons is installed.`,
          );
        }

        // Transform imports from @bootcn-vue/core to @/lib/utils
        let content = await fs.readFile(sourcePath, "utf-8");
        content = transformImports(content);

        await fs.writeFile(destPath, content, "utf-8");
      }

      spinner.stop(pc.green(`✓ Installed ${component.name}`));
    }

    prompts.outro(pc.green("✓ Components added successfully!"));
    console.log();
    console.log(pc.cyan("Import in your app:"));
    for (const componentKey of selectedComponents) {
      const component = REGISTRY[componentKey];
      console.log(
        pc.dim(`  import { ${component.name} } from '@/components/ui/${component.name}'`),
      );
    }
    console.log();
  } catch (error) {
    if (error instanceof Error) {
      prompts.outro(pc.red(error.message));
    }
    process.exit(1);
  }
}

function transformImports(content: string): string {
  // Transform package imports to local imports
  return content
    .replace(/@bootcn-vue\/core/g, "@/lib/utils")
    .replace(/from "@bootcn-vue\/buttons"/g, 'from "."')
    .replace(/from '@bootcn-vue\/buttons'/g, "from '.'");
}
