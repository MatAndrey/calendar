import store from "@/store";
import { baseURL } from ".";
import { fetchPlans } from "./fetchPlans";

export async function login(name: string, password: string) {
    const response = await fetch(baseURL + "/auth/login", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const token = (await response.json()).token;
    store.commit("setToken", token);
    store.commit("setName", name);
    if (token) {
        fetchPlans(token);
    }
    return token;
}

export async function register(name: string, password: string) {
    const response = await fetch(baseURL + "/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const token = (await response.json()).token as string;
    store.commit("setToken", token);
    store.commit("setName", name);
    if (token) {
        fetchPlans(token);
    }
    return token;
}
