import { createApp } from "vue";
import icons from "v-svg-icons";

import App from "./App.vue";
import store from "./store";
import router from "./router";

const app = createApp(App);

app.component("icon", icons);

app.use(store).use(router).mount("#app");
