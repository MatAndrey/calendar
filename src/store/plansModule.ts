import { Commit } from "vuex";

export interface Plan {
    startAt: number;
    duration: number;
    title: string;
    description: string;
    completed: boolean;
    color?: string;
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
            isLoading: false,
        };
    },
    mutations: {
        setPlans(state: plansState, plans: Plan[]) {
            state.plans = plans;
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
                } else if (newPlan.title !== "" && newPlan.description !== "") {
                    state.plans.push(newPlan);
                }
            }
        },
    },
    actions: {
        async getPlans({ commit }: { commit: Commit }) {
            // const plans = [
            //     {
            //         id: "1",
            //         startAt: Date.now() + 1000 * 60 * 60,
            //         duration: 1000 * 60 * 60 * 2,
            //         title: "Plan 1",
            //         description: "first plan,first plan,first plan",
            //         completed: false,
            //     },
            //     {
            //         id: "2",
            //         startAt: Date.now() + 1000 * 60 * 60 * 4,
            //         duration: 1000 * 60 * 60 * 1.5,
            //         title: "Plan 2",
            //         description: "second plan,second plan,second plan, second plan,\nsecond plan,second plan, second plan,second plan,second plan",
            //         completed: false,
            //     },
            //     {
            //         id: "3",
            //         startAt: 1690063200000,
            //         duration: 1000 * 60 * 60 * 3,
            //         title: "Saturday plan",
            //         description: "Washing, going for water, Washing, going for water, Washing, going for water, Washing, going for water",
            //         completed: false,
            //     },
            // ];
            const plans = JSON.parse(localStorage.getItem("plans") || "[]");
            commit("setPlans", plans);
        },
    },
};
