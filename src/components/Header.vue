<script lang="ts">
export default {};
</script>

<template>
    <header>
        <button class="left-menu-switch" @click="$emit('toggleMenu')"><icon name="bars" /></button>
        <h1>Календарь</h1>
    </header>
</template>

<style scoped lang="scss">
header {
    display: flex;
    height: 35px;
    h1 {
        font-size: 24px;
        padding: 4px;
    }
    .left-menu-switch {
        border: none;
        background-color: inherit;
        cursor: pointer;
        padding: 4px;
        svg {
            height: 24px;
            width: 24px;
        }
    }
}
</style>
