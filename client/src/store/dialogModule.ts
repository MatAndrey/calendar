import { Plan } from "./plansModule";

export interface dialogState {
    planForDialog: undefined | Plan;
}

export const dialogModule = {
    state: function getState(): dialogState {
        return {
            planForDialog: undefined,
        };
    },
    mutations: {
        openModal(state: dialogState, plan: Plan) {
            state.planForDialog = plan;
        },
        closeModal(state: dialogState) {
            state.planForDialog = undefined;
        },
    },
    namespace: false,
};
