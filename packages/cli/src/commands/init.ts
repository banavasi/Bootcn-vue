import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import * as prompts from "@clack/prompts";
import { detectProject } from "../utils/detect-project.js";
import { installDependencies } from "../utils/install-dependencies.js";
import { updateTsConfig, updateViteConfig } from "../utils/update-config.js";

const REQUIRED_DEPS = [
  "bootstrap@^5.3.0",
  "reka-ui@^2.2.1",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
];

const REQUIRED_DEV_DEPS = [
  "@bootcn-vue/buttons@latest",
  "@bootcn-vue/forms@latest",
  "@bootcn-vue/core@latest",
];

export async function init() {
  console.log(pc.bold(pc.cyan("bootcn-vue init")));
  console.log();

  const cwd = process.cwd();

  try {
    // Detect project
    prompts.intro(pc.bgCyan(pc.black(" bootcn-vue ")));

    const spinner = prompts.spinner();
    spinner.start("Detecting project setup...");

    const project = await detectProject(cwd);
    spinner.stop(pc.green("✓ Project detected"));

    console.log();
    console.log(pc.dim(`  Vue 3: ${pc.green("✓")}`));
    console.log(pc.dim(`  Vite: ${pc.green("✓")}`));
    console.log(pc.dim(`  TypeScript: ${project.hasTypeScript ? pc.green("✓") : pc.yellow("✗")}`));
    console.log(pc.dim(`  Package Manager: ${pc.cyan(project.packageManager)}`));
    console.log();

    // Ask for configuration
    const srcDir = await prompts.text({
      message: "Where is your src directory?",
      placeholder: "./src",
      initialValue: "./src",
      validate: (value) => {
        if (!value) return "Please enter a path";
        const fullPath = path.join(cwd, value);
        if (!fs.existsSync(fullPath)) {
          return `Directory ${value} does not exist`;
        }
        return undefined;
      },
    });

    if (prompts.isCancel(srcDir)) {
      prompts.cancel("Installation cancelled");
      process.exit(0);
    }

    const normalizedSrcDir = (srcDir as string).replace(/^\.\//, "");

    // Create config file
    const config = {
      $schema: "https://bootcn-vue.dev/schema.json",
      srcDir: normalizedSrcDir,
      aliases: {
        components: `@/components`,
        utils: `@/lib`,
      },
    };

    await fs.writeJson(path.join(cwd, "bootcn.config.json"), config, { spaces: 2 });
    console.log(pc.green("✓ Created bootcn.config.json"));

    // Update tsconfig.json
    if (project.hasTypeScript) {
      spinner.start("Updating tsconfig.json...");
      await updateTsConfig(cwd, normalizedSrcDir);
      spinner.stop(pc.green("✓ Updated tsconfig.json"));
    }

    // Update vite.config.ts
    spinner.start("Updating vite.config.ts...");
    await updateViteConfig(cwd, normalizedSrcDir);
    spinner.stop(pc.green("✓ Updated vite.config.ts"));

    // Copy utils
    const libDir = path.join(cwd, normalizedSrcDir, "lib");
    await fs.ensureDir(libDir);

    const utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Re-export from class-variance-authority
export { cva, type VariantProps } from "class-variance-authority";
`;

    await fs.writeFile(path.join(libDir, "utils.ts"), utilsContent, "utf-8");
    console.log(pc.green(`✓ Created ${normalizedSrcDir}/lib/utils.ts`));

    // Create components/ui directory
    const uiDir = path.join(cwd, normalizedSrcDir, "components", "ui");
    await fs.ensureDir(uiDir);
    console.log(pc.green(`✓ Created ${normalizedSrcDir}/components/ui/`));

    // Install dependencies
    const shouldInstall = await prompts.confirm({
      message: "Install required dependencies?",
      initialValue: true,
    });

    if (prompts.isCancel(shouldInstall)) {
      prompts.cancel("Installation cancelled");
      process.exit(0);
    }

    if (shouldInstall) {
      await installDependencies(project.packageManager, REQUIRED_DEPS, cwd);
      await installDependencies(project.packageManager, REQUIRED_DEV_DEPS, cwd, true);
    }

    prompts.outro(pc.green("✓ bootcn-vue initialized successfully!"));
    console.log();
    console.log(pc.cyan("Next steps:"));
    console.log(pc.dim("  1. Add components: ") + pc.bold("bootcn-vue add button"));
    console.log(
      pc.dim("  2. Import in your app: ") +
        pc.bold("import { Button } from '@/components/ui/Button'"),
    );
    console.log();
  } catch (error) {
    if (error instanceof Error) {
      prompts.outro(pc.red(error.message));
    }
    process.exit(1);
  }
}
