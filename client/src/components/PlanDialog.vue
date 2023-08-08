<script lang="ts">
import { Plan, colors, planTypes } from "../store/plansModule";
import { PropType, defineComponent, ref, shallowRef } from "vue";
import Checkbox from "./Checkbox.vue";
import PrimaryBtn from "./PrimaryBtn.vue";
import VFocus from "../directives/VFocus";
import { formatDate } from "../helpers/formatDate";

export default defineComponent({
    methods: {
        formatDate,
        formatDuration(duration: number) {
            return String(duration / 1000 / 60 / 60).slice(0, 4);
        },
        closeModal() {
            this.$store.commit("closeModal");
        },
        saveChanges() {
            this.$store.commit("editPlan", {
                description: this.description,
                completed: this.completed,
                startAt: this.startAt,
                duration: this.duration,
                color: this.color,
                id: this.id,
            });
            this.closeModal();
        },
        changeStart(event: Event) {
            const target = event.target as HTMLInputElement;
            const [hour, minute] = target.value.split(":");
            const date = new Date(this.startAt);
            date.setHours(+hour, +minute);
            this.startAt = +date;
        },
        changeDuration(event: Event) {
            const target = event.target as HTMLInputElement;
            this.duration = +target.value * 60 * 60 * 1000;
        },
        changeEnd(event: Event) {
            const target = event.target as HTMLInputElement;
            const [hour, minute] = target.value.split(":");
            const date = new Date(this.startAt);
            date.setHours(+hour, +minute);
            if (+date <= this.startAt) {
                this.duration = 0;
            } else {
                this.duration = +date - this.startAt;
            }
        },
        chengeColor(event: Event) {
            const target = event.target as HTMLInputElement;
            this.color = target.dataset.color as keyof typeof planTypes;
        },
        changeDate(event: Event) {
            const target = event.target as HTMLInputElement;
            const [year, month, date] = target.value.split("-");
            const planDate = new Date(this.startAt);
            planDate.setFullYear(+year, +month - 1, +date);
            this.startAt = +planDate;
        },
    },
    data() {
        return {
            ...(this.$store.state.dialog.modalData.plan as Plan),
            planTypes,
        };
    },
    components: { Checkbox, PrimaryBtn },
    directives: { focus: VFocus },
});
</script>

<template>
    <div class="plan-dialog">
        <textarea v-model="description" placeholder="Описание плана..." v-focus></textarea>
        <div class="time-settings">
            <label>Начало <input type="time" @change="changeStart" :value="formatDate(startAt, 'hh:mm')" /></label>
            <label>Длительность <input type="number" min="0" @change="changeDuration" :value="formatDuration(duration)" step="0.5" /></label>
            <label>Окончание <input type="time" @focusout="changeEnd" :value="formatDate(startAt + duration, 'hh:mm')" /></label>
            <label>Дата <input type="date" :value="formatDate(startAt, 'YYYY-MM-DD')" @focusout="changeDate" /></label>
        </div>
        <footer>
            <div class="colors">
                <div class="color_container" v-for="(opt, c) in planTypes" :class="c === color && 'active'" key="c">
                    <div :class="'color ' + c" :data-color="c" @click="chengeColor" :title="opt.title"></div>
                </div>
            </div>
            <PrimaryBtn @click="saveChanges"><icon name="floppy-disk" />Сохранить</PrimaryBtn>
        </footer>
    </div>
</template>

<style scoped lang="scss">
textarea {
    width: 100%;
    max-height: 400px;
    resize: vertical;
    height: 15em;
    font-family: Roboto;
    font-size: 16px;
    padding: 4px;
    border-radius: 8px;
    color: var(--text-color);
    background-color: var(--background-color);
}

.time-settings {
    display: flex;
    flex-wrap: wrap;
    label {
        width: 50%;
        padding: 4px;
        input {
            height: 20px;
            padding: 2px;
            font-family: inherit;
            font-size: 16px;
            border: 1px solid var(--border-color);
            margin-top: 2px;
            border-radius: 4px;
            width: 100%;
            color: var(--text-color);
            background-color: var(--background-color);
        }
    }
}

footer {
    display: flex;
    justify-content: space-between;
    button {
        float: right;
        margin-top: 2px;
        display: flex;
        svg {
            width: 18px;
            height: 18px;
            margin-right: 4px;
        }
    }
    .colors {
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
            &.active {
                border: 1px solid var(--border-color);
                border-radius: 50%;
                padding: 1px;
            }
        }
    }
}
</style>
