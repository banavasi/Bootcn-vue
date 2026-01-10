import fs from "fs-extra";
import path from "path";

export interface ProjectInfo {
  isVue: boolean;
  isVite: boolean;
  packageManager: "pnpm" | "npm" | "yarn";
  hasTypeScript: boolean;
  srcDir: string;
}

export async function detectProject(cwd: string): Promise<ProjectInfo> {
  const packageJsonPath = path.join(cwd, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error("No package.json found. Are you in a project directory?");
  }

  const packageJson = await fs.readJson(packageJsonPath);
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

  // Detect Vue
  const isVue = "vue" in dependencies;
  if (!isVue) {
    throw new Error("This is not a Vue project. bootcn-vue requires Vue 3.");
  }

  // Check Vue version
  const vueVersion = dependencies.vue;
  if (!vueVersion?.startsWith("^3") && !vueVersion?.startsWith("~3")) {
    throw new Error("bootcn-vue requires Vue 3. Please upgrade your Vue version.");
  }

  // Detect Vite
  const isVite = "vite" in dependencies;
  if (!isVite) {
    throw new Error("bootcn-vue requires Vite. Please use a Vite-based Vue project.");
  }

  // Detect package manager
  let packageManager: "pnpm" | "npm" | "yarn" = "npm";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) {
    packageManager = "pnpm";
  } else if (fs.existsSync(path.join(cwd, "yarn.lock"))) {
    packageManager = "yarn";
  }

  // Detect TypeScript
  const hasTypeScript = fs.existsSync(path.join(cwd, "tsconfig.json"));

  // Detect src directory
  const srcDir = "src";
  if (!fs.existsSync(path.join(cwd, "src"))) {
    throw new Error("No src directory found. bootcn-vue requires a src directory.");
  }

  return {
    isVue,
    isVite,
    packageManager,
    hasTypeScript,
    srcDir,
  };
}
