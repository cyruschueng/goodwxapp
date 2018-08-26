<style rel="stylesheet/less" lang="less"></style>
<template>
    <div>
        <scroller
            class="submitMe"
            :on-refresh="refresh"
            :on-infinite="infinite"
            ref="dmscroller"
        >
            <template v-for="(item, index) in list">
                <dm-panel
                    :class="['dm__panel','dm-border-t']"
                    :title="item.name"
                    :titleDesc="'<i class=\'iconfont icon-shijian\'></i>' + item.userName"
                    :img="item.avatar"
                    @click.native="routerLink('TeamMemberVisitingRecord',{userid: item.userid, name: item.name})"
                >
                    <template v-if="item.type=== 1">【补充拜访记录】</template>
                    {{item.desc}}
                    <template v-if="item.type=== 0" slot="position">
                        {{item.position}}
                    </template>
                    <div slot="footer">
                        <dm-comment
                            :id="item.id"
                            :index="index"
                            :thumbList="item.thumbsUplist"
                            :commentList="item.commentlist"
                            :isThumbsUp="item.thumbUpCount"
                            :dateTime="timeAgoHasHourAndMinute(item.createTime)"
                            @thumbUp="thumbUpMethod"
                            @comment="commentMethod"
                            @reply="replyMethod"
                        ></dm-comment>
                    </div>
                </dm-panel>
            </template>
        </scroller>
        <!--评论模态框-->
        <div v-transfer-dom>
            <confirm class="dm-modal dm-modal-textarea" v-model="commentModal.show"
                     confirm-text="评论"
                     cancel-text="关闭"
                     :title="commentModal.title"
                     :close-on-confirm="false"
                     @on-cancel="commentModal_onCancel"
                     @on-confirm="commentModal_onConfirm"
                     @on-show="commentModal_onShow"
                     @on-hide="commentModal_onHide">
                <group :gutter="0">
                    <x-textarea v-model="commentModal.text" placeholder="请输入你想评论的内容" :height="80" :show-counter="true"
                                :max="100"></x-textarea>
                </group>
            </confirm>
        </div>
    </div>
</template>
<script>
    import {Cell, Group, Confirm, XTextarea, TransferDomDirective as TransferDom} from 'vux'
    import DmPanel from '@/components/Dcomponents/DmPanel.vue'
    import DmComment from '@/components/Dcomponents/DmComment.vue'
    import ScrollerMixin from '@/mixins/ScrollerMixin.vue'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import CommentMixin from '@/mixins/CommentMixin.vue'

    export default {
        mixins: [ScrollerMixin, UtilMixin, CommentMixin],
        directives: {
            TransferDom
        },
        components: {
            Cell,
            Group,
            DmPanel,
            DmComment,
            Confirm,
            XTextarea
        },
        data() {
            return {
                isInit: false
            }
        },
        async created() {
            let result = await this.ajaxPageDateByList()
            this.list = result.list
            this.pageCount = result.pageCount
        },
        mounted() {
            this.ajaxUpdateCommitRecordStatus()
        },
        beforeDestroy() {
        },
        methods: {
            // 提交给我的
            ajaxPageDateByList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'visitingRecordCommitedtoMeList',
                        data: {
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        },
                        tips: true
                    })
                        .then(result => {
                            resolve(result)
                        })
                        .catch((code, msg) => {
                            reject(code, msg)
                        })
                })
            },
            // 更新当前用户未读拜访记录为已读接口
            ajaxUpdateCommitRecordStatus() {
                this.$axios.post({
                    url: 'updateCommitRecordStatus',
                    tips: true
                }).catch((code, msg) => {
                    this.$vux.toast.show({
                        type: 'cancel',
                        text: '更新未读消息失败'
                    })
                })
            }
        },
        activated() {
            if (this.$route.meta.keepAlive && localStorage.getItem('d1money!currentScroller')) {
                let {left = 0, top = 0} = JSON.parse(localStorage.getItem('d1money!currentScroller'))
                setTimeout(() => {
                    this.$refs.dmscroller && this.$refs.dmscroller.scrollTo(left, top, false)
                }, 30)
            }
        },
        deactivated() {
            localStorage.setItem('d1money!currentScroller', JSON.stringify(this.$refs.dmscroller.getPosition()))
        },
        beforeRouteEnter(to, from, next) {
            if (to.name === 'SubmitMe') {
                if (from.name === 'Home') {
                    next(vm => {
                        setTimeout(() => {
                            vm.$refs.dmscroller && vm.$refs.dmscroller.scrollTo(0, 0, false)
                            vm.ajaxPageDateByList()
                                .then(result => {
                                    vm.list = result.list
                                    vm.pageCount = result.pageCount
                                })
                        }, 30)
                    })
                }
            }
            next()
        }
    }
</script>
