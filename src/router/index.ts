import CalendarVue from "@/pages/Calendar.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: CalendarVue,
        },
        {
            path: "/plans",
            name: "plans",
            component: () => import("../pages/Plans.vue"),
        },
    ],
});

export default router;
