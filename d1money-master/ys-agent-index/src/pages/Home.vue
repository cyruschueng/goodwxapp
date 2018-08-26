<style lang="less" rel="stylesheet/less" scoped="scoped">
    .home {
        .home_hd {
            background-color: #4aa1f0;
            /*用户信息*/
            .userMsg {
                display: flex;
                flex-flow: row nowrap;
                padding: 15px;
                .img {
                    width: 44px;
                    height: 44px;
                    -webkit-border-radius: 100% 100%;
                    -moz-border-radius: 100% 100%;
                    border-radius: 100% 100%;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .desc {
                    padding-left: 10px;
                    flex: 1;
                    h3 {
                        font-size: 16px;
                        font-weight: 500;
                        color: #ffffff;
                    }
                    p {
                        font-size: 14px;
                        color: #ccc;
                    }
                }
            }
            /*数据统计*/
            .dataStatistics {
                display: flex;
                flex-flow: row nowrap;
                .item {
                    flex: 1;
                    padding: 10px 0;
                    text-align: center;
                    position: relative;
                    color: #ffffff;
                    &:after {
                        content: ' ';
                        position: absolute;
                        top: 17.5px;
                        bottom: 17.5px;
                        right: 0;
                        width: 1px;
                        border-right: 1px solid #ffffff;
                    }
                    &:last-child {
                        &:after {
                            display: none;
                        }
                    }
                    b {
                        font-size: 20px;
                        font-weight: 500;
                        line-height: 1em;
                    }
                    p {
                        line-height: 1em;
                        font-size: 12px;
                    }
                }
            }
        }
        .home_apps {
            .app-grid {
                background-color: #fff;
                margin-top: 10px;
                img {
                    border-radius: 3px;
                }
                .item-label{
                    font-size: 12px;
                }
            }

            .app-list{
                margin-top: 10px;
                .app {
                    background-color: #fff;
                    a {
                        color: inherit;
                        padding: 15px;
                        display: flex;
                        flex-flow: row nowrap;
                        position: relative;
                        &:after {
                            content: ' ';
                            position: absolute;
                            bottom: 0;
                            left: 15px;
                            right: 0;
                            border-bottom: 1px solid rgba(199, 199, 199, .3);

                        }
                        .img {
                            width: 44px;
                            height: 44px;
                            margin-right: 10px;
                            img {
                                width: 100%;
                                border-radius: 3px;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        .content {
                            flex: 1;
                            display: flex;
                            flex-flow: column nowrap;
                            justify-content: space-between;
                            h3 {
                                font-size: 14px;
                                font-weight: normal;

                            }
                            .desc {
                                display: flex;
                                flex-flow: row nowrap;
                                font-size: 12px;
                                font-weight: 300;
                                justify-content: space-between;
                                span {
                                    color: red;
                                }
                            }
                        }
                        .link {
                            box-sizing: border-box;
                            width: 40px;
                            line-height: 40px;
                            font-size: 24px;
                            text-align: right;
                            color: #C8C8CD;
                        }
                    }

                }
                .footer {
                    background-color: #fff;
                    font-size: 12px;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 15px;
                }
            }

        }
    }
</style>
<template>
    <div class="home">
        <div class="home_hd">
            <!--用户信息-->
            <div class="userMsg">
                <div class="img">
                    <img :src="currentUser.headurl">
                </div>
                <div class="desc">
                    <h3>{{currentUser.realname}}</h3>
                    <p>
                        {{currentUser.corpname ? currentUser.corpname : '个人理财师'}}
                    </p>
                </div>
            </div>
            <!--数据统计-->
            <div class="dataStatistics">
                <div class="item">
                    <b>{{customData.weekcount}}</b>
                    <p>本周客户</p>
                </div>
                <div class="item">
                    <b>{{customData.moncount}}</b>
                    <p>本月客户</p>
                </div>
                <div class="item">
                    <b>{{customData.totalcount}}</b>
                    <p>累计客户</p>
                </div>
            </div>
        </div>
        <div class="home_apps">
            <!--九宫格-->
            <template v-if="appShowType === 2">
                <div class="app-grid">
                    <!--/agent/index-->
                    <grid :cols="4">
                        <grid-item
                            v-for="(item, index) in applist"
                            :key="index"
                            :link="item.url"
                        >
                            <img slot="icon" :src="'/static/agent/index/img/appIcon/' + item.id + '.png'"/>
                            <span class="item-label" slot="label">{{item.name}}</span>
                        </grid-item>
                        <grid-item v-for="i in (4 -  applist.length % 4)" :key="'applist'+ i">
                            <img slot="icon" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
                            <span class="item-label" slot="label" style="color:#fff;visibility: hidden">代替</span>
                        </grid-item>
                    </grid>
                </div>
            </template>
            <!--列表-->
            <template v-if="appShowType === 1">
                <div class="app-list">
                    <div class="app" v-for="item in applist">
                        <a :href="item.url">
                            <div class="img">
                                <img :src="'/static/agent/index/img/appIcon/' + item.id + '.png'"/>
                            </div>
                            <div class="content">
                                <h3>{{item.name}}</h3>
                                <div class="desc">
                                    <template v-if="item.dataMap">
                                        <div>已分享: {{item.dataMap.sharedCount ? item.dataMap.sharedCount : 0}}篇</div>
                                        <div>已阅读: {{item.dataMap.readCount ? item.dataMap.readCount : 0}}次 <span
                                            v-if="item.dataMap.addRead && item.dataMap.addRead!==0">+{{item.dataMap.addRead ? item.dataMap.addRead : 0}}</span>
                                        </div>
                                    </template>
                                    <template v-else>
                                        {{item.description}}
                                    </template>
                                </div>
                            </div>
                            <div class="link">
                                <i class="iconfont icon-jinru"></i>
                            </div>
                        </a>
                    </div>
                    <div class="footer">
                        更多功能, 敬请期待
                    </div>
                </div>
            </template>

            <!--自定义应用-->
            <template v-if="appCustomList && appCustomList.length !==0">
                <!--九宫格-->
                <template v-if="appShowType === 2">
                    <div class="app-grid" style="margin-top: 10px;">
                        <grid :cols="4">
                            <grid-item
                                v-for="(item, index) in appCustomList"
                                :key="index"
                                :link="item.url"
                            >
                                <img slot="icon" :src="item.imgsrc"/>
                                <span class="item-label" slot="label">{{item.name}}</span>
                            </grid-item>
                            <grid-item
                                v-if="appCustomList && appCustomList.length!=0"
                                v-for="i in (4 -  appCustomList.length % 4)" :key="'appCustomList'+ i"
                            >
                                <img slot="icon" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
                                <span class="item-label" slot="label" style="color:#fff;visibility: hidden">代替</span>
                            </grid-item>
                        </grid>
                    </div>
                </template>
                <!--列表-->
                <template v-if="appShowType === 1">
                    <div class="app-list">
                        <div class="app" v-for="(item, index) in appCustomList">
                            <a :href="item.url">
                                <div class="img">
                                    <img :src="item.imgsrc"/>
                                </div>
                                <div class="content">
                                    <h3>{{item.name}}</h3>
                                    <div class="desc">
                                        <template v-if="item.dataMap">
                                            <div>已分享: {{item.dataMap.sharedCount ? item.dataMap.sharedCount : 0}}篇</div>
                                            <div>已阅读: {{item.dataMap.readCount ? item.dataMap.readCount : 0}}次 <span
                                                v-if="item.dataMap.addRead && item.dataMap.addRead!==0">+{{item.dataMap.addRead ? item.dataMap.addRead : 0}}</span>
                                            </div>
                                        </template>
                                        <template v-else>
                                            {{item.description}}
                                        </template>
                                    </div>
                                </div>
                                <div class="link">
                                    <i class="iconfont icon-jinru"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
    import {Countup, Cell, Group, Grid, GridItem} from 'vux'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    export default {
        data() {
            return {
                loading: true,
                // app列表展示形式  1: 列表 2: 九宫格
                appShowType: window.YS_APP_LIST_TYPE,
                currentUser: {
                    headurl: window.YS_USER_AVATAR['64'],
                    realname: window.YS_USER.type === 2 ? window.YS_CORP_USER.realname : window.YS_USER.nickname,
                    corpname: window.YS_USER.type === 2 ? window.YS_CORP.name : '个人理财师'
                },
                customData: window.YS_USER_CUSTOMERDATA,
                appCustomList: window.YS_USER_APPCUSTOMLIST,
                applist: window.YS_APP_LIST
            }
        },
        components: {
            Countup,
            Cell,
            Group,
            Grid,
            GridItem,
            DmLoading
        },
        computed: {},
        methods: {},
        mounted(){
            this.loading = false
            console.log(window.YS_APP_LIST_TYPE)
        }
    }
</script>
