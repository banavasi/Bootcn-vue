---
"@bootcn-vue/cli": minor
---

feat: add remove command to clean up components and configuration

Added a new `remove` command that allows you to:

**Remove specific components:**

```bash
bootcn-vue remove button
```

**Remove all bootcn-vue setup:**

```bash
bootcn-vue remove --all
```

The `--all` flag removes:

- All components in `src/components/ui/`
- `src/lib/utils.ts` (and `lib/` directory if empty)
- `bootcn.config.json`
- Prompts to show uninstall command for dependencies

The command includes safety confirmations and automatically detects installed components when no arguments are provided.
