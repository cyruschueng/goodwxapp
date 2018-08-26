<template>
    <div class="myLog">
        <tab class="myLog__tab" :line-width=2 active-color='#68baf9' v-model="tab.currentIndex">
            <tab-item
                class="vux-center"
                :selected="$route.meta.currentIndex === index"
                v-for="(item, index) in tab.list"
                @click.native="tab.currentIndex = index"
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
                    ref="myscroller"
                >
                    <template v-for="(group, group_index) in visitTimeList.list">
                        <group class="visitTime__group" :title="time(group.date) +' ('+group.list[0].dayCount+'次实地拜访)'">
                            <template v-for="(item, index) in group.list">
                                <cell
                                    @click.native="goto('TeamMemberCustomDetail',{ customerId: item.customerId })"
                                >
                                    <div class="visitTime__title" slot="after-title">
                                        <flexbox justify="space-between" :gutter="0">
                                            <flexbox-item class="nickName">
                                                {{item.userName}}
                                            </flexbox-item>
                                            <flexbox-item class="time">
                                                {{item.time.substring(10, 16)}}
                                            </flexbox-item>
                                        </flexbox>
                                    </div>
                                    <div class="visitTime__content" slot="inline-desc">
                                        <p class="desc">
                                            <template v-if="item.type === 1">【补充拜访记录】</template>
                                            {{item.desc}}
                                        </p>
                                        <template v-if="item.type === 0">
                                            <p class="position">
                                                <i class="iconfont icon-ai-seat"></i>{{item.position}}
                                            </p>
                                        </template>
                                    </div>
                                </cell>
                            </template>
                        </group>
                    </template>
                </scroller>
            </swiper-item>
            <!--客户列表-->
            <swiper-item class="myLog__content__swiper customList">
                <template v-for="(item, index) in customerList">
                    <group :title="item.familyname" class="customList__group" :id="'anchor-'+item.familyname">
                        <template v-for="(item, index) in item.list">
                            <cell
                                :title="item.userName"
                                class="customList__cell"
                                @click.native="goto('TeamMemberCustomDetail',{customerId: item.customerId})"
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
        querystring,
        dateFormat,
        TransferDomDirective as TransferDom
    } from 'vux'

    export default {
        name: 'myLog',
        directives: {
            TransferDom
        },
        props: ['userid', 'name'],
        data() {
            return {
                alink: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                currentIndex: 0,
                tab: {
                    currentIndex: 0,
                    list: [
                        '拜访时间',
                        '客户列表'
                    ]
                },
                visitTimeList: {
                    list: [],
                    pageCount: 1,
                    pageNo: 0,
                    pageSize: 10,
                    isLoading: false
                },
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
            FlexboxItem
        },
        computed: {},
        methods: {
            // 获取时间（今天，昨天，日期）
            time(val, dealYear = 0, hasTime = 0) {
                let time = val
                let nowDate = dateFormat(new Date(), 'YYYY-MM-DD')
                let nowDateArr = nowDate.split('-')
                let DateArr = val.split('-')
                if (parseInt(nowDateArr[0]) === parseInt(DateArr[0])) {
                    // 如果年份相同
                    if (parseInt(nowDateArr[1]) === parseInt(DateArr[1])) {
                        // 如果月份相同
                        console.log(nowDateArr[2])
                        console.log(DateArr[2])
                        if (parseInt(nowDateArr[2]) === parseInt(DateArr[2])) {
                            // 如果日期相同
                            time = '今天'
                            if (hasTime) {
                                time += DateArr[2].split(' ')[1]
                                return time
                            }
                        } else if ((parseInt(nowDateArr[2]) - 1) === parseInt(DateArr[2])) {
                            // 如果日期相差1天
                            time = '昨天'
                            if (hasTime) {
                                time += DateArr[2].split(' ')[1]
                                return time
                            }
                        }
                    }
                    if (dealYear) {
                        return time.substring(5)
                    }
                }
                return time
            },
            // 锚点跳转
            goAnchor(selector) {
                if (selector === '#anchor-#') {
                    this.$el.querySelector('.customList').scrollTop = 0
                } else {
                    let anchor = this.$el.querySelector(selector)
                    anchor ? this.$el.querySelector('.customList').scrollTop = anchor.offsetTop : ''
                }
            },
            // 页面跳转
            goto(url, params) {
                this.$route.meta.leaveCurrentIndex = this.tab.currentIndex
                this.$router.push({name: url, params})
            },
            async refresh(done) {
                this.visitTimeList.pageNo = 0
                let visitingRecords = await this.ajaxPageOneUserVisitingRecordsByUserId()
                this.visitTimeList.list = this.dataReduction(visitingRecords.list, 'date')
                this.visitTimeList.pageCount = visitingRecords.pageCount
                done()
            },
            async infinite(done) {
                if (this.visitTimeList.pageNo >= this.visitTimeList.pageCount - 1) {
                    this.$refs.myscroller.finishInfinite(2)
                    return
                }
                this.visitTimeList.pageNo++
                let newListTemp = await this.ajaxPageOneUserVisitingRecordsByUserId()
                let newList = this.dataReduction(newListTemp.list, 'date')
                let oldList = this.visitTimeList.list
                // 如果下一页数据开头date 与上一页结尾date 相同，则将第二页开头数据push 到第二页结尾数组
                if (newList[0].date === oldList[oldList.length - 1].date) {
                    oldList[oldList.length - 1].list = oldList[oldList.length - 1].list.concat(newList[0].list)
                    newList.splice(0, 1)
                }
                this.visitTimeList.list = oldList.concat(newList)
                this.visitTimeList.pageCount = newListTemp.pageCount
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
            ajaxPageOneUserVisitingRecordsByUserId() {
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/gzrz/services/pageOneUserVisitingRecordsByUserId', querystring.stringify({
                        pageNo: this.visitTimeList.pageNo,
                        pageSize: this.visitTimeList.pageSize,
                        userid: this.userid
                    }))
                        .then(result => {
                            if (result.data.code === 'SUCCESS') {
                                resolve(result.data.body)
                            } else {
                                console.error(`错误Code: ${result.data.code}, 错误信息: ${result.data.msg}`)
                                reject(result.data)
                            }
                        })
                        .catch(error => {
                            console.log(`ajax异常 ${JSON.stringify(error)}`)
                            reject(error)
                        })
                })
            },
//            客户列表 ajax
            ajaxLoadAllCustomersByLeadSelectedUser() {
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/gzrz/services/loadAllCustomersByLeadSelectedUser', querystring.stringify({
                        userid: this.userid
                    }))
                        .then(result => {
                            if (result.data.code === 'SUCCESS') {
                                resolve(result.data.body)
                            } else {
                                console.error(`错误Code: ${result.data.code}, 错误信息: ${result.data.msg}`)
                                reject(result.data)
                            }
                        })
                        .catch(error => {
                            console.log(`ajax异常 ${JSON.stringify(error)}`)
                            reject(error)
                        })
                })
            }
        },
        async created(){
            let visitingRecords = await this.ajaxPageOneUserVisitingRecordsByUserId()
            this.visitTimeList.list = this.dataReduction(visitingRecords.list, 'date')
            this.visitTimeList.pageCount = visitingRecords.pageCount
            // 获取客户列表
            let customers = await this.ajaxLoadAllCustomersByLeadSelectedUser()
            this.customerList = this.dataReduction(customers, 'familyname')
        },
        mounted() {},

        beforeRouteEnter(to, from, next) {
            if (to.name === 'TeamMemberVisitingRecord') {
                if (from.name === 'TeamMemberCustomDetail') {
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
                                /* background-color: #969696; */
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
