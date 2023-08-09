<script lang="ts">
export default {};
</script>

<template>
    <div class="loader">
        <div class="spiner"></div>
    </div>
</template>

<style scoped lang="scss">
.loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .spiner {
        border: 16px solid;
        border-color: var(--main-color) transparent var(--main-color) transparent;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        animation: 0.5s infinite linear spin;
    }

    @keyframes spin {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(180deg);
        }
    }
}
</style>
