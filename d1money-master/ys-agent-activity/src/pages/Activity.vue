<style scoped rel="stylesheet/less" lang="less">
    .activity {
        width: 100%;
        height: 100%;
        .activity__fixhead {
            position: relative;
            z-index: 1;
            background-color: #fbf9fe;
            padding-bottom: 10px;

        }
        .activity__bd {
            position: relative;
            top: -44px;
            box-sizing: border-box;
            padding: 0 10px 10px 10px;
            height: calc(~"100% - 7px") !important;
            /*margin-top: 95px;*/
            padding-top: 44px !important;
            .iconTips {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                font-size: 12px;
                align-items: center;
                span {
                    margin-right: 10px;
                    color: #969696;
                    i.iconfont {
                        font-size: 12px;
                        margin-right: 2px;
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                }

            }
            .activity {
                margin-bottom: 10px;
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
        }
    }
</style>
<template>
    <div class="activity">
        <DmLoading v-if="loading" img="/static/common/img/loadingImg.png"></DmLoading>
        <template v-else="loading">
            <div class="activity__fixhead">
                <button-tab style="padding: 10px 15px 0; ">
                    <button-tab-item selected @on-item-click="tabItemClick(-1)">全部</button-tab-item>
                    <button-tab-item @on-item-click="tabItemClick(1)">进行中</button-tab-item>
                    <button-tab-item @on-item-click="tabItemClick(0)">未开始</button-tab-item>
                    <button-tab-item @on-item-click="tabItemClick(2)">已结束</button-tab-item>
                </button-tab>
            </div>
            <scroller
                class="activity__bd"
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="dmscroller"
            >
                <div class="iconTips">
                <span>
                    <i class="iconfont icon-we"></i>接受数
                </span>
                    <span>
                    <i class="iconfont icon-forward"></i>转发数
                </span>
                    <span>
                    <i class="iconfont icon-attention"></i>阅读数
                </span>
                </div>
                <template v-for="(item, index) in list">
                    <swipeout>
                        <swipeout-item
                            transition-mode="follow"
                        >
                            <div slot="right-menu">
                                <!--<swipeout-button style="border-radius: 100%;overflow:hidden;width: 70px;height: 70px;margin-top: calc(15vw - 35px);margin-left:5px" @click.native="onButtonClick('fav')" type="primary">收藏-->
                                <!--</swipeout-button>-->
                                <swipeout-button :type="item.iscommend ? 'warn' : 'primary'"
                                                 @click.native="commend(index)">
                                    <template v-if="item.iscommend">
                                        <i class="iconfont icon-likefill"></i> 已推荐
                                    </template>
                                    <template v-else="item.iscommend">
                                        <i class="iconfont icon-like"></i> 推荐
                                    </template>
                                </swipeout-button>
                            </div>
                            <template slot="content">
                                <masker
                                    class="activity"
                                    style="border-radius: 2px;"
                                    :opacity="0.7"
                                >
                                    <div slot="default" class="activity__bgImg">
                                        <img :src="item.bigimgsrc">
                                    </div>
                                    <router-link
                                        slot="content"
                                        class="activity__content"
                                        :to="{name: 'ActivityDetail', params: {id: item.id}}"
                                        tag="div"
                                    >
                                        <div class="activity__content__content">
                                            <span class="title">{{item.name}}</span>
                                            <br/>
                                            <span class="time">{{item.subtitle}}</span>
                                        </div>
                                        <div class="activity__content__datas">
                                            <span><i class="iconfont icon-we"></i> {{item.totalacceptcount}}</span>
                                            <span><i class="iconfont icon-forward"></i> {{item.totalsharecount}}</span>
                                            <span><i class="iconfont icon-attention"></i> {{item.totalreadcount}}</span>
                                        </div>
                                        <div class="activity__content__logo" v-if="item.typeid === 1">
                                            <i class="iconfont icon-selectionfill"></i>
                                        </div>
                                        <div class="activity__content__time">
                                            {{item.begintime.substring(0, 10)}} - {{item.endtime.substring(0, 10)}}
                                        </div>
                                    </router-link>
                                </masker>
                            </template>
                        </swipeout-item>
                    </swipeout>
                </template>
            </scroller>
        </template>
    </div>
</template>
<script>
    import {
        XHeader, Tab, TabItem, Flexbox, FlexboxItem, ButtonTab, ButtonTabItem, Masker, Swipeout,
        SwipeoutItem,
        SwipeoutButton
    } from 'vux'
    import ScrollerMixin from './../mixins/ScrollerMixin.vue'
    import TabbarScoller from './../components/TabbarScoller/index.vue'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'

    export default {
        mixins: [ScrollerMixin],
        data() {
            return {
                loading: true,
                timetype: -1,
                list: [],
                pageSize: 10
            }
        },
        components: {
            XHeader,
            Tab,
            TabItem,
            Flexbox,
            FlexboxItem,
            ButtonTab,
            ButtonTabItem,
            Masker,
            TabbarScoller,
            DmLoading,
            Swipeout,
            SwipeoutItem,
            SwipeoutButton
        },
        async created() {
            const result = await this.ajaxPageDateByList()
            this.list = result.list
            this.pageCount = result.pageCount
            this.loading = false
        },
        async mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            // 收藏/取消收藏
            commend(index) {
                const id = this.list[index].id
                const iscommend = this.list[index].iscommend
                this.$axios.post({
                    url: '/agent/activity/services/commendByid',
                    data: {
                        id,
                        iscommend: iscommend ? 0 : 1
                    }
                }).then(res => {
                    this.list[index].iscommend = iscommend ? 0 : 1
                    this.$vux.toast.show({
                        text: iscommend ? '取消推荐' : '已推荐'
                    })
                })
            },
            async tabItemClick(timetype) {
                if (this.timetype === timetype) {
                    return
                }
                this.timetype = timetype
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.pageNo = 0
                try {
                    let result = await this.ajaxPageDateByList()
                    this.$refs.dmscroller && this.$refs.dmscroller.scrollTo(0, 0, false)
                    this.list = result.list
                    this.pageCount = result.pageCount
                } catch (err) {
                    console.error(err)
                }
                this.$vux.loading.hide()
            },
            ajaxPageDateByList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/activity/services/loadActivityListByUser',
                        data: {
                            timetype: this.timetype,
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        },
                        tips: true
                    }).then(result => {
                        resolve(result)
                    }).catch((code, msg) => {
                        reject(code, msg)
                    })
                })
            }
        }
    }
</script>
