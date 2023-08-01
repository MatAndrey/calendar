<script lang="ts">
import { defineComponent } from "vue";
import PlansForDay from "./PlansForDay.vue";
import { Plan } from "@/store/plansModule";

const dayNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const msInDay = 1000 * 60 * 60 * 24;

export default defineComponent({
    components: { PlansForDay },
    props: {
        weekStart: {
            type: Number,
            required: true,
        },
    },
    methods: {
        dayName: (dayNumber: number) => dayNames[dayNumber - 1],
        dateNumber(dayNumber: number) {
            const date = new Date(this.$props.weekStart);
            date.setDate(date.getDate() + dayNumber - 1);
            return date.getDate();
        },
        plansForDay(dayNumber: number): Plan[] {
            return this.plans.filter(
                (plan) =>
                    (plan.startAt > this.$props.weekStart + (dayNumber - 1) * msInDay &&
                        plan.startAt < this.$props.weekStart + dayNumber * msInDay) ||
                    (plan.startAt + plan.duration > this.$props.weekStart + (dayNumber - 1) * msInDay &&
                        plan.startAt + plan.duration < this.$props.weekStart + dayNumber * msInDay)
            );
        },
    },
    computed: {
        plans(): Plan[] {
            const plans = this.$store.getters.sortedPlans;
            return plans;
        },
    },
    mounted() {
        this.$store.dispatch("getPlans");
    },
});
</script>

<template>
    <div class="week">
        <div class="days_container">
            <div class="time-marks">
                <div class="time-mark" v-for="hour in 25">{{ hour - 1 >= 10 ? hour - 1 : "0" + (hour - 1) }}:00</div>
            </div>
            <div class="day" v-for="dayNumber in 7">
                <div class="hour-lines">
                    <div class="hour-line" v-for="_ in 25"></div>
                </div>
                <div class="date-info">
                    <div class="day-number">{{ dateNumber(dayNumber) }}</div>
                    <div class="day-name">{{ dayName(dayNumber) }}</div>
                </div>
                <PlansForDay :date="(dayNumber - 1) * (1000 * 60 * 60 * 24) + $props.weekStart" :plans="plansForDay(dayNumber)" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.week {
    --hour-height: 40px;
    overflow: hidden;
}
.days_container {
    display: flex;
    overflow: auto;
    height: 100%;
}
.time-marks {
    color: #999;
    padding-top: calc(72px - 0.5em);
    z-index: 9;
    position: sticky;
    left: 0;
    background-color: var(--background-color);
    height: calc(var(--hour-height) * 25);
}
.time-mark {
    height: var(--hour-height);
    padding-right: 4px;
}
.hour-lines {
    position: absolute;
    z-index: -10;
    top: 72px;
    left: 0;
    right: 0;
}
.hour-line {
    border-top: 1px solid var(--border-secondary);
    height: calc(var(--hour-height));
    box-sizing: border-box;
    width: 100%;
}
.day {
    width: calc(100% / 7);
    height: 100%;
    min-width: 220px;
    position: relative;
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
    z-index: 10;
}
.day-number,
.day-name {
    font-size: 20px;
    width: 2em;
    text-align: center;
}
.day-number {
    background-color: var(--orange);
    border-radius: 50%;
    width: 2em;
    line-height: 2em;
    color: var(--background-color);
}
</style>
