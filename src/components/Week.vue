<script lang="ts">
import { defineComponent } from "vue";
import PlansForDay from "./PlansForDay.vue";
import { useStore } from "vuex";
import { State } from "@/store";
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
            const store = useStore<State>();
            store.dispatch("getPlans");
            const plans = store.state.plan.plans;
            return plans;
        },
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
    height: 100%;
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
    background-color: #fff;
    height: calc(var(--hour-height) * 25);
}
.time-mark {
    height: var(--hour-height);
    padding-right: 4px;
}
.day {
    width: calc(100% / 7);
    height: 100%;
    min-width: 220px;
}
.date-info {
    padding: 6px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
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
    background-color: rgb(223, 144, 70);
    border-radius: 50%;
    width: 2em;
    line-height: 2em;
    color: #fff;
}
</style>
