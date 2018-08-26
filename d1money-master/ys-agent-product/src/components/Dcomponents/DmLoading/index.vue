<style lang="less" rel="stylesheet/less" scoped="scoped">
    .dmLoading{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: transparent;
        .loadImg{
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            line-height: 0;
            overflow: hidden;
            background-color: #eee;
            img{
                position: relative;
                z-index: 2;
            }
            &:before{
                position: absolute;
                content: ' ';
                top: -40px;
                bottom: -40px;
                width: 18px;
                z-index:1;
                transform: rotate(-30deg);
                animation: loading 1s ease infinite;
            }
            @keyframes loading
            {
                0% {
                    left: -10px;
                    background-color: rgba(0,0,0,.1);
                }
                15%{
                    background-color: rgba(0,0,0,.2);
                }
                25%{
                    background-color: rgba(0,0,0,.3);
                }
                50%{
                    background-color: rgba(0,0,0,.15);
                }
                100% {
                    left: 140px;
                }
            }
        }
    }
</style>
<template>
    <div class="dmLoading">
        <div class="loadImg">
            <img :src="img" alt="加载页面" />
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
