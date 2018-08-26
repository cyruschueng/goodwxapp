<style lang="less" rel="stylesheet/less" scoped="scoped">
    .customComponent {
        & > div {
            margin-top: 15px;
        }
        /*理财师名片*/
        .fpCard {
            .realname {
                font-size: 16px;
                font-weight: 600;
            }
            .coprname, .mobile {
                font-size: 12px;
                color: #969696;
            }
            .tel, .ewm {
                display: inline-block;
                width: 100%;
                text-align: center;
            }
            .tel {
                i.iconfont {
                    font-size: 23px;
                    color: #4aa1f0;
                }
            }
            .ewm {
                i.iconfont {
                    font-size: 20px;
                    color: #09bb07;
                }
            }
        }
        /*文章列表*/
        .articleCellBox, .videoCellBox {
            .headTitle{
                margin:0 15px 5px;
                font-size: 16px;
                color: #666;
                position: relative;
                padding-left: 10px;
                &:before{
                    content: '';
                    top: 3px;
                    bottom: 3px;
                    left:0;
                    width: 2px;
                    position: absolute;
                    background-color: #4aa1f0;
                }
            }
            .title {
                font-size: 14px;
                line-height: 22px;
                color: #333;
                font-weight: 300;
                .typeIcon {
                    font-size: 12px;
                    border-radius: 10px;
                    padding: 0 5px;
                    border: 1px solid #4aa1f0;
                    color: #4aa1f0;
                    margin-right: 5px;
                }
            }

        }
        /*微信二维码*/
        .wxewm {
            margin: 15px;
            box-sizing: border-box;
            border-radius: 10px;
            background-color: #ffffff;
            box-shadow: 0 0 10px -6px #000;
            .img {
                padding: 15px;
                img {
                    max-width: 100%;
                }
            }
        }
        /*微信二维码预览*/
        .wxewmPopup {
            .content {
                width: 100%;
                height: 100%;
                line-height: 0;
            }
        }
    }
</style>
<template>
    <div class="customComponent">
        <template v-for="(item, index) in sort">
            <!--理财师名片-->
            <template v-if="fpCard && item === 'fpCard'">
                <fp-card
                    class="fpCard"
                    :img="fpCard.headurl"
                >
                    <template slot="content">
                        <p class="realname">{{fpCard.realname}}</p>
                        <p class="coprname">{{fpCard.corpname}} {{fpCard.mobile}}</p>
                        <!--<p class="mobile"></p>-->
                    </template>
                    <template slot="util">
                        <a class="ewm" @click="wxewmPopup = !wxewmPopup">
                            <i class="iconfont icon-yingdaicon04"></i>
                        </a>
                        <a class="tel" :href="'tel:' + fpCard.mobile">
                            <i class="iconfont icon-dianhua"></i>
                        </a>
                    </template>
                </fp-card>
            </template>
            <!--推荐文章列表-->
            <template v-if="articleList && articleList.length !== 0 && item === 'articleList'">
                <div class="articleCellBox">
                    <p class="headTitle">推荐文章</p>
                    <article-cell
                        v-for="(item, index) in articleList" :key="'articleCell' + index"
                        :url="host + '/cust/article/index#/article/' + item.id"
                        :img="item.imgSrc"
                        class="cellItem"
                    >
                        <div class="title" slot="title">
                            {{item.title}}
                        </div>
                        <template slot="data">
                            <span>阅读: {{item.readcount}}</span>
                            <span>点赞: {{item.thumbsupcount}}</span>
                            <span>评论: {{item.commentcount}}</span>
                        </template>
                    </article-cell>
                </div>
            </template>
            <!--视频列表-->
            <template v-if="videoList && videoList.length !== 0 && item === 'videoList'">
                <div class="videoCellBox">
                    <p class="headTitle">热门视频</p>
                    <video-cell
                        v-for="(item, index) in articleList" :key="'articleCell' + index"
                        :url="host + '/cust/video/index#/video-detail/' + item.id"
                        :img="item.imgSrc"
                    >
                        <div class="title" slot="title">
                            <span class="typeIcon">{{item.sourcename}}</span>
                            {{item.title}}
                        </div>
                        <template slot="data">
                            <span>阅读: {{item.readcount}}</span>
                            <span>点赞: {{item.thumbsupcount}}</span>
                            <span>评论: {{item.commentcount}}</span>
                        </template>
                    </video-cell>
                </div>
            </template>
            <!--活动列表-->
            <template v-if="activityList && activityList.length !== 0 && item === 'activityList'">
                <div class="activityCellBox">
                    <activity-cell
                        v-for="(item, index) in activityList" :key="index"
                        :params="item"
                        :url="'/cust/activity/index#/activityDetail/' + item.id"
                    >
                    </activity-cell>
                </div>
            </template>
            <!--产品列表-->
            <template v-if="productList && productList.length !== 0 && item === 'productList'">
                <div class="productCellBox">
                    <product-cell
                        v-for="(item, index) in productList" :key="index"
                        :params="item"
                        :url="'/cust/product/index#/productDetail/' + item.id"
                    >
                    </product-cell>
                </div>
            </template>
            <!--代理人二维码-->
            <template v-if="fpUserEWM && fpUserEWM.url && item === 'fpUserEWM'">
                <div class="wxewm">
                    <div class="img">
                        <img :src="fpUserEWM.url" alt="">
                        <p style="color: #000;text-align: center;color: #969696;">扫描上方二维码加我微信好友</p>
                    </div>
                </div>
            </template>
        </template>

        <!--预览二维码-->
        <x-dialog
            v-model="wxewmPopup"
            :hide-on-blur="true"
            class="wxewmPopup"
        >
            <div class="content">
                <img width="100%" :src="fpCard.wx_ewm" alt="二维码加载失败">
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import ArticleCell from '@/components/YsComponents/ArticleCell'
    import ActivityCell from '@/components/YsComponents/ActivityCell'
    import ProductCell from '@/components/YsComponents/ProductCell'
    import VideoCell from '@/components/YsComponents/VideoCell'
    import FpCard from '@/components/YsComponents/FpCard'
    import {TransferDomDirective as TransferDom, XDialog} from 'vux'

    export default {
        directives: {
            TransferDom
        },
        mixins: [UtilMixin],
        props: {
            sort: {
                type: Array,
                default: []
            },
            // 文章列表
            articleList: {
                type: Array,
                default: []
            },
            // 视频列表
            videoList: {
                type: Array,
                default: []
            },
            // 活动列表
            activityList: {
                type: Array,
                default: []
            },
            // 产品列表
            productList: {
                type: Array,
                default: []
            },
            // 代理人名片
            fpCard: {
                type: Object,
                default: null
            },
            // 代理人二维码
            fpUserEWM: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                wxewmPopup: false,
                host: window.location.origin
            }
        },
        components: {
            XDialog,
            ArticleCell,
            FpCard,
            VideoCell,
            ActivityCell,
            ProductCell
        },
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>
