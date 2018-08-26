<template>
    <div id="app">
        <view-box ref="viewBox">
            <transition
                @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
                :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive" style="width: 100%;"></router-view>
                </keep-alive>
            </transition>
            <transition
                @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
                :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
                <router-view v-if="!$route.meta.keepAlive" style="width: 100%;"></router-view>
            </transition>
            <tabbar slot="bottom">
                <template v-for="tabbar in tabbars">
                    <tabbar-item :selected="$route.name === tabbar.link.name" :link="tabbar.link">
                        <i :class="['iconfont', tabbar.default_icon]" slot="icon"></i>
                        <i :class="['iconfont', tabbar.active_icon]" slot="icon-active"></i>
                        <span slot="label">{{tabbar.title}}</span>
                    </tabbar-item>
                </template>
            </tabbar>
        </view-box>

    </div>
</template>

<script>
    import {TransferDom, Loading, ViewBox, Tabbar, TabbarItem} from 'vux'
    import {mapState} from 'vuex'

    export default {
        name: 'index',
        directives: {
            TransferDom
        },
        data() {
            return {
                tabbars: [
                    {
                        title: '首页',
                        default_icon: 'icon-home',
                        active_icon: 'icon-homefill',
                        link: {
                            name: 'Home',
                            replace: true
                        }
                    },
                    {
                        title: '客户',
                        default_icon: 'icon-group',
                        active_icon: 'icon-group_fill',
                        link: {
                            name: 'Customer',
                            replace: true
                        }
                    },
                    {
                        title: '我的',
                        default_icon: 'icon-people',
                        active_icon: 'icon-peoplefill',
                        link: {
                            name: 'Mine',
                            replace: true
                        }
                    }
                ]
            }
        },
        components: {
            Loading,
            ViewBox,
            Tabbar,
            TabbarItem
        },
        methods: {},
        computed: {
            ...mapState({
                isLoading: state => state.vux.isLoading,
                direction: state => state.vux.direction,
                isLeader: state => state.vux.userInfo
            })
        },
        async mounted() {
            console.log(this.$route)
        }
    }
</script>

<style lang="less" rel="stylesheet/less"></style>
