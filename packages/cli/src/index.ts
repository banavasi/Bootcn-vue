import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { remove } from "./commands/remove.js";

const program = new Command();

program
  .name("bootcn-vue")
  .description("Add Bootstrap + Vue 3 components to your project")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize bootcn-vue in your project")
  .action(async () => {
    await init();
  });

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "Components to add")
  .action(async (components: string[]) => {
    await add(components);
  });

program
  .command("remove")
  .description("Remove components from your project")
  .argument("[components...]", "Components to remove")
  .option("-a, --all", "Remove all bootcn-vue components and configuration")
  .action(async (components: string[], options: { all?: boolean }) => {
    await remove(components, options);
  });

program.parse();
