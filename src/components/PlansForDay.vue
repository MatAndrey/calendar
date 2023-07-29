<script lang="ts">
import { defineComponent } from "vue";
import { uid } from "uid";
import type { PropType } from "vue";
import type { Plan } from "../store/plansModule";

const msInDay = 1000 * 60 * 60 * 24;

export default defineComponent({
    props: {
        date: {
            type: Number,
            required: true,
        },
        plans: {
            type: Object as PropType<Plan[]>,
            required: true,
        },
    },
    data() {
        return {
            dradStartEvent: null as null | DragEvent,
        };
    },
    methods: {
        showModal(plan: Plan) {
            this.$store.commit("openModal", plan);
        },
        createNewPlan(event: MouseEvent) {
            const { offsetY } = event;
            const containerHeight = 24 * 40;
            const timeOfset = msInDay * (offsetY / containerHeight);
            const newPlan: Plan = {
                title: "",
                description: "",
                startAt: this.$props.date + timeOfset,
                completed: false,
                id: uid(),
                duration: 0,
                color: "orange",
            };
            this.showModal(newPlan);
        },
        dragStart(event: DragEvent) {
            this.dradStartEvent = event;
        },
        dragEnd(event: DragEvent, plan: Plan) {
            if (this.dradStartEvent) {
                const shiftX = event.pageX - this.dradStartEvent.pageX;
                const shiftY = event.pageY - this.dradStartEvent.pageY;
                const planElem = event.target as HTMLElement;
                const containerStyles = getComputedStyle(planElem.parentElement as HTMLElement);
                const containerWidth = parseFloat(containerStyles.width);
                const planHeight = parseFloat(containerStyles.height) / 24;
                plan.startAt += (shiftY / (planHeight * 24)) * 1000 * 60 * 60 * 24;
                let daysShift = Math.round(shiftX / containerWidth);
                const dayNumber = new Date(this.$props.date).getDay();
                if (dayNumber === 0 && daysShift > 0) daysShift = 0;
                if (daysShift + dayNumber < 1 && dayNumber !== 0) daysShift = 0;
                plan.startAt += daysShift * 24 * 60 * 60 * 1000;
            }
        },
        planStyles(plan: Plan) {
            const planHeight = (duration: number) => (duration / msInDay) * 100;
            const planOffset = (startAt: number) => ((startAt - this.$props.date) / msInDay) * 100;
            const heightPercentage = planHeight(plan.duration);
            const offsetPercentage = planOffset(plan.startAt);
            let height = heightPercentage;
            let top = offsetPercentage;
            if (offsetPercentage < 0) {
                height = heightPercentage + offsetPercentage;
                top = 0;
            } else if (offsetPercentage + heightPercentage > 100) {
                height = 100 - offsetPercentage;
            }
            return {
                height: height + "%",
                top: top + "%",
            };
        },
        isItToday() {
            return Date.now() - this.$props.date <= msInDay && Date.now() - this.$props.date > 0;
        },
        currentTimeStyle() {
            const now = new Date();
            return { top: ((+now - this.$props.date) / msInDay) * 100 + "%" };
        },
    },
});
</script>

<template>
    <div class="plans-container" @click="createNewPlan">
        <div
            v-for="plan in $props.plans"
            :class="`plan ${plan.color}`"
            :style="planStyles(plan)"
            :key="plan.id"
            @click.stop="showModal(plan)"
            @dragstart="dragStart"
            @dragend="(e) => dragEnd(e, plan)"
            draggable="true"
        >
            <h6 class="plan_title">{{ plan.title }}</h6>
            <p class="plan_description">{{ plan.description }}</p>
        </div>
        <div v-if="isItToday()" class="current-time" :style="currentTimeStyle()"></div>
    </div>
</template>

<style scoped lang="scss">
.plans-container {
    height: calc(var(--hour-height) * 24);
    border-right: 1px solid var(--border-secondary);
    box-sizing: border-box;
    width: 100%;
    position: relative;
}
.day:last-child .plans-container {
    border: none;
}
.plan {
    border-radius: 8px;
    padding: 4px 8px;
    min-height: 40px;
    margin: 0 2px;
    overflow: hidden;
    cursor: pointer;
    left: 0;
    right: 0;
    position: absolute;
    box-sizing: border-box;
    .plan_description {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 14px;
        color: #555;
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

.current-time {
    border: 1px red solid;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    &::before {
        content: "сейчас";
        position: absolute;
        bottom: 0;
        color: var(--border-color);
        z-index: -10;
    }
}
</style>
