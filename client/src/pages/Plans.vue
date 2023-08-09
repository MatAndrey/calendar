<script lang="ts">
import PlansList from "@/components/PlansList.vue";
import Loader from "@/components/UI/Loader.vue";
import { Plan } from "@/store/plansModule";

export default {
    components: { PlansList, Loader },
    computed: {
        plans(): Plan[] {
            const plans = this.$store.getters.sortedPlans;
            return plans;
        },
        isLoading() {
            return this.$store.state.plan.isLoading;
        },
    },
    mounted() {
        this.$store.dispatch("getPlans");
    },
};
</script>

<template>
    <PlansList :plans="plans" v-if="!isLoading" />
    <Loader v-else />
</template>

<style scoped></style>
