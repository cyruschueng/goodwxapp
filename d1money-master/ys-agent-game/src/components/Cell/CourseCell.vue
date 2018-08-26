<style lang="less" rel="stylesheet/less" scoped="scoped">
    .courseCell {
        position: relative;
        &.isradius{
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            overflow: hidden;
        }
        .courseCell__hd {
            height: 60vw;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .status{
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                font-size: 12px;
                position: absolute;
                top: 5px;
                left: 0;
                right: 0;
                color: dodgerblue;
                z-index:3;
                span{
                    margin-right: 5px;
                    i.iconfont{
                        font-size: 12px;
                        margin-right: 5px;
                    }
                }
            }
        }
        .courseCell__bd {
            box-sizing: border-box;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px 0 0 0;
            text-align: center;
            z-index:2;
            .mask{
                position: absolute;
                top:0;
                bottom:0;
                left: 0;
                right:0;
                z-index: 1;
                background: linear-gradient(to bottom, transparent 0, rgba(0,0,0,.6) 20px);
                /*background-color: rgba(0,0,0,.4);*/
            }
            .title {
                position: relative;
                color: #ffffff;
                font-size: 15px;
                /*padding: 5px 0;*/
                z-index:2;
            }
        }
    }
</style>
<template>
    <div :class="['courseCell', {'isradius': isRadius}]">
        <div class="courseCell__hd">
            <img :src="img">
            <div class="status">
                <span>{{seeNumber}}人已学习</span>
            </div>
        </div>
        <div class="courseCell__bd">
            <div class="mask"></div>
            <h2 class="title" v-if="title">{{title}}</h2>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            img: {
                type: String,
                default: 'http://wmimage.qn.d1money.com/pic/201712/19/2017121912464476289.jpeg-pic.S'
            },
            title: {
                type: String,
                default: ''
            },
            desc: {
                type: String,
                default: ''
            },
            mask: {
                type: Number,
                default: 0.7
            },
            isRadius: {
                type: Boolean,
                default: false
            },
            seeNumber: {
                type: Number,
                default: 0
            },
            likeNumber: {
                type: Number,
                default: 0
            },
            shareNumber: {
                type: Number,
                default: 0
            }
        },
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
