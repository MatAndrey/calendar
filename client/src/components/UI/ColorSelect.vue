<script lang="ts">
import { Colors, planTypes } from "@/store/plansModule";
import { PropType, defineComponent } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: [String, Array] as PropType<Colors | Colors[]>,
            required: true,
        },
    },
    emits: ["update:modelValue"],
    data() {
        return {
            planTypes,
            selectedColors: Array.isArray(this.$props.modelValue) ? this.$props.modelValue : [this.$props.modelValue],
        };
    },
    methods: {
        toggleColor(color: Colors) {
            const isMultiple = Array.isArray(this.$props.modelValue);
            if (!isMultiple) {
                this.selectedColors = [];
            }
            if (this.selectedColors.includes(color)) {
                this.selectedColors = this.selectedColors.filter((c) => c !== color);
            } else {
                this.selectedColors.push(color);
            }
            this.$emit("update:modelValue", isMultiple ? this.selectedColors : color);
        },
    },
});
</script>

<template>
    <div class="color-select">
        <div class="color_container" v-for="(opt, color) in planTypes" :class="{ active: selectedColors.includes(color) }" :key="color">
            <div :class="['color', color]" @click="toggleColor(color)" :title="opt.title"></div>
        </div>
    </div>
</template>

<style>
.color-select {
    display: flex;
    height: 20px;
    align-items: center;
    .color {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid var(--border-color);
        cursor: pointer;
    }
    .color_container {
        margin-right: 4px;
        padding: 1px;
        &.active {
            outline: 1px solid var(--border-color);
            border-radius: 50%;
        }
    }
}
</style>
