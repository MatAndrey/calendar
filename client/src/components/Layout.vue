<script lang="ts">
import Calendar from "../pages/Calendar.vue";
import PlanDialog from "../components/PlanDialog.vue";
import ThemeButton from "./ThemeButton.vue";

export default {
    components: { Calendar, PlanDialog, ThemeButton },
    data() {
        return {
            isLeftMenuOpened: false,
        };
    },
    methods: {
        toggleLeftMenu() {
            this.isLeftMenuOpened = !this.isLeftMenuOpened;
        },
    },
};
</script>

<template>
    <PlanDialog :plan="$store.state.dialog.planForDialog" v-if="$store.state.dialog.planForDialog" />
    <div class="left-menu" :class="isLeftMenuOpened ? 'opened' : 'closed'">
        <nav @click.stop>
            <button class="left-menu-switch"><icon name="bars" @click="toggleLeftMenu" /></button>
            <ul>
                <li>
                    <RouterLink to="/" @click="isLeftMenuOpened = false"><icon name="calendar-week" />Расписание</RouterLink>
                </li>
                <li>
                    <RouterLink to="/plans" @click="isLeftMenuOpened = false"><icon name="list" />Список планов</RouterLink>
                </li>
            </ul>
        </nav>
        <ThemeButton v-if="isLeftMenuOpened" />
    </div>
    <main>
        <RouterView />
    </main>
</template>

<style lang="scss">
#app {
    display: flex;
    flex-direction: row;
    height: 100dvh;
    width: 100%;
    --left-menu-width: 40px;

    main {
        width: calc(100% - var(--left-menu-width));
        margin-left: var(--left-menu-width);
    }

    .left-menu {
        background-color: var(--background-color);
        border-right: 1px solid var(--border-color);
        z-index: 20;
        position: absolute;
        height: 100%;
        &.closed {
            width: var(--left-menu-width);
        }
        &.opened {
            width: 300px;
        }
        nav {
            ul {
                line-height: 2em;
                a {
                    align-items: center;
                    color: var(--text-color);
                    text-decoration: none;
                    display: block;
                    overflow: hidden;
                    font-size: 18px;
                    height: 36px;
                    svg {
                        height: 18px;
                        width: var(--left-menu-width);
                    }
                    &.router-link-exact-active {
                        color: var(--main-color);
                        cursor: auto;
                    }
                }
            }
        }
        transition: width 0.2s;

        .left-menu-switch {
            border: none;
            background-color: inherit;
            cursor: pointer;
            margin-top: 4px;
            padding: 0;
            color: var(--text-color);
            svg {
                height: 24px;
                width: var(--left-menu-width);
            }
        }

        .theme-button {
            position: absolute;
            bottom: 8px;
            left: 8px;
        }
    }
}
</style>
