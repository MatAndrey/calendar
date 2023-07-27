<script lang="ts">
import Week from "./Week.vue";
import PlanDialog from "./PlanDialog.vue";
import { defineComponent } from "vue";

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

export default defineComponent({
    components: {
        Week,
        PlanDialog,
    },
    data() {
        return {
            periodStart: 1689552000000 + 1000 * 60 * 60 * 24 * 7,
            periodDuration: 1000 * 60 * 60 * 24 * 7,
        };
    },
    methods: {
        next() {
            this.periodStart += this.periodDuration;
        },
        previous() {
            this.periodStart -= this.periodDuration;
        },
    },
    computed: {
        month() {
            const date = new Date(this.periodStart);
            return months[date.getMonth()] + " " + date.getFullYear();
        },
    },
});
</script>

<template>
    <PlanDialog :plan="$store.state.dialog.planForDialog" v-if="$store.state.dialog.planForDialog" />
    <div class="calendar">
        <header><h1>Календарь</h1></header>
        <div class="menu">
            <button @click="previous"><div class="arrow left"></div></button><button @click="next"><div class="arrow right"></div></button>
            <h4>{{ month }}</h4>
        </div>
        <Week :weekStart="periodStart" />
    </div>
</template>

<style scoped lang="scss">
header h1 {
    font-size: 24px;
    padding: 4px;
}
.calendar {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    .menu {
        display: flex;
        align-items: center;
        padding: 8px;
        border-bottom: 1px solid #999;
        button {
            border: none;
            border-radius: 100%;
            height: 2em;
            width: 2em;
            background-color: inherit;
            cursor: pointer;
            &:hover {
                background-color: #eee;
            }
            .arrow {
                border-top: 2px solid #999;
                border-left: 2px solid #999;
                height: 1em;
                width: 1em;
                &.left {
                    transform: translateX(0.25em) rotate(-45deg);
                }
                &.right {
                    transform: translateX(-0.25em) rotate(135deg);
                }
            }
        }
        h4 {
            font-size: 20px;
            margin-left: 20px;
        }
    }
}
</style>
