<script lang="ts">
import { Plan } from "@/store/plansModule";
import { defineComponent } from "vue";
import Checkbox from "@/components/UI/Checkbox.vue";
import PrimaryBtn from "@/components/UI/PrimaryBtn.vue";
import VFocus from "@/directives/VFocus";
import { formatDate } from "@/helpers/formatDate";
import { savePlan } from "@/helpers/api/savePlans";
import TypeSelect from "../UI/TypeSelect.vue";

export default defineComponent({
    methods: {
        formatDate,
        formatDuration(duration: number) {
            return String(duration / 1000 / 60 / 60).slice(0, 4);
        },
        closeModal() {
            this.$store.commit("closeModal");
        },
        async saveChanges() {
            await savePlan(this.plan);

            this.closeModal();
        },
        changeStart(event: Event) {
            const target = event.target as HTMLInputElement;
            const [hour, minute] = target.value.split(":");
            const date = new Date(this.plan.startAt);
            date.setHours(+hour, +minute);
            this.plan.startAt = +date;
        },
        changeDuration(event: Event) {
            const target = event.target as HTMLInputElement;
            this.plan.duration = +target.value * 60 * 60 * 1000;
        },
        changeEnd(event: Event) {
            const target = event.target as HTMLInputElement;
            const [hour, minute] = target.value.split(":");
            const date = new Date(this.plan.startAt);
            date.setHours(+hour, +minute);
            if (+date <= this.plan.startAt) {
                this.plan.duration = 0;
            } else {
                this.plan.duration = +date - this.plan.startAt;
            }
        },
        changeDate(event: Event) {
            const target = event.target as HTMLInputElement;
            const [year, month, date] = target.value.split("-");
            const planDate = new Date(this.plan.startAt);
            planDate.setFullYear(+year, +month - 1, +date);
            this.plan.startAt = +planDate;
        },
    },
    data() {
        const plan = JSON.parse(JSON.stringify(this.$store.state.dialog.modalData.plan)) as Plan;
        return {
            plan,
        };
    },
    components: { Checkbox, PrimaryBtn, TypeSelect },
    directives: { focus: VFocus },
});
</script>

<template>
    <div class="plan-dialog">
        <div class="descriprion">
            <textarea v-model="plan.description" placeholder="Описание плана..." v-focus></textarea>
        </div>
        <div class="time-settings">
            <label>Начало <input type="time" @change="changeStart" :value="formatDate(plan.startAt, 'hh:mm')" /></label>
            <label>Длительность <input type="number" min="0" @change="changeDuration" :value="formatDuration(plan.duration)" step="0.5" /></label>
            <label>Окончание <input type="time" @focusout="changeEnd" :value="formatDate(plan.startAt + plan.duration, 'hh:mm')" /></label>
            <label>Дата <input type="date" :value="formatDate(plan.startAt, 'YYYY-MM-DD')" @focusout="changeDate" /></label>
        </div>

        <TypeSelect v-model="plan.type" />
        <PrimaryBtn @click="saveChanges" class="save-btn"><icon name="floppy-disk" />Сохранить</PrimaryBtn>
    </div>
</template>

<style lang="scss">
.plan-dialog {
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
        }
    }
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
    .color-select {
        float: left;
    }
    button.save-btn {
        float: right;
        margin-top: 2px;
        display: flex;
        svg {
            width: 18px;
            height: 18px;
            margin-right: 4px;
        }
    }
}
</style>
