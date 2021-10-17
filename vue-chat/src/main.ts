import { createApp } from "vue";
import App from "./App.vue";
// vue-router
import { router } from "./router/router";
// tailwindcss
import "./styles/index.css";
// iconfont
import "./assets/icon/iconfont.js";

createApp(App).use(router).mount("#app");
