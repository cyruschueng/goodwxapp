<template>
    <div class="customDesc" style="margin-bottom: 10px;">
        <dm-user-card id="dmUserCard">
            <template slot="title">
                {{customInfo.name}}
            </template>
            <template slot="desc">
                <span>实地拜访: <countup :start-val="0" :end-val="customInfo.fieldVisit" :duration="3" tag="span"></countup></span>
                <span>补充拜访: <countup :start-val="0" :end-val="customInfo.republishVisit" :duration="3" tag="span"></countup></span>
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
                        <div slot="footer">
                            <dm-comment
                                :id="item.id"
                                :index="index"
                                :thumbList="item.thumbsUplist"
                                :commentList="item.commentlist"
                                :isThumbsUp="item.thumbUpCount"
                                :dateTime="timeAgoHasHourAndMinute(item.time)"
                                @thumbUp="thumbUpMethod"
                                @comment="commentMethod"
                                @reply="replyMethod"
                            ></dm-comment>
                        </div>
                    </dm-panel>
                </template>
            </scroller>
        </div>

        <div class="customDesc_btn">
            <!--查看添加备忘录-->
            <div class="btn mermorandumBtn" @click="seeMermorandum">
                <i class="iconfont icon-jilu1"></i>
            </div>
            <!--添加数据-->
            <router-link class="btn addBtn"
                         :to="{ name: 'AddRepublishVisitingRecord', query: {customerName: customInfo.name} }"
                         tag="div">
                <i class="iconfont icon-jia"> {{customInfo.name}}</i>
            </router-link>
        </div>
        <div v-transfer-dom>
            <confirm v-model="mermorandum.show" class="customDetail__dialog" hide-on-blur
                     title="备忘录"
                     cancel-text="关闭"
                     confirm-text="保存"
                     @on-cancel="mermorandum.show = !mermorandum.show"
                     @on-confirm="ajaxDoCommitMermorandum"
                     @on-show="onShow"
                     @on-hide="onHide">
                <group class="customDetail__dialog__hd" :gutter="0">
                    <x-textarea
                        v-model="mermorandum.desc"
                        :show-counter="true"
                        :max="1000"
                        :height="150"
                        placeholder="请填写备忘记录"
                    ></x-textarea>
                </group>
            </confirm>
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
        Countup,
        Confirm
    } from 'vux'
    import DmPanel from '@/components/Dcomponents/DmPanel.vue'
    import DmComment from '@/components/Dcomponents/DmComment.vue'
    import DmUserCard from '@/components/Dcomponents/DmUserCard.vue'
    import ScrollerMixin from '@/mixins/ScrollerMixin.vue'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import CommentMixin from '@/mixins/CommentMixin.vue'

    export default {
        mixins: [ScrollerMixin, UtilMixin, CommentMixin],
        data() {
            return {
                customInfo: {
                    avatar: './../assets/default_userImg.png',
                    name: '客户',
                    fieldVisit: 0,
                    republishVisit: 0
                },
                mermorandum: {
                    show: false,
                    desc: ''
                }
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
            Countup,
            DmUserCard
        },
        computed: {},
        methods: {
            async refresh(done){
                this.ajaxLoadheadUrlandVisitCount()
                this.pageNo = 0
                let result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
                done()
            },
            // 分页加载团队拜访记录
            ajaxPageDateByList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'pageVisitingRecordsByCustomerId',
                        data: {
                            pageNo: this.pageNo,
                            pageSize: this.pageSize,
                            customerId: this.$route.params.customerId
                        }
                    })
                        .then(result => {
                            resolve(result)
                        })
                        .catch(error => {
                            this.$vux.toast.show({
                                type: 'cancel',
                                text: '加载团队拜访记录失败'
                            })
                            reject(error)
                        })
                })
            },
            // 获取备忘录
            ajaxLoadMermorandumByCustomerId() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'loadMermorandumByCustomerId',
                        data: {
                            customerId: this.$route.params.customerId
                        }
                    })
                        .then(result => {
                            this.$vux.loading.hide()
                            if (result === null) {
                                resolve(result)
                            } else {
                                resolve(result.content)
                            }
                        })
                        .catch(error => {
                            this.$vux.loading.hide()
                            console.error(`ajax异常 ${JSON.stringify(error)}`)
                            this.$vux.toast.show({
                                type: 'cancel',
                                text: '获取备忘录失败'
                            })
                            reject(error)
                        })
                })
            },
            // 提交备忘录
            ajaxDoCommitMermorandum() {
                if (this.trim(this.mermorandum.desc) === '') {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '请填备忘录'
                    })
                    return
                }
                this.$vux.loading.show({
                    text: '更新备忘录中...'
                })
                this.$axios.post({
                    url: 'doCommitMermorandum',
                    data: {
                        customerId: this.$route.params.customerId,
                        content: this.mermorandum.desc
                    }
                })
                    .then(result => {
                        this.$vux.loading.hide()
                        this.$vux.toast.show({
                            type: 'success',
                            time: 1000,
                            text: '提交成功'
                        })
                        this.mermorandum.show = false
                    })
                    .catch(error => {
                        this.$vux.loading.hide()
                        console.error(`ajax异常 ${JSON.stringify(error)}`)
                        this.$vux.toast.show({
                            type: 'cancel',
                            text: '提交失败'
                        })
                    })
            },
            // 查看备忘录
            async seeMermorandum() {
                this.$vux.loading.show({
                    text: '加载备忘录中...'
                })
                this.mermorandum.desc = await this.ajaxLoadMermorandumByCustomerId()
                this.mermorandum.show = true
            },
            // 当前用户拜访记录头像及拜访次数接口 实地拜访多少 后补多少
            ajaxLoadheadUrlandVisitCount() {
                this.$axios.post({
                    url: 'loadVisitCountByCustomerId',
                    data: {
                        customerId: this.$route.params.customerId
                    },
                    tips: false
                }).then(res => {
//                    console.log(res)
                    this.customInfo.fieldVisit = res.fieldVisit
                    this.customInfo.republishVisit = res.republishVisit
                }).catch((code, msg) => {
                    this.$vux.toast.show({
                        type: 'cancel',
                        text: '获取个人信息失败'
                    })
                })
            }
        },
        async created() {
            this.customInfo.name = this.$route.params.name
            this.ajaxLoadheadUrlandVisitCount()
        },
        async mounted() {

        },
        destroyed() {
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import '~vux/src/styles/close';

    .customDesc {
        @styleColor: #68baf9;
        @styleColorOther: #fbcf4b;
        height: 100%;
        input:disabled, textarea:disabled {
            color: #000000 !important;
        }
        .customDesc__visit {
            height: calc(~ "100% - 90px");
        }
        .customDesc_btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            .btn {
                width: 50px;
                height: 50px;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border-radius: 100%;
                line-height: 50px;
                text-align: center;
                color: #ffffff;
                z-index: 999;
                i.iconfont {
                    font-size: 35px;

                }
                &:last-child {
                    margin-top: 20px;
                }
            }
            .addBtn {
                background-color: @styleColor;
                box-shadow: 0 0px 15px 0px #ccc;

            }
            .mermorandumBtn {
                background-color: @styleColorOther;
                box-shadow: 0 0px 15px 0px #ccc;
            }
        }
    }

    .customDetail__dialog {
        .weui-dialog__hd {
            padding-bottom: 0;
        }
        .weui-dialog__bd {
            padding: 0;
        }
        .customDetail__dialog__hd .weui-cells {
            &:after, &:before {
                display: none;
            }
        }
    }
</style>
