<template>
    <div class="teamVisitingRecord">
        <card class="teamVisitingRecord__hd">
            <div slot="content" class="card card-demo-flex card-demo-content01">
                <div>
                    <countup :start-val="0" :end-val="yestdaythisTimeCount" :duration="3" tag="span"></countup>
                    <br/>
                    昨日此时
                </div>
                <div class="vux-1px-l vux-1px-r">
                    <countup :start-val="0" :end-val="todayCount" :duration="3" tag="span"></countup>
                    <br/>
                    今日拜访
                </div>
                <div>
                    <countup :start-val="0" :end-val="yestdayCount" :duration="3" tag="span"></countup>
                    <br/>
                    昨日拜访
                </div>
            </div>
        </card>
        <scroller
            class="teamVisitingRecord__bd"
            :on-refresh="refresh"
            ref="myscroller"
            style="position:relative;height: 100%;"
        >
            <tree :list.sync="list" :expand='expandClick' :is-open='false'></tree>
        </scroller>
    </div>
</template>

<script>
    import {Flexbox, FlexboxItem, Group, Cell, Card, Countup, dateFormat} from 'vux'
    import Tree from './../components/tree/Tree.vue'

    export default {
        data() {
            return {
                todayCount: 0,
                yestdayCount: 0,
                yestdaythisTimeCount: 0,
                receivedVisitingRecords: {
                    list: [],
                    pageNo: 0,
                    pageSize: 10,
                    pageCount: 1
                },
                dept: [
                    {
                        id: 1,
                        name: '第一财富网'
                    },
                    {
                        id: 2,
                        name: '第二财富网'
                    }
                ],
                list: []
            }
        },
        components: {
            Flexbox,
            FlexboxItem,
            Group,
            Cell,
            Card,
            Countup,
            Tree
        },
        computed: {},
        methods: {
            async refresh(done) {
                this.$refs.myscroller && this.$refs.myscroller.scrollTo(0, 0, false)
                this.ajaxLoadTodayAndYestdayVisitingRecordCount()
                let receivedVisitingRecords = await this.ajaxPagepartyVisitingRecordsByCurrentUser()
                this.list = this.dataReduce(receivedVisitingRecords.ReceivedVisitingRecordslist, receivedVisitingRecords.partyList)
                done()
            },
            // 团队今日和昨日的拜访量
            ajaxLoadTodayAndYestdayVisitingRecordCount() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'loadTodayAndYestdayVisitingRecordCount',
                        tips: true
                    }).then(result => {
                        this.todayCount = result.todayCount
                        this.yestdayCount = result.yestdayCount
                        this.yestdaythisTimeCount = result.yestdaythisTimeCount
                        resolve(result)
                    })
                })
            },
            // 分页加载团队拜访记录
            ajaxPagepartyVisitingRecordsByCurrentUser() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'pagepartyVisitingRecordsByCurrentUser',
                        tips: true
                    }).then(result => {
                        resolve(result)
                    })
                })
            },
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
//                        console.log(nowDateArr[2])
//                        console.log(DateArr[2])
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
            // 展开部门  异步加载
            async expandClick(m) {
                // 点击异步加载
                if (m.isExpand) {
                    // 动态加载子节点, 模拟ajax请求数据
                    // 请注意 id 不能重复哦。
                    if (m.hasOwnProperty('childrens')) {
                        m.loadNode = 1 // 正在加载节点
                        try {
                            let receivedVisitingRecords = await this.ajaxLoadAllUnderPartyuserRecords(m.id)
//                            console.log(receivedVisitingRecords)
//                            console.log(this.dataReduce(receivedVisitingRecords.partyUsersRecord, receivedVisitingRecords.partyList))
                            m.loadNode = 2 // 节点加载完毕
                            m.isFolder = !m.isFolder
                            m.childrens = this.dataReduce(receivedVisitingRecords.partyUsersRecord, receivedVisitingRecords.partyList)
                        } catch (err) {
//                            console.log(err)
                            console.error('错误错误!!!' + JSON.stringify(err))
                        }
                    }
                }
            },
            // 根据部门编号查询部门所有人拜访记录接口
            ajaxLoadAllUnderPartyuserRecords(partyid) {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'loadAllUnderPartyuserRecords',
                        data: {
                            partyid
                        },
                        tips: true
                    }).then(result => {
                        resolve(result)
                    })
                })
            },
            // 数据整理
            dataReduce(users, depts) {
                let _depts = depts.map((item) => {
                    item.childrens = []
                    return item
                })
                let data = users.concat(_depts).map((item) => {
                    Object.assign(item, {
                        clickNode: false,
                        isFolder: false,
                        isExpand: false,
                        loadNode: 0
                    })
                    return item
                })
                return data
            }
        },
        async created() {
            this.ajaxLoadTodayAndYestdayVisitingRecordCount()
            let receivedVisitingRecords = await this.ajaxPagepartyVisitingRecordsByCurrentUser()
            this.list = this.dataReduce(receivedVisitingRecords.ReceivedVisitingRecordslist, receivedVisitingRecords.partyList)
        },
        mounted() {
            // 禁止上拉加载
            this.$refs.myscroller.finishInfinite()
        },
        activated() {
//            console.log('activated')
//            console.log(this.$refs.myscroller.getPosition())
            if (localStorage.getItem('d1money!currentScroller')) {
                let {left = 0, top = 0} = JSON.parse(localStorage.getItem('d1money!currentScroller'))
//                console.log(left, top)
                setTimeout(() => {
                    this.$refs.myscroller && this.$refs.myscroller.scrollTo(left, top, false)
                }, 30)
            }
        },
        deactivated() {
            localStorage.setItem('d1money!currentScroller', JSON.stringify(this.$refs.myscroller.getPosition()))
        },
        beforeRouteEnter(to, from, next) {
            if (to.name === 'teamVisitingRecord') {
                if (from.name === 'Home') {
                    next(vm => {
                        setTimeout(() => {
                            vm.$refs.myscroller && vm.$refs.myscroller.scrollTo(0, 0, false)
                            vm.ajaxLoadTodayAndYestdayVisitingRecordCount()
                            vm.ajaxPagepartyVisitingRecordsByCurrentUser()
                                .then(receivedVisitingRecords => {
                                    vm.list = vm.dataReduce(receivedVisitingRecords.ReceivedVisitingRecordslist, receivedVisitingRecords.partyList)
                                })
                        }, 30)
                    })
                }
            }
            next()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import '~vux/src/styles/1px.less';

    .teamVisitingRecord {
        height: 100%;
        overflow: hidden;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
        .vux-no-group-title {
            margin-top: 0 !important;
        }
        .teamVisitingRecord__hd {
            .card {
                display: flex;
                padding: 10px 0;
                div {
                    flex: 1;
                    text-align: center;
                    font-size: 12px;
                }
                span {
                    font-size: 20px;
                    font-weight: 400;
                    color: #68baf9;
                    line-height: 1em;
                }
            }
            /*padding: 10px 0;*/
            /*background-color: #ffffff;*/
            /*text-align: center;*/
            /*color: #68baf9;*/
            /*border-bottom: 1px solid #d9d9d9;*/
            /*.item {*/
            /*&:first-child {*/
            /*border-right: 1px solid #C0BFC4;*/
            /*}*/
            /*}*/
        }
        .teamVisitingRecord__bd {
            /*客户列表*/
            .customList__group {
                margin-top: 10px;
                .customList__cell {
                    padding-right: 25px;
                    .userImg {
                        width: 44px;
                        height: 44px;
                        line-height: 44px;
                        text-align: center;
                        margin-right: 10px;
                        border-radius: 5px;
                        overflow: hidden;
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

</style>
