---
"@bootcn-vue/checkbox": minor
---

feat: add iOS-style checkbox component with smooth animations

Add a new reusable checkbox component with tri-state support ('Y', 'N', null) and premium iOS-inspired animations.

**Features:**

- ✨ Tri-state model: 'Y' (checked), 'N' (unchecked), null (no action)
- 🎨 16 color variants: 8 Bootstrap + 8 RDS theme colors
- 📐 Three sizes: sm (18px), md (24px), lg (30px)
- 🎭 Smooth animations: bounce on check, scale on hover/press, checkmark stroke drawing
- ♿ Accessible: keyboard navigation, focus rings, disabled state
- 🎯 Clickable labels for better UX
- 💅 Rounded corners (6px/8px/10px) with colored border hints when unchecked

**Technical:**

- Built on reka-ui CheckboxRoot/CheckboxIndicator
- Custom SCSS with keyframe animations
- CVA for variant management
- Full TypeScript support with exported types
