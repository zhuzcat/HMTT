import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "amfe-flexible";
import "highlight.js/styles/default.css";
import VueComponents from "@/plugin/VueComponents";

import router from "@/routes";
// 自动聚焦的插件
import autoFocus from "@/plugin/autoFocus";
// 高亮代码的插件
import highlight from "@/plugin/highlight";

const app = createApp(App);
app.use(createPinia());
app.use(autoFocus);
app.use(highlight);
app.use(VueComponents);
app.use(router).mount("#app");
