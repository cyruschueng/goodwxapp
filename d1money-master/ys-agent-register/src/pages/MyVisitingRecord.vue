<template>
    <div class="myLog">
        <tab class="myLog__tab" :line-width=2 active-color="#68baf9" v-model="tab.currentIndex">
            <tab-item
                class="vux-center"
                :selected="$route.meta.currentIndex === index"
                v-for="(item, index) in tab.list"
                @click.native="changeTabItem(index)"
                :key="index"
            >
                {{item}}
            </tab-item>
        </tab>
        <swiper
            class="myLog__content"
            :class="{'active1' : tab.currentIndex === 0}"
            v-model="tab.currentIndex"
            height="100%"
            :show-dots="false"
            :min-moving-distance="2000"
        >
            <!--拜访时间-->
            <swiper-item class="myLog__content__swiper visitTime">
                <scroller
                    class="myLog__content__swiper__scroller"
                    :on-refresh="refresh"
                    :on-infinite="infinite"
                    ref="dmscroller"
                >
                    <template v-for="(item, index) in list">
                        <dm-panel
                            :class="['dm__panel', {'dm-border-t': (index === 0) ||(index>0 && list[index].date !== list[index-1].date)}]"
                            @click.native="routerLink('CustomDetail',{ customerId: item.customerId, name: item.userName })"
                        >
                            <h3 slot="title" class="dmPanel__bd__title">
                                {{item.userName}}
                                <span @click.stop="del(index)" class="delIcon"><i
                                    class="iconfont icon-shanchu"></i> </span>
                            </h3>
                            <div class="head" slot="head"
                                 v-if="(index === 0) ||(index>0 && list[index].date !== list[index-1].date)">
                                <em v-if="formatDateAgo(item.date)[0]">{{formatDateAgo(item.date)[0]}}</em>
                                <span v-if="formatDateAgo(item.date)[1]">{{formatDateAgo(item.date)[1]}}月</span><br/>
                                <span v-if="formatDateAgo(item.date)[2]">{{formatDateAgo(item.date)[2]}}年</span>
                                <p>{{item.dayCount}}次</p>
                                <p>实地面访</p>
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
                                    :dateTime="timeAgoHasHourAndMinute(item.createTime).slice(-5)"
                                    @thumbUp="thumbUpMethod"
                                    @comment="commentMethod"
                                    @reply="replyMethod"
                                ></dm-comment>
                            </div>
                        </dm-panel>
                    </template>

                </scroller>
                <router-link :to="{ name: 'AddRepublishVisitingRecord' }" tag="div" class="addBtn">
                    <i class="iconfont icon-jia"></i>
                </router-link>
                <router-link class="exportData" :to="{ name: 'ExportData' }" tag="div">
                    <i class="iconfont icon-download-2"></i>
                </router-link>
            </swiper-item>
            <!--客户列表-->
            <swiper-item class="myLog__content__swiper customList">
                <template v-for="(item, index) in customerList">
                    <group :title="item.familyname" class="customList__group" :id="'anchor-'+item.familyname">
                        <template v-for="(item, index) in item.list">
                            <cell
                                :title="item.userName"
                                class="customList__cell"
                                @click.native="routerLink('CustomDetail',{ customerId: item.customerId, name: item.userName })"
                                :inline-desc="'已拜访'+item.visitNum+'次'"
                            >
                                <div class="userImg" slot="icon">
                                    {{item.userName.split('')[0]}}
                                </div>
                                {{time(item.time, 1, 1)}}
                            </cell>
                        </template>
                    </group>
                </template>
            </swiper-item>
        </swiper>
        <div
            class="customList__alink"
            v-show="tab.currentIndex == 1"
        >
            <a
                href="javascript:void(0)"
                v-for="(item, index) in alink"
                @click="goAnchor('#anchor-'+item)"
            >
                {{item}}
            </a>
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
    import {
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Cell,
        CellBox,
        Flexbox,
        FlexboxItem,
        Group,
        Confirm,
        XTextarea,
        TransferDomDirective as TransferDom
    } from 'vux'
    import DmPanel from '@/components/Dcomponents/DmPanel.vue'
    import DmComment from '@/components/Dcomponents/DmComment.vue'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import CommentMixin from '@/mixins/CommentMixin.vue'
    import ScrollerMixin from '@/mixins/ScrollerMixin.vue'

    export default {
        name: 'myLog',
        mixins: [UtilMixin, CommentMixin, ScrollerMixin],
        directives: {
            TransferDom
        },
        data() {
            return {
                // 不进行初始化
                isInit: false,
                isDeactivated: false,
                alink: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                tab: {
                    currentIndex: 0,
                    list: [
                        '拜访时间',
                        '客户列表'
                    ]
                },
                list: [],
                pageCount: 1,
                pageNo: 0,
                pageSize: 10,
                customerList: []
            }
        },
        components: {
            Tab,
            TabItem,
            Swiper,
            SwiperItem,
            Group,
            Cell,
            CellBox,
            Flexbox,
            FlexboxItem,
            DmPanel,
            Confirm,
            XTextarea,
            DmComment
        },
        computed: {},
        methods: {
            // 路由跳转
            routerLink(url, params, query = {}) {
                this.$route.meta.leaveCurrentIndex = this.tab.currentIndex
                this.$router.push({name: url, params, query})
            },
            // 锚点跳转
            goAnchor(selector) {
                let alinks = this.$el.querySelectorAll('.customList__alink a')
                console.log(alinks)
                console.log('alinks[10].offsetTop = ' + alinks[10].offsetTop)
                console.log('alinks[10].offsetHeight =  ' + alinks[10].offsetHeight)
//                let customListScrollTop = this.$el.querySelector('.customList').scrollTop
                if (selector === '#anchor-#') {
                    this.$el.querySelector('.customList').scrollTop = 0
                } else {
                    let anchor = this.$el.querySelector(selector)
                    anchor ? this.$el.querySelector('.customList').scrollTop = anchor.offsetTop : ''
                }
            },
            async refresh(done) {
                this.pageNo = 0
                let visitingRecords = await this.ajaxPageVisitingRecordsByCurrentUser()
                this.list = visitingRecords.list
                this.pageCount = visitingRecords.pageCount
                done()
            },
            async infinite(done) {
                if (this.pageNo >= this.pageCount - 1) {
                    this.$refs.dmscroller.finishInfinite(2)
                    return
                }
                this.pageNo++
                let newList = await this.ajaxPageVisitingRecordsByCurrentUser()
                let oldList = this.list
                this.list = oldList.concat(newList.list)
                this.pageCount = newList.pageCount
                done()
            },
            // 数据整理
            dataReduction(list, key) {
                let $list = []
                for (let i = 0; i < list.length; i++) {
                    let index = this.isHasInArr($list, key, list[i][key])
                    if (index !== -1) {
                        $list[index].list = $list[index].list.concat(list[i])
                    } else {
                        let object = {}
                        object[key] = list[i][key]
                        object.list = []
                        object.list.push(list[i])
                        $list.push(object)
                    }
                }
                return $list
            },
            // 数组中的{ key: value} 是否存在
            isHasInArr(arr, key, val) {
                if (arr.length === 0) {
                    return -1
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i][key] === val) {
                        return i
                    }
                }
                return -1
            },
            // 分页加载拜访记录 ajax
            ajaxPageVisitingRecordsByCurrentUser() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'pageVisitingRecordsByCurrentUser',
                        data: {
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        },
                        tips: true
                    }).then(result => {
                        resolve(result)
                    })
                })
            },
