<script lang="ts">
import Week from "../components/Week.vue";
import PrimaryBtn from "../components/PrimaryBtn.vue";
import { defineComponent } from "vue";
import { uid } from "uid";
import { formatDate } from "../helpers/formatDate";

const weekStart = new Date();
weekStart.setDate(weekStart.getDate() - (weekStart.getDay() || 7) + 1);
weekStart.setHours(0, 0, 0, 0);

export default defineComponent({
    components: {
        Week,
        PrimaryBtn,
    },
    data() {
        return {
            periodStart: +weekStart,
            periodDuration: 1000 * 60 * 60 * 24 * 7,
        };
    },
    methods: {
        formatDate,
        next() {
            this.periodStart += this.periodDuration;
        },
        previous() {
            this.periodStart -= this.periodDuration;
        },
        createPlan() {
            const date = new Date();
            date.setDate(date.getDate() + 1);
            date.setHours(0, 0, 0, 0);
            this.$store.commit("openModal", {
                title: "",
                description: "",
                startAt: +date,
                duration: 0,
                completed: false,
                color: "orange",
                id: uid(),
            });
        },
    },
    computed: {
        month() {
            return formatDate(this.periodStart, "month YYYY");
        },
    },
});
</script>

<template>
    <div class="calendar">
        <div class="menu">
            <button @click="previous" class="arrow-button"><icon name="angle-left" /></button
            ><button @click="next" class="arrow-button"><icon name="angle-right" /></button>
            <h4>{{ month }}</h4>
            <PrimaryBtn class="create-plan-btn" @click="createPlan"><icon name="plus" />Новый план</PrimaryBtn>
        </div>
        <Week :weekStart="periodStart" />
    </div>
</template>

<style scoped lang="scss">
.calendar {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    .menu {
        display: flex;
        align-items: center;
        padding: 8px;
        border-bottom: 1px solid var(--border-color);
        .arrow-button {
            border: none;
            border-radius: 100%;
            height: 2em;
            width: 2em;
            background-color: inherit;
            cursor: pointer;
            &:hover {
                background-color: #eee;
            }
            svg {
                color: var(--border-color);
                height: 100%;
                width: 100%;
            }
        }
        h4 {
            font-size: 20px;
            margin-left: 20px;
            color: #555;
        }
        .create-plan-btn {
            margin-left: auto;
            display: flex;
            .plus {
                height: 18px;
                width: 18px;
            }
        }
    }
}
</style>
