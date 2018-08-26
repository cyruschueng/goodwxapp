<style lang="less" rel="stylesheet/less" scoped="scoped">
    .userCell {
        display: flex;
        flex-flow: row nowrap;
        padding:10px 15px;
        align-items: center;
        background-color: #ffffff;
        .userCell__hd{
            width: 46px;
            height: 46px;
            img{
                width:100%;
                height:100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
        .userCell__bd{
            margin-left: 10px;
            display: flex;
            flex-flow: row nowrap;
            font-size: 14px;
            p{
                margin-right: 10px;
                &:last-child{
                    margin-right:0;
                }
            }
            .friend{
                span{
                    border-radius: 18px;
                    padding:0 10px;
                    color: #ffffff;
                    font-size: 12px;
                    background-color: #cccccc;
                    &.is{
                        background-color: #4aa1f0;
                    }
                }
            }
        }
        .userCell__ft{
            flex:1;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-end;
            font-size: 12px;
        }
    }
</style>
<template>
    <div class="userCell">
        <div class="userCell__hd">
            <img :src="img">
        </div>
        <div class="userCell__bd">
            <p class="title" v-if="title">{{title}}</p>
            <p class="desc" v-if="desc">{{desc}}</p>
            <p class="friend" v-if="friend">
                <span class="is" v-if="friend<=2">好友</span>
                <span v-else>非好友</span>
            </p>
        </div>
        <div class="userCell__ft">
            <p class="time">{{timeAgoHasHourAndMinute(dateTime)}}</p>
        </div>
    </div>
</template>

<script>
    import UtilMixin from './../../mixins/UtilMixin.vue'
    export default {
        mixins: [UtilMixin],
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
            friend: {
                type: Number,
                default: 999
            },
            dateTime: {
                type: [String, Number],
                default: ''
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
