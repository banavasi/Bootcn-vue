import fs from "fs-extra";
import path from "path";

export async function updateTsConfig(cwd: string, config: any): Promise<void> {
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

  // Add @/* alias (points to srcDir)
  tsconfig.compilerOptions.paths["@/*"] = [`./${config.srcDir}/*`];

  // Add @ui/* alias (points to components/ui)
  const uiPath = path.join(config.componentsDir, "ui");
  const uiRelativePath = path.relative(config.srcDir, uiPath);
  tsconfig.compilerOptions.paths["@ui/*"] = [`./${config.srcDir}/${uiRelativePath}/*`];

  // Add @lib/* alias (points to lib)
  tsconfig.compilerOptions.paths["@lib/*"] = [`./${config.srcDir}/lib/*`];

  await fs.writeJson(tsconfigPath, tsconfig, { spaces: 2 });
}

export async function updateViteConfig(cwd: string, config: any): Promise<void> {
  const viteConfigPath = path.join(cwd, "vite.config.ts");

  if (!fs.existsSync(viteConfigPath)) {
    throw new Error("vite.config.ts not found");
  }

  let content = await fs.readFile(viteConfigPath, "utf-8");

  // Calculate paths
  const uiPath = path.join(config.componentsDir, "ui");
  const uiRelativePath = path.relative(config.srcDir, uiPath);
  const fullUiPath = path.join(config.srcDir, uiRelativePath);

  // Check if alias already exists
  if (content.includes("alias:")) {
    // Update existing aliases - add @ui and @lib if not present
    if (!content.includes("'@ui':")) {
      const aliasMatch = content.match(/alias:\s*{([^}]*)}/);
      if (aliasMatch) {
        const existingAliases = aliasMatch[1];
        const newAliases = `${existingAliases.trim()},\n      '@ui': path.resolve(__dirname, './${fullUiPath}'),\n      '@lib': path.resolve(__dirname, './${config.srcDir}/lib')`;
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
      `defineConfig({\n  resolve: {\n    alias: {\n      '@': path.resolve(__dirname, './${config.srcDir}'),\n      '@ui': path.resolve(__dirname, './${fullUiPath}'),\n      '@lib': path.resolve(__dirname, './${config.srcDir}/lib')\n    }\n  },`,
    );
  }

  await fs.writeFile(viteConfigPath, content, "utf-8");
}
