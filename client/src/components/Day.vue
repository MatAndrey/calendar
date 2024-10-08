<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { uid } from "uid";
import { round } from "@/helpers/roud";
import { type Plan } from "@/store/plansModule";
import Checkbox from "@/components/UI/Checkbox.vue";
import PlanItem from "@/components/PlanItem.vue";
import PlanDialog from "@/components/Modal/PlanDialog.vue";
import { savePlan } from "@/helpers/api/savePlans";

const msInDay = 1000 * 60 * 60 * 24;
const dayNames = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

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
            dragStartEvent: null as null | DragEvent,
            createStartEvent: null as null | MouseEvent,
        };
    },
    methods: {
        showModal(plan: Plan, isNew = false) {
            this.$store.commit("setModalData", { plan, isPlanNew: isNew });
            this.$store.commit("openModal", PlanDialog);
        },
        createStart(event: MouseEvent) {
            this.createStartEvent = event;
        },
        createEnd(event: MouseEvent) {
            if (this.createStartEvent) {
                const point1 = this.createStartEvent.offsetY;
                const point2 = event.offsetY;
                const startOffset = Math.min(point1, point2);
                const endOffset = Math.max(point1, point2);

                const containerHeight = 24 * 40;
                const startAt = round(msInDay * (startOffset / containerHeight), 1800000);
                const duration = round(msInDay * ((endOffset - startOffset) / containerHeight), 1800000);

                const newPlan: Plan = {
                    description: "",
                    startAt: this.$props.date + startAt,
                    completed: false,
                    id: uid(),
                    duration,
                    type: {
                        name: "work",
                        title: "Работа",
                    },
                };
                this.showModal(newPlan, true);
                this.createStartEvent = null;
            }
        },
        dragStart(event: DragEvent) {
            this.dragStartEvent = event;
        },
        dragEnd(event: DragEvent, plan: Plan) {
            if (this.dragStartEvent) {
                const shiftX = event.pageX - this.dragStartEvent.pageX;
                const shiftY = event.pageY - this.dragStartEvent.pageY;
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
                plan.startAt = round(plan.startAt, 1800000);
                this.dragStartEvent = null;
                savePlan(plan);
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
            return Date.now() - this.date <= msInDay && Date.now() - this.date > 0;
        },
        currentTimeStyle() {
            return { top: ((Date.now() - this.date) / msInDay) * 100 + "%" };
        },
        createPlanAfterLast() {
            const lastPlan = this.plans.sort((a, b) => a.startAt - b.startAt).at(-1);
            const newPlan: Plan = {
                description: "",
                startAt: lastPlan ? lastPlan.startAt + lastPlan.duration : this.date,
                completed: false,
                id: uid(),
                duration: 1000 * 60 * 60,
                type: {
                    name: "work",
                    title: "Работа",
                },
            };
            this.showModal(newPlan, true);
            this.createStartEvent = null;
        },
    },
    computed: {
        dayName() {
            return dayNames[new Date(this.date).getDay()];
        },
        dateNumber() {
            const date = new Date(this.date);
            return date.getDate();
        },
    },
    components: { Checkbox, PlanItem },
});
</script>

<template>
    <div class="day">
        <div class="hour-lines">
            <div class="hour-line" v-for="_ in 25"></div>
        </div>
        <div class="date-info" @click="createPlanAfterLast">
            <div class="day-number">{{ dateNumber }}</div>
            <div class="day-name">{{ dayName }}</div>
        </div>
        <div class="plans-container" @pointerdown.self="createStart" @pointerup.self="createEnd">
            <PlanItem
                :plan="plan"
                v-for="plan in $props.plans"
                @dragstart="dragStart"
                @dragend="(e) => dragEnd(e, plan)"
                draggable="true"
                :key="plan.id"
                :style="planStyles(plan)"
            />
            <div v-if="isItToday()" class="current-time" :style="currentTimeStyle()"></div>
        </div>
    </div>
</template>

<style lang="scss">
.day {
    width: calc(100% / 7);
    height: 100%;
    min-width: 220px;
    position: relative;
    .hour-lines {
        position: absolute;
        z-index: -10;
        top: 72px;
        left: 0;
        right: 0;
        .hour-line {
            border-top: 1px solid var(--border-secondary);
            height: calc(var(--hour-height));
            width: 100%;
        }
    }
    .date-info {
        padding: 6px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--background-color);
        position: sticky;
        top: 0;
        z-index: 1;
        cursor: pointer;
        .day-number,
        .day-name {
            font-size: 20px;
            width: 2em;
            text-align: center;
        }
        .day-number {
            background-color: var(--main-color);
            border-radius: 50%;
            width: 2em;
            line-height: 2em;
            color: #fff;
        }
    }

    &:last-child .plans-container {
        border: none;
    }
    .plans-container {
        height: calc(var(--hour-height) * 24);
        border-right: 1px solid var(--border-secondary);
        width: 100%;
        position: relative;
        .plan {
            min-height: 20px;
            position: absolute;
        }
        .current-time {
            border: 1px red solid;
            width: 100%;
            position: absolute;
            &::before {
                content: "сейчас";
                position: absolute;
                bottom: 0;
                color: var(--border-color);
                z-index: -10;
            }
        }
    }
}
</style>
