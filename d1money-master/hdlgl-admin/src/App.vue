<style lang="less" rel="stylesheet/less">
    @import './styles/common.css';

    .treeChildren {
        display: inline-block;
        width: 100%;
        cursor: pointer;
        &:active {
            background-color: #d5e8fc;
        }
    }

    .ivu-tree-children{
        li{
            overflow: hidden;
            .treeChildren {
                display: inline-block;
                width: 100%;
                cursor: pointer;
                margin-left: -10px;
                padding-left: 10px;
                &:active {
                    background-color: #d5e8fc;
                }
            }
        }
    }

</style>
<template>
    <div id="app" class="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import dmMenu from '@/view/layout/Menu.vue'
    import dmHeader from '@/view/layout/Header.vue'

    export default {
        name: 'app',
        components: {
            'dm-menu': dmMenu,
            'dm-header': dmHeader
        },
        data() {
            return {}
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {}
    }
</script>
