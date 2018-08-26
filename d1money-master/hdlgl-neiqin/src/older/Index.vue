<template>
    <div class="index">
        <!--tab-->
        <tab active-color='#ed3323'>
            <template v-for="(item, index) in timeList">
                <tab-item :selected="index === 0" @on-item-click="time_currentIndex = index">{{item.name}}</tab-item>
            </template>
        </tab>
        <scroller
            class="index__scroller"
            :on-refresh="refresh"
            :on-infinite="infinite"
            ref="myscroller"
            style="position:relative;height: 100%;"
        >
            <!--部门-->
            <vux-scroller class="deptList" lock-y :scrollbar-x=false>
                <div class="deptList__bd" ref="deptlist" :style="{width: departments.width}">
                    <span class="item" :class="{'active' : dept_currentIndex === 0}"
                          @click="dept_currentIndex = 0">全部</span>
                    <template v-for="(item, index) in departments.list">
                        <span class="item" :class="{'active' : dept_currentIndex === index+1}"
                              @click="dept_currentIndex = index+1">{{item.name}}</span>
                    </template>
                </div>
            </vux-scroller>

            <!--拜访统计-->
            <card class="visitCount">
                <div slot="content" class="card">
                    <div>
                        <countup :start-val="0" :end-val="visitCounts.yestdaythisTimeCount" :duration="3"
                                 tag="span"></countup>
                        <br/>
                        <template v-if="timeList[time_currentIndex].dataType === 1">
                            昨日此时
                        </template>
                        <template v-if="timeList[time_currentIndex].dataType === 7">
                            上周此时
                        </template>
                        <template v-if="timeList[time_currentIndex].dataType === 30">
                            上月此时
                        </template>
                    </div>
                    <div class="vux-1px-l vux-1px-r">
                        <countup :start-val="0" :end-val="visitCounts.todayCount" :duration="3" tag="span"></countup>
                        <br/>
                        <template v-if="timeList[time_currentIndex].dataType === 1">
                            今日
                        </template>
                        <template v-if="timeList[time_currentIndex].dataType === 7">
                            本周
                        </template>
                        <template v-if="timeList[time_currentIndex].dataType === 30">
                            本月
                        </template>
                    </div>
                    <div>
                        <countup :start-val="0" :end-val="visitCounts.alladyCount" :duration="3" tag="span"></countup>
                        <br/>
                        近一月
                    </div>
                </div>
            </card>
            <!--数值条-->
            <div class="dataList">
                <template v-for="(item, index) in dataList.list">
                    <div class="data">
                        <div class="datanest" :class="{'now' : index === 0}"
                             :style="{width: getWidthPoint(item.dayCount) +'%'}">
                            <span class="left">{{item.datetime}}</span>
                            <span class="right">{{item.dayCount}}</span>
                        </div>
                    </div>
                </template>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { dateFormat, Tab, TabItem, Scroller, Card, Countup, querystring } from 'vux'

    export default {
        data () {
            return {
                dept_currentIndex: 0,
                time_currentIndex: 0,
                departments: {
                    width: '100%',
                    list: []
                },
                visitCounts: {
                    yestdaythisTimeCount: 0,
                    todayCount: 0,
                    alladyCount: 0
                },
                dataList: {
                    maxNumber: 0,
                    list: [],
                    pageNo: 0,
                    pageSize: 10,
                    pageCount: 1
                },
                timeList: [
                    {
                        name: '按天',
                        dataType: 1
                    },
                    {
                        name: '按周',
                        dataType: 7
                    },
                    {
                        name: '按月',
                        dataType: 30
                    }
                ]
            }
        },
        watch: {
            async dept_currentIndex (val, oldVal) {
                this.$vux.loading.show({
                    text: '加载中...'
                })

                try {
                    this.dataList.maxNumber = 0
                    this.dataList.pageNo = 0
                    this.dataList.list = await this.ajaxPagePartyDataBySelectedCondition()
                } catch (err) {
                    console.log(err)
                    this.$vux.toast.show({
                        type: 'cancel',
                        text: '请求超时'
                    })
                    this.$vux.loading.hide()
                }
                this.$vux.loading.hide()
            },
            async time_currentIndex (val, oldVal) {
//                setTimeout(() => {
//                    this.$refs.myscroller.scrollTo(0, 0, true, null)
//                }, 30)
                this.$vux.loading.show({
                    text: '加载中...'
                })
                try {
                    this.dataList.maxNumber = 0
                    this.dataList.pageNo = 0
                    this.dataList.list = await this.ajaxPagePartyDataBySelectedCondition()
                } catch (err) {
                    console.log(err)
                    this.$vux.toast.show({
                        type: 'cancel',
                        text: '请求超时'
                    })
                    this.$vux.loading.hide()
                }
                this.$vux.loading.hide()
            }
        },
        components: {
            Tab,
            TabItem,
            VuxScroller: Scroller,
            Card,
            Countup
        },
        computed: {},
        methods: {
            dealwithDate (date, type = 'day') {

            },
            async refresh (done) {
                // 获取全部部门
                this.loadAllPartyNamesByCurrentUser().then((res) => {
                    let spans = this.$refs.deptlist.querySelectorAll('span')
                    let width = 0
                    for (let i = 0; i < spans.length; i++) {
                        width += spans[i].offsetWidth + 15
                    }
                    this.departments.width = width + 'px'
                })
                try {
                    this.dataList.pageNo = 0
                    this.dataList.list = await this.ajaxPagePartyDataBySelectedCondition()
                } catch (err) {
                    console.log(err)
                    this.$vux.toast.show({
                        type: 'cancel',
                        text: '刷新超时'
                    })
                    this.$vux.loading.hide()
                    done()
                }
                this.$vux.loading.hide()
                done()
            },
            async infinite (done) {
                console.log('infinite')
                if (this.dataList.pageNo >= this.dataList.pageCount - 1) {
                    this.$refs.myscroller.finishInfinite(2)
                    return
                }
                this.dataList.pageNo++
                let list = await this.ajaxPagePartyDataBySelectedCondition()
                this.dataList.list = this.dataList.list.concat(list)
                done()
            },
            getWidthPoint (val) {
                return 50 + Math.round(parseFloat(val) / parseFloat(this.dataList.maxNumber) * 50)
            },
//            获取当前用户所属公司的所有部门结构
            loadAllPartyNamesByCurrentUser () {
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/hdlgl/services/loadAllPartyNamesByCurrentUser')
                        .then(result => {
                            console.log(result)
                            if (result.data.code === 'SUCCESS') {
                                this.departments.list = result.data.body
                                resolve(result.data.body)
                            } else {
                                console.error(`错误Code: ${result.data.code}, 错误信息: ${result.data.msg}`)
                                reject(result.data)
                            }
                        })
                        .catch(error => {
                            console.log(`ajax异常 ${JSON.stringify(error)}`)
                            this.$vux.toast.show({
                                type: 'cancel',
                                text: '请求超时'
                            })
                            reject(error)
                        })
                })
            },
            // 分页
            ajaxPagePartyDataBySelectedCondition () {
                let partyid = -1
                if (this.dept_currentIndex !== 0) {
                    partyid = this.departments.list[this.dept_currentIndex - 1].partyid
                }
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/hdlgl/services/pagePartyDataBySelectedCondition', querystring.stringify({
                        pageNo: this.dataList.pageNo,
                        pageSize: this.dataList.pageSize,
                        partyid: partyid,
                        dataType: this.timeList[this.time_currentIndex].dataType
                    }))
                        .then(result => {
                            this.$vux.loading.hide()
                            if (result.data.code === 'SUCCESS') {
                                this.dataList.pageCount = result.data.body.pageCount
                                this.visitCounts.yestdaythisTimeCount = result.data.body.lastdata
                                this.visitCounts.todayCount = result.data.body.nowdata
                                this.visitCounts.alladyCount = result.data.body.alldata
                                let list = result.data.body.list
                                if (list !== null && list.length !== 0) {
                                    let maxNumber = this.dataList.maxNumber
                                    for (let i = 0; i < list.length; i++) {
                                        if (list[i].dayCount > maxNumber) {
                                            maxNumber = list[i].dayCount
                                        }
                                    }
                                    this.dataList.maxNumber = maxNumber
                                    this.getWidthPoint(this.dataList.maxNumber)
                                }
                                resolve(result.data.body.list)
                            } else {
                                console.error(`错误Code: ${result.data.code}, 错误信息: ${result.data.msg}`)
                                reject(result.data)
                            }
                        })
                        .catch(error => {
                            this.$vux.loading.hide()
                            console.log(`ajax异常 ${JSON.stringify(error)}`)
                            reject(error)
                        })
                })
            },
            // 获取时间（今天，昨天，日期）
            time (val, dealYear = 0, hasTime = 0) {
                let time = val
                let nowDate = dateFormat(new Date(), 'YYYY-MM-DD')
                let nowDateArr = nowDate.split('-')
                let DateArr = val.split('-')
                if (parseInt(nowDateArr[0]) === parseInt(DateArr[0])) {
                    // 如果年份相同
                    if (parseInt(nowDateArr[1]) === parseInt(DateArr[1])) {
                        // 如果月份相同
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
            }
        },
        async created () {},
        async mounted () {
            this.$vux.loading.show({
                text: '加载中...'
            })
            // 获取全部部门
            this.loadAllPartyNamesByCurrentUser().then((res) => {
                setTimeout(() => {
                    let spans = this.$refs.deptlist.querySelectorAll('span')
                    let width = 0
                    for (let i = 0; i < spans.length; i++) {
                        width += spans[i].offsetWidth + 15
                    }
                    this.departments.width = width - 14 + 'px'
                }, 100)
            })
            try {
                this.dataList.pageNo = 0
                this.dataList.list = await this.ajaxPagePartyDataBySelectedCondition()
            } catch (err) {
                console.log(err)
                this.$vux.toast.show({
                    type: 'cancel',
                    text: '刷新超时'
                })
                this.$vux.loading.hide()
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @bgColor: #68baf9;
    @styleColor: #ed3323;
    .index {
        height: 100%;
        overflow: hidden;
        /*局部滚动*/
        .index__scroller {

        }
        /*部门选择*/
        .deptList {
            margin: 10px;
            .deptList__bd {
                position: relative;
                width: 1490px;
                height: 30px;
                overflow: hidden;
                .item {
                    display: inline-block;
                    margin-left: 15px;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 15px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 30px;
                    color: #000000;
                    background-color: #cccccc;
                    font-size: 12px;
                    float: left;
                    &:active {
                        opacity: .8;
                    }
                    &.active {
                        color: #ffffff;
                        background-color: @styleColor;
                    }
                    &:first-child {
                        margin-left: 0;
                        text-align: center;
                    }

                }
            }

        }
        /*拜访统计*/
        .visitCount {
            background-color: transparent;
            margin: 20px;
            &:before, &:after {
                display: none;
            }
            .card {
                display: flex;
                padding: 10px 0;
                div {
                    flex: 1;
                    text-align: center;
                    font-size: 12px;
                }
                span {
                    font-size: 30px;
                    font-weight: 400;
                    color: @styleColor;
                    /*line-height: 1em;*/
                }
            }
        }
        /*数值条*/
        .dataList {
            margin: 0 10px;
            position: relative;
            &:before {
                content: " ";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 50%;
                width:.5px;
                border-left: .5px dashed #888;
                z-index: 1;
            }
            .data {
                width: 100%;
                margin-bottom: 10px;
                height: 33px;
                line-height: 33px;
                background-color: #ffffff;
                &:last-child {
                    margin-bottom: 0;
                }
                .datanest {
                    font-size: 14px;
                    width: 0;
                    height: 33px;
                    overflow: hidden;
                    line-height: 33px;
                    background-color: #a9a9a9;
                    color: #ffffff;
                    -webkit-transition: all .5s ease-in;
                    -moz-transition: all .5s ease-in;
                    -ms-transition: all .5s ease-in;
                    -o-transition: all .5s ease-in;
                    transition: all .5s ease-in;
                    webkit-transform: translateZ(0);
                    -moz-transform: translateZ(0);
                    -ms-transform: translateZ(0);
                    -o-transform: translateZ(0);
                    transform: translateZ(0);
                    -webkit-backface-visibility: hidden;
                    -webkit-perspective: 1000;
                    &.now {
                        background-color: @styleColor;
                    }
                    .left {
                        padding-left: 15px;
                        float: left;
                    }
                    .right {
                        float: right;
                        padding-right: 15px;
                    }
                }
            }
        }
    }
</style>
