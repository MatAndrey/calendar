import { createStore } from "vuex";
import { dialogModule, dialogState } from "./dialogModule";
import { plansModule, plansState } from "./plansModule";
import { ThemeState, themeModule } from "./themeModule";

export interface State {
    dialog: dialogState;
    plan: plansState;
    theme: ThemeState;
}

const store = createStore<State>({
    modules: {
        dialog: dialogModule,
        plan: plansModule,
        theme: themeModule,
    },
});

store.dispatch("setupTheme");

export default store;
