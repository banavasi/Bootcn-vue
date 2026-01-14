---
"@bootcn-vue/cli": patch
---

fix: add source path for field-text and field-password components

- field-text and field-password files are directly in src/ not src/{ComponentName}
- add sourcePath: '.' to registry entries for both components
- fixes 'Source file not found' error when running `bootcn-vue add field-text` or `bootcn-vue add field-password`
