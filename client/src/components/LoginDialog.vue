<script lang="ts">
import { login, register } from "../helpers/api/login";
import NamedInput from "./NamedInput.vue";
import PrimaryBtn from "./PrimaryBtn.vue";

export default {
    data() {
        return {
            isLogin: true,
            isValid: true,
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
    components: { PrimaryBtn, NamedInput },
};
</script>

<template>
    <div class="login-dialog">
        <h3>{{ isLogin ? "Вход" : "Регистрация" }}</h3>
        <NamedInput name="name" title="Имя" v-model="name" />
        <NamedInput name="password" title="Пароль" type="password" v-model="password" />
        <NamedInput name="secondPas" title="Поторите пароль" type="password" v-model="secondPassword" v-if="!isLogin" />
        <button class="change-type" @click="changeType">{{ isLogin ? "Регистрация" : "Вход" }}</button>
        <PrimaryBtn @click="sendForm" :disabled="!isValid">{{ isLogin ? "Войти" : "Зарегистрироваться" }}</PrimaryBtn>
    </div>
</template>

<style scoped lang="scss">
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
}
</style>
