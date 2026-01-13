import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import * as prompts from "@clack/prompts";
import { fileURLToPath } from "url";
import { detectProject } from "../utils/detect-project.js";
import { installDependencies } from "../utils/install-dependencies.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface ComponentRegistry {
  name: string;
  type: "component" | "primitive";
  package: string; // Package name without @bootcn-vue/ prefix
  files: string[]; // Files relative to src/{ComponentName} or src/primitives/{ComponentName}
  sourcePath?: string; // Custom source path relative to package src (default: {ComponentName})
  dependencies: string[]; // npm packages to install
  peerDependencies?: string[]; // Peer dependencies (reka-ui, bootstrap, etc.)
}

const REGISTRY: Record<string, ComponentRegistry> = {
  // UI Components
  button: {
    name: "Button",
    type: "component",
    package: "buttons",
    files: ["Button.vue", "index.ts"],
    dependencies: ["@bootcn-vue/core"],
    peerDependencies: ["reka-ui"],
  },
  tooltip: {
    name: "Tooltip",
    type: "component",
    package: "tooltip",
    files: ["Tooltip.vue", "TooltipTrigger.vue", "TooltipContent.vue", "tooltip.css", "index.ts"],
    sourcePath: ".", // Files are directly in src/
    dependencies: ["@bootcn-vue/core"],
    peerDependencies: ["reka-ui"],
  },
  "field-text": {
    name: "FieldText",
    type: "component",
    package: "field-text",
    files: ["FieldText.vue", "index.ts"],
    dependencies: ["@bootcn-vue/core", "@bootcn-vue/forms"],
    peerDependencies: ["reka-ui"],
  },
  "field-password": {
    name: "FieldPassword",
    type: "component",
    package: "field-password",
    files: ["FieldPassword.vue", "index.ts"],
    dependencies: ["@bootcn-vue/core", "@bootcn-vue/forms", "@bootcn-vue/tooltip"],
    peerDependencies: [
      "reka-ui",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/vue-fontawesome",
    ],
  },
  // Form Primitives
  "input-root": {
    name: "InputRoot",
    type: "primitive",
    package: "forms",
    files: ["InputRoot.vue", "index.ts"],
    sourcePath: "primitives/InputRoot",
    dependencies: ["@bootcn-vue/core"],
    peerDependencies: ["reka-ui"],
  },
  "input-label": {
    name: "InputLabel",
    type: "primitive",
    package: "forms",
    files: ["InputLabel.vue", "index.ts"],
    sourcePath: "primitives/InputLabel",
    dependencies: ["@bootcn-vue/core", "@bootcn-vue/tooltip"],
    peerDependencies: ["reka-ui"],
  },
  "input-field": {
    name: "InputField",
    type: "primitive",
    package: "forms",
    files: ["InputField.vue", "InputField.css", "index.ts"],
    sourcePath: "primitives/InputField",
    dependencies: ["@bootcn-vue/core"],
    peerDependencies: ["reka-ui"],
  },
  "input-password": {
    name: "InputPassword",
    type: "primitive",
    package: "forms",
    files: ["InputPassword.vue", "index.ts"],
    sourcePath: "primitives/InputPassword",
    dependencies: ["@bootcn-vue/core"],
    peerDependencies: [
      "reka-ui",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/vue-fontawesome",
    ],
  },
  "input-error": {
    name: "InputError",
    type: "primitive",
    package: "forms",
    files: ["InputError.vue", "index.ts"],
    sourcePath: "primitives/InputError",
    dependencies: ["@bootcn-vue/core"],
    peerDependencies: ["reka-ui"],
  },
  "input-help": {
    name: "InputHelp",
    type: "primitive",
    package: "forms",
    files: ["InputHelp.vue", "index.ts"],
    sourcePath: "primitives/InputHelp",
    dependencies: ["@bootcn-vue/core"],
    peerDependencies: ["reka-ui"],
  },
  "input-masked": {
    name: "InputMasked",
    type: "primitive",
    package: "forms",
    files: ["InputMasked.vue", "index.ts"],
    sourcePath: "primitives/InputMasked",
    dependencies: ["@bootcn-vue/core"],
    peerDependencies: ["reka-ui"],
  },
  "input-numeric-range": {
    name: "InputNumericRange",
    type: "primitive",
    package: "forms",
    files: ["InputNumericRange.vue", "index.ts"],
    sourcePath: "primitives/InputNumericRange",
    dependencies: ["@bootcn-vue/core"],
    peerDependencies: ["reka-ui"],
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

    // Detect project to get package manager
    const projectInfo = await detectProject(cwd);

    prompts.intro(pc.bgCyan(pc.black(" bootcn-vue add ")));

    // If no components specified, show selector
    let selectedComponents = components;
    if (!components || components.length === 0) {
      const selection = await prompts.multiselect({
        message: "Which components would you like to add?",
        options: Object.keys(REGISTRY).map((key) => ({
          value: key,
          label: `${REGISTRY[key].name} (${REGISTRY[key].type})`,
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

    // Collect all unique dependencies and peer dependencies
    const allDependencies = new Set<string>();
    const allPeerDependencies = new Set<string>();

    for (const componentKey of selectedComponents) {
      const component = REGISTRY[componentKey];
      component.dependencies.forEach((dep) => allDependencies.add(dep));
      if (component.peerDependencies) {
        component.peerDependencies.forEach((dep) => allPeerDependencies.add(dep));
      }
    }

    // Install dependencies if any
    if (allDependencies.size > 0 || allPeerDependencies.size > 0) {
      const spinner = prompts.spinner();
      spinner.start("Installing dependencies...");

      const depsToInstall = [
        ...Array.from(allDependencies),
        ...Array.from(allPeerDependencies),
      ].filter((dep) => {
        // Don't install @bootcn-vue packages as dependencies (they're copied)
        return !dep.startsWith("@bootcn-vue/");
      });

      if (depsToInstall.length > 0) {
        try {
          await installDependencies(projectInfo.packageManager, depsToInstall, cwd, false);
          spinner.stop(pc.green("✓ Dependencies installed"));
        } catch (error) {
          spinner.stop(pc.yellow("⚠ Some dependencies may need to be installed manually"));
          console.log(pc.dim(`Run: ${projectInfo.packageManager} add ${depsToInstall.join(" ")}`));
        }
      } else {
        spinner.stop(pc.green("✓ All dependencies already available"));
      }
    }

    const spinner = prompts.spinner();

    for (const componentKey of selectedComponents) {
      const component = REGISTRY[componentKey];
      spinner.start(`Installing ${component.name}...`);

      // Create component directory
      const componentDir = path.join(uiDir, component.name);
      await fs.ensureDir(componentDir);

      // Resolve source path
      const cliDir = path.resolve(__dirname, "../..");
      const componentSourcePath = component.sourcePath ?? component.name;
      const packagesDir =
        componentSourcePath === "."
          ? path.resolve(cliDir, "..", component.package, "src")
          : path.resolve(cliDir, "..", component.package, "src", componentSourcePath);

      // Copy component files
      for (const file of component.files) {
        const sourceFilePath = path.join(packagesDir, file);
        const destPath = path.join(componentDir, file);

        if (!fs.existsSync(sourceFilePath)) {
          // If not found in local development, try reading from the published package
          // This handles the case when CLI is installed from npm
          try {
            const packagePath =
              componentSourcePath === "."
                ? path.resolve(cwd, "node_modules", "@bootcn-vue", component.package, "src", file)
                : path.resolve(
                    cwd,
                    "node_modules",
                    "@bootcn-vue",
                    component.package,
                    "src",
                    componentSourcePath,
                    file,
                  );
            if (fs.existsSync(packagePath)) {
              let content = await fs.readFile(packagePath, "utf-8");
              content = transformImports(content, component.package, component.name);
              await fs.writeFile(destPath, content, "utf-8");
              continue;
            }
          } catch (e) {
            // Continue to error below
          }

          spinner.stop(pc.red(`✗ Source file not found: ${file}`));
          throw new Error(
            `Could not find component source files. Please ensure @bootcn-vue/${component.package} is installed.`,
          );
        }

        // Transform imports from @bootcn-vue packages to local imports
        let content = await fs.readFile(sourceFilePath, "utf-8");
        // Only transform text files (not binary like images)
        if (file.endsWith(".vue") || file.endsWith(".ts") || file.endsWith(".js")) {
          content = transformImports(content, component.package, component.name);
        }

        await fs.writeFile(destPath, content, "utf-8");
      }

      // For form primitives, copy context file if it doesn't exist
      if (component.package === "forms" && component.type === "primitive") {
        const contextSourcePath = path.resolve(
          cliDir,
          "..",
          "forms",
          "src",
          "primitives",
          "context.ts",
        );
        const contextDestPath = path.join(componentDir, "context.ts");

        // Only copy if context doesn't exist in destination
        if (!fs.existsSync(contextDestPath)) {
          if (fs.existsSync(contextSourcePath)) {
            const contextContent = await fs.readFile(contextSourcePath, "utf-8");
            await fs.writeFile(contextDestPath, contextContent, "utf-8");
          } else {
            // Try from node_modules
            try {
              const contextPackagePath = path.resolve(
                cwd,
                "node_modules",
                "@bootcn-vue",
                "forms",
                "src",
                "primitives",
                "context.ts",
              );
              if (fs.existsSync(contextPackagePath)) {
                const contextContent = await fs.readFile(contextPackagePath, "utf-8");
                await fs.writeFile(contextDestPath, contextContent, "utf-8");
              }
            } catch (e) {
              // Context file not critical, continue
            }
          }
        }
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

function transformImports(content: string, packageName: string, componentName: string): string {
  // Transform package imports to local imports
  let transformed = content
    .replace(/@bootcn-vue\/core/g, "@/lib/utils")
    .replace(new RegExp(`from "@bootcn-vue/${packageName}"`, "g"), 'from "."')
    .replace(new RegExp(`from '@bootcn-vue/${packageName}'`, "g"), "from '.'");

  // Transform forms package imports to local imports for primitives
  if (packageName === "forms") {
    // For form primitives, transform imports from @bootcn-vue/forms to local imports
    // This handles imports from other primitives in the same package
    transformed = transformed
      .replace(/from "@bootcn-vue\/forms"/g, 'from "@/components/ui"')
      .replace(/from '@bootcn-vue\/forms'/g, "from '@/components/ui'")
      // Transform relative imports from ../context to local context
      .replace(/from "\.\.\/context"/g, 'from "./context"')
      .replace(/from '\.\.\/context'/g, "from './context'");
  }

  // Transform tooltip imports to local imports
  if (packageName === "tooltip") {
    transformed = transformed
      .replace(/from "@bootcn-vue\/tooltip"/g, 'from "@/components/ui/Tooltip"')
      .replace(/from '@bootcn-vue\/tooltip'/g, "from '@/components/ui/Tooltip'");
  }

  // Transform field-text imports
  if (packageName === "field-text") {
    transformed = transformed
      .replace(/from "@bootcn-vue\/field-text"/g, 'from "@/components/ui/FieldText"')
      .replace(/from '@bootcn-vue\/field-text'/g, "from '@/components/ui/FieldText'");
  }

  // Transform field-password imports
  if (packageName === "field-password") {
    transformed = transformed
      .replace(/from "@bootcn-vue\/field-password"/g, 'from "@/components/ui/FieldPassword"')
      .replace(/from '@bootcn-vue\/field-password'/g, "from '@/components/ui/FieldPassword'");
  }

  // Transform tooltip imports in other components (e.g., form primitives that use tooltip)
  transformed = transformed
    .replace(/from "@bootcn-vue\/tooltip"/g, 'from "@/components/ui/Tooltip"')
    .replace(/from '@bootcn-vue\/tooltip'/g, "from '@/components/ui/Tooltip'");

  return transformed;
}
