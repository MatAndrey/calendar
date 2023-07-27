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
        <div class="check" v-if="active"></div>
    </button>
</template>

<style scoped lang="scss">
.checkbox {
    width: 20px;
    height: 20px;
    border: 1px solid #999;
    border-radius: 100%;
    cursor: pointer;
    &.active {
        background-color: rgb(223, 144, 70);
    }
    .check {
        border-bottom: 1px solid #fff;
        border-left: 1px solid #fff;
        width: 8px;
        height: 5px;
        transform: rotate(-45deg);
        margin-top: -2px;
        margin-left: -1px;
    }
}
</style>
