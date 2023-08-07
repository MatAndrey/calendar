<script lang="ts">
export default {};
</script>

<template>
    <button>
        <slot />
    </button>
</template>

<style scoped>
button {
    background-color: var(--main-color);
    border: none;
    border-radius: 16px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    padding: 4px 8px;
}
</style>
