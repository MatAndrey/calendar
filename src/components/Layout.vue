<script lang="ts">
import Calendar from "../pages/Calendar.vue";
import PlanDialog from "../components/PlanDialog.vue";

export default {
    components: { Calendar, PlanDialog },
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
                    <RouterLink to="/" @click="isLeftMenuOpened = false"><icon name="calendar-week" />Календарь</RouterLink>
                </li>
                <li>
                    <RouterLink to="/plans" @click="isLeftMenuOpened = false"><icon name="list" />Список планов</RouterLink>
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
    flex-direction: row;
    height: 100dvh;
    width: 100%;

    main {
        width: calc(100% - 32px);
        margin-left: 32px;
    }

    .left-menu {
        background-color: #eee;
        z-index: 100;
        position: absolute;
        height: 100%;
        &.closed {
            width: 32px;
        }
        &.opened {
            width: 300px;
        }
        nav {
            ul {
                height: 20px;
                line-height: 2em;
                a {
                    align-items: center;
                    color: #111;
                    text-decoration: none;
                    display: block;
                    overflow: hidden;
                    height: 32px;
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
    // .left-menu {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     bottom: 0;
    //     right: 0;
    //     z-index: 100;
    //     background-color: #0000003b;
    //     nav {
    //         width: 300px;
    //         height: 100%;
    //         background-color: #eee;
    //         button {
    //             float: left;
    //         }
    //         ul {
    //             height: 20px;
    //             padding: 4px;
    //             line-height: 2em;
    //             a {
    //                 display: flex;
    //                 align-items: center;
    //                 color: #111;
    //                 text-decoration: none;
    //                 svg {
    //                     height: 18px;
    //                 }
    //                 &.router-link-exact-active {
    //                     color: var(--orange);
    //                     cursor: auto;
    //                 }
    //             }
    //         }
    //     }
    // }
}
</style>
