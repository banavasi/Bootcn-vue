import { createApp } from "vue";
import App from "./App.vue";
import { setupFontAwesome } from "./plugins/fontawesome";
import "bootstrap/scss/bootstrap.scss";

const app = createApp(App);

// Setup FontAwesome icons
setupFontAwesome(app);

app.mount("#app");