//            客户列表 ajax
            ajaxLoadAllCustomersByCurrentUser() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'loadAllCustomersByCurrentUser'
                    }).then(result => {
                        resolve(result)
                    })
                })
            },
            // 删除拜访记录
            del(index) {
                const _this = this
                this.$vux.confirm.show({
                    title: '提示',
                    content: '你确定删除此拜访记录吗?',
                    onCancel() {
                        console.log('取消删除')
                    },
                    onConfirm() {
                        _this.$axios.post({
                            url: 'deleteVisitingRecordByVisitId',
                            data: {
                                visitId: _this.list[index].id
                            }
                        }).then(res => {
                            console.log(res)
                            _this.list.splice(index, 1)
                            _this.$vux.toast.show({
                                type: 'success',
                                text: '删除成功'
                            })
                        })
                    }
                })
            },
            changeTabItem(index) {
                this.tab.currentIndex = index
            }
        },
        async created() {
            let visitingRecords = await this.ajaxPageVisitingRecordsByCurrentUser()
            this.list = visitingRecords.list
            this.pageCount = visitingRecords.pageCount
            // 获取客户列表
            let customers = await this.ajaxLoadAllCustomersByCurrentUser()
            this.customerList = this.dataReduction(customers, 'familyname')
        },
//        activated() {
//            if (this.$route.meta.keepAlive && localStorage.getItem('d1money!currentScroller')) {
//                let {left = 0, top = 0} = JSON.parse(localStorage.getItem('d1money!currentScroller'))
//                setTimeout(() => {
//                    if (this.$route.meta.currentIndex === 1) {
//                        this.$el.querySelector('.customList').scrollTop = top
//                    } else if (this.$route.meta.currentIndex === 0) {
//                        this.$refs.dmscroller && this.$refs.dmscroller.scrollTo(left, top, false)
//                    }
//                }, 30)
//            }
//        },
//        deactivated() {
//            console.log(this.tab.currentIndex)
//            if (this.tab.currentIndex === 1) {
//                localStorage.setItem('d1money!currentScroller', JSON.stringify({
//                    left: 0,
//                    top: this.$el.querySelector('.customList').scrollTop
//                }))
//            } else if (this.tab.currentIndex === 0) {
//                localStorage.setItem('d1money!currentScroller', JSON.stringify(this.$refs.dmscroller.getPosition()))
//            }
//        },
        beforeRouteEnter(to, from, next) {
            if (to.name === 'MyVisitingRecord') {
                if (from.name === 'CustomDetail') {
                    to.meta.currentIndex = to.meta.leaveCurrentIndex
                } else {
                    to.meta.currentIndex = 0
                }
            }
            next()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @styleColor: #68baf9;
    @styleColorOther: #fbcf4b;
    .transition(@time) {
        -webkit-transition: @time;
        -moz-transition: @time;
        -ms-transition: @time;
        -o-transition: @time;
    }

    .xs-plugin-pulldown-down {
        .transition(.5s all)
    }

    .xs-plugin-pulldown-up {
        transform: rotate(180deg);
        .transition(.5s all)
    }

    .xs-plugin-pulldown-loading {
        animation: weuiLoading 1s steps(100, end) infinite;
    }

    .myLog {
        overflow: hidden;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
        .vux-no-group-title {
            margin-top: 0 !important;
        }
        /*页面锚链接*/
        .customList__alink {
            position: fixed;
            right: 0;
            top: 54px;
            bottom: 54px;
            z-index: 999;
            text-align: center;
            display: flex;
            flex-direction: column;
            transition: .5s all;
            a {
                flex: 1;
                padding: 0 5px;
                font-size: 12px;
                display: block;
                color: #000;
            }
        }
        height: 100%;
        .myLog__content {
            &.active1 {
                height: 100%;
            }
            height: calc(~ "100% - 44px");
            .myLog__content__swiper {
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                position: absolute;
                top: 0;
                .myLog__content__swiper__scroller {
                    height: calc(~ "100% - 44px");
                    overflow-y: auto !important;
                    .dm__panel {
                        .delIcon {
                            position: absolute;
                            right: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            font-size: 12px;
                            font-weight: normal;
                            i.iconfont {
                                font-size: 14px;
                            }
                        }
                    }
                }
                /*拜访时间*/
                &.visitTime {
                    .visitTime__group {
                        margin-top: 10px;
                        /*margin-bottom: 10px;*/
                        position: relative;
                        &:before {
                            content: " ";
                            position: absolute;
                            left: 0;
                            top: 0;
                            right: 0;
                            height: 1px;
                            border-bottom: 1px solid #D9D9D9;
                            color: #D9D9D9;
                            -webkit-transform-origin: 0 100%;
                            transform-origin: 0 100%;
                            -webkit-transform: scaleY(0.5);
                            transform: scaleY(0.5);
                        }
                        &:first-child {
                            &:before {
                                display: none;
                            }
                        }
                        .weui-cells__title {
                            background-color: #ffffff;
                            padding-top: 0.7em;
                            margin-top: 0;
                            margin-bottom: 0;
                            font-size: 16px;
                            font-weight: bold;
                            color: #000000;
                        }
                        .weui-cells {
                            &:before {
                                display: none;
                            }
                        }
                        .visitTime__title {
                            .nickName {
                                font-size: 16px;
                            }
                            .time {
                                text-align: right;
                                font-size: 12px;
                                color: #666666;
                                font-weight: 300;
                            }
                        }
                        .visitTime__content {
                            margin-top: 5px;
                            .desc {
                                color: #000;
                            }
                            .position {
                                margin-top: 5px;
                                color: #666666;
                                font-size: 12px;
                                font-weight: 300;
                                i.iconfont {
                                    font-size: 12px;
                                    color: #999999;
                                }
                            }
                        }
                    }
                    .addBtn {
                        position: fixed;
                        bottom: 70px;
                        right: 20px;
                        width: 50px;
                        height: 50px;
                        background-color: @styleColor;
                        -webkit-border-radius: 100%;
                        -moz-border-radius: 100%;
                        border-radius: 100%;
                        line-height: 50px;
                        text-align: center;
                        color: #ffffff;
                        box-shadow: 0 0px 15px 0px #ccc;
                        z-index: 999;
                        i.iconfont {
                            font-size: 35px;

                        }
                    }
                    .exportData {
                        position: fixed;
                        bottom: 130px;
                        right: 20px;
                        width: 50px;
                        height: 50px;
                        color: #ffffff;
                        background-color: @styleColorOther;
                        color: #68baf9;
                        background-color: #ffffff;
                        -webkit-border-radius: 100%;
                        -moz-border-radius: 100%;
                        border-radius: 100%;
                        line-height: 50px;
                        text-align: center;
                        box-shadow: 0 0px 15px 0px #ccc;
                        z-index: 999;
                        i.iconfont {
                            font-size: 35px;

                        }
                    }
                }
                /*客户列表*/
                &.customList {
                    /*客户列表*/
                    .customList__group {
                        .customList__cell {
                            padding-right: 25px;
                            .userImg {
                                width: 44px;
                                height: 44px;
                                line-height: 44px;
                                text-align: center;
                                margin-right: 10px;
                                border-radius: 100%;
                                overflow: hidden;
                                border: .5px solid #969696;
                                color: #fff;
                                background-color: #969696;
                                font-size: 20px;
                                font-weight: 300;
                                i.iconfont {
                                    font-size: 20px;
                                    color: #969696;
                                }
                            }
                            .weui-cell__ft {
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
