<script lang="ts">
import PrimaryBtn from "./PrimaryBtn.vue";

export default {
    components: { PrimaryBtn },
    methods: {
        logout() {
            this.$store.commit("setName", "");
            this.$store.commit("setToken", "");
            this.$store.commit("closeModal", "");
        },
    },
};
</script>

<template>
    <PrimaryBtn @click="logout">Выйти</PrimaryBtn>
</template>

<style scoped></style>
