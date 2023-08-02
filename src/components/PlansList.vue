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
    computed: {
        days(): Plan[][] {
            const days: Plan[][] = [[]];
            const plans = this.$props.plans.sort((a, b) => a.startAt - b.startAt);
            const now = new Date();
            for (let i = 0; i < plans.length; i++) {
                const plan = plans[i];
                if (plan.startAt < +now && new Date(plan.startAt).getDate() !== now.getDate()) {
                    days[0].push(plan);
                } else if (plan.startAt > plans[i - 1].startAt && new Date(plan.startAt).getDate() !== new Date(plans[i - 1].startAt).getDate()) {
                    days.push([plan]);
                } else {
                    days.at(-1)?.push(plan);
                }
            }
            console.log(days);
            return days;
        },
    },
    components: { PlansListItem },
};
</script>

<template>
    <!-- <PlansListItem v-for="plan in plans" :plan="plan" /> -->
    <pre> {{ JSON.stringify(days, null, 4) }}</pre>
</template>

<style scoped></style>
