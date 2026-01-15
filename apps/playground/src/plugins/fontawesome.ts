/**
 * FontAwesome Plugin Setup
 *
 * This file configures FontAwesome for use with Vue 3.
 * Import this in main.ts and Storybook preview.ts to use FontAwesome icons.
 */
import type { App } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import specific icons you need (tree-shakeable)
import {
  faCircleInfo,
  faCircleQuestion,
  faCircleExclamation,
  faCircleCheck,
  faTriangleExclamation,
  faEye,
  faEyeSlash,
  faCheck,
  faTimes,
  faPlus,
  faMinus,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faSearch,
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faUnlock,
  faCog,
  faHome,
  faStar,
  faHeart,
  faBell,
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faExternalLinkAlt,
  faDownload,
  faUpload,
  faTrash,
  faEdit,
  faCopy,
  faSave,
  faUndo,
  faRedo,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

// Add icons to the library
library.add(
  faCircleInfo,
  faCircleQuestion,
  faCircleExclamation,
  faCircleCheck,
  faTriangleExclamation,
  faEye,
  faEyeSlash,
  faCheck,
  faTimes,
  faPlus,
  faMinus,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faSearch,
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faUnlock,
  faCog,
  faHome,
  faStar,
  faHeart,
  faBell,
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faExternalLinkAlt,
  faDownload,
  faUpload,
  faTrash,
  faEdit,
  faCopy,
  faSave,
  faUndo,
  faRedo,
  faSpinner,
);

/**
 * Vue plugin to register FontAwesomeIcon globally
 */
export function setupFontAwesome(app: App): void {
  app.component("FontAwesomeIcon", FontAwesomeIcon);
}

// Export the component for direct imports
export { FontAwesomeIcon };

// Export the library for adding more icons
export { library };
