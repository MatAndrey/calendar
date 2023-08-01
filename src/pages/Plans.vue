<script lang="ts">
import PlansList from "@/components/PlansList.vue";
import { Plan } from "@/store/plansModule";

export default {
    components: { PlansList },
    computed: {
        plans(): Plan[] {
            this.$store.commit("getPlans");
            const plans = this.$store.state.plan.plans;
            return plans;
        },
    },
};
</script>

<template>
    <PlansList :plans="plans" />
</template>

<style scoped></style>
