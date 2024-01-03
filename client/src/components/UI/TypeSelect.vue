<script lang="ts">
import { planTypes, PlanTypes } from "@/store/plansModule";
import { PropType, defineComponent } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: [Object, Array] as PropType<PlanTypes | PlanTypes[]>,
            required: true,
        },
    },
    emits: ["update:modelValue"],
    data() {
        return {
            planTypes,
            selectedTypes: Array.isArray(this.$props.modelValue) ? this.$props.modelValue : [this.$props.modelValue],
        };
    },
    methods: {
        toggleType(planType: PlanTypes) {
            const isMultiple = Array.isArray(this.$props.modelValue);
            if (!isMultiple) {
                this.selectedTypes = [];
            }
            if (this.selectedTypes.includes(planType)) {
                this.selectedTypes = this.selectedTypes.filter((c) => c !== planType);
            } else {
                this.selectedTypes.push(planType);
            }
            this.$emit("update:modelValue", isMultiple ? this.selectedTypes : planType);
        },
    },
});
</script>

<template>
    <div class="type-select">
        <div
            class="type_container"
            v-for="planType in planTypes"
            :class="{ active: selectedTypes.find((t) => t.name === planType.name) }"
            :key="planType.name"
        >
            <div :class="['plan-type', planType.name]" @click="toggleType(planType)" :title="planType.title"></div>
        </div>
    </div>
</template>

<style>
.type-select {
    display: flex;
    height: 20px;
    align-items: center;
    .plan-type {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid var(--border-color);
        background-color: var(--plan-primary);
        cursor: pointer;
    }
    .type_container {
        margin-right: 4px;
        padding: 1px;
        &.active {
            outline: 1px solid var(--border-color);
            border-radius: 50%;
        }
    }
}
</style>
