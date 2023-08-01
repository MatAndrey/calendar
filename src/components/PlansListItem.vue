<script lang="ts">
import { Plan } from "@/store/plansModule";
import { PropType } from "vue";

export default {
    props: {
        plan: {
            type: Object as PropType<Plan>,
            required: true,
        },
    },
};
</script>

<template>{{ $props.plan }} <br /></template>

<style scoped></style>
