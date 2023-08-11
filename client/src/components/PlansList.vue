<script lang="ts">
import { Plan } from "@/store/plansModule";
import { PropType } from "vue";
import { formatDate } from "../helpers/formatDate";
import PlanItem from "./PlanItem.vue";

interface PlansGroup {
    title: string;
    plans: Plan[];
}

export default {
    props: {
        plans: {
            type: Array as PropType<Plan[]>,
            required: true,
        },
    },
    computed: {
        sortedPlans(): Plan[] {
            return this.$props.plans.sort((a, b) => a.startAt - b.startAt);
        },
        plansGroups(): PlansGroup[] {
            const plans = this.sortedPlans;
            const groups: PlansGroup[] = [];
            if (plans.length) {
                const now = new Date();
                for (let i = 0; i < plans.length; i++) {
                    const plan = plans[i];
                    if (plan.startAt < +now && new Date(plan.startAt).getDate() !== now.getDate()) {
                        if (groups.length > 0) {
                            groups[0].plans.push(plan);
                        } else {
                            groups.push({ title: this.formatTitle(plan), plans: [plan] });
                        }
                    } else if (
                        i > 0 &&
                        plan.startAt > plans[i - 1].startAt &&
                        new Date(plan.startAt).getDate() !== new Date(plans[i - 1].startAt).getDate()
                    ) {
                        groups.push({ plans: [plan], title: this.formatTitle(plan) });
                    } else {
                        const lastGroup = groups.at(-1);
                        if (lastGroup) {
                            lastGroup.plans.push(plan);
                        } else {
                            groups.push({ plans: [plan], title: this.formatTitle(plan) });
                        }
                    }
                }
            }
            return groups;
        },
    },
    methods: {
        formatTitle(plan: Plan) {
            const timestamp = plan.startAt;
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
    <div class="plans-list" v-if="$props.plans.length">
        <div class="plans-group" v-for="group in plansGroups">
            <h4>{{ group.title }}</h4>
            <PlanItem v-for="plan in group.plans" :plan="plan" />
        </div>
    </div>
    <h5 v-else>Список пуст</h5>
</template>

<style scoped lang="scss">
.plans-list {
    .plans-group {
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
