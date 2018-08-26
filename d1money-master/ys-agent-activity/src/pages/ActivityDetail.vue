<style lang="less" rel="stylesheet/less" scoped="scoped">

    .activityDetail {
        width: 100%;
        height: 100%;
        position: relative;
        .activityDetail__hd {
            position: relative;
            z-index: 2;
            .activityDetail__hd__masker {
                width: 100%;
                height: 40vw;
                .bgImg {
                    width: 100%;
                    height: 100%;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .content {
                    color: #ffffff;
                    position: absolute;
                    top: 50%;
                    left: 15px;
                    right: 15px;
                    transform: translateY(-50%);
                    text-align: center;
                    h1 {
                        font-size: 20px;
                        font-weight: normal;
                    }
                    .btn {
                        display: inline-block;
                        box-sizing: border-box;
                        margin-top: 20px;
                        padding: 2px 15px;
                        font-size: 12px;
                        border: 1px solid #ffffff;
                        border-radius: 16px;
                        letter-spacing: 2px;
                    }
                }
            }
            .activityDetail__tab {
                /*padding:15px 0;*/
                height: 64px;
                .tab-item {
                    .content {
                        line-height: 1em;
                        padding: 15px 0;
                        h3 {
                            padding-bottom: 5px;
                            font-size: 24px;
                        }
                        span {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        .activityDetail__bd {
            /*position: absolute;*/
            /*top: calc(~"-40vw - 64px");*/
            /*width: 100%;*/
            /*padding-top: calc(~"2 * (40vw + 64px)") !important;*/
            /*height: calc(~"100% - 40vw - 64px - 50px") !important;*/

            position: absolute;
            top: calc(~"40vw + 64px - 44px");
            padding-top: 44px;
            width: 100%;
            height: calc(~"100% - 40vw - 64px - 50px") !important;
        }
        .activityDetail__ft {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #ffffff;
            padding: 4px 5px;
        }
    }
</style>

<template>
    <div class="activityDetail">
        <DmLoading v-if="loading" img="/static/common/img/loadingImg.png"></DmLoading>
        <template v-else="loading">
            <!--头部-->
            <div class="activityDetail__hd">
                <masker class="activityDetail__hd__masker" :opacity="0.7">
                    <div slot="default" class="bgImg">
                        <img :src="activityDetail && activityDetail.bigimgsrc">
                    </div>
                    <div class="content" slot="content">
                        <h1>{{activityDetail && activityDetail.name}}</h1>
                        <p class="btn" @click="lookDesc">查看详情</p>
                    </div>
                </masker>
                <tab
                    class="activityDetail__tab"
                    active-color="#4aa1f0"
                    :line-width="3"
                    custom-bar-width="60px"
                >
                    <tab-item
                        class="tab-item"
                        v-for="(item, index) in tabs" :key="index"
                        :selected="actiontype === item.id"
                        @click.native="changeTabIndex(item.id)"
                    >
                        <div class="content">
                            <h3>{{item.num}}</h3>
                            <span>{{item.title}}</span>
                        </div>
                    </tab-item>
                </tab>
            </div>
            <!--内容-->
            <scroller
                class="activityDetail__bd"
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="dmscroller"
                noDataText=" "
            >
                <div v-if="scrollLoading" style="padding: 25px 0;text-align: center"><spinner type="lines" :size="60"></spinner></div>
                <UserCell
                    v-if="!scrollLoading"
                    v-for="(item, index) in list" :key="index"
                    :title="item.realname"
                    :img="item.headurl"
                    :friend="item.level"
                    :dateTime="item.createtime"
                >
                </UserCell>
            </scroller>

            <!--尾部-->
            <div class="activityDetail__ft">
                <x-button :gradients="['#1D62F0', '#19D5FD']"
                          :link="{name: 'ActivityIframe', params:{id: this.id},query: {url: activityDetail ? activityDetail.url : ''}}">去邀约
                </x-button>
            </div>
        </template>
    </div>
</template>

<script>
    import {XHeader, Tab, TabItem, Flexbox, FlexboxItem, ButtonTab, ButtonTabItem, Masker, XButton, Spinner} from 'vux'
    import ScrollerMixin from './../mixins/ScrollerMixin.vue'
    import WxShareMixin from './../mixins/WxShareMixin.vue'
    import TabbarScoller from './../components/TabbarScoller/index.vue'
    import UserCell from './../components/Cell/UserCell.vue'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    export default {
        props: ['id'],
        mixins: [ScrollerMixin, WxShareMixin],
        data() {
            return {
                loading: true,
                user: window.YS_USER,
                activityDetail: null,
                actiontype: 0,
                tabs: [
                    {
                        id: 0,
                        title: '接受',
                        num: 0
                    },
                    {
                        id: 1,
                        title: '阅读',
                        num: 0
                    },
                    {
                        id: 2,
                        title: '转发',
                        num: 0
                    }
                ],
                scrollLoading: true
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
            XButton,
            UserCell,
            Spinner,
            DmLoading
        },
        computed: {},
        methods: {
            async init() {
                try {
                    let datas = await this.ajaxLoadActivityDetail()
                    window.document.title = datas.name
                    let result = await this.ajaxPageDateByList()
                    this.list = result.list
                    this.pageCount = result.pageCount
                    // 微信分享
                    this.$wechat.ready(() => {
                        this.$wechat.showMenuItems({
                            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:QZone'] // 要显示的菜单项，所有menu项见附录3
                        })
                        this.weixinShare({
                            title: datas.name, // 分享标题
                            desc: datas.introduce,
                            link: `${window.location.protocol}//${window.location.host}/cust/activity/index?id=${this.id}&shareuserid=${this.user.id}&fpuserid=${this.user.id}&level=2#/?id=${this.id}&shareuserid=${this.user.id}&fpuserid=${this.user.id}&level=2`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: datas.smallimgsrc, // 分享图标
                            fn: this.ajaxCallBackShared
                        })
                    })
                    this.loading = false
                    this.scrollLoading = false
                } catch (err){
                    this.loading = false
                    this.scrollLoading = false
                }
                this.loading = false
                this.scrollLoading = false
            },
            async refresh(done) {
                this.pageNo = 0
                try {
                    await this.ajaxLoadActivityDetail()
                    let result = await this.ajaxPageDateByList()
                    this.list = result.list
                    this.pageCount = result.pageCount
                    done()
                } catch (err) {
                    done()
                }
            },
            ajaxLoadActivityDetail() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/activity/services/loadActivityDetail',
                        data: {
                            activityid: this.id,
                            type: 0
                        }
                    }).then(res => {
                        this.activityDetail = res
                        this.tabs[0].num = res.totalacceptcount
                        this.tabs[1].num = res.totalreadcount
                        this.tabs[2].num = res.totalsharecount
                        resolve(res)
                    })
                })
            },
            // 改变tab事件
            async changeTabIndex(id) {
                if (this.actiontype === id) {
                    return
                }
                this.scrollLoading = true
                this.actiontype = id
                this.pageNo = 0
                try {
                    let result = await this.ajaxPageDateByList()
                    setTimeout(() => {
                        this.$refs.dmscroller && this.$refs.dmscroller.scrollTo(0, 0, false)
                    }, 30)
                    this.list = result.list
                    this.pageCount = result.pageCount
                } catch (err){}
                this.$vux.loading.hide()
                this.scrollLoading = false
            },
            // 查看详情
            lookDesc() {
                this.$vux.alert.show({
                    title: this.activityDetail.name,
                    content: this.activityDetail.introduce
                })
            },
            /***
             * 分享回调接口
             * @param type 0:朋友圈 1:朋友 2: QQ 3:QQ空间 4:企业微信
             */
            ajaxCallBackShared(type) {
                this.$axios.post({
                    url: '/agent/activity/services/shareActivitycallBack',
                    data: {
                        activityid: this.id,
                        sharetype: type,
                        fpuserid: this.user.id,
                        shareuserid: this.user.id,
                        level: 1
                    }
                }).then(res => {

                })
            },
            ajaxPageDateByList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/activity/services/loaduserActivitydataByactivityid',
                        data: {
                            activityid: this.id,
                            actiontype: this.actiontype,
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
        },
        created() {
            this.init()
        },
        mounted() {
        }
    }
</script>
