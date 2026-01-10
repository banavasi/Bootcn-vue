---
"@bootcn-vue/core": minor
"@bootcn-vue/buttons": minor
---

Initial release of bootcn-vue packages

## @bootcn-vue/core

- `cn()` utility function for merging class names (clsx + tailwind-merge)
- Re-exports `cva` and `VariantProps` from class-variance-authority

## @bootcn-vue/buttons

- Button component with Bootstrap 5 styling
- 17 variants (8 solid, 8 outline, 1 link)
- 3 sizes (sm, md, lg)
- Loading state with spinner
- Composition support via `asChild` prop (reka-ui Primitive)
