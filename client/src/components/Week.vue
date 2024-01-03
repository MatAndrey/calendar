<script lang="ts">
import { defineComponent } from "vue";
import { Plan } from "@/store/plansModule";
import Loader from "@/components/UI/Loader.vue";
import Day from "@/components/Day.vue";

const msInDay = 1000 * 60 * 60 * 24;

export default defineComponent({
    components: { Loader, Day },
    props: {
        weekStart: {
            type: Number,
            required: true,
        },
    },
    methods: {
        plansForDay(dayNumber: number): Plan[] {
            return this.plans.filter(
                (plan) =>
                    (plan.startAt >= this.$props.weekStart + (dayNumber - 1) * msInDay &&
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
        isLoading() {
            return this.$store.state.plan.isLoading;
        },
    },
    mounted() {
        this.$store.dispatch("getPlans");
    },
});
</script>

<template>
    <div class="week">
        <div class="days_container" v-show="!isLoading" ref="daysContainer">
            <div class="time-marks">
                <div class="time-mark" v-for="hour in 25">{{ hour - 1 >= 10 ? hour - 1 : "0" + (hour - 1) }}:00</div>
            </div>
            <Day v-for="dayNumber in 7" :date="(dayNumber - 1) * (1000 * 60 * 60 * 24) + $props.weekStart" :plans="plansForDay(dayNumber)" />
        </div>
        <Loader v-show="isLoading" />
    </div>
</template>

<style lang="scss">
.week {
    --hour-height: 40px;
    overflow: hidden;
    .days_container {
        display: flex;
        overflow: auto;
        height: 100%;
        .time-marks {
            color: #999;
            padding-top: calc(72px - 0.5em);
            padding-left: 4px;
            z-index: 2;
            position: sticky;
            left: 0;
            background-color: var(--background-color);
            height: calc(var(--hour-height) * 26);
            .time-mark {
                height: var(--hour-height);
                padding-right: 4px;
            }
        }
    }
}
</style>
