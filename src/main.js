import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//vant组件库
import Plugins from "./plugins";
//走马灯
import Vue3Marquee from "vue3-marquee";
import "vue3-marquee/dist/style.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Plugins);
app.use(Vue3Marquee);
app.mount("#app");
