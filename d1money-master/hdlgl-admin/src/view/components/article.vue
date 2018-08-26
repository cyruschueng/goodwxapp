<style scoped rel="stylesheet/less" lang="less">
    .dmarticle{
        display: flex;
        flex-flow: row nowrap;
        margin-bottom: 20px;
        .article_left{
            width: 40px;
            margin-right: 15px;
            .img{
                width: 40px;
                img{
                    width:100%;
                    height: 100%;
                    overflow: hidden;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                }
            }
        }
        .article_right{
            flex: 1;
            .desc{
                font-size: 14px;
            }
        }
    }
</style>
<template>
    <div class="dmarticle">
        <div class="article_left">
            <div class="img">
                <img :src="avatar">
            </div>
        </div>
        <div class="article_right">
            <div class="title">{{title}}</div>
            <div class="desc">
                <template v-if="type===1">【拜访补充记录】</template>
                {{content}}</div>
            <div class="position" v-if="type===0">{{location}}</div>
            <div class="util">
                <div class="time">
                    <timeago :since="time" locale="zh-CN"></timeago>
                </div>
                <div class="util"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            avatar: {
                type: String,
                default: ''
            },
            type: {
                type: Number,
                default: 0
            },
            content: {
                type: String,
                default: ''
            },
            time: {
                type: String,
                default: ''
            },
            location: {
                type: String,
                default: ''
            }
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
