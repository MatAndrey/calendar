import { Module } from "vuex";
import { State } from ".";

type Theme = "light" | "dark";

export interface ThemeState {
    theme: Theme;
}

export const themeModule: Module<ThemeState, State> = {
    state(): ThemeState {
        return {
            theme: "light",
        };
    },
    mutations: {
        setTheme(state, theme: Theme) {
            state.theme = theme;
            localStorage.setItem("user-theme", theme);
            document.documentElement.dataset.theme = theme;
        },
    },
    actions: {
        setupTheme({ commit }) {
            const initUserTheme = getTheme() || getMediaPreference();
            commit("setTheme", initUserTheme);

            function getTheme(): Theme | undefined {
                const theme = localStorage.getItem("user-theme");
                if (theme === "light" || theme === "dark") {
                    return theme;
                }
                return undefined;
            }
            function getMediaPreference(): Theme {
                const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (hasDarkPreference) {
                    return "dark";
                } else {
                    return "light";
                }
            }
        },
    },
};
