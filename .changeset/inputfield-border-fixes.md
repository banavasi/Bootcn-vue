---
"@bootcn-vue/forms": patch
---

# InputField Border Fixes

- Enforce square corners (`border-radius: 0`) on all input fields
- Add thick error border (`border-bottom-width: 0.25rem`) for invalid inputs
- Extract styles to external CSS file to fix tsup build issues with sourcemaps
- Export InputField.css in package.json
