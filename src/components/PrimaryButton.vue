<script lang="ts">
export default {};
</script>

<template>
    <button class="primary-button"><slot /></button>
</template>

<style scoped>
.primary-button {
    background-color: rgb(223, 144, 70);
    border: none;
    border-radius: 4px;
    padding: 4px 16px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}
</style>
