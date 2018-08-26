<style lang="less" rel="stylesheet/less" scoped="scoped">
    .fpCard {
        background-color: #ffffff;
        padding: 15px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .fpCard__left {
            width: 50px;
            height: 50px;
            margin-right: 15px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
        .fpCard__content{
            flex: 1;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-flow:column nowrap;
        }
    }
</style>

<template>
    <div class="fpCard">
        <div class="fpCard__left">
            <template v-if="img">
                <img :src="img" alt="暂无头像">
            </template>
            <template v-else>
                <slot name="left"></slot>
            </template>
        </div>
        <div class="fpCard__content">
            <slot name="content"></slot>
        </div>
        <div class="fpCard__util">
            <slot name="util"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['img'],
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
