<!--suppress ALL -->
<style scoped lang="less">
    .wordLog {
        width: 100%;
        overflow: hidden;
        .card {
            text-align: center;
            margin-bottom: 10px;
            .number {
                color: #2d8cf0;
                font-size: 3em;
                font-weight: 500;
            }
        }
    }
</style>
<template>
    <div class="wordLog">
        <!--实地拜访数据 表头数据-->
        <Row justify="space-between" type="flex">
            <Col :xs="{ span: 7 }" :lg="{ span: 3 }">
            <Card class="card">
                <i-count-up
                    class="number"
                    :start="0"
                    :end="visitList.todaydata"
                    :duration="2.5"
                ></i-count-up>
                <p>今日拜访</p>
            </Card>
            </Col>
            <Col :xs="{ span: 7 }" :lg="{ span: 3 }">
            <Card class="card">
                <i-count-up
                    class="number"
                    :start="0"
                    :end="visitList.lastnowdata"
                    :duration="2.5"
                ></i-count-up>
                <p>昨日此时拜访</p>
            </Card>
            </Col>
            <Col :xs="{ span: 7 }" :lg="{ span: 3 }">
            <Card class="card">
                <i-count-up
                    class="number"
                    :start="0"
                    :end="visitList.yestdaydata"
                    :duration="2.5"
                ></i-count-up>
                <p>昨日拜访</p>
            </Card>
            </Col>
            <Col :xs="{ span: 7 }" :lg="{ span: 3 }">
            <Card class="card">
                <i-count-up
                    class="number"
                    :start="0"
                    :end="visitList.sevendata"
                    :duration="2.5"
                ></i-count-up>
                <p>近7日拜访</p>
            </Card>
            </Col>
            <Col :xs="{ span: 7 }" :lg="{ span: 3 }">
            <Card class="card">
                <i-count-up
                    class="number"
                    :start="0"
                    :end="visitList.thirtydata"
                    :duration="2.5"
                ></i-count-up>
                <p>近30日拜访</p>
            </Card>
            </Col>
            <Col :xs="{ span: 7 }" :lg="{ span: 3 }">
            <Card class="card">
                <i-count-up
                    class="number"
                    :start="0"
                    :end="visitList.alldata"
                    :duration="2.5"
                ></i-count-up>
                <p>累计拜访</p>
            </Card>
            </Col>
        </Row>
        <!--实时实地拜访趋势-->
        <Card style="margin-top: 20px;">
            <div slot="title">实时实地拜访趋势</div>
            <group-radio :list="groupList" @groupRadioChange="changeDept"></group-radio>
            <line-chart ref="linchart" :width="linchartWidth" height="300px"
                        :options="todayYestdayList.options"></line-chart>
            <Spin size="large" fix v-if="todayYestdayList.loadding"></Spin>
        </Card>
        <!--近30日实地拜访趋势-->
        <Card style="margin-top: 20px;">
            <div slot="title">近30日实地拜访趋势</div>
            <group-radio :id="1" :list="groupList" @groupRadioChange="changeDept"></group-radio>
            <line-chart ref="thirtydata" width="100%" height="300px" :options="thirtydataList.options"></line-chart>
            <Spin size="large" fix v-if="thirtydataList.loadding"></Spin>
        </Card>
        <!--近12周实地拜访趋势-->
        <Card style="margin-top: 20px;">
            <div slot="title">近12周实地拜访趋势</div>
            <group-radio :id="2" :list="groupList" @groupRadioChange="changeDept"></group-radio>
            <line-chart ref="twelfthweek" width="100%" height="300px" :options="twelfthweekList.options"></line-chart>
            <Spin size="large" fix v-if="twelfthweekList.loadding"></Spin>
        </Card>
        <!--近12月实地拜访趋势-->
        <Card style="margin-top: 20px;">
            <div slot="title">近12月实地拜访趋势</div>
            <group-radio :id="3" :list="groupList" @groupRadioChange="changeDept"></group-radio>
            <line-chart ref="twelfthmonth" width="100%" height="300px"
                        :options="twelfthmonthList.options"></line-chart>
            <Spin size="large" fix v-if="twelfthmonthList.loadding"></Spin>
        </Card>
    </div>
