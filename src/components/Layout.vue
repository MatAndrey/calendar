<script lang="ts">
import Calendar from "../pages/Calendar.vue";
import Header from "./Header.vue";

export default {
    components: { Calendar, Header },
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
    <Header @toggleMenu="toggleLeftMenu" />
    <div class="left-menu" v-if="isLeftMenuOpened" @click="toggleLeftMenu">
        <nav @click.stop>
            <Header @toggleMenu="toggleLeftMenu" />
            <ul>
                <li>
                    <RouterLink to="/" @click="toggleLeftMenu"><icon name="calendar-week" />Календарь</RouterLink>
                </li>
                <li>
                    <RouterLink to="/plans" @click="toggleLeftMenu"><icon name="list" />Список планов</RouterLink>
                </li>
            </ul>
        </nav>
    </div>
    <main>
        <RouterView />
    </main>
</template>

<style lang="scss">
#app {
    display: flex;
    flex-direction: column;
    height: 100dvh;

    main {
        height: calc(100% - 35px);
    }
    .left-menu {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 100;
        background-color: #0000003b;
        nav {
            width: 300px;
            height: 100%;
            background-color: #eee;
            button {
                float: left;
            }
            ul {
                height: 20px;
                padding: 4px;
                line-height: 2em;
                a {
                    display: flex;
                    align-items: center;
                    color: #111;
                    text-decoration: none;
                    svg {
                        height: 18px;
                    }
                    &.router-link-exact-active {
                        color: var(--orange);
                        cursor: auto;
                    }
                }
            }
        }
    }
}
</style>
