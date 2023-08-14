<script lang="ts">
import PrimaryBtn from "@/components/UI/PrimaryBtn.vue";
import NamedInput from "@/components/UI/NamedInput.vue";
import { validate } from "@/helpers/validation";
import { saveAccoutChanges } from "@/helpers/api/login";

export default {
    components: { PrimaryBtn, NamedInput },
    data() {
        return {
            name: this.$store.state.user.name,
            oldPassword: "",
            password: "",
            secondPassword: "",
        };
    },
    methods: {
        logout() {
            this.$store.commit("setName", "");
            this.$store.commit("setToken", "");
            this.$store.commit("closeModal", "");
        },
        async save() {
            if (this.password === this.secondPassword && this.password && this.name && this.oldPassword) {
                const token = await saveAccoutChanges(this.name, this.oldPassword, this.password);
                this.$store.commit("setToken", token);
                this.$store.commit("setTName", this.name);
                this.$store.commit("closeModal");
            }
        },
    },
    computed: {
        nameError() {
            return validate("name", this.name);
        },
        passwordError() {
            return validate("password", this.password);
        },
        secondPasswordError() {
            return this.password === this.secondPassword ? undefined : "Пароли должны совпадать";
        },
        isValid(): boolean {
            return !this.nameError && !this.passwordError && !this.secondPasswordError;
        },
    },
};
</script>

<template>
    <div class="user-settings-dialog">
        <h3>Настройки аккаунта</h3>
        <NamedInput name="name" title="Имя" type="text" v-model="name" :errorMessage="nameError" :initValue="name" />
        <NamedInput name="oldPassword" title="Старый пароль" type="password" v-model="oldPassword" />
        <NamedInput name="password" title="Новый пароль" type="password" v-model="password" :errorMessage="passwordError" />
        <NamedInput name="secondPas" title="Поторите пароль" type="password" v-model="secondPassword" :errorMessage="secondPasswordError" />
        <PrimaryBtn @click="logout" class="logout">Выйти</PrimaryBtn>
        <PrimaryBtn @click="save" :disabled="!isValid" class="save">Сохранить</PrimaryBtn>
    </div>
</template>

<style lang="scss">
.user-settings-dialog {
    h3 {
        font-size: 22px;
    }
    .input {
        margin: 16px 0;
    }

    .save {
        float: right;
    }
}
</style>
