import { execa } from "execa";
import pc from "picocolors";

export async function installDependencies(
  packageManager: "pnpm" | "npm" | "yarn",
  dependencies: string[],
  cwd: string,
  isDev = false,
): Promise<void> {
  console.log(pc.cyan(`Installing dependencies with ${packageManager}...`));

  const args =
    packageManager === "npm"
      ? ["install", ...(isDev ? ["-D"] : []), ...dependencies]
      : packageManager === "yarn"
        ? ["add", ...(isDev ? ["-D"] : []), ...dependencies]
        : ["add", ...(isDev ? ["-D"] : []), ...dependencies];

  try {
    await execa(packageManager, args, { cwd, stdio: "inherit" });
    console.log(pc.green("✓ Dependencies installed successfully"));
  } catch (error) {
    console.error(pc.red("Failed to install dependencies"));
    throw error;
  }
}
