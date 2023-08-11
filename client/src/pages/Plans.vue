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
    <div class="plans-page">
        <h1>Планы</h1>
        <PlansList :plans="plans" v-if="!isLoading" />
        <Loader v-else />
    </div>
</template>

<style scoped lang="scss">
.plans-page {
    max-width: 600px;
    margin: auto;
    h1 {
        font-size: 28px;
        margin: 8px 0;
    }
}
</style>
