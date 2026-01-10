#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("bootcn-vue")
  .description("Add Bootstrap + Vue 3 components to your project")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize bootcn-vue in your project")
  .action(() => {
    console.log("bootcn-vue init - Coming soon!");
  });

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "Components to add")
  .action((components: string[]) => {
    console.log("bootcn-vue add - Coming soon!", components);
  });

program.parse();
