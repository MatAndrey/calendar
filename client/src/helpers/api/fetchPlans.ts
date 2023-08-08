import { Plan } from "@/store/plansModule";
import { baseURL } from ".";

export async function fetchPlans(token: string): Promise<Plan[]> {
    const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    };
    const response = await fetch(baseURL + "/plans", {
        method: "GET",
        headers,
    });
    return await response.json();
}
