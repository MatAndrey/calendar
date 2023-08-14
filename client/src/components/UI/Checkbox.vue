<script lang="ts">
export default {
    props: {
        active: {
            type: Boolean,
            requiered: true,
        },
        size: {
            type: String,
            default: "20px",
        },
    },
};
</script>

<template>
    <button class="checkbox" :class="active && 'active'" :style="{ width: $props.size, height: $props.size }">
        <icon name="check" v-if="active" />
    </button>
</template>

<style lang="scss">
.checkbox {
    border: 1px solid var(--border-color);
    border-radius: 100%;
    cursor: pointer;
    padding: 0;
    box-sizing: border-box;
    &.active {
        background-color: var(--main-color);
    }
    svg {
        height: 75%;
        width: 75%;
        color: #fff;
    }
}
</style>
