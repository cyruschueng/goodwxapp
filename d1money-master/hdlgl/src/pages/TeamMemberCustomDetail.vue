<style lang="less" rel="stylesheet/less">
    .teamMemberCustomDeatil {
        @styleColor: #68baf9;
        @styleColorOther: #fbcf4b;
        height: 100%;
        .teamMemberCustomDeatil__hd{
            .customName{
                position: absolute;
                left: -30px;
                top: -18px;
                height: 45px;
                line-height: 45px;
                right: 0;
                font-size: 14px;
                z-index: 2;
                .imgbox{
                    background-color: #aeaeae;
                    width: 45px;
                    height: 45px;
                    padding: 10px;
                    box-sizing: border-box;
                    border-radius: 100%;
                    overflow: hidden;
                    margin-right: 10px;
                    display: inline-block;
                    img{
                        height:100%;
                    }
                }
                .word{
                    height: 45px;
                    line-height: 45px;
                    display: inline-block;
                    position: absolute;
                }
            }
        }
        .customDesc__visit {
            position: relative;
            height: calc(~"100% - 90px");
        }
    }
</style>
<template>
    <div class="teamMemberCustomDeatil">
        <dm-user-card class="teamMemberCustomDeatil__hd" id="dmUserCard" :img="customInfo.avatar">
            <div class="customName" slot="title">
                <div class="imgbox">
                    <img src="./../assets/default_userImg.png">
                </div>
                <div class="word">
                    {{customInfo.customName}}
                </div>
            </div>
            <template slot="desc">
                <div style="font-size: 14px;">
                    {{customInfo.userName}}
                </div>
            </template>
        </dm-user-card>
        <div class="customDesc__visit">
            <scroller
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="dmscroller"
                style="position:relative;"
            >
                <template v-for="(item, index) in list">
                    <dm-panel
                        :class="['dm__panel','dm-border-t',{'dm-padding-t-30' : index===0}]"
                    >
                        <div class="head" slot="head">
                            <em>第{{list.length - index}}次</em>
                            <p>拜访</p>
                        </div>
                        <template v-if="item.type=== 1">【补充拜访记录】</template>
                        {{item.desc}}
                        <template v-if="item.type=== 0" slot="position">
                            {{item.position}}
                        </template>
                        <div slot="footer" @click.stop="">
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
                    <x-textarea v-model="commentModal.text" placeholder="请输入你想评论的内容" :height="80" :show-counter="true" :max="100"></x-textarea>
                </group>
            </confirm>
        </div>
    </div>
</template>

<script>
    import {
        XInput,
        Group,
        XButton,
        Cell,
        Flexbox,
        FlexboxItem,
        XImg,
        XTextarea,
        XDialog,
        Confirm
    } from 'vux'
    import DmPanel from '@/components/Dcomponents/DmPanel.vue'
    import DmComment from '@/components/Dcomponents/DmComment.vue'
    import DmUserCard from '@/components/Dcomponents/DmUserCard.vue'
    import ScrollerMixin from '@/mixins/ScrollerMixin.vue'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import CommentMixin from '@/mixins/CommentMixin.vue'

    export default {
        props: ['customerId', 'userid'],
        mixins: [ScrollerMixin, UtilMixin, CommentMixin],
        data() {
            return {
                customInfo: {
                    avatar: './../assets/default_userImg.png',
                    userName: '用户',
                    customName: '客户',
                    fieldVisit: 0,
                    republishVisit: 0
                },
                scrollHeight: '100%'
            }
        },
        components: {
            XInput,
            Group,
            XButton,
            Cell,
            Flexbox,
            FlexboxItem,
            XImg,
            XTextarea,
            XDialog,
            Confirm,
            DmPanel,
            DmComment,
            DmUserCard
        },
        computed: {},
        methods: {
            // 分页加载团队拜访记录
            ajaxPageDateByList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'pageVisitingRecordsByLeaderSelectedCustomerId',
                        data: {
                            pageNo: this.pageNo,
                            pageSize: this.pageSize,
                            customerId: this.$route.params.customerId,
                            userid: this.userid
                        }
                    })
                        .then(result => {
                            resolve(result)
                        })
                        .catch(error => {
                            console.error(`ajax异常 ${JSON.stringify(error)}`)
                            this.$vux.toast.show({
                                type: 'cancel',
                                text: '加载团队拜访记录失败'
                            })
                            reject(error)
                        })
                })
            }
        },
        async created() {
            this.customInfo.userName = this.$route.query.userName
            this.customInfo.customName = this.$route.query.customName
            this.customInfo.avatar = this.$route.query.avatar
        },
        async mounted() {

        },
        destroyed() {
        }
    }
</script>
