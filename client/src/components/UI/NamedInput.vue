<script lang="ts">
import { PropType } from "vue";

export default {
    props: {
        initValue: [String, Number],
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String as PropType<"password" | "text">,
            required: true,
        },
        errorMessage: [String],
    },
    data() {
        return {
            isFocused: false,
            value: this.$props.initValue || "",
            inputType: this.$props.type,
            isPassVisible: false,
            showMessage: false,
        };
    },
    methods: {
        updateValue(e: Event) {
            const target = e.target as HTMLInputElement;
            const newValue = target.value;
            this.$emit("update:modelValue", newValue);
            this.value = newValue;
        },
        showPassword() {
            if (this.isPassVisible) {
                this.inputType = "password";
                this.isPassVisible = false;
            } else {
                this.inputType = "text";
                this.isPassVisible = true;
            }
        },
        blur() {
            this.isFocused = false;
            this.showMessage = true;
        },
    },
};
</script>

<template>
    <div class="input">
        <div class="input-wrapper">
            <label :for="name" :class="{ focused: isFocused || value !== '' }">{{ title }}</label
            ><input :type="inputType" :id="name" @focus="isFocused = true" @blur="blur" @input="updateValue" :value="value" />
            <button class="showPassword" @click="showPassword" v-if="$props.type === 'password'" tabindex="-1">
                <icon :name="isPassVisible ? 'eye-slash' : 'eye'" />
            </button>
        </div>
        <div class="error-message" v-if="showMessage">{{ errorMessage }}</div>
    </div>
</template>

<style lang="scss">
.input {
    .input-wrapper {
        position: relative;
        label {
            position: absolute;
            top: 12px;
            left: 8px;
            background-color: var(--background-color);
            color: var(--text-secondary);
            &.focused {
                top: -4px;
                font-size: 14px;
                color: var(--text-color);
            }
            transition: all 0.2s;
        }
        input {
            padding: 8px;
            font-family: inherit;
            font-size: 16px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            width: 100%;
            background-color: var(--background-color);
            color: var(--text-color);
            &:focus {
                outline: none;
                border: 1px solid var(--text-secondary);
            }
        }
        .showPassword {
            border: none;
            background-color: transparent;
            position: absolute;
            right: 8px;
            top: 8px;
            padding: 0;
            cursor: pointer;
            color: var(--text-color);
            svg {
                height: 20px;
                width: 20px;
            }
        }
    }

    .error-message {
        margin-top: 4px;
        font-size: 14px;
        color: rgba(255, 0, 0, 0.5);
    }
}
</style>
