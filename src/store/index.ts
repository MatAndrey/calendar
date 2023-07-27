import { createStore } from "vuex";
import { dialogModule, dialogState } from "./dialogModule";
import { plansModule, plansState } from "./plansModule";

export interface State {
    dialog: dialogState;
    plan: plansState;
}

export default createStore<State>({
    modules: {
        dialog: dialogModule,
        plan: plansModule,
    },
});
