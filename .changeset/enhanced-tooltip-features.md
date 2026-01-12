---
"@bootcn-vue/tooltip": minor
"@bootcn-vue/forms": minor
"@bootcn-vue/core": patch
---

# Enhanced Tooltip Features

## Tooltip Package

- Add `htmlContent` prop to TooltipContent for rendering HTML content
- Add `bgColor` prop for custom background colors (Bootstrap classes or hex colors)
- Add `textColor` prop for custom text colors (Bootstrap classes or hex colors)
- Support both Bootstrap utility classes (e.g., `bg-primary`, `text-white`) and custom colors (e.g., `#ff0000`)

## Forms Package

- Add `tooltipHtmlContent` prop to InputLabel for HTML tooltip content
- Add `tooltipBgColor` prop to InputLabel for custom tooltip background colors
- Add `tooltipTextColor` prop to InputLabel for custom tooltip text colors
- Fix InputLabel import path (use `../context` instead of `../types`)
- Add 4 new Storybook stories demonstrating enhanced tooltip features:
  - TooltipWithHtmlContent
  - TooltipWithCustomColors
  - TooltipWithCustomHexColors
  - TooltipHtmlWithFormatting

## Core Package

- Add RDS color system with 8 custom colors (light-1 through light-5, dark-1 through dark-3)
- Integrate RDS colors with Bootstrap color maps for automatic utility generation
- Add comprehensive color documentation and Storybook examples
