export interface UserState {
    name: string;
    token: string;
}

export const userModule = {
    state(): UserState {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            const userData = JSON.parse(storedData) as UserState;
            return userData;
        }
        return {
            name: "",
            token: "",
        };
    },
    mutations: {
        setName(state: UserState, name: string) {
            state.name = name;
            localStorage.setItem("userData", JSON.stringify(state));
        },
        setToken(state: UserState, token: string) {
            state.token = token;
            localStorage.setItem("userData", JSON.stringify(state));
        },
    },
};
