import { Commit } from "vuex";

export const planTypes = {
    orange: { color: "#f1e1d1", title: "Кино" },
    yellow: { color: "#f5f1ad", title: "Спорт" },
    red: { color: "#ffcece", title: "Рутина" },
    green: { color: "#d8ffd7", title: "Самообучение" },
    blue: { color: "#d7e4ff", title: "Развлечение" },
} as const;

export const colors = Object.keys(planTypes);

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
        async getPlans({ commit }: { commit: Commit }) {
            const plans = JSON.parse(localStorage.getItem("plans") || "[]");
            commit("setPlans", plans);
        },
    },
    getters: {
        sortedPlans(state: plansState) {
            return [...state.plans].sort((a, b) => a.startAt - b.startAt);
        },
    },
};
