<!--suppress ALL -->
<style lang="less" rel="stylesheet/less" scoped="scoped">
    .videoDetail {

        .videoDetail__content {
            padding: 15px;
            position: relative;
            background-color: #ffffff;
            .title {
                font-size: 16px;
                color: #333;
            }
            .status {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                font-size: 12px;
                color: #969696;
                span {
                    position: relative;
                    margin-right: 20px;
                    &:before {
                        position: absolute;
                        content: '·';
                        font-size: 20px;
                        top: 50%;
                        right: -15px;
                        transform: translateY(-50%);
                    }
                    &:last-child {
                        &:before {
                            display: none;
                        }
                    }
                    i.iconfont {
                        font-size: 12px;
                        margin-right: 5px;
                    }
                }
            }
            .util {
                display: flex;
                flex-flow: row nowrap;
                color: #333;
                font-size: 14px;
                line-height: 28px;
                i.iconfont {
                    font-weight: bold;
                    font-size: 18px;
                    color: #333;
                }
                .comment, .operation {
                    flex: 1;
                }
                .comment {

                }
                .operation {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: flex-end;
                    span {
                        margin-right: 20px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
            .desc {
                font-size: 14px;
                color: #333;
            }
        }
        .videoDetail__footer {
            background-color: #ffffff;
        }
    }
</style>
<template>
    <div class="videoDetail">
        <DmLoading v-if="loading" img="/static/common/img/loadingImg.png"></DmLoading>
        <template v-else="loading">
            <Video
                v-if="videoDetail && videoDetail.fileid"
                :file_id="videoDetail.fileid"
                :app_id="app_id"
                width="100%"
                height="auto"
            >
            </Video>
            <div class="videoDetail__content">
                <h2 class="title">{{videoDetail && videoDetail.title}}</h2>
                <div class="status">
                    <span>{{videoDetail && videoDetail.lecturer}}</span>
                    <span>{{videoDetail && videoDetail.typename}}</span>
                    <span>
                    <template v-if="videoDetail && videoDetail.playcount">
                        {{videoDetail.playcount}}
                    </template>
                    <template v-else>
                        0
                    </template>
                    次播放
                </span>
                </div>
                <div class="util">
                    <div class="comment">
                        <i class="iconfont icon-community"></i>
                        <template v-if="videoDetail && videoDetail.commentcount">
                            {{videoDetail.commentcount}}
                        </template>
                        <template v-else>
                            0
                        </template>
                        次热评
                    </div>
                    <div class="operation">
                    <span>
                        <i class="iconfont icon-forward"></i>
                        {{videoDetail && videoDetail.sharedcount}}
                    </span>
                        <span @click="thumbUpMethod">
                        <template v-if="videoDetail&& !videoDetail.userthumbsup">
                            <i class="iconfont icon-like"></i>
                        </template>
                        <template v-if="videoDetail&& videoDetail.userthumbsup">
                            <i class="iconfont icon-likefill" style="color: #FF7676;"></i>
                        </template>
                        {{videoDetail && videoDetail.thumbsupcount}}
                    </span>
                    </div>
                </div>
                <div class="desc">
                    {{videoDetail && videoDetail.introduce}}
                </div>
            </div>
            <div class="videoDetail__footer">
                <dm-comment-panel
                    :list="list"
                    :commentOption="commentOption"
                >
                </dm-comment-panel>
                <div style="text-align: center;margin: 15px;" v-if="this.loadding">
                    <spinner type="android" size="45px"></spinner>
                </div>
                <template v-if="list && list.length===0">
                    <box gap="0" style="display: block;text-align: center;font-size: 12px;color: #969696;padding: 15px;">
                        暂时还没有评论,快来抢沙发吧~
                    </box>
                </template>
                <box gap="0" style="padding: 15px;"
                     v-if="!this.loadding && (this.pageNo >= this.pageCount - 1) && list.length!==0">
                    <divider>没有更多数据</divider>
                </box>
            </div>
        </template>
    </div>
</template>

<script>
    import Video from './../components/Video/Video.vue'
    import DmCommentPanel from './../components/Dcomponents/DmCommentPanel.vue'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import WxShareMixin from '@/mixins/WxShareMixin.vue'

    import {TransferDomDirective as TransferDom, Divider, Box, Spinner} from 'vux'

    export default {
        mixins: [UtilMixin, WxShareMixin],
        props: ['videoid'],
        directives: {
            TransferDom
        },
        data() {
            return {
                loading: true,
                app_id: window.YS_TENCENTCLOUD_APPID,
                user: window.YS_USER,
                videoDetail: {},
                list: [],
                commentOption: {
                    list: 'list',
                    listOption: {
                        commentlist: 'commentReplyList',
                        commentid: 'id',
                        img: 'headurl',
                        createtime: 'createtime',
                        content: 'content',
                        title: 'nickname',
                        commentlistOption: {
                            name: 'nickname',
                            content: 'content'
                        }
                    }
                },
                pageNo: 0,
                pageSize: 5,
                pageCount: 1,
                loadding: false
            }
        },
        components: {
            Video,
            DmCommentPanel,
            Divider,
            Box,
            Spinner,
            DmLoading
        },
        computed: {},
        methods: {
            // 加载视频详细信息
            ajaxLoadVedioDetailByVedioid() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/video/services/loadVedioDetailByVedioid',
                        data: {
                            videoid: this.videoid
                        }
                    }).then(res => {
                        this.videoDetail = res
                        resolve(res)
                    })
                })
            },
            // 加载评论数据
            ajaxLoadCommentList(append = true) {
                if (!append) {
                    this.pageNo = 0
                }
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/video/services/loadVedioCommentList',
                        data: {
                            videoid: this.videoid,
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        }
                    }).then(result => {
                        this.pageCount = result.pageCount
                        if (!append) {
                            this.list = result.list ? result.list : []
                        }
                        resolve(result.list)
                    })
                })
            },
            // 点赞
            thumbUpMethod() {
                const isThumbsup = this.videoDetail.userthumbsup
                // 请求url
                let ajaxUrl = ''
                if (isThumbsup) {
                    // 已点赞
                    ajaxUrl = '/agent/video/services/cancelVedioThumbsup'
                } else {
                    ajaxUrl = '/agent/video/services/submitVedioThumbsup'
                }
                this.$axios.post({
                    url: ajaxUrl,
                    data: {
                        videoid: this.videoDetail.id
                    },
                    tips: true,
                    isloadding: true
                }).then(res => {
                    if (isThumbsup) {
                        this.videoDetail.thumbsupcount--
                        this.videoDetail.userthumbsup = 0
                    } else {
                        this.videoDetail.thumbsupcount++
                        this.videoDetail.userthumbsup = 1
                    }
                })
            },
            /***
             * 分享回调接口
             * @param type 0:朋友圈 1:朋友 2: QQ 3:QQ空间 4:企业微信
             */
            ajaxCallBackShared(type) {
                this.$axios.post({
                    url: '/agent/video/services/callBackVideoShared',
                    data: {
                        videoid: this.videoid,
                        sharetype: type,
                        fpuserid: this.user.id,
                        shareuserid: this.user.id,
                        level: 1
                    }
                }).then(res => {

                })
            }
        },
        async created() {
            document.body.scrollTop = 0
            let result = await this.ajaxLoadVedioDetailByVedioid()
            window.document.title = result.title
            // 微信分享
            this.$wechat.ready(() => {
                this.$wechat.showMenuItems({
                    menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:QZone'] // 要显示的菜单项，所有menu项见附录3
                })
                this.weixinShare({
                    title: result.title, // 分享标题
                    desc: result.introduce,
                    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    link: `${window.location.protocol}//${window.location.host}/cust/video/index?id=${this.videoid}&shareuserid=${this.user.id}&fpuserid=${this.user.id}&level=2#/?id=${this.videoid}&shareuserid=${this.user.id}&fpuserid=${this.user.id}&level=2`,
                    imgUrl: result.videoImg, // 分享图标
                    fn: this.ajaxCallBackShared
                })
            })
            await this.ajaxLoadCommentList(false)
            this.loading = false
        },
        async mounted() {
            window.addEventListener('scroll', () => {
                if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                    if (this.loadding === true) {
                        return
                    }
                    if (this.pageNo >= this.pageCount - 1) {
                        return
                    }
                    this.loadding = true
//                    console.log('加载')
                    this.pageNo++
                    this.ajaxLoadCommentList(true)
                        .then(result => {
                            this.loadding = false
                            this.list.push(...result)
                        })
                } else {
                    console.log('不加载')
                }
            })
        }
    }
</script>
