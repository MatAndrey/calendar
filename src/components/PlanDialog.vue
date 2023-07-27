<script lang="ts">
import { Plan } from "../store/plansModule";
import { PropType, defineComponent } from "vue";

import Checkbox from "./Checkbox.vue";
import PrimaryButton from "./PrimaryButton.vue";
import VFocus from "../directives/VFocus";

export default defineComponent({
    props: {
        plan: {
            type: Object as PropType<Plan>,
            required: true,
        },
    },
    methods: {
        formatDate(timestamp: number) {
            const date = new Date(timestamp);
            const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            return hours + ":" + minutes;
        },
        formatDuration(duration: number) {
            return String(duration / 1000 / 60 / 60).slice(0, 4);
        },
        saveChanges() {
            this.$store.commit("editPlan", {
                ...this.$props.plan,
                title: this.title,
                description: this.description,
                completed: this.completed,
                startAt: this.startAt,
                duration: this.duration,
            });
            this.$store.commit("closeModal");
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
    },
    data() {
        return {
            title: this.$props.plan.title,
            description: this.$props.plan.description,
            completed: this.$props.plan.completed,
            startAt: this.$props.plan.startAt,
            duration: this.$props.plan.duration,
        };
    },
    components: { Checkbox, PrimaryButton },
    directives: { focus: VFocus },
});
</script>

<template>
    <div class="modal_container" @click="$store.commit('closeModal')" @keydown="(e) => e.key === 'Escape' && $store.commit('closeModal')">
        <div class="modal" @click.stop>
            <div class="heading">
                <Checkbox :active="completed" @click="$data.completed = !$data.completed" />
                <input type="text" v-model="title" placeholder="План..." />
            </div>
            <textarea v-model="description" placeholder="Описание плана..." v-focus></textarea>
            <div class="time-settings">
                <label>Начало <input type="time" @change="changeStart" :value="formatDate(startAt)" /></label>
                <label>Длительность <input type="number" min="0" @change="changeDuration" :value="formatDuration(duration)" step="0.5" /></label>
                <label>Окончание <input type="time" @focusout="changeEnd" :value="formatDate(startAt + duration)" /></label>
            </div>
            <PrimaryButton @click="saveChanges">Сохранить</PrimaryButton>
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
    background: #fff;
    padding: 16px;
    border-radius: 16px;

    .heading {
        display: flex;
        button {
            margin: auto 4px;
        }
        input {
            font-size: 20px;
            padding: 2px;
            border: none;
        }
    }

    textarea {
        width: 100%;
        margin-top: 4px;
        max-height: 400px;
        resize: vertical;
        height: 25em;
        font-family: Roboto;
        font-size: 16px;
        padding: 4px;
        box-sizing: border-box;
        border-radius: 8px;
    }

    .time-settings {
        display: flex;
        margin-top: 4px;
        label {
            width: 33%;
            padding: 4px;
            input {
                height: 20px;
                padding: 2px;
                font-family: inherit;
                font-size: 16px;
                border: 1px solid #999;
                margin-top: 2px;
                border-radius: 4px;
                width: 100%;
                box-sizing: border-box;
            }
        }
    }

    button {
        float: right;
        margin-top: 2px;
    }
}
</style>
