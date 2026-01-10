import fs from "fs-extra";
import path from "path";

export async function updateTsConfig(cwd: string, srcDir: string): Promise<void> {
  const tsconfigPath = path.join(cwd, "tsconfig.json");

  if (!fs.existsSync(tsconfigPath)) {
    throw new Error("tsconfig.json not found");
  }

  const tsconfig = await fs.readJson(tsconfigPath);

  // Ensure compilerOptions exists
  if (!tsconfig.compilerOptions) {
    tsconfig.compilerOptions = {};
  }

  // Ensure paths exists
  if (!tsconfig.compilerOptions.paths) {
    tsconfig.compilerOptions.paths = {};
  }

  // Add @/* alias
  tsconfig.compilerOptions.paths["@/*"] = [`./${srcDir}/*`];

  await fs.writeJson(tsconfigPath, tsconfig, { spaces: 2 });
}

export async function updateViteConfig(cwd: string, srcDir: string): Promise<void> {
  const viteConfigPath = path.join(cwd, "vite.config.ts");

  if (!fs.existsSync(viteConfigPath)) {
    throw new Error("vite.config.ts not found");
  }

  let content = await fs.readFile(viteConfigPath, "utf-8");

  // Check if alias already exists
  if (content.includes("alias:")) {
    // Update existing alias
    if (!content.includes("'@':")) {
      const aliasMatch = content.match(/alias:\s*{([^}]*)}/);
      if (aliasMatch) {
        const existingAliases = aliasMatch[1];
        const newAliases = `${existingAliases.trim()},\n      '@': path.resolve(__dirname, './${srcDir}')`;
        content = content.replace(/alias:\s*{[^}]*}/, `alias: {\n      ${newAliases}\n    }`);
      }
    }
  } else {
    // Add alias to defineConfig
    if (!content.includes("import path from")) {
      content = `import path from 'path'\n${content}`;
    }

    content = content.replace(
      /defineConfig\(\{/,
      `defineConfig({\n  resolve: {\n    alias: {\n      '@': path.resolve(__dirname, './${srcDir}')\n    }\n  },`,
    );
  }

  await fs.writeFile(viteConfigPath, content, "utf-8");
}
