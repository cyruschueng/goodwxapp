<template>
    <masker
        class="product"
        style="border-radius: 2px;"
        :opacity="0.7"
    >
        <div slot="default" class="product__bgImg">
            <img :src="params.bigimgsrc">
        </div>
        <a
            slot="content"
            class="product__content"
            :href="url"
        >
            <div class="product__content__content">
                <span class="title">{{params.name}}</span>
                <br/>
                <span class="time">{{params.subtitle}}</span>
            </div>
            <div class="product__content__datas">
                <span><i class="iconfont icon-we"></i> {{params.totalbuycount}}</span>
                <span><i class="iconfont icon-forward"></i> {{params.totalsharecount}}</span>
                <span><i class="iconfont icon-attention"></i> {{params.totalreadcount}}</span>
            </div>
            <div class="product__content__logo" v-if="params.typeid === 1">
                <i class="iconfont icon-selectionfill"></i>
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

    .product {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
        overflow: hidden;
        .product__bgImg {
            width: 100%;
            height: 30vw;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            border-radius: 2px;
        }
        .product__content {
            color: #fff;
            width: 100%;
            text-align: center;
            height: 100%;
            text-shadow: 0 0 2px rgba(0, 0, 0, .5);
            text-align: center;
            overflow: hidden;
            .product__content__content {
                position: absolute;
                top: 55%;
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
            .product__content__datas {
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
            .product__content__logo {
                position: absolute;
                left: 5px;
                top: 0;
                i.iconfont {
                    font-size: 22px;
                }
            }
            .product__content__time {
                position: absolute;
                bottom: 2px;
                left: 5px;
                font-weight: 300;
                font-size: 12px;
            }
        }
    }
</style>
