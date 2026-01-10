import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import "../node_modules/@rds-vue-ui/rds-theme-base/style/rds-theme-base.scss";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
