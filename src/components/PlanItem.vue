<script lang="ts">
import { Plan } from "@/store/plansModule";
import { PropType } from "vue";
import Checkbox from "./Checkbox.vue";

export default {
    props: {
        plan: {
            type: Object as PropType<Plan>,
            required: true,
        },
    },
    methods: {
        showModal(plan: Plan) {
            this.$store.commit("openModal", plan);
        },
        completePlan(plan: Plan) {
            plan.completed = true;
            this.$store.commit("editPlan", plan);
        },
    },
    components: {
        Checkbox,
    },
};
</script>

<template>
    <div :key="plan.id" @click.stop="showModal(plan)" :class="`plan ${plan.color}`">
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
    box-sizing: border-box;
    .plan_description {
        overflow-wrap: break-word;
        font-size: 14px;
        color: #555;
        height: 100%;
        overflow: hidden;
        button {
            margin-right: 4px;
            float: left;
        }
    }

    &.orange {
        background-color: rgb(241, 225, 209);
    }
    &.yellow {
        background-color: rgb(245, 241, 173);
    }
    &.red {
        background-color: rgb(255, 206, 206);
    }
    &.green {
        background-color: rgb(216, 255, 215);
    }
    &.blue {
        background-color: rgb(215, 228, 255);
    }
}
</style>
