<template>
    <masker
        class="activity"
        style="border-radius: 2px;"
        :opacity="0.7"
    >
        <div slot="default" class="activity__bgImg">
            <img :src="params.bigimgsrc">
        </div>
        <a
            slot="content"
            class="activity__content"
            :href="url"
        >
            <div class="activity__content__content">
                <span class="title">{{params.name}}</span>
                <br/>
                <span class="time">{{params.subtitle}}</span>
            </div>
            <div class="activity__content__datas">
                <span><i class="iconfont icon-we"></i> {{params.totalacceptcount}}</span>
                <span><i class="iconfont icon-forward"></i> {{params.totalsharecount}}</span>
                <span><i class="iconfont icon-attention"></i> {{params.totalreadcount}}</span>
            </div>
            <div class="activity__content__logo" v-if="params.typeid === 1">
                <i class="iconfont icon-selectionfill"></i>
            </div>
            <div class="activity__content__time">
                {{params.begintime.substring(0,10)}} - {{params.endtime.substring(0,10)}}
            </div>
        </a>
    </masker>
</template>

<script>
    import {
        Masker,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton
    } from 'vux'

    export default {
        props: ['params', 'url'],
        data() {
            return {}
        },
        components: {
            Masker,
            Swipeout,
            SwipeoutItem,
            SwipeoutButton
        },
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped="scoped">

    .activity {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
        overflow: hidden;
        .activity__bgImg {
            width: 100%;
            height: 30vw;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            border-radius: 2px;
        }
        .activity__content {
            color: #fff;
            width: 100%;
            text-align: center;
            height: 100%;
            text-shadow: 0 0 2px rgba(0, 0, 0, .5);
            text-align: center;
            overflow: hidden;
            .activity__content__content {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                transform: translateY(-50%);
                line-height: 1em;
                .title {
                    font-size: 20px;
                }
            }
            .time {
                font-size: 12px;
                padding-top: 4px;
                border-top: 1px solid #f0f0f0;
                display: inline-block;
                margin-top: 5px;
            }
            .activity__content__datas {
                position: absolute;
                top: 0;
                right: 10px;
                font-size: 12px;
                font-weight: 300;
                span {
                    margin-right: 10px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
            .activity__content__logo {
                position: absolute;
                left: 5px;
                top: 0;
                i.iconfont {
                    font-size: 22px;
                }
            }
            .activity__content__time {
                position: absolute;
                bottom: 2px;
                left: 5px;
                font-weight: 300;
                font-size: 12px;
            }
        }
    }
</style>
