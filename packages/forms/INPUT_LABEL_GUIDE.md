# InputLabel Component - Props and Slots Guide

The `InputLabel` component is part of the `@bootcn-vue/forms` package and provides a flexible, accessible label with tooltip support, optional indicators, and customizable icons.

## Props

### Basic Props

| Prop    | Type                                           | Default     | Description                          |
| ------- | ---------------------------------------------- | ----------- | ------------------------------------ |
| `level` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h3"`      | Semantic heading level for the label |
| `size`  | `"small" \| "medium" \| "large"`               | `"small"`   | Visual size of the label text        |
| `class` | `HTMLAttributes["class"]`                      | `undefined` | Additional CSS classes               |

### Tooltip Props

| Prop              | Type                                     | Default     | Description                                     |
| ----------------- | ---------------------------------------- | ----------- | ----------------------------------------------- |
| `tooltipMessage`  | `string`                                 | `undefined` | Tooltip text. When provided, shows an info icon |
| `tooltipPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"top"`     | Position of the tooltip relative to the icon    |

### Optional Field Props

| Prop           | Type      | Default      | Description                               |
| -------------- | --------- | ------------ | ----------------------------------------- |
| `isOptional`   | `boolean` | `false`      | Shows an optional badge next to the label |
| `optionalText` | `string`  | `"Optional"` | Text displayed in the optional badge      |

### Icon Props

| Prop           | Type                  | Default   | Description                                         |
| -------------- | --------------------- | --------- | --------------------------------------------------- |
| `iconPosition` | `"before" \| "after"` | `"after"` | Position of the tooltip icon relative to label text |

## Slots

| Slot Name        | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `default`        | Label text content                                     |
| `icon`           | Custom icon for tooltip trigger (replaces default SVG) |
| `optional-badge` | Custom content for the optional indicator              |

## Basic Usage

### Simple Label

```vue
<InputRoot id="email">
  <InputLabel>Email Address</InputLabel>
  <InputField type="email" />
</InputRoot>
```

### Label with Tooltip

```vue
<InputRoot id="company">
  <InputLabel tooltip-message="Enter your company's legal name as it appears on official documents">
    Company Name
  </InputLabel>
  <InputField type="text" />
</InputRoot>
```

### Optional Field

```vue
<InputRoot id="middle-name">
  <InputLabel is-optional>
    Middle Name
  </InputLabel>
  <InputField type="text" />
</InputRoot>
```

## Advanced Usage

### Custom Tooltip Icon (FontAwesome)

```vue
<template>
  <InputRoot id="security-code">
    <InputLabel
      tooltip-message="This is sensitive information that we keep secure"
    >
      Security Code
      <template #icon>
        <FontAwesomeIcon
          :icon="['fas', 'shield-halved']"
          class="text-warning"
        />
      </template>
    </InputLabel>
    <InputField type="text" />
  </InputRoot>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { InputRoot, InputField, InputLabel } from "@bootcn-vue/forms";
</script>
```

### Tooltip Position

```vue
<!-- Tooltip appears on the right -->
<InputLabel tooltip-message="Helpful information" tooltip-position="right">
  Field Name
</InputLabel>

<!-- Tooltip appears on the bottom -->
<InputLabel tooltip-message="More info here" tooltip-position="bottom">
  Another Field
</InputLabel>
```

### Icon Position (Before Label)

```vue
<InputLabel
  tooltip-message="Important security information"
  icon-position="before"
>
  API Key
</InputLabel>
```

This renders: `[icon] API Key` instead of `API Key [icon]`

### Custom Optional Badge

```vue
<!-- Custom text -->
<InputLabel is-optional optional-text="Not Required">
  Nickname
</InputLabel>

<!-- Custom icon badge -->
<InputLabel is-optional>
  Display Name
  <template #optional-badge>
    <FontAwesomeIcon :icon="['fas', 'circle-question']" class="text-muted" size="sm" />
  </template>
</InputLabel>
```

### Label Sizing

```vue
<!-- Small (default) -->
<InputLabel level="h3" size="small">
  Small Label
</InputLabel>

<!-- Medium -->
<InputLabel level="h3" size="medium">
  Medium Label
</InputLabel>

<!-- Large -->
<InputLabel level="h2" size="large">
  Large Label
</InputLabel>
```

## Complete Examples

### Form with Security Field

