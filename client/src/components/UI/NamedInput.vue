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
        <label>
            <div class="input-wrapper">
                <span class="title" :class="{ focused: isFocused || value !== '' }">
                    {{ title }}
                </span>
                <input :type="inputType" :id="name" @focus="isFocused = true" @blur="blur" @input="updateValue" :value="value" />
                <button class="showPassword" @click="showPassword" v-if="$props.type === 'password'" tabindex="-1">
                    <icon :name="isPassVisible ? 'eye-slash' : 'eye'" />
                </button>
            </div>
        </label>
    </div>
    <div class="error-message" v-if="showMessage">{{ errorMessage }}</div>
</template>

<style lang="scss">
.input {
    label {
        cursor: text;
        .input-wrapper {
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 8px;
            position: relative;
            .title {
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
                font-family: inherit;
                font-size: 16px;
                width: calc(100% - 20px);
                border: none;
                background-color: var(--background-color);
                color: var(--text-color);
                &:focus {
                    outline: none;
                }
            }
            .showPassword {
                border: none;
                background-color: transparent;
                float: right;
                padding: 0;
                cursor: pointer;
                color: var(--text-color);
                svg {
                    height: 20px;
                    width: 20px;
                }
            }
        }
    }
}

.error-message {
    margin-top: 4px;
    font-size: 14px;
    color: rgba(255, 0, 0, 0.5);
}
</style>
