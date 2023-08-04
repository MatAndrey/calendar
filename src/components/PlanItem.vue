<script lang="ts">
import { Plan, planTypes } from "@/store/plansModule";
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
    computed: {
        bgColor() {
            console.log(this.$props.plan);
            return `background-color: ${planTypes[this.$props.plan.color].color};`;
        },
    },
};
</script>

<template>
    <div :key="plan.id" @click.stop="showModal(plan)" class="plan" :style="bgColor">
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
        color: #555;
        height: 100%;
        overflow: hidden;
        button {
            margin-right: 4px;
            float: left;
        }
    }
}
</style>
