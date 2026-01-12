# FontAwesome Integration Guide

This project includes **FontAwesome Vue** integration with all icon packs (Solid, Regular, and Brands).

## Installation

FontAwesome is already installed at the workspace root:

```json
{
  "@fortawesome/fontawesome-svg-core": "^7.1.0",
  "@fortawesome/free-brands-svg-icons": "^7.1.0",
  "@fortawesome/free-regular-svg-icons": "^7.1.0",
  "@fortawesome/free-solid-svg-icons": "^7.1.0",
  "@fortawesome/vue-fontawesome": "^3.1.3"
}
```

## Setup (Already Configured in Storybook)

The setup is already done in `.storybook/preview.ts`:

```typescript
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Add all icons to the library
library.add(fas, far, fab);
```

The `FontAwesomeIcon` component is globally available in all Storybook stories.

## Basic Usage

### Method 1: Array Notation (Recommended)

```vue
<template>
  <!-- Solid icon -->
  <FontAwesomeIcon :icon="['fas', 'circle-info']" />

  <!-- Regular icon -->
  <FontAwesomeIcon :icon="['far', 'circle-info']" />

  <!-- Brand icon -->
  <FontAwesomeIcon :icon="['fab', 'github']" />
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
```

### Icon Prefixes

- **`fas`** - Font Awesome Solid (filled icons)
- **`far`** - Font Awesome Regular (outlined icons)
- **`fab`** - Font Awesome Brands (social media logos)

## Common Examples

### Sizes

```vue
<FontAwesomeIcon :icon="['fas', 'circle-info']" size="xs" />
<FontAwesomeIcon :icon="['fas', 'circle-info']" size="sm" />
<FontAwesomeIcon :icon="['fas', 'circle-info']" size="lg" />
<FontAwesomeIcon :icon="['fas', 'circle-info']" size="2x" />
<FontAwesomeIcon :icon="['fas', 'circle-info']" size="3x" />
```

### Colors (with Bootstrap classes)

```vue
<FontAwesomeIcon :icon="['fas', 'check-circle']" class="text-success" />
<FontAwesomeIcon :icon="['fas', 'exclamation-triangle']" class="text-warning" />
<FontAwesomeIcon :icon="['fas', 'times-circle']" class="text-danger" />
<FontAwesomeIcon :icon="['fas', 'circle-info']" class="text-info" />
```

### Transformations

```vue
<!-- Rotate -->
<FontAwesomeIcon :icon="['fas', 'circle-info']" rotation="90" />
<FontAwesomeIcon :icon="['fas', 'circle-info']" rotation="180" />

<!-- Flip -->
<FontAwesomeIcon :icon="['fas', 'circle-info']" flip="horizontal" />
<FontAwesomeIcon :icon="['fas', 'circle-info']" flip="vertical" />

<!-- Animations -->
<FontAwesomeIcon :icon="['fas', 'spinner']" spin />
<FontAwesomeIcon :icon="['fas', 'spinner']" pulse />
```

### Fixed Width (for alignment)

Useful for vertical lists where icons have different widths:

```vue
<div>
  <div><FontAwesomeIcon :icon="['fas', 'home']" fixed-width /> Home</div>
  <div><FontAwesomeIcon :icon="['fas', 'file']" fixed-width /> File</div>
  <div><FontAwesomeIcon :icon="['fas', 'book']" fixed-width /> Book</div>
</div>
```

## Using Icons with Form Components

### With InputField (Prefix/Suffix)

```vue
<template>
  <InputRoot id="email-with-icon">
    <InputLabel>Email Address</InputLabel>
    <InputField type="email" placeholder="you@example.com" has-prefix>
      <template #prefix>
        <FontAwesomeIcon :icon="['fas', 'envelope']" />
      </template>
    </InputField>
  </InputRoot>

  <InputRoot id="search-with-icon">
    <InputLabel>Search</InputLabel>
    <InputField type="search" placeholder="Search..." has-suffix>
      <template #suffix>
        <FontAwesomeIcon :icon="['fas', 'search']" />
      </template>
    </InputField>
  </InputRoot>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { InputRoot, InputField, InputLabel } from "@bootcn-vue/forms";
</script>
```

### Common Form Icons

```vue
<!-- Email -->
<FontAwesomeIcon :icon="['fas', 'envelope']" />
<FontAwesomeIcon :icon="['far', 'envelope']" />

<!-- Phone -->
<FontAwesomeIcon :icon="['fas', 'phone']" />

<!-- Password/Lock -->
<FontAwesomeIcon :icon="['fas', 'lock']" />

<!-- User -->
<FontAwesomeIcon :icon="['fas', 'user']" />
<FontAwesomeIcon :icon="['far', 'user']" />

<!-- Search -->
<FontAwesomeIcon :icon="['fas', 'search']" />

<!-- Website/URL -->
<FontAwesomeIcon :icon="['fas', 'globe']" />

<!-- Calendar/Date -->
<FontAwesomeIcon :icon="['fas', 'calendar']" />
<FontAwesomeIcon :icon="['far', 'calendar']" />
```

