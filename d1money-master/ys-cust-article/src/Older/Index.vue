<style lang="less" rel="stylesheet/less" scoped="scoped">

</style>
<template>
    <div class="dmContainer">
        <view-box ref="viewBox">
            <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header>
            <router-view></router-view>
            <tabbar slot="bottom"></tabbar>
        </view-box>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        components: {},
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>
