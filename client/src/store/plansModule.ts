import { ActionContext } from "vuex";
import { State } from ".";
import { fetchPlans } from "@/helpers/api/fetchPlans";
import { uid } from "uid";
import PlanDialog from "@/components/Modal/PlanDialog.vue";

export const planTypes = [
    { title: "Отдых", name: "rest" },
    { title: "Сервис", name: "service" },
    { title: "Эффективное время", name: "effective" },
    { title: "Работа", name: "work" },
] as const;

export type PlanTypes = (typeof planTypes)[number];

export interface Plan {
    startAt: number;
    duration: number;
    description: string;
    completed: boolean;
    type: PlanTypes;
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
        createNewPlan(context: ActionContext<plansState, State>, options?: Partial<Plan>) {
            const newPlan: Plan = {
                startAt: options?.startAt || Date.now(),
                duration: options?.duration || 3_600_000,
                description: options?.description || "",
                completed: options?.completed || false,
                type: options?.type || { name: "work", title: "Работа" },
                id: options?.id || uid(),
            };
            context.commit("setModalData", { plan: newPlan }, { root: true });
            context.commit("openModal", PlanDialog), { root: true };
        },
    },
    getters: {
        sortedPlans(state: plansState) {
            return [...state.plans].sort((a, b) => a.startAt - b.startAt);
        },
    },
};
