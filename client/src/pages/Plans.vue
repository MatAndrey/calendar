<script lang="ts">
import PlansList from "@/components/PlansList.vue";
import { Plan } from "@/store/plansModule";

export default {
    components: { PlansList },
    computed: {
        plans(): Plan[] {
            const plans = this.$store.getters.sortedPlans;
            return plans;
        },
    },
    mounted() {
        this.$store.dispatch("getPlans");
    },
};
</script>

<template>
    <PlansList :plans="plans" />
</template>

<style scoped></style>
