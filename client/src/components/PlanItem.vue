<script lang="ts">
import { PropType } from "vue";
import { Plan } from "@/store/plansModule";
import Checkbox from "@/components/UI/Checkbox.vue";
import PlanDialog from "@/components/Modal/PlanDialog.vue";
import { savePlan } from "@/helpers/api/savePlans";

export default {
    props: {
        plan: {
            type: Object as PropType<Plan>,
            required: true,
        },
    },
    methods: {
        showModal(plan: Plan) {
            this.$store.commit("setModalData", { plan });
            this.$store.commit("openModal", PlanDialog);
        },
        completePlan(plan: Plan) {
            plan.completed = true;
            savePlan(plan);
        },
    },
    components: {
        Checkbox,
    },
};
</script>

<template>
    <div :key="plan.id" @click.stop="showModal(plan)" :class="'plan ' + plan.type.name">
        <div class="plan_description">
            <Checkbox size="16px" @click.stop="completePlan(plan)" />
            <p>{{ plan.description }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.plan {
    border-left: 4px solid var(--plan-primary);
    background-color: var(--plan-secondary);
    box-shadow: -1px -1px 4px -2px var(--border-color) inset;
    padding: 2px;
    cursor: pointer;
    width: 100%;
    .plan_description {
        overflow-wrap: break-word;
        font-size: 16px;
        color: var(--text-secondary);
        height: 100%;
        min-height: 16px;
        overflow: hidden;
        p {
            white-space: pre-line;
            margin-left: 18px;
        }
        button {
            margin-right: 4px;
            float: left;
        }
    }
}
</style>
