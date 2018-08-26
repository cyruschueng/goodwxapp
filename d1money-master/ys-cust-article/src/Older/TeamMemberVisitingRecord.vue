<style rel="stylesheet/less" lang="less">

    .teamMemberVisitingRecord {
        height: 100%;
        .teamMemberVisitingRecord__bd {
            position: relative;
            height: calc(~"100% - 90px");
        }
    }
</style>
<template>
    <div class="teamMemberVisitingRecord">
        <dm-user-card class="teamMemberVisitingRecord__hd" id="dmUserCard" :img="customInfo.avatar">
            <template slot="title">
                {{customInfo.name}}
            </template>
            <template slot="desc">
                <span>实地拜访: <countup :start-val="0" :end-val="customInfo.fieldVisit" :duration="3" tag="span"></countup></span>
                <span>补充拜访: <countup :start-val="0" :end-val="customInfo.republishVisit" :duration="3" tag="span"></countup></span>
            </template>
            <div class="customList" slot="rightIcon" @click="routerLink('CustomerList',{userid: userid, name: name})">
                <i class="iconfont icon-liebiao"></i> Ta的客戶列表
            </div>
        </dm-user-card>
        <div class="teamMemberVisitingRecord__bd">
            <scroller
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="dmscroller"
            >
                <template v-for="(item, index) in list">
                    <dm-panel
                        :class="['dm__panel', {'dm-border-t': (index === 0) ||(index>0 && list[index].date !== list[index-1].date)},{'dm-padding-t-30' : index===0}]"
                        :title="item.userName"
                        @click.native="routerLink('TeamMemberCustomDetail',{ customerId: item.customerId }, {userName: customInfo.name, customName: item.userName, avatar: customInfo.avatar})"
                    >
                        <div class="head" slot="head"
                             v-if="(index === 0) ||(index>0 && list[index].date !== list[index-1].date)">
                            <em v-if="formatDateAgo(item.date)[0]">{{formatDateAgo(item.date)[0]}}</em>
                            <span v-if="formatDateAgo(item.date)[1]">{{formatDateAgo(item.date)[1]}}月</span><br/>
                            <span v-if="formatDateAgo(item.date)[2]">{{formatDateAgo(item.date)[2]}}年</span>
                        </div>
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
        </div>
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
    import {Cell, Group, Confirm, XTextarea, Countup, TransferDomDirective as TransferDom} from 'vux'
    import DmPanel from '@/components/Dcomponents/DmPanel.vue'
    import DmComment from '@/components/Dcomponents/DmComment.vue'
    import ScrollerMixin from '@/mixins/ScrollerMixin.vue'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import CommentMixin from '@/mixins/CommentMixin.vue'
    import DmUserCard from '@/components/Dcomponents/DmUserCard.vue'

    export default {
        directives: {
            TransferDom
        },
        mixins: [ScrollerMixin, UtilMixin, CommentMixin],
        props: ['userid', 'name'],
        components: {
            Cell,
            Group,
            DmPanel,
            DmComment,
            DmUserCard,
            Confirm,
            Countup,
            XTextarea
        },
        data() {
            return {
                customInfo: {
                    avatar: '../default_userImg.png',
                    name: '客户',
                    fieldVisit: 0,
                    republishVisit: 0
                }
            }
        },
        async created() {
            this.ajaxLoadheadUrlandVisitCount()
        },
        methods: {
            async refresh(done){
                this.ajaxLoadheadUrlandVisitCount()
                this.pageNo = 0
                let result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
                done()
            },
            // 提交给我的
            ajaxPageDateByList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'pageOneUserVisitingRecordsByUserId',
                        data: {
                            pageNo: this.pageNo,
                            pageSize: this.pageSize,
                            userid: this.$route.params.userid
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
            // 当前部门成员拜访记录头像及拜访次数接口 实地拜访多少 后补多少
            ajaxLoadheadUrlandVisitCount() {
                this.$axios.post({
                    url: 'loadheadUrlandVisitCountByUserId',
                    data: {
                        userId: this.$route.params.userid
                    },
                    tips: false
                }).then(res => {
//                    console.log(res)
                    this.customInfo.name = res.name
                    this.customInfo.avatar = res.avatar
                    this.customInfo.fieldVisit = res.fieldVisit
                    this.customInfo.republishVisit = res.republishVisit
                }).catch((code, msg) => {
                    this.$vux.toast.show({
                        type: 'cancel',
                        text: '获取' + this.$route.params.name + '信息失败'
                    })
                })
            }
        }
    }
</script>
