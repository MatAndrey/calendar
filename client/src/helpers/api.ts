import { Plan } from "@/store/plansModule";

const baseURL = window.location.hostname === "127.0.0.1:5000";

export async function savePlans(plans: Plan[]) {
    const response = await fetch(baseURL + "/plans", {
        method: "POST",
        body: JSON.stringify(plans),
        headers: {
            Authtorization: "Bearer " + localStorage.getItem("authToken"),
        },
    });
    return await response.json();
}

export async function getPlans(): Promise<Plan[]> {
    const response = await fetch(baseURL + "/plans", {
        method: "GET",
        headers: {
            Authtorization: "Bearer " + localStorage.getItem("authToken"),
        },
    });
    return await response.json();
}
