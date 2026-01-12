---
"@bootcn-vue/forms": minor
---

Add tooltip and optional badge support to InputLabel

- Add `tooltipMessage` prop to display tooltip next to label with info icon
- Add `isOptional` and `optionalText` props to show optional badge
- Update BaseFieldProps interface with new tooltip/optional props
- Integrate @bootcn-vue/tooltip package as dependency
- Tooltip positioned to the right with 300ms delay
- Optional badge uses Bootstrap light badge styling