</template>
<script>
    import LineChart from '@/view/components/lineChart'
    import GroupRadio from '@/view/components/groupRadio'
    import ICountUp from 'vue-countup-v2'

    export default {
        components: {
            'line-chart': LineChart,
            'group-radio': GroupRadio,
            'ICountUp': ICountUp
        },
        data() {
            return {
                linchartWidth: '100%',
                visitList: {
                    todaydata: 0,
                    lastnowdata: 0,
                    yestdaydata: 0,
                    sevendata: 0,
                    thirtydata: 0,
                    alldata: 0
                },
                // 选择类型 0:实时拜访  1:近30日实地拜访  2:近12周实地拜访  3:近12个月实地拜访趋势图
                selectType: 0,
                groupList: [
                    {
                        name: '按时间'
                    },
                    {
                        name: '按部门'
                    }
                ],
                // 实时实地拜访数据
                todayYestdayList: {
                    loadding: true,
                    options: {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: []
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: []
                    }
                },
                // 近30日实地拜访趋势
                thirtydataList: {
                    loadding: true,
                    options: {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: []
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '13%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            axisLabel: {
                                interval: 0,
                                rotate: 40
                            },
                            boundaryGap: false,
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: []
                    }
                },
                // 近12周实地拜访趋势
                twelfthweekList: {
                    loadding: true,
                    options: {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: []
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: []
                    }
                },
                // 近12月实地拜访趋势
                twelfthmonthList: {
                    loadding: true,
                    options: {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: []
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: []
                    }
                },
                series: {
                    type: 'line',
                    smooth: true
                }
            }
        },
        methods: {
            changeDept(currentIndex, id) {
                if (id === 0) {
                    this.ajaxSelectDataTitleDataByPartyId(currentIndex)
                } else {
                    this.ajaxSelectTrendDataByPartyIdandType(id, currentIndex)
                }
            },
            // 实地拜访数据 表头数据
            ajaxSelectTodayAndYesterdayHourDataByPartyId() {
                this.$http.post('selectTodayAndYesterdayHourDataByPartyId', {
                    partyid: -1
                }).then(res => {
                    this.visitList = res
                })
            },
            // 今日与昨日数据对比
            ajaxSelectDataTitleDataByPartyId(currentIndex = 0) {
                this.todayYestdayList.loadding = true
                this.todayYestdayList.options.legend.data = []
                this.todayYestdayList.options.series = []
                this.$http.post('selectDataTitleDataByPartyId', {
                    type: currentIndex
                }).then(res => {
                    switch (parseInt(currentIndex)) {
                    case 0: {
                        this.todayYestdayList.options.legend.data.push('昨日实时拜访')
                        this.todayYestdayList.options.legend.data.push('今日实时拜访')
                        this.todayYestdayList.options.series.push(Object.assign({
                            name: '昨日实时拜访',
                            data: res.yestdaylist ? res.yestdaylist : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }, this.series))
                        this.todayYestdayList.options.series.push(Object.assign({
                            name: '今日实时拜访',
                            data: res.todayYestdayList ? res.todayYestdayList : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }, this.series))
                        break
                    }
                    case 1: {
                        // 如果是按部门, 则显示每个部门今天的数据
                        for (let key in res) {
                            this.todayYestdayList.options.legend.data.push(key)
                            this.todayYestdayList.options.series.push(Object.assign({
                                name: key,
                                data: res[key] ? res[key] : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }, this.series))
                        }
                        break
                    }
                    }
                    this.$refs.linchart.changeDate(this.todayYestdayList.options)
                    this.todayYestdayList.loadding = false
                }).catch(() => {
                    this.todayYestdayList.loadding = false
                })
            },
            // 近30天 近12周 近12月 趋势图数据
            ajaxSelectTrendDataByPartyIdandType(dataType, currentIndex = 0) {
                if (dataType === 1) {
                    this.thirtydataList.loadding = true
                } else if (dataType === 2) {
                    this.twelfthweekList.loadding = true
                } else if (dataType === 3) {
                    this.twelfthmonthList.loadding = true
                }
                this.$http.post('selectTrendDataByPartyIdandType', {
                    type: currentIndex,
                    dataType: dataType
                }).then((result) => {
                    if (dataType === 1) {
                        this.linDateReduce('thirtydataList', result)
                        this.$refs.thirtydata.changeDate(this.thirtydataList.options)
                        this.thirtydataList.loadding = false
                    } else if (dataType === 2) {
                        this.linDateReduce('twelfthweekList', result)
                        this.$refs.twelfthweek.changeDate(this.twelfthweekList.options)
                        this.twelfthweekList.loadding = false
                    } else if (dataType === 3) {
                        this.linDateReduce('twelfthmonthList', result)
                        this.$refs.twelfthmonth.changeDate(this.twelfthmonthList.options)
                        this.twelfthmonthList.loadding = false
                    }
                }).catch((code, msg = '请求异常') => {
                    if (dataType === 1) {
                        this.thirtydataList.loadding = false
                    } else if (dataType === 2) {
                        this.twelfthweekList.loadding = false
                    } else if (dataType === 3) {
                        this.twelfthmonthList.loadding = false
                    }
                })
            },
            linDateReduce(key, result) {
                this[key].options.series = []
                this[key].options.legend.data = []
                for (let i = 0; i < result.length; i++) {
                    this[key].options.legend.data.push(result[i].name)
                    this[key].options.xAxis.data = result[i].Xdata
                    this[key].options.series.push(Object.assign({
                        name: result[i].name,
                        data: result[i].Ydata
                    }, this.series))
                }
            }
        },
        created() {
            // 获取实时实地拜访趋势
            this.ajaxSelectDataTitleDataByPartyId()
            // 获取 今日/昨日此时/昨日/近7日/近30日/累计拜访
            this.ajaxSelectTodayAndYesterdayHourDataByPartyId()
            // 获取实时实地拜访趋势
            this.ajaxSelectDataTitleDataByPartyId()
            // 获取 近30日实地拜访趋势
            this.ajaxSelectTrendDataByPartyIdandType(1)
            // 获取 近12周实地拜访趋势
            this.ajaxSelectTrendDataByPartyIdandType(2)
            // 获取 近12月实地拜访趋势
            this.ajaxSelectTrendDataByPartyIdandType(3)
        },
        mounted() {

        }
    }
</script>
