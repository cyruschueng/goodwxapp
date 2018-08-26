<template>
    <div class="article">
        <DmLoading v-if="loading" img="/static/common/img/loadingImg.png"></DmLoading>
        <template v-else>
            <h1 class="article__hd">{{articleDetail.title}}</h1>
            <div class="time"
                 style="padding:5px 15px;font-size: 12px;color: #969696;margin: -8px 0;background-color: #ffffff;">
                {{timeAgoHasHourAndMinute(articleDetail.publishtime)}}
            </div>
            <div class="article__bd" v-html="articleDetail.content"></div>
            <div class="article__ft">
                <div class="thumbsUp">
                    <box gap="0 0 8px 0">
                        <x-button v-if="!userthumbsupcount" type="warn" @click.native="onThumbsUp(0)">
                            点赞（{{thumbsupcount}}）
                        </x-button>
                        <x-button v-else="!userthumbsupcount" type="default" @click.native="onThumbsUp(1)">已赞（{{thumbsupcount}}）</x-button>
                    </box>
                </div>
                <div class="thumbsUpList" v-if="ThumbsUpUser.length!==0">
                    <template v-for="(item, index) in ThumbsUpUser">
                        <div class="item">
                            <img :src="item.headurl">
                        </div>
                    </template>
                </div>
                <p class="readNum">
                    <span class="left">阅读 {{readcount}}</span>
                    <span class="right">投诉</span>
                </p>
            </div>
            <!--自定义组件-->
            <custom-component
                :pageId="1"
            ></custom-component>

            <div class="utils">
                <div class="thumbsUpBox">
                    <divider>评论</divider>
                    <p class="" style="overflow: hidden">
                    <span style="float: right;margin-right: 20px;font-size: 12px;color: #3a99f7;"
                          @click="onWriteComment">写评论 <i class="iconfont icon-writefill"></i></span>
                    </p>
                    <div style="width: 100%;margin-top: 5px;">
                        <template>
                            <dm-panel
                                v-for="(item,index) in list" :key="index"
                                :class="['dm__panel', 'dm__panel__bg']"
                                :title="item.nickname"
                                :img="item.commentheadurl"
                            >
                                {{item.content}}
                                <div slot="footer">
                                    <dm-comment
                                        :id="item.commentid"
                                        :index="index"
                                        :hasThumbsUp="false"
                                        :commentList="item.articlecommentReplyList"
                                        :dateTime="timeAgoHasHourAndMinute(item.createtime)"
                                        @comment="commentMethod"
                                        @reply="replyMethod"
                                    ></dm-comment>
                                </div>
                            </dm-panel>
                        </template>
                        <div style="text-align: center;margin: 15px;" v-if="this.loadding">
                            <spinner type="android" size="45px"></spinner>
                        </div>
                        <template v-if="list.length===0">
                            <box gap="15px" style="text-align: center;font-size: 12px;color: #969696;">
                                暂时还没有评论,快来抢沙发吧~
                            </box>
                        </template>
                        <box gap="15px" v-if="!this.loadding && (this.pageNo >= this.pageCount - 1) && list.length!==0">
                            <divider>没有更多数据</divider>
                        </box>
                    </div>
                </div>
            </div>

            <!--评论模态框-->
            <div v-transfer-dom>
                <confirm class="dm-modal dm-modal-textarea" v-model="commentModal.show"
                         confirm-text="提交"
                         cancel-text="关闭"
                         :title="commentModal.title"
                         :close-on-confirm="false"
                         @on-cancel="commentModal_onCancel"
                         @on-confirm="commentModal_onConfirm"
                         @on-show="commentModal_onShow"
                         @on-hide="commentModal_onHide">
                    <group :gutter="0">
                        <x-textarea v-model="commentModal.text" placeholder="请输入你想填写的内容" :height="80"
                                    :show-counter="true"
                                    :max="100"></x-textarea>
                    </group>
                </confirm>
            </div>
        </template>
    </div>
</template>

