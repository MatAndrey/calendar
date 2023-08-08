import { createApp } from "vue";
import icons from "v-svg-icons";

import App from "./App.vue";
import store from "./store";
import router from "./router";
import { savePlans } from "./helpers/api/savePlans";

const app = createApp(App);

app.component("icon", icons);

app.use(store).use(router).mount("#app");

router.beforeEach((to, from, next) => {
    if (!store.state.plan.isLoading) {
        savePlans();
    }
    next();
});

window.addEventListener("beforeunload", (event) => {
    savePlans();
});
