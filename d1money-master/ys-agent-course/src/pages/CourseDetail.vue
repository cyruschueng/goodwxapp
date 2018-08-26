<!--suppress ALL -->
<style lang="less" rel="stylesheet/less" scoped="scoped">
    .videoDetail {
        height: 100%;
        .videoDetail__content {
            position: relative;
            background-color: #ffffff;
            > .title {
                font-size: 16px;
                padding: 10px 15px;
                position: relative;
                &:before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    border-bottom: 5px solid #f2f2f2;
                }

            }
            .details{
                .title {
                    font-size: 15px;
                    color: #333;
                    padding-bottom: 5px;
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
        }
    }
</style>
<template>
    <div class="videoDetail">
        <Video
            ref="video"
            v-if="detail && detail.fileid"
            :file_id="detail.fileid"
            :app_id="app_id"
            width="100%"
            height="56.25vw"
        >
        </Video>
        <div class="videoDetail__content">
            <h2 class="title">
                {{detail && detail.title}}
            </h2>
            <div>
                <tab :line-width=2 active-color='#4aa1f0' v-model="tabIndex">
                    <tab-item class="vux-center" :selected="true">详情</tab-item>
                    <tab-item class="vux-center">学习互动</tab-item>
                </tab>
                <swiper v-model="tabIndex" :height="tabHeight" :show-dots="false">
                    <swiper-item class="details" style="padding: 15px;box-sizing: border-box">
                        <h2 class="title">{{detail && detail.title}}</h2>
                        <div class="status">
                            <span>{{detail && detail.lecturer}}</span>
                            <span>{{detail && detail.typename}}</span>
                            <span>
                                <template v-if="detail && detail.learncount">
                                    {{detail.playcount}}
                                </template>
                                <template v-else>
                                    0
                                </template>
                                人观看
                            </span>
                            <span class="like" @click="thumbUpMethod">
                                <template v-if="detail&& !detail.userthumbsup">
                                    <i class="iconfont icon-like"></i>
                                </template>
                                <template v-if="detail&& detail.userthumbsup">
                                    <i class="iconfont icon-likefill" style="color: #FF7676;"></i>
                                </template>
                                {{detail && detail.thumbsupcount}}人喜欢
                            </span>
                        </div>
                        <div class="desc">
                            {{detail && detail.introduce}}
                        </div>
                    </swiper-item>
                    <swiper-item id="commentList" style="background-color: #ffffff;overflow-y: auto">
                        <dm-comment-panel
                            :list="list"
                            :commentOption="commentOption"
                        >
                        </dm-comment-panel>
                        <div style="text-align: center;margin: 15px;" v-if="this.loadding">
                            <spinner type="android" size="45px"></spinner>
                        </div>
                        <template v-if="list && list.length===0">
                            <box gap="0"
                                 style="display: block;text-align: center;font-size: 12px;color: #969696;padding: 15px;">
                                暂时还没有评论,快来抢沙发吧~
                            </box>
                        </template>
                        <box gap="0" style="padding: 15px;"
                             v-if="!this.loadding && (this.pageNo >= this.pageCount - 1) && list.length!==0">
                            <divider>没有更多数据</divider>
                        </box>
                    </swiper-item>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
    import Video from './../components/Video/Video.vue'
    import DmCommentPanel from './../components/Dcomponents/DmCommentPanel.vue'

    import UtilMixin from '@/mixins/UtilMixin.vue'
    import WxShareMixin from '@/mixins/WxShareMixin.vue'

    import {TransferDomDirective as TransferDom, Divider, Box, Spinner, Tab, TabItem, Swiper, SwiperItem} from 'vux'

    export default {
        mixins: [UtilMixin, WxShareMixin],
        props: ['curriculumid', 'lessonid'],
        directives: {
            TransferDom
        },
        data() {
            return {
                tabIndex: 0,
                app_id: window.YS_TENCENTCLOUD_APPID,
                detail: {},
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
            Tab,
            TabItem,
            Swiper,
            SwiperItem
        },
        computed: {
            tabHeight() {
                return document.body.clientHeight - (document.body.clientWidth / 100 * 56.25) - 44 - 45 + 'px'
            }
        },
        methods: {
            // 获取课时详情
            ajaxLoadCurriculumLessonDetail() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/curriculum/services/loadCurriculumLessonDetail',
                        data: {
                            curriculumid: this.curriculumid,
                            lessonid: this.lessonid
                        },
                        tips: true
                    }).then(result => {
                        resolve(result)
                    }).catch((code, msg) => {
                        reject(code, msg)
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
                        url: '/agent/curriculum/services/loadCurriculumLessonCommentlist',
                        data: {
                            lessonid: this.lessonid,
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
                const isThumbsup = this.detail.userthumbsup
                // 请求url
                let ajaxUrl = ''
                if (isThumbsup) {
                    // 已点赞
                    ajaxUrl = '/agent/curriculum/services/cancelLessonThumbsup'
                } else {
                    ajaxUrl = '/agent/curriculum/services/submitLessonThumbsup'
                }
                this.$axios.post({
                    url: ajaxUrl,
                    data: {
                        lessonid: this.lessonid
                    }
                }).then(res => {
                    if (isThumbsup) {
                        this.detail.thumbsupcount--
                        this.detail.userthumbsup = 0
                    } else {
                        this.detail.thumbsupcount++
                        this.detail.userthumbsup = 1
                    }
                })
            }
        },
        async created() {
            this.$wechat.ready(() => {
                // 隐藏所有非基础按钮接口
                this.$wechat.hideAllNonBaseMenuItem()
            })
            document.body.scrollTop = 0
            this.detail = await this.ajaxLoadCurriculumLessonDetail()
            document.title = this.detail.title
            this.ajaxLoadCommentList(false)
        },
        async mounted() {
            const divscroll = document.getElementById('commentList')

            let divScroll = () => {
                let wholeHeight = divscroll.scrollHeight
                let scrollTop = divscroll.scrollTop
                let divHeight = divscroll.clientHeight
                if (scrollTop + divHeight + 30 >= wholeHeight) {
                    // 这里写动态加载的逻辑，比如Ajax请求后端返回下一个页面的内容
                    if (this.loadding === true) {
                        return
                    }
                    if (this.pageNo >= this.pageCount - 1) {
                        return
                    }
                    this.loadding = true
                    this.pageNo++
                    this.ajaxLoadCommentList(true)
                        .then(result => {
                            this.loadding = false
                            this.list.push(...result)
                        })
                }
            }
            divscroll.onscroll = divScroll
        }
    }
</script>
