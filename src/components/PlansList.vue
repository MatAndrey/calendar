<script lang="ts">
import { Plan } from "@/store/plansModule";
import { PropType } from "vue";
import PlansListItem from "./PlansListItem.vue";

export default {
    props: {
        plans: {
            type: Object as PropType<Plan[]>,
            required: true,
        },
    },
    components: { PlansListItem },
};
</script>

<template>
    <PlansListItem v-for="plan in plans" :plan="plan" />
</template>

<style scoped></style>