## Status & Feedback Icons

```vue
<!-- Success -->
<FontAwesomeIcon :icon="['fas', 'check-circle']" class="text-success" />

<!-- Warning -->
<FontAwesomeIcon :icon="['fas', 'exclamation-triangle']" class="text-warning" />

<!-- Error -->
<FontAwesomeIcon :icon="['fas', 'times-circle']" class="text-danger" />

<!-- Info -->
<FontAwesomeIcon :icon="['fas', 'circle-info']" class="text-info" />

<!-- Help/Question -->
<FontAwesomeIcon :icon="['fas', 'question-circle']" class="text-secondary" />
```

## UI Action Icons

```vue
<!-- Add/Create -->
<FontAwesomeIcon :icon="['fas', 'plus']" />

<!-- Edit -->
<FontAwesomeIcon :icon="['fas', 'edit']" />
<FontAwesomeIcon :icon="['far', 'edit']" />

<!-- Delete/Trash -->
<FontAwesomeIcon :icon="['fas', 'trash']" />

<!-- Settings -->
<FontAwesomeIcon :icon="['fas', 'cog']" />

<!-- Download -->
<FontAwesomeIcon :icon="['fas', 'download']" />

<!-- Upload -->
<FontAwesomeIcon :icon="['fas', 'upload']" />

<!-- Save -->
<FontAwesomeIcon :icon="['fas', 'save']" />
<FontAwesomeIcon :icon="['far', 'save']" />
```

## Social Media Icons (Brands)

```vue
<FontAwesomeIcon :icon="['fab', 'github']" />
<FontAwesomeIcon :icon="['fab', 'twitter']" />
<FontAwesomeIcon :icon="['fab', 'facebook']" />
<FontAwesomeIcon :icon="['fab', 'linkedin']" />
<FontAwesomeIcon :icon="['fab', 'instagram']" />
<FontAwesomeIcon :icon="['fab', 'youtube']" />
```

## Complete Example

```vue
<template>
  <div class="container">
    <h1>
      <FontAwesomeIcon :icon="['fas', 'user-circle']" size="lg" />
      User Profile
    </h1>

    <form>
      <InputRoot id="email">
        <InputLabel>
          Email Address
          <Tooltip>
            <TooltipTrigger>
              <FontAwesomeIcon
                :icon="['fas', 'circle-info']"
                class="text-muted ms-1"
              />
            </TooltipTrigger>
            <TooltipContent>
              We'll never share your email with anyone else.
            </TooltipContent>
          </Tooltip>
        </InputLabel>
        <InputField type="email" has-prefix>
          <template #prefix>
            <FontAwesomeIcon :icon="['fas', 'envelope']" />
          </template>
        </InputField>
      </InputRoot>

      <InputRoot id="password" class="mt-space-md">
        <InputLabel>Password</InputLabel>
        <InputField type="password" has-prefix>
          <template #prefix>
            <FontAwesomeIcon :icon="['fas', 'lock']" />
          </template>
        </InputField>
      </InputRoot>

      <button type="submit" class="btn btn-primary mt-space-md">
        <FontAwesomeIcon :icon="['fas', 'sign-in-alt']" />
        Sign In
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { InputRoot, InputField, InputLabel } from "@bootcn-vue/forms";
import { Tooltip, TooltipTrigger, TooltipContent } from "@bootcn-vue/tooltip";
</script>
```

## Finding Icons

Browse all available icons at: https://fontawesome.com/icons

**Tip**: When searching for icons on the FontAwesome website:

- Icons marked "Free" are included in the packages we installed
- Look for the icon name (e.g., "circle-info", "envelope")
- Check if it's available in Solid (fas), Regular (far), or Brands (fab)

## Legacy CSS Usage (Optional)

You can also use the CSS class method for simple cases:

```html
<i class="fa-solid fa-circle-info"></i>
<i class="fa-regular fa-circle-info"></i>
<i class="fa-brands fa-github"></i>
```

However, the Vue component method (`<FontAwesomeIcon>`) is **recommended** because:

- Better tree-shaking (smaller bundle size)
- Type safety
- Better integration with Vue reactivity
- More props and features available

## Storybook Examples

See comprehensive examples in Storybook:

- Navigate to **Icons → FontAwesome**
- View stories for sizes, transforms, colors, form integration, and more

## Resources

- [FontAwesome Vue Documentation](https://docs.fontawesome.com/web/use-with/vue/)
- [All FontAwesome Icons](https://fontawesome.com/icons)
- [FontAwesome Vue Component Props](https://github.com/FortAwesome/vue-fontawesome#usage)
