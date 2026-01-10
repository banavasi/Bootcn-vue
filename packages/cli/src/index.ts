import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";

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

program.parse();
