<script lang="ts">
import { Plan, colors } from "../store/plansModule";
import { PropType, defineComponent } from "vue";
import Checkbox from "./Checkbox.vue";
import PrimaryBtn from "./PrimaryBtn.vue";
import VFocus from "../directives/VFocus";
import { formatDate } from "../helpers/formatDate";

export default defineComponent({
    props: {
        plan: {
            type: Object as PropType<Plan>,
            required: true,
        },
    },
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
                ...this.$props.plan,
                description: this.description,
                completed: this.completed,
                startAt: this.startAt,
                duration: this.duration,
                color: this.color,
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
            this.color = target.dataset.color as (typeof colors)[number];
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
            description: this.$props.plan.description,
            completed: this.$props.plan.completed,
            startAt: this.$props.plan.startAt,
            duration: this.$props.plan.duration,
            color: this.$props.plan.color,
            colors,
        };
    },
    components: { Checkbox, PrimaryBtn },
    directives: { focus: VFocus },
});
</script>

<template>
    <div class="modal_container" @click="closeModal" @keydown="(e) => e.key === 'Escape' && closeModal()">
        <div class="modal" @click.stop :style="`border: 1px solid ${color};`">
            <button class="closeButton" @click="closeModal"><icon name="xmark" /></button>
            <textarea v-model="description" placeholder="Описание плана..." v-focus></textarea>
            <div class="time-settings">
                <label>Начало <input type="time" @change="changeStart" :value="formatDate(startAt, 'hh:mm')" /></label>
                <label>Длительность <input type="number" min="0" @change="changeDuration" :value="formatDuration(duration)" step="0.5" /></label>
                <label>Окончание <input type="time" @focusout="changeEnd" :value="formatDate(startAt + duration, 'hh:mm')" /></label>
                <label>Дата <input type="date" :value="formatDate(startAt, 'YYYY-MM-DD')" @focusout="changeDate" /></label>
            </div>
            <footer>
                <div class="colors">
                    <div class="color_container" v-for="c in colors" :class="c === color && 'active'">
                        <div class="color" :style="`background-color: ${c};`" :data-color="c" @click="chengeColor"></div>
                    </div>
                </div>
                <PrimaryBtn @click="saveChanges"><icon name="floppy-disk" />Сохранить</PrimaryBtn>
            </footer>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal_container {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #0000006b;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal {
    width: 400px;
    background: var(--background-color);
    padding: 16px;
    border-radius: 16px;

    .closeButton {
        border: none;
        background-color: inherit;
        cursor: pointer;
        padding: 0;
        float: right;
        svg {
            width: 24px;
            height: 24px;
        }
    }

    textarea {
        width: 100%;
        max-height: 400px;
        resize: vertical;
        height: 15em;
        font-family: Roboto;
        font-size: 16px;
        padding: 4px;
        box-sizing: border-box;
        border-radius: 8px;
    }

    .time-settings {
        display: flex;
        flex-wrap: wrap;
        label {
            width: 50%;
            padding: 4px;
            box-sizing: border-box;
            input {
                height: 20px;
                padding: 2px;
                font-family: inherit;
                font-size: 16px;
                border: 1px solid var(--border-color);
                margin-top: 2px;
                border-radius: 4px;
                width: 100%;
                box-sizing: border-box;
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
                background-color: #fff;
                cursor: pointer;
                box-sizing: border-box;
            }
            .color_container {
                margin-right: 4px;
                &.active {
                    border: 1px solid var(--border-color);
                    border-radius: 50%;
                    padding: 1px;
                    box-sizing: border-box;
                }
            }
        }
    }
}

@media (max-width: 434px) {
    .modal {
        width: 100vw;
        height: 100dvh;
    }
}
</style>
