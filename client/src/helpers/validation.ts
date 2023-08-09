export type Rules = "password" | "name";

export function validate(rule: Rules, value: string): string | undefined {
    if (rule === "name") {
        if (value.length < 3) {
            return "Имя должно быть длиннее 2 символов";
        } else if (value.length > 15) {
            return "Имя должно быть не длиннее 15 символов";
        }
    } else if (rule === "password") {
        if (value.length < 6) {
            return "Пароль должен быть длиннее 5 символов";
        } else if (value.length > 25) {
            return "Пароль должен быть не длиннее 25 символов";
        } else if (!value.match(/\d/)) {
            return "Пароль должен содержать хотя-бы одну цифру";
        }
    }
    return undefined;
}
