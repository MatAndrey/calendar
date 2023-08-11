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
    <div :key="plan.id" @click.stop="showModal(plan)" :class="'plan ' + plan.color">
        <div class="plan_description">
            <Checkbox size="14px" @click.stop="completePlan(plan)" />
            <p>{{ plan.description }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.plan {
    border-radius: 8px;
    padding: 3px 8px;
    cursor: pointer;
    width: 100%;
    .plan_description {
        overflow-wrap: break-word;
        font-size: 14px;
        color: var(--text-secondary);
        height: 100%;
        overflow: hidden;
        button {
            margin-right: 4px;
            float: left;
        }
    }
}
</style>
@/helpers/api/savePlan
