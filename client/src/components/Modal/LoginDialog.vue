<script lang="ts">
import { validate } from "@/helpers/validation";
import { login, register } from "@/helpers/api/login";
import NamedInput from "@/components/UI/NamedInput.vue";
import PrimaryBtn from "@/components/UI/PrimaryBtn.vue";

export default {
    data() {
        return {
            isLogin: true,
            name: "",
            password: "",
            secondPassword: "",
        };
    },
    methods: {
        changeType() {
            this.isLogin = !this.isLogin;
        },
        async sendForm() {
            if (this.isLogin) {
                await login(this.name, this.password);
                this.$store.commit("closeModal");
            } else {
                if (this.password === this.secondPassword) {
                    await register(this.name, this.password);
                    this.$store.commit("closeModal");
                }
            }
        },
    },
    computed: {
        nameError() {
            if (!this.isLogin) return validate("name", this.name);
        },
        passwordError() {
            if (!this.isLogin) return validate("password", this.password);
        },
        secondPasswordError() {
            if (!this.isLogin) return this.password === this.secondPassword ? undefined : "Пароли должны совпадать";
        },
        isValid(): boolean {
            return !this.nameError && !this.passwordError && !this.secondPasswordError;
        },
    },
    components: { PrimaryBtn, NamedInput },
};
</script>

<template>
    <div class="login-dialog">
        <h3>{{ isLogin ? "Вход" : "Регистрация" }}</h3>
        <NamedInput name="name" title="Имя" type="text" v-model="name" :errorMessage="nameError" />
        <NamedInput name="password" title="Пароль" type="password" v-model="password" :errorMessage="passwordError" />
        <NamedInput
            name="secondPas"
            title="Поторите пароль"
            type="password"
            v-model="secondPassword"
            v-if="!isLogin"
            :errorMessage="secondPasswordError"
        />
        <button class="change-type" @click="changeType">{{ isLogin ? "Регистрация" : "Вход" }}</button>
        <PrimaryBtn @click="sendForm" :disabled="!isValid">{{ isLogin ? "Войти" : "Зарегистрироваться" }}</PrimaryBtn>
    </div>
</template>

<style lang="scss">
.login-dialog {
    h3 {
        font-size: 22px;
    }

    .input {
        margin: 16px 0;
    }

    button.change-type {
        border: none;
        background-color: transparent;
        font-size: 16px;
        font-family: inherit;
        color: var(--main-color);
        text-decoration: underline;
        cursor: pointer;
    }
    button.primary-button {
        float: right;
        &:disabled {
            cursor: auto;
            background-color: var(--border-color);
        }
    }
}
</style>
