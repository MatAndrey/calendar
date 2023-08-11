<script lang="ts">
export default {
    methods: {
        closeModal() {
            this.$store.commit("closeModal");
        },
    },
    computed: {
        dialog() {
            return this.$store.state.dialog.modal;
        },
    },
};
</script>

<template>
    <div class="modal_container" @pointerdown.self.stop="closeModal" @keydown="(e) => e.key === 'Escape' && closeModal()" v-if="dialog">
        <button @click="closeModal" class="closeButton"><icon name="xmark" /></button>
        <div class="modal" @pointerup.stop>
            <component :is="dialog" />
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
    .closeButton {
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: 8px;
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        svg {
            width: 32px;
            height: 32px;
        }
    }
    .modal {
        width: 100%;
        max-width: 450px;
        background: var(--background-color);
        padding: 16px;
        border-radius: 16px;
        margin-top: 40px;
    }
}
</style>
