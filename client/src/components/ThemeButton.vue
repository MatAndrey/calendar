<script lang="ts">
type Theme = "light" | "dark";
export default {
    computed: {
        userTheme() {
            return this.$store.state.theme.theme;
        },
    },
    methods: {
        toggleTheme() {
            this.$store.commit("setTheme", this.userTheme === "dark" ? "light" : "dark");
        },
    },
};
</script>

<template>
    <div :class="{ 'theme-button': true, 'dark-theme': userTheme === 'dark' }">
        <input @change="toggleTheme" id="checkbox" type="checkbox" class="switch-checkbox" />
        <label for="checkbox" class="switch-label">
            <span>🌙</span>
            <span>☀️</span>
            <div class="switch-toggle" :class="{ 'switch-toggle-checked': userTheme === 'dark' }"></div>
        </label>
    </div>
</template>

<style scoped>
.switch-checkbox {
    display: none;
}

.switch-label {
    align-items: center;
    background: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    font-size: 20px;
    height: 40px;
    padding: 4px;
    position: relative;
    transition: background 0.5s ease;
    justify-content: space-between;
    width: 80px;
    z-index: 1;
}

.switch-toggle {
    position: absolute;
    background-color: var(--background-color);
    border-radius: 50%;
    top: 2px;
    left: 2px;
    height: 34px;
    width: 34px;
    transform: translateX(0);
    transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
    transform: translateX(40px);
}
</style>
