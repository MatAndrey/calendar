import { createApp } from "vue";
import icons from "v-svg-icons";

import App from "./App.vue";
import store from "./store";
import router from "./router";

const app = createApp(App);

app.component("icon", icons);

app.use(store).use(router).mount("#app");

router.beforeEach((to, from, next) => {
    if (!store.state.plan.isLoading) {
        const plans = store.state.plan.plans;
        localStorage.setItem("plans", JSON.stringify(plans));
    }
    next();
});

window.addEventListener("beforeunload", (event) => {
    const plans = store.state.plan.plans;
    localStorage.setItem("plans", JSON.stringify(plans));
});
