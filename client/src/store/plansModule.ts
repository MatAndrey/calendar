import { ActionContext } from "vuex";
import { State } from ".";
import { fetchPlans } from "@/helpers/api/fetchPlans";

export enum Colors {
    orange = "orange",
    yellow = "yellow",
    red = "red",
    green = "green",
    blue = "blue",
}

export const planTypes = {
    [Colors.orange]: { title: "Кино" },
    [Colors.yellow]: { title: "Спорт" },
    [Colors.red]: { title: "Рутина" },
    [Colors.green]: { title: "Самообучение" },
    [Colors.blue]: { title: "Развлечение" },
} as const;

export interface Plan {
    startAt: number;
    duration: number;
    description: string;
    completed: boolean;
    color: keyof typeof planTypes;
    id: string;
}

export interface plansState {
    plans: Plan[];
    isLoading: boolean;
}

export const plansModule = {
    state(): plansState {
        return {
            plans: [],
            isLoading: true,
        };
    },
    mutations: {
        setPlans(state: plansState, plans: Plan[]) {
            state.plans = plans;
            state.isLoading = false;
        },
        editPlan(state: plansState, newPlan: Plan) {
            if (newPlan.completed) {
                state.plans.splice(
                    state.plans.findIndex((plan) => plan.id === newPlan.id),
                    1
                );
            } else {
                const planIndex = state.plans.findIndex((plan) => plan.id === newPlan.id);
                if (planIndex > -1) {
                    state.plans[planIndex] = newPlan;
                } else if (newPlan.description !== "") {
                    state.plans.push(newPlan);
                }
            }
        },
    },
    actions: {
        async getPlans(context: ActionContext<plansState, State>) {
            if (context.rootState.user.name && context.rootState.user.token) {
                const plans = await fetchPlans(context.rootState.user.token);
                context.commit("setPlans", plans);
            } else {
                const plans = JSON.parse(localStorage.getItem("plans") || "[]");
                context.commit("setPlans", plans);
            }
        },
        saveMultiplePlans(context: ActionContext<plansState, State>, plans: Plan[]) {
            plans.forEach((plan) => context.commit("editPlan", plan));
        },
    },
    getters: {
        sortedPlans(state: plansState) {
            return [...state.plans].sort((a, b) => a.startAt - b.startAt);
        },
    },
};
