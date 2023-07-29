<script lang="ts">
export default {
    props: {
        active: {
            type: Boolean,
            requiered: true,
        },
    },
};
</script>

<template>
    <button class="checkbox" :class="active && 'active'">
        <icon name="check" v-if="active" />
    </button>
</template>

<style scoped lang="scss">
.checkbox {
    width: 20px;
    height: 20px;
    border: 1px solid var(--border-color);
    border-radius: 100%;
    cursor: pointer;
    padding: 0;
    &.active {
        background-color: var(--orange);
    }
    svg {
        height: 15px;
        width: 15px;
        padding: 2px;
        color: #fff;
    }
}
</style>