<script>
    import DmPanel from '@/components/Dcomponents/DmPanel.vue'
    import CustomComponent from '@/components/YsComponents/CustomComponent.vue'

    import DmComment from '@/components/Dcomponents/DmComment.vue'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import CommentMixin from '@/mixins/CommentMixin.vue'
    import WxShareMixin from '@/mixins/WxShareMixin.vue'
    import {XButton, Box, Divider, Confirm, XTextarea, TransferDomDirective as TransferDom, Group} from 'vux'

    export default {
        mixins: [UtilMixin, CommentMixin, WxShareMixin],
        directives: {
            TransferDom
        },
        props: ['articleid'],
        data() {
            return {
                loading: true,
                delThumbsUpUser: null,
                articleDetail: {
                    id: null,
                    title: null,
                    content: null,
                    // 推荐话术
                    description: null,
                    imgsrc: null
                },
                list: [],
                pageNo: 0,
                pageSize: 5,
                pageCount: 1,
                loadding: false,
                ThumbsUpUser: [],
                readcount: null,
                thumbsupcount: null,
                userthumbsupcount: null,
                shortcontent: '',
                shareuserid: null,
                customComponents: window.YS_CUSTOMCOMPONENT_LIST
            }
        },
        components: {
            XButton,
            Box,
            Divider,
            DmPanel,
            DmComment,
            Confirm,
            XTextarea,
            Group,
            DmLoading,
            CustomComponent
        },
        computed: {},
        methods: {
            ajaxLoadArticleDetail() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/article/services/loadArticleDetail',
                        data: {
                            articleid: this.articleid
                        },
                        tips: true
                    }).then(result => {
                        resolve(result)
                        this.articleDetail = result.articleRedis
                        result.ThumbsUpUser && (this.ThumbsUpUser = result.ThumbsUpUser)
                        this.readcount = result.readcount
                        this.thumbsupcount = result.thumbsupcount
                        this.userthumbsupcount = result.userthumbsupcount
                        this.shortcontent = result.shortcontent
                        this.shareuserid = result.shareuserid
                        if (result.thumbsupcount > result.ThumbsUpUser.length) {
                            let count = 0
                            if (result.thumbsupcount > 8) {
                                count = 8 - result.ThumbsUpUser.length
                            } else {
                                count = result.thumbsupcount - result.ThumbsUpUser.length
                            }
                            let userImg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                            userImg.sort(function () {
                                return 0.5 - Math.random()
                            })
                            for (let i = 0; i < count; i++) {
                                this.ThumbsUpUser.push({headurl: `/static/agent/article/img/userImg/${userImg[i]}.jpg`})
                            }
                        }
                    })
                })
            },
            ajaxSubmitArticleComment() {
                this.$axios.post({
                    url: '/agent/article/services/submitArticleComment',
                    data: {
                        articleid: this.articleid,
                        content: this.commentModal.text
                    },
                    tips: true
                }).then(result => {
//                    console.log(result)
                    let res = result
                    res['commentheadurl'] = result.headurl
                    res['createtime'] = new Date().getTime()
                    res['commentid'] = result.id
                    this.list.unshift(result)
                    this.commentModal.show = false
                    this.commentModal.text = ''
                }).catch(() => {
                    this.commentModal.show = false
                    this.commentModal.text = ''
                })
            },
            // 分页加载评论
            ajaxLoadArticleCommentList(append = true) {
                if (!append) {
                    this.pageNo = 0
                }
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/article/services/loadArticleCommentList',
                        data: {
                            articleid: this.articleid,
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        }
                    }).then(result => {
//                        console.log(result)
                        this.pageCount = result.pageCount
                        if (!append) {
                            this.list = result.list ? result.list : []
                        }
                        resolve(result.list)
                    })
                })
            },
            // 点赞
            onThumbsUp(isthumbsup = false) {
                let url = isthumbsup ? 'cancelArticleThumbsUp' : 'submitArticleThumbsUp'
                let toast = isthumbsup ? '取消点赞!' : '点赞成功!'
                this.$axios.post({
                    url: '/agent/article/services/' + url,
                    data: {
                        articleid: this.articleid
                    },
                    tips: true,
                    isloadding: true
                }).then(result => {
                    isthumbsup ? this.thumbsupcount-- : this.thumbsupcount++
                    this.userthumbsupcount = !isthumbsup
                    if (isthumbsup) {
//                        console.log(result.thumbsupuserid)
                        this.ThumbsUpUser.map((item, index) => {
                            if (item.id === result.thumbsupuserid) {
                                this.ThumbsUpUser.splice(index, 1)
                            }
                        })
                        if (this.delThumbsUpUser) {
                            this.ThumbsUpUser.push(this.delThumbsUpUser)
                        }
//                        console.log(this.ThumbsUpUser)
                    } else {
                        this.ThumbsUpUser.unshift({
                            id: result.thumbsupuserid,
                            headurl: result.headurl,
                            nickname: result.nickname
                        })
                        if (this.ThumbsUpUser.length > 8) {
                            this.delThumbsUpUser = this.ThumbsUpUser.pop()
                        }
                    }
                    this.$vux.toast.show({
                        type: 'success',
                        text: toast
                    })
                })
            },
            /***
             * 文章分享回调接口
             * @param type 0:朋友圈 1:朋友 2: QQ 3:QQ空间 4:企业微信
             */
            ajaxCallBackArticleShared(type) {
                this.$axios.post({
                    url: '/agent/article/services/callBackArticleShared',
                    data: {
                        articleid: this.articleid,
                        sharetype: type,
                        fpuserid: this.shareuserid,
                        shareuserid: this.shareuserid,
                        level: 1
                    }
                }).then(res => {
                    this.$vux.toast.show({
                        text: '分享成功!'
                    })
                })
            },
            onWriteComment() {
                this.commentModal.title = '评论'
                this.commentModal.show = true
                this.commentObj.type = 1
            },
            commentModal_onConfirm() {
                if (this.trim(this.commentModal.text) === '') {
                    this.$vux.toast.show({
                        type: 'text',
                        text: '请填写评论内容'
                    })
                    this.commentModal.show = true
                    return
                }
                if (this.commentObj.type === 0) {
                    // 回复
                    this.ajaxComment(this.commentObj.index)
                } else if (this.commentObj.type === 1) {
                    // 评论
                    this.ajaxSubmitArticleComment()
                }
            }
        },
        async created() {
            document.body.scrollTop = 0
            let result = await this.ajaxLoadArticleDetail()
            window.document.title = result.articleRedis.title
            // 微信分享
            this.$wechat.ready(() => {
                this.$wechat.showMenuItems({
                    menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:QZone'] // 要显示的菜单项，所有menu项见附录3
                })
                this.weixinShare({
                    title: result.articleRedis.title, // 分享标题
                    desc: result.shortcontent,
                    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    link: `${window.location.protocol}//${window.location.host}/cust/article/index?articleid=${this.articleid}&shareuserid=${result.shareuserid}&fpuserid=${result.shareuserid}&level=2#/?articleid=${this.articleid}&shareuserid=${result.shareuserid}&fpuserid=${result.shareuserid}&level=2`,
                    imgUrl: result.articleRedis.imgsrc, // 分享图标
                    fn: this.ajaxCallBackArticleShared
                })
            })
            await this.ajaxLoadArticleCommentList(false)
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
                    this.ajaxLoadArticleCommentList(true)
                        .then(result => {
                            this.loadding = false
                            this.list.push(...result)
                        })
                } else {
//                    console.log('不加载')
                }
            })
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped="scoped">
    .article {
        .article__hd {
            background-color: #ffffff;
            padding: 15px;
            font-size: 22px;
            line-height: 28px;
            color: #333333;
        }
        .article__bd {
            background-color: #ffffff;
            color: #333;
            padding: 15px;
            img {
                margin: 0 auto;
                max-width: 100%;
            }
        }
        .article__ft {
            background-color: #ffffff;
            padding: 10px 15px 0;
            .readNum {
                font-size: 12px;
                color: #969696;
                padding: 15px 0;
                overflow: hidden;
                span.left {
                    float: left;
                }
                span.right {
                    float: right;
                }
            }
            .thumbsUp {
                margin: 0 auto;
                width: 40%;
                text-align: center;
                font-size: 14px;
                color: #969696;
            }
            .thumbsUpList {
                height: 44px;
                line-height: 44px;
                width: 240px;
                margin: 20px auto 0;
                overflow: hidden;
                display: flex;
                flex-flow: nowrap row;
                justify-content: center;
                .item {
                    position: relative;
                    box-sizing: border-box;
                    width: 44px;
                    height: 44px;
                    /*padding: 8px;*/
                    overflow: hidden;
                    z-index: 1;
                    margin-left: -15px;
                    &:nth-child(1) {
                        z-index: 20;
                    }
                    &:nth-child(2) {
                        z-index: 19;
                    }
                    &:nth-child(3) {
                        z-index: 18;
                    }
                    &:nth-child(4) {
                        z-index: 17;
                    }
                    &:nth-child(5) {
                        z-index: 16;
                    }
                    &:nth-child(6) {
                        z-index: 15;
                    }
                    &:nth-child(7) {
                        z-index: 14;
                    }
                    &:nth-child(8) {
                        z-index: 13;
                    }
                    &:nth-child(9) {
                        z-index: 12;
                    }
                    &:nth-child(10) {
                        z-index: 11;
                    }
                    &:nth-child(11) {
                        z-index: 10;
                    }
                    &:nth-child(12) {
                        z-index: 9;
                    }
                    &:nth-child(13) {
                        z-index: 8;
                    }
                    &:nth-child(14) {
                        z-index: 7;
                    }
                    &:nth-child(15) {
                        z-index: 6;
                    }
                    &:nth-child(16) {
                        z-index: 5;
                    }
                    &:nth-child(17) {
                        z-index: 4;
                    }
                    &:nth-child(18) {
                        z-index: 3;
                    }
                    &:nth-child(19) {
                        z-index: 2;
                    }
                    &:first-child {
                        margin-left: 0;
                    }
                    img {
                        -webkit-border-radius: 100% 100%;
                        -moz-border-radius: 100% 100%;
                        border-radius: 100% 100%;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .num {
                    display: inline-block;
                    height: 44px;
                    line-height: 44px;
                    font-size: 14px;
                    color: #969696;
                    position: relative;
                    i.iconfont {
                        /*font-size: 14px;*/
                        position: absolute;
                        right: -20px;
                        top: 0px;
                        font-size: 18px;
                        font-weight: 300;
                        color: #aaa;
                    }
                }

            }
        }
        .utils {
            margin-top: 10px;
            .thumbsUpBox {
                .dm__panel__bg {
                    background-color: transparent;
                }
            }
        }
    }

</style>