```vue
<template>
  <InputRoot id="api-key" required>
    <InputLabel
      tooltip-message="Your API key is used to authenticate requests. Keep it secret!"
      tooltip-position="right"
      icon-position="before"
    >
      API Key
      <template #icon>
        <FontAwesomeIcon :icon="['fas', 'key']" class="text-danger" size="sm" />
      </template>
    </InputLabel>
    <InputField
      v-model="apiKey"
      type="password"
      placeholder="sk-..."
      has-prefix
    >
      <template #prefix>
        <FontAwesomeIcon :icon="['fas', 'lock']" />
      </template>
    </InputField>
    <InputHelp>
      <FontAwesomeIcon
        :icon="['fas', 'triangle-exclamation']"
        class="text-warning me-1"
      />
      Never share your API key with anyone
    </InputHelp>
  </InputRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  InputRoot,
  InputField,
  InputLabel,
  InputHelp,
} from "@bootcn-vue/forms";

const apiKey = ref("");
</script>
```

### Optional Field with Custom Badge

```vue
<template>
  <InputRoot id="nickname">
    <InputLabel
      is-optional
      tooltip-message="Your nickname will be visible to other users"
      tooltip-position="bottom"
    >
      Display Name
      <template #icon>
        <FontAwesomeIcon
          :icon="['far', 'circle-question']"
          class="text-info"
          size="sm"
        />
      </template>
      <template #optional-badge>
        <span class="badge bg-info text-white">Nice to have</span>
      </template>
    </InputLabel>
    <InputField v-model="nickname" placeholder="Choose a nickname" has-prefix>
      <template #prefix>
        <FontAwesomeIcon :icon="['fas', 'user']" />
      </template>
    </InputField>
  </InputRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { InputRoot, InputField, InputLabel } from "@bootcn-vue/forms";

const nickname = ref("");
</script>
```

## Accessibility

The `InputLabel` component follows accessibility best practices:

- Uses semantic `<label>` element with proper `for` attribute
- Tooltip icon button includes `aria-label="More information"`
- Supports keyboard navigation for tooltip trigger
- SVG icons have `aria-hidden="true"` to prevent screen reader announcement
- Works seamlessly with InputRoot's context for ID management

## Storybook Examples

See comprehensive examples in Storybook:

1. **Forms → Primitives → LabelWithCustomIcon** - Custom FontAwesome icon in tooltip
2. **Forms → Primitives → TooltipPositions** - All tooltip positions (top, bottom, left, right)
3. **Forms → Primitives → IconPositionBefore** - Icon before vs after label
4. **Forms → Primitives → CustomOptionalBadge** - Custom optional badge content
5. **Forms → Primitives → AdvancedLabelCustomization** - All features combined

## Design System Integration

The component integrates with the RDS spacing system:

- Uses `mb-space-xxs` for bottom margin
- Uses `ms-space-xxs` for icon spacing
- Compatible with Bootstrap utility classes for additional styling

## Combining with Other Primitives

```vue
<InputRoot id="complete-field" required invalid>
  <InputLabel 
    tooltip-message="This field is required for verification"
    icon-position="before"
  >
    Email Address
    <template #icon>
      <FontAwesomeIcon :icon="['fas', 'envelope']" class="text-primary" />
    </template>
  </InputLabel>
  <InputField v-model="email" type="email" has-prefix>
    <template #prefix>
      <FontAwesomeIcon :icon="['far', 'envelope']" />
    </template>
  </InputField>
  <InputError>Please enter a valid email address</InputError>
  <InputHelp>We'll send a verification code to this address</InputHelp>
</InputRoot>
```

## Props Reference Table

| Feature            | Props/Slots                           | Example                                                |
| ------------------ | ------------------------------------- | ------------------------------------------------------ |
| **Tooltip**        | `tooltip-message`, `tooltip-position` | `tooltip-message="Info text" tooltip-position="right"` |
| **Custom Icon**    | `#icon` slot                          | `<template #icon><FontAwesomeIcon ... /></template>`   |
| **Icon Position**  | `icon-position`                       | `icon-position="before"`                               |
| **Optional Badge** | `is-optional`, `optional-text`        | `is-optional optional-text="Not Required"`             |
| **Custom Badge**   | `#optional-badge` slot                | `<template #optional-badge>Custom content</template>`  |
| **Label Size**     | `level`, `size`                       | `level="h3" size="medium"`                             |
| **Styling**        | `class`                               | `class="text-primary fw-bold"`                         |
