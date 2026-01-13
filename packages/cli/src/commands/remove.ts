import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import * as prompts from "@clack/prompts";

interface ComponentRegistry {
  name: string;
  type: "component" | "primitive";
}

const REGISTRY: Record<string, ComponentRegistry> = {
  button: {
    name: "Button",
    type: "component",
  },
  tooltip: {
    name: "Tooltip",
    type: "component",
  },
  "field-text": {
    name: "FieldText",
    type: "component",
  },
  "field-password": {
    name: "FieldPassword",
    type: "component",
  },
  "input-root": {
    name: "InputRoot",
    type: "primitive",
  },
  "input-label": {
    name: "InputLabel",
    type: "primitive",
  },
  "input-field": {
    name: "InputField",
    type: "primitive",
  },
  "input-password": {
    name: "InputPassword",
    type: "primitive",
  },
  "input-error": {
    name: "InputError",
    type: "primitive",
  },
  "input-help": {
    name: "InputHelp",
    type: "primitive",
  },
  "input-masked": {
    name: "InputMasked",
    type: "primitive",
  },
  "input-numeric-range": {
    name: "InputNumericRange",
    type: "primitive",
  },
};

export async function remove(components: string[], options: { all?: boolean } = {}) {
  console.log(pc.bold(pc.cyan("bootcn-vue remove")));
  console.log();

  const cwd = process.cwd();

  try {
    // Check if bootcn.config.json exists
    const configPath = path.join(cwd, "bootcn.config.json");
    if (!fs.existsSync(configPath)) {
      throw new Error("bootcn.config.json not found. Nothing to remove.");
    }

    const config = await fs.readJson(configPath);
    const srcDir = config.srcDir || "src";
    const uiDir = path.join(cwd, srcDir, "components", "ui");

    prompts.intro(pc.bgCyan(pc.black(" bootcn-vue remove ")));

    // Handle --all flag
    if (options.all) {
      const confirmAll = await prompts.confirm({
        message: pc.yellow(
          "This will remove ALL bootcn-vue components and configuration. Continue?",
        ),
        initialValue: false,
      });

      if (prompts.isCancel(confirmAll) || !confirmAll) {
        prompts.cancel("Operation cancelled");
        process.exit(0);
      }

      const spinner = prompts.spinner();

      // Remove components/ui directory
      if (fs.existsSync(uiDir)) {
        spinner.start("Removing components...");
        await fs.remove(uiDir);
        spinner.stop(pc.green(`✓ Removed ${srcDir}/components/ui/`));
      }

      // Remove lib/utils.ts
      const utilsPath = path.join(cwd, srcDir, "lib", "utils.ts");
      if (fs.existsSync(utilsPath)) {
        spinner.start("Removing utils...");
        await fs.remove(utilsPath);
        spinner.stop(pc.green(`✓ Removed ${srcDir}/lib/utils.ts`));

        // Remove lib directory if empty
        const libDir = path.join(cwd, srcDir, "lib");
        const libFiles = await fs.readdir(libDir);
        if (libFiles.length === 0) {
          await fs.remove(libDir);
          console.log(pc.green(`✓ Removed empty ${srcDir}/lib/`));
        }
      }

      // Remove bootcn.config.json
      spinner.start("Removing config...");
      await fs.remove(configPath);
      spinner.stop(pc.green("✓ Removed bootcn.config.json"));

      // Ask about dependencies
      const removeDeps = await prompts.confirm({
        message: "Uninstall bootcn-vue dependencies?",
        initialValue: false,
      });

      if (prompts.isCancel(removeDeps)) {
        prompts.cancel("Operation cancelled");
        process.exit(0);
      }

      if (removeDeps) {
        console.log();
        console.log(pc.yellow("To uninstall dependencies, run:"));
        console.log(
          pc.dim(
            "  pnpm remove bootstrap reka-ui class-variance-authority clsx tailwind-merge @bootcn-vue/buttons @bootcn-vue/forms @bootcn-vue/core",
          ),
        );
        console.log();
        console.log(
          pc.yellow("To revert config changes, manually edit tsconfig.json and vite.config.ts"),
        );
      }

      prompts.outro(pc.green("✓ bootcn-vue removed successfully!"));
      return;
    }

    // Remove specific components
    if (!components || components.length === 0) {
      // If no components specified, show selector
      const installedComponents = await getInstalledComponents(uiDir);

      if (installedComponents.length === 0) {
        prompts.outro(pc.yellow("No components found to remove"));
        process.exit(0);
      }

      const selection = await prompts.multiselect({
        message: "Which components would you like to remove?",
        options: installedComponents.map((comp) => ({
          value: comp.toLowerCase(),
          label: comp,
        })),
        required: true,
      });

      if (prompts.isCancel(selection)) {
        prompts.cancel("Operation cancelled");
        process.exit(0);
      }

      components = selection as string[];
    }

    // Confirm removal
    const confirmRemove = await prompts.confirm({
      message: `Remove ${components.length} component(s)?`,
      initialValue: false,
    });

    if (prompts.isCancel(confirmRemove) || !confirmRemove) {
      prompts.cancel("Operation cancelled");
      process.exit(0);
    }

    const spinner = prompts.spinner();

    for (const componentKey of components) {
      const component = REGISTRY[componentKey];
      if (!component) {
        console.log(pc.yellow(`⚠ Unknown component: ${componentKey}, skipping`));
        continue;
      }

      const componentDir = path.join(uiDir, component.name);

      if (!fs.existsSync(componentDir)) {
        console.log(pc.yellow(`⚠ Component ${component.name} not found, skipping`));
        continue;
      }

      spinner.start(`Removing ${component.name}...`);
      await fs.remove(componentDir);
      spinner.stop(pc.green(`✓ Removed ${component.name}`));
    }

    prompts.outro(pc.green("✓ Components removed successfully!"));
    console.log();
  } catch (error) {
    if (error instanceof Error) {
      prompts.outro(pc.red(error.message));
    }
    process.exit(1);
  }
}

async function getInstalledComponents(uiDir: string): Promise<string[]> {
  if (!fs.existsSync(uiDir)) {
    return [];
  }

  const entries = await fs.readdir(uiDir, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}
