<style lang="less" rel="stylesheet/less">
    .columns-4, .columns-3 {
        .scroller-item {
            font-size: 14px !important;
            text-align: center;
        }
    }

    .columns-5, .columns-6 {
        .scroller-item {
            font-size: 12px !important;
            text-align: center;
        }
    }

    .columns-7, .columns-8, .columns-9, .columns-10, .columns-11, .columns-12, .columns-13, .columns-14, .columns-15 {
        .scroller-item {
            font-size: 10px !important;
            text-align: center;
        }
    }

    @bgColor: #68baf9;
    @styleColor: #ed3323;
    .index {
        height: 100%;
        overflow: hidden;
        /*局部滚动*/
        .index__scroller {

        }
        /*筛选部门*/
        .party_filter {
            display: flex;
            align-items: center;
            margin-top: 10px;
            .party_filter_title {
                padding: 0px 10px 0px 10px;
                flex: 1;
                font-size: 16px;
            }
            .party_filter_option {
                padding-right: 10px;
                .party_filter_option_btn {
                    padding: 0 1.0em;
                    font-size: 13px;
                    &:after {
                        border-radius: 99px;
                    }
                    i {
                        font-size: 13px;
                    }

                }
            }
        }
        .choose_party {
            .weui-cell {
                &.vux-tap-active {
                    &.weui-cell_access {
                        display: none;
                    }
                }

            }
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
        .visitCount_title {
            padding: 20px 0px 0px 10px;
            font-size: 12px;
            color: #666;
        }
        .visitCount {
            background-color: transparent;
            margin: 0px 10px 20px 10px;
            &:before, &:after {
                display: none;
            }
            .card {
                display: flex;
                padding: 0px 0px 10px 0;
                div {
                    flex: 1;
                    text-align: center;
                    font-size: 12px;
                    &:nth-child(2) {
                        &:before {
                            top: 22%;
                            height: 70%;
                        }
                        &:after {
                            top: 22%;
                            height: 70%;
                        }
                    }
                }
                span {
                    font-size: 22px;
                    font-weight: 400;
                    color: @styleColor;
                }
            }
        }
        /*数值条*/
        .dataList {
            margin: 0 10px;
            position: relative;
            /*图标*/
            .dataList__hd {
                height: 40px;
                position: relative;
                top: 0;
                right: 0;
                background-color: #fbf9fe;
                z-index: 2;
                display: flex;
                justify-content: flex-end;
                span {
                    height: 40px;
                    font-size: 12px;
                    line-height: 40px;
                    margin-left: 25px;
                    position: relative;
                    &:first-child {
                        margin-left: 0;
                    }
                    &:before {
                        content: "";
                        width: 10px;
                        height: 12px;
                        position: absolute;
                        top: 14px;
                        left: -12px;
                        background-color: rgb(153, 153, 153);
                    }
                    &:nth-child(2) {
                        &:before {
                            background-color: rgba(153, 153, 153, .5);
                        }
                    }
                    &.now {
                        &:before {
                            content: "";
                            width: 10px;
                            height: 12px;
                            position: absolute;
                            top: 14px;
                            left: -12px;
                            background-color: rgb(237, 51, 35);
                        }
                        &:nth-child(2) {
                            &:before {
                                background-color: rgba(237, 51, 35, .5);
                            }
                        }
                    }
                }
            }
            &:before {
                content: " ";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 50%;
                width: .5px;
                border-left: .5px dashed #888;
                z-index: 1;
            }
            .data {
                width: 100%;
                margin-bottom: 10px;
                height: 33px;
                line-height: 33px;
                background-color: #ffffff;
                /*删除两个inline-block间距*/
                font-size: 0;
                -webkit-text-size-adjust: none;
                &:last-child {
                    margin-bottom: 0;
                }

                .datanest {
                    &.letterWidth {
                        position: relative;
                        overflow: visible;
                        .right {
                            position: absolute;
                            right: -30px;
                            color: rgba(153, 153, 153, .5);
                        }
                        &.now {
                            .right {
                                color: rgba(237, 51, 35, .5);
                            }
                        }
                    }
                    display: inline-block;
                    box-sizing: border-box;
                    width: 0;
                    height: 33px;
                    overflow: hidden;
                    line-height: 33px;
                    font-size: 12px;
                    background-color: rgb(153, 153, 153);
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
                    &:nth-child(2) {
                        /*第二个颜色为*/
                        background-color: rgba(153, 153, 153, .5);
                    }
                    &.now {
                        background-color: rgb(237, 51, 35);
                        &:nth-child(2) {
                            /*第二个颜色为*/
                            background-color: rgba(237, 51, 35, .5);
                        }
                    }
                    .left {
                        box-sizing: border-box;
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
<template>
    <div class="index">
        <popup-picker :isTransferDom="false" :show="choose_party_show" :data="choose_party_data"
                      :columns="choose_party_columns"
                      v-model="choose_party_value"
                      ref="picker3" popup-title="选择数据统计范围" :class="['choose_party', 'columns-' + choose_party_columns]"
                      @on-hide="onChoosePartyHide"></popup-picker>
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
            <!--部门
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
            -->
            <div class="party_filter">
                <div class="party_filter_title">
                    {{choose_party_title}}
                </div>
                <div class="party_filter_option">
                    <x-button mini type="cancel" class="party_filter_option_btn" style="border-radius:99px;"
                              @click.native="choose_party_show=!choose_party_show">
                        <i class="iconfont icon-filter"></i>筛选
                    </x-button>

                </div>
            </div>
            <!--拜访统计-->
            <div class="visitCount_title">实地/补充</div>
            <card class="visitCount">
                <div slot="content" class="card">
                    <div>
                        <countup :start-val="0" :end-val="visitCounts.lastdata" :duration="3"
                                 tag="span"></countup>
                        <span>/</span>
                        <countup :start-val="0" :end-val="visitCounts.relastdata" :duration="3"
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
                        <countup :start-val="0" :end-val="visitCounts.nowdata" :duration="3" tag="span"></countup>
                        <span>/</span>
                        <countup :start-val="0" :end-val="visitCounts.renowdata" :duration="3" tag="span"></countup>
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
                        <countup :start-val="0" :end-val="visitCounts.alldata" :duration="3" tag="span"></countup>
                        <span>/</span>
                        <countup :start-val="0" :end-val="visitCounts.realldata" :duration="3" tag="span"></countup>
                        <br/>
                        近一月
                    </div>
                </div>
            </card>
            <!--数值条-->
            <div class="dataList">
                <template v-for="(item, index) in dataList.list">
                    <template v-if="index===0">
                        <div class="dataList__hd">
                            <span class="now">实地拜访</span>
                            <span class="now">补充拜访</span>
                        </div>
                        <div class="data" style="margin-bottom: 0;">
                            <!--实地拜访记录-->
                            <div class="datanest" :class="[{'now' : index === 0}]"
                                 :style="{width: getWidthPoint(item.dayCount) +'%'}">
                                <span class="left">{{item.datetime}}</span>
                                <span class="right">{{item.dayCount}}</span>
                            </div>
                            <!--后补拜访记录-->
                            <div class="datanest" :class="[{'now' : index === 0},{'letterWidth' : getWidthPoint(item.redayCount) < 60}]"
                                 :style="{width: getWidthPoint(item.redayCount) - 50 +'%'}">
                                <span class="right">{{item.redayCount}}</span>
                            </div>
                        </div>
                    </template>
                    <template v-if="index === 1">
                        <div class="dataList__hd">
                            <span>实地拜访</span>
                            <span>补充拜访</span>
                        </div>
                    </template>
                    <template v-if="index !==0">
                        <div class="data">
                            <!--实地拜访记录-->
                            <div class="datanest"
                                 :style="{width: getWidthPoint(item.dayCount) +'%'}">
                                <span class="left">{{item.datetime}}</span>
                                <span class="right">{{item.dayCount}}</span>
                            </div>
                            <!--后补拜访记录-->
                            <div class="datanest"
                                 :class="[{'letterWidth' : getWidthPoint(item.redayCount) < 60}]"
                                 :style="{width: getWidthPoint(item.redayCount) - 50 +'%'}">
                                <span class="right">{{item.redayCount}}</span>
                            </div>
                        </div>
                    </template>
                </template>
            </div>
        </scroller>
    </div>
</template>

<script>
    import {
        dateFormat,
        Tab,
        TabItem,
        Scroller,
        Card,
        Countup,
        querystring,
        XButton,
        PopupPicker,
        Group
    } from 'vux'

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
                    lastdata: 0,
                    relastdata: 0,
                    nowdata: 0,
                    renowdata: 0,
                    alldata: 0,
                    realldata: 0
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
                ],
                choose_party_show: false,
                choose_party_columns: 1,
                choose_party_value: [],
                choose_party_data: [],
                choose_party_title: '',
                partys_map: null,
                choosed_party_id: 0
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
                    // console.log(err)
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
                    // console.log(err)
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
            Countup,
            XButton,
            PopupPicker,
            Group
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
                    // console.log(err)
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
                // console.log('infinite')
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
                    this.$http.post('/ys/gzrz/services/loadAllPartyNamesByCurrentUser')
                        .then(result => {
                            // console.log(result)
                            if (result.data.code === 'SUCCESS') {
//                                this.departments.list = result.data.body
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
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/gzrz/services/pagePartyDataBySelectedCondition', querystring.stringify({
                        pageNo: this.dataList.pageNo,
                        pageSize: this.dataList.pageSize,
                        partyid: this.dept_currentIndex,
                        dataType: this.timeList[this.time_currentIndex].dataType
                    }))
                        .then(result => {
                            this.$vux.loading.hide()
                            if (result.data.code === 'SUCCESS') {
                                this.dataList.pageCount = result.data.body.pageCount
                                this.visitCounts = result.data.body.titleMap
                                // console.log(this.visitCounts)
                                let list = result.data.body.list
                                if (list !== null && list.length !== 0) {
                                    let maxNumber = this.dataList.maxNumber
                                    for (let i = 0; i < list.length; i++) {
                                        if (list[i].dayCount + list[i].redayCount > maxNumber) {
                                            maxNumber = list[i].dayCount + list[i].redayCount
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
            },
            onChoosePartyHide (closeType) {
                if (closeType) {
                    // alert(this.choose_party_value)
                    this.choose_party_title = ''
                    for (let i = 0; i < this.choose_party_value.length; i++) {
                        if (this.choose_party_value[i] > 0) {
                            this.choose_party_title += (i === 0 ? '' : ' - ') + this.partys_map.get(this.choose_party_value[i])
                            this.choosed_party_id = parseInt(this.choose_party_value[i])
                        }
                    }

                    this.dept_currentIndex = this.choosed_party_id
                }
            }
        },
        async created () {
        },
        async mounted () {
            this.$vux.loading.show({
                text: '加载中...'
            })
            // 获取全部部门
            this.loadAllPartyNamesByCurrentUser().then((res) => {
                // 设置已选择的标题
                this.choose_party_title = res.root.name
                // 设置总列数
                this.choose_party_columns = res.level

                this.partys_map = new Map()

                for (let i = 0; i < res.list.length; i++) {
                    this.choose_party_data.push({
                        name: res.list[i].name + '',
                        value: res.list[i].partyid + '',
                        parent: res.list[i].parentId + ''
                    })
                    this.partys_map.set(res.list[i].partyid + '', res.list[i].name + '')
                }

                this.dept_currentIndex = res.root.partyid
//                console.log(`ajax异常 ${JSON.stringify(this.choose_party_data)}`)

//                setTimeout(() => {
//                    let spans = this.$refs.deptlist.querySelectorAll('span')
//                    let width = 0
//                    for (let i = 0; i < spans.length; i++) {
//                        width += spans[i].offsetWidth + 15
//                    }
//                    this.departments.width = width - 14 + 'px'
//                }, 100)
            })
        }
    }
</script>


