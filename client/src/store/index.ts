import { createStore } from "vuex";
import { dialogModule, dialogState } from "./dialogModule";
import { plansModule, plansState } from "./plansModule";
import { ThemeState, themeModule } from "./themeModule";
import { UserState, userModule } from "./userModule";

export interface State {
    dialog: dialogState;
    plan: plansState;
    theme: ThemeState;
    user: UserState;
}

const store = createStore<State>({
    modules: {
        dialog: dialogModule,
        user: userModule,
        plan: plansModule,
        theme: themeModule,
    },
});

store.dispatch("setupTheme");

export default store;
