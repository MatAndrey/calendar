<script lang="ts">
import { Plan, planTypes } from "@/store/plansModule";
import { PropType } from "vue";
import { formatDate } from "../helpers/formatDate";
import PlanItem from "./PlanItem.vue";
import TypeSelect from "./UI/TypeSelect.vue";

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
    data() {
        return {
            selectedTypes: planTypes.map((el) => el),
            groupBy: "startAt" as "startAt" | "type",
        };
    },
    computed: {
        filtredPlans(): Plan[] {
            return this.$props.plans.filter((plan) => this.selectedTypes.find((selected) => plan.type.name === selected.name));
        },
        plansGroups(): PlansGroup[] {
            const plans = this.filtredPlans;
            if (this.groupBy === "startAt") {
                return this.groupByTime(plans);
            } else if (this.groupBy === "type") {
                return this.groupByType(plans);
            }
            return [];
        },
    },
    methods: {
        formatTitleByTime(plan: Plan) {
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
        groupByTime(plans: Plan[]): PlansGroup[] {
            plans = plans.sort((a, b) => a.startAt - b.startAt);
            const groups: PlansGroup[] = [];
            if (plans.length) {
                const now = new Date();
                for (let i = 0; i < plans.length; i++) {
                    const plan = plans[i];
                    if (plan.startAt < +now && new Date(plan.startAt).getDate() !== now.getDate()) {
                        if (groups.length > 0) {
                            groups[0].plans.push(plan);
                        } else {
                            groups.push({ title: this.formatTitleByTime(plan), plans: [plan] });
                        }
                    } else if (
                        i > 0 &&
                        plan.startAt > plans[i - 1].startAt &&
                        new Date(plan.startAt).getDate() !== new Date(plans[i - 1].startAt).getDate()
                    ) {
                        groups.push({ plans: [plan], title: this.formatTitleByTime(plan) });
                    } else {
                        const lastGroup = groups.at(-1);
                        if (lastGroup) {
                            lastGroup.plans.push(plan);
                        } else {
                            groups.push({ plans: [plan], title: this.formatTitleByTime(plan) });
                        }
                    }
                }
            }
            return groups;
        },
        groupByType(plans: Plan[]): PlansGroup[] {
            plans = plans.sort((a, b) => a.type.name.localeCompare(b.type.name));
            const groups: PlansGroup[] = [];
            for (let i = 0; i < plans.length; i++) {
                const plan = plans[i];
                if (i > 0 && plan.type.name === plans[i - 1].type.name) {
                    groups.at(-1)?.plans.push(plan);
                } else {
                    groups.push({ title: plan.type.title, plans: [plan] });
                }
            }
            return groups;
        },
    },

    components: { PlanItem, TypeSelect },
};
</script>

<template>
    <div class="plans-list" v-if="$props.plans.length">
        <div class="settings">
            <TypeSelect v-model="selectedTypes" />
            <select v-model="groupBy">
                <option value="startAt">По порядку</option>
                <option value="color">По типу</option>
            </select>
        </div>
        <div class="plans-group" v-for="group in plansGroups">
            <h4>{{ group.title }}</h4>
            <PlanItem v-for="plan in group.plans" :plan="plan" />
        </div>
    </div>
    <h5 v-else>Список пуст</h5>
</template>

<style lang="scss">
.plans-list {
    .settings {
        display: flex;
        align-items: center;
        select {
            padding: 2px;
            font-size: 14px;
            border: 1px solid var(--border-color);
            background-color: var(--background-color);
            color: var(--text-color);
            margin-left: 8px;
        }
    }
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
