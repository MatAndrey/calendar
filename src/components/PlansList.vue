<script lang="ts">
import { Plan } from "@/store/plansModule";
import { PropType } from "vue";
import { formatDate } from "../helpers/formatDate";
import PlanItem from "./PlanItem.vue";

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
            return days;
        },
    },
    methods: {
        formatHeading(timestamp: number) {
            const date = new Date(timestamp).setHours(0, 0, 0, 0);
            const now = new Date().setHours(0, 0, 0, 0);
            if (date < now) {
                return "Прошедшие";
            } else if (date === now) {
                return formatDate(timestamp, "DD.MM day") + ", сегодня";
            } else if (date === now + 24 * 60 * 60 * 1000) {
                return formatDate(timestamp, "DD.MM day") + ", завтра";
            } else {
                return formatDate(timestamp, "DD.MM day");
            }
        },
    },
    components: { PlanItem },
};
</script>

<template>
    <div class="plans-list">
        <div class="plans-for-day" v-for="day in days">
            <h4>{{ formatHeading(day[0].startAt) }}</h4>
            <PlanItem v-for="plan in day" :plan="plan" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.plans-list {
    max-width: 600px;
    margin: auto;
    .plans-for-day {
        h4 {
            font-size: 20px;
            color: var(--border-color);
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 4px;
        }
        .plan {
            margin-bottom: 6px;
        }
    }
}
</style>
