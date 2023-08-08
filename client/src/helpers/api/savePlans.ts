import store from "@/store";
import { baseURL } from ".";

export async function savePlans() {
    const plans = JSON.stringify(store.state.plan.plans);
    if (store.state.user.name && store.state.user.token) {
        const response = await fetch(baseURL + "/plans", {
            method: "POST",
            body: plans,
            headers: {
                Authorization: "Bearer " + store.state.user.token,
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } else {
        localStorage.setItem("plans", plans);
    }
}
