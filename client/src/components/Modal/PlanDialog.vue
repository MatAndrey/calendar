<script lang="ts">
import { Plan, planTypes } from "@/store/plansModule";
import { defineComponent } from "vue";
import Checkbox from "@/components/UI/Checkbox.vue";
import PrimaryBtn from "@/components/UI/PrimaryBtn.vue";
import VFocus from "@/directives/VFocus";
import { formatDate } from "@/helpers/formatDate";
import { savePlan } from "@/helpers/api/savePlans";
import { uid } from "uid";

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
            if (this.isRepeat && this.$store.state.dialog.modalData.isPlanNew) {
                const newPlans: Plan[] = [];
                for (let i = 0; i < this.repeatSettings.times; i++) {
                    newPlans.push({
                        ...this.plan,
                        id: uid(),
                        startAt: this.plan.startAt + i * this.repeatSettings.period * 24 * 60 * 60 * 1000,
                    });
                }
                await savePlan(newPlans);
            } else {
                await savePlan(this.plan);
            }
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
        chengeColor(event: Event) {
            const target = event.target as HTMLInputElement;
            this.plan.color = target.dataset.color as keyof typeof planTypes;
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
        const plan = this.$store.state.dialog.modalData.plan as Plan;
        return {
            plan,
            isRepeat: !!plan.repeat || false,
            repeatSettings: {
                period: plan.repeat?.period || 1,
                times: plan.repeat?.times || 2,
            },
            planTypes,
        };
    },
    components: { Checkbox, PrimaryBtn },
    directives: { focus: VFocus },
});
</script>

<template>
    <div class="plan-dialog">
        <div class="descriprion">
            <textarea v-model="plan.description" placeholder="Описание плана..." v-focus></textarea>
        </div>
        <label class="is-repeat" v-if="$store.state.dialog.modalData.isPlanNew"
            >Повторять<Checkbox :active="isRepeat" @pointerup="isRepeat = !isRepeat" size="16px"
        /></label>
        <div class="repeat-settings" v-if="isRepeat">
            <label>Количество повторений <input type="number" min="0" v-model="repeatSettings.times" step="1" /></label>
            <label>Промежуток повторений (сут) <input type="number" min="0" v-model="repeatSettings.period" step="1" /></label>
        </div>
        <div class="time-settings">
            <label>Начало <input type="time" @change="changeStart" :value="formatDate(plan.startAt, 'hh:mm')" /></label>
            <label>Длительность <input type="number" min="0" @change="changeDuration" :value="formatDuration(plan.duration)" step="0.5" /></label>
            <label>Окончание <input type="time" @focusout="changeEnd" :value="formatDate(plan.startAt + plan.duration, 'hh:mm')" /></label>
            <label>Дата <input type="date" :value="formatDate(plan.startAt, 'YYYY-MM-DD')" @focusout="changeDate" /></label>
        </div>

        <div class="colors">
            <div class="color_container" v-for="(opt, c) in planTypes" :class="c === plan.color && 'active'" key="c">
                <div :class="'color ' + c" :data-color="c" @click="chengeColor" :title="opt.title"></div>
            </div>
        </div>
        <PrimaryBtn @click="saveChanges" class="save-btn"><icon name="floppy-disk" />Сохранить</PrimaryBtn>
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
.is-repeat {
    display: flex;
    align-items: center;
    button {
        margin-left: 8px;
    }
}
.repeat-settings {
    label {
        display: block;
        margin-top: 4px;
        input {
            width: 50px;
        }
    }
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
.colors {
    display: flex;
    height: 20px;
    align-items: center;
    float: left;
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
</style>
@/helpers/api/savePlan
