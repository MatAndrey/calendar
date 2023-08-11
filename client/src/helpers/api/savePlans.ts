import store from "@/store";
import { baseURL } from ".";
import { Plan } from "@/store/plansModule";

export async function savePlan(plan: Plan | Plan[]) {
    if (store.state.user.name && store.state.user.token) {
        saveOnServer(plan);
    } else {
        saveLocal(plan);
    }
}

async function saveLocal(plan: Plan | Plan[]) {
    const plansStr = localStorage.getItem("plans");
    if (plansStr) {
        const plans = JSON.parse(plansStr) as Plan[];
        if (Array.isArray(plan)) {
            plans.push(...plan);
        } else {
            plans.push(plan);
        }
        localStorage.setItem("plans", JSON.stringify(plans));
    }
}

async function saveOnServer(plan: Plan | Plan[]) {
    if (Array.isArray(plan)) {
        const response = await fetch(baseURL + "/plans", {
            method: "POST",
            body: JSON.stringify({
                plans: plan,
            }),
            headers: {
                Authorization: "Bearer " + store.state.user.token,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            store.dispatch("saveMultiplePlans", plan);
        }
    } else {
        const response = await fetch(baseURL + "/plans/" + plan.id, {
            method: "POST",
            body: JSON.stringify({
                plan: plan,
            }),
            headers: {
                Authorization: "Bearer " + store.state.user.token,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            store.commit("editPlan", plan);
        }
    }
}
