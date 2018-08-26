<style lang="less" rel="stylesheet/less" scoped="scoped">
    .dm-comment-panel {
        .title {
            padding: 15px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            span {
                font-size: 12px;
            }
        }
    }
</style>
<template>
    <div class="dm-comment-panel">
        <div class="title">
            <span>全部热评</span>
            <span style="color: #3a99f7;"
                  @click="onWriteComment">写评论 <i class="iconfont icon-writefill"></i></span>
        </div>
        <template v-if="this[this.commentOption.list] && this[this.commentOption.list].length !==0">
            <dm-panel
                v-for="(panel, panel_index) in this[commentOption.list]" :key="panel_index"
                :img="panel[commentOption.listOption.img]"
                :title="panel[commentOption.listOption.title]"
            >
                {{panel[commentOption.listOption.content]}}
                <div slot="footer">
                    <dm-comment
                        :id="panel[commentOption.listOption.commentid]"
                        :index="panel_index"
                        :hasThumbsUp="false"
                        :commentList="panel[commentOption.listOption.commentlist]"
                        :dateTime="timeAgoHasHourAndMinute(panel[commentOption.listOption.createtime])"
                        @comment="commentMethod"
                        @reply="replyMethod"
                    ></dm-comment>
                </div>
            </dm-panel>
        </template>
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
                    <x-textarea v-model="commentModal.text" placeholder="请输入你想填写的内容" :height="80" :show-counter="true"
                                :max="100"></x-textarea>
                </group>
            </confirm>
        </div>
    </div>
</template>

<script>
    import DmComment from './../../components/Dcomponents/DmComment.vue'
    import DmPanel from './../../components/Dcomponents/DmPanel.vue'

    import UtilMixin from '@/mixins/UtilMixin.vue'
    import CommentMixin from '@/mixins/CommentMixin.vue'
    import WxShareMixin from '@/mixins/WxShareMixin.vue'

    import {Group, Confirm, XTextarea, TransferDomDirective as TransferDom} from 'vux'

    export default {
        mixins: [UtilMixin, CommentMixin, WxShareMixin],
        directives: {
            TransferDom
        },
        props: {
            commentOption: {
                type: Object,
                default: {
                    list: 'list',
                    listOption: {
                        commentlist: 'commentlist',
                        commentid: 'commentid',
                        img: 'img',
                        createtime: 'createtime',
                        content: 'content',
                        title: 'title',
                        commentlistOption: {
                            name: 'nickname',
                            content: 'content'
                        }
                    }
                }
            },
            list: {
                type: Array,
                default: []
            }
        },
        data() {
            return {}
        },
        components: {
            DmComment,
            DmPanel,
            Confirm,
            XTextarea,
            Group
        },
        computed: {},
        methods: {
            // 点击评论
            onWriteComment() {
                this.commentModal.title = '评论'
                this.commentModal.show = true
                this.commentObj.type = 1
            },
            // 提交评论接口
            ajaxSubmitArticleComment() {
                this.$axios.post({
                    url: '/agent/curriculum/services/submitLessonComment',
                    data: {
                        lessonid: this.$route.params.lessonid,
                        content: this.commentModal.text
                    },
                    tips: true
                }).then(result => {
                    let res = {}
                    res[this.commentOption.listOption.commentlist] = []
                    res[this.commentOption.listOption.commentid] = result[this.commentOption.listOption.commentid]
                    res[this.commentOption.listOption.img] = result[this.commentOption.listOption.img]
                    res[this.commentOption.listOption.createtime] = new Date().getTime()
                    res[this.commentOption.listOption.content] = this.commentModal.text
                    res[this.commentOption.listOption.title] = result[this.commentOption.listOption.title]
                    this[this.commentOption.list].unshift(res)
                    this.commentModal.show = false
                    this.commentModal.text = ''
                }).catch(() => {
                    this.commentModal.show = false
                    this.commentModal.text = ''
                })
            },
            // 提交评论/回复
            commentModal_onConfirm() {
                // 判断内容是否为空
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
        mounted() {}
    }
</script>
