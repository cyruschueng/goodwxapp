<style lang="less" rel="stylesheet/less" scoped="scoped">
    .videoCell {
        .videoCell__hd {
            height: 25vw;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .status{
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                font-size: 12px;
                position: absolute;
                bottom: 5px;
                left: 5px;
                right: 5px;
                color: #ffffff;
                span{
                    margin-right: 10px;
                    i.iconfont{
                        font-size: 12px;
                        margin-right: 5px;
                    }
                }
            }
        }
        .videoCell__bd {
            padding: 0 15px;
            .title {
                font-size: 15px;
                color: #333;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                padding: 5px 0;
            }
            .desc {
                font-size: 13px;
                line-height: 15px;
                color: #969696;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
</style>
<template>
    <div class="videoCell">
        <div class="videoCell__hd">
            <img :src="img">
            <div class="status">
                <span><i class="iconfont icon-recordfill"></i>{{seeNumber}}</span>
                <span><i class="iconfont icon-likefill"></i>{{likeNumber}}</span>
                <span><i class="iconfont icon-forwardfill"></i>{{shareNumber}}</span>
            </div>
        </div>
        <div class="videoCell__bd">
            <h2 class="title" v-if="title">{{title}}</h2>
            <p class="desc" v-if="desc">{{desc}}</p>
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
