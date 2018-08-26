<template>
    <div class="teamVisitingRecord">
        <card class="teamVisitingRecord__hd">
            <div slot="content" class="card card-demo-flex card-demo-content01">
                <!--<div class="vux-1px-l vux-1px-r">-->
                    <!--<countup :start-val="0" :end-val="todayCount" :duration="3" tag="span"></countup>-->
                    <!--<span>/</span>-->
                    <!--<countup :start-val="0" :end-val="yestdaythisTimeCount" :duration="3" tag="span"></countup>-->
                    <!--<br/>-->
                    <!--今日此时/昨日此时-->
                <!--</div>-->
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
            :on-infinite="infinite"
            ref="myscroller"
            style="position:relative;height: 100%;"
        >
            <template v-if="receivedVisitingRecords.list.length !=0">
                <group class="customList__group">
                    <template v-for="(item, index) in receivedVisitingRecords.list">
                        <cell
                            :title="item.name"
                            class="customList__cell"
                            @click.native="goto('TeamMemberVisitingRecord',{userid: item.userid, name: item.name})"
                        >
                            <div class="userImg" slot="icon">
                                <img :src="item.avatar" alt="用户头像">
                            </div>
                            <template v-if="item.visitTime" slot="inline-desc">
                                最后拜访: {{time(item.visitTime, 1, 1)}}
                            </template>
                            <template v-else slot="inline-desc">
                                暂无拜访
                            </template>
                            今日 {{item.todayCount}} 访
                        </cell>
                    </template>
                </group>
            </template>
        </scroller>
    </div>
</template>

<script>
    import {Flexbox, FlexboxItem, Group, Cell, querystring, Card, Countup, dateFormat} from 'vux'
    export default{
        data(){
            return {
                todayCount: 0,
                yestdayCount: 0,
                yestdaythisTimeCount: 0,
                receivedVisitingRecords: {
                    list: [],
                    pageNo: 0,
                    pageSize: 10,
                    pageCount: 1
                }
            }
        },
        components: {
            Flexbox,
            FlexboxItem,
            Group,
            Cell,
            Card,
            Countup
        },
        computed: {},
        methods: {
            async refresh (done) {
                this.receivedVisitingRecords.pageNo = 0
                this.ajaxLoadTodayAndYestdayVisitingRecordCount()
                let receivedVisitingRecords = await this.ajaxPageReceivedVisitingRecordsByCurrentUser()
                this.receivedVisitingRecords.list = receivedVisitingRecords.list
                this.receivedVisitingRecords.pageCount = receivedVisitingRecords.pageCount
                done()
            },
            async infinite (done) {
                if (this.receivedVisitingRecords.pageNo >= this.receivedVisitingRecords.pageCount - 1) {
                    this.$refs.myscroller.finishInfinite(2)
                    return
                }
                this.receivedVisitingRecords.pageNo++
                let receivedVisitingRecords = await this.ajaxPageReceivedVisitingRecordsByCurrentUser()
                this.receivedVisitingRecords.pageCount = receivedVisitingRecords.pageCount
                this.receivedVisitingRecords.list = this.receivedVisitingRecords.list.concat(receivedVisitingRecords.list)
                done()
            },
            // 团队今日和昨日的拜访量
            ajaxLoadTodayAndYestdayVisitingRecordCount(){
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/gzrz/services/loadTodayAndYestdayVisitingRecordCount')
                        .then(result => {
                            if (result.data.code === 'SUCCESS') {
                                this.todayCount = result.data.body.todayCount
                                this.yestdayCount = result.data.body.yestdayCount
                                this.yestdaythisTimeCount = result.data.body.yestdaythisTimeCount
                                resolve(result.data.body)
                            } else {
                                console.error(`错误Code: ${result.data.code}, 错误信息: ${result.data.msg}`)
                                reject(result.data)
                            }
                        })
                        .catch(error => {
                            console.error(`ajax异常 ${JSON.stringify(error)}`)
                            this.$vux.toast.show({
                                type: 'cancel',
                                text: '请求超时'
                            })
                            reject(error)
                        })
                })
            },
            // 分页加载团队拜访记录
            ajaxPageReceivedVisitingRecordsByCurrentUser(){
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/gzrz/services/pageReceivedVisitingRecordsByCurrentUser', querystring.stringify({
                        pageNo: this.receivedVisitingRecords.pageNo,
                        pageSize: this.receivedVisitingRecords.pageSize
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
                            console.error(`ajax异常 ${JSON.stringify(error)}`)
                            this.$vux.toast.show({
                                type: 'cancel',
                                text: '请求超时'
                            })
                            reject(error)
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
            // 页面跳转
            goto(url, params) {
                this.$router.push({name: url, params})
            }
        },
        async mounted(){
            this.ajaxLoadTodayAndYestdayVisitingRecordCount()
            let receivedVisitingRecords = await this.ajaxPageReceivedVisitingRecordsByCurrentUser()
            this.receivedVisitingRecords.list = receivedVisitingRecords.list
            this.receivedVisitingRecords.pageCount = receivedVisitingRecords.pageCount
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../../node_modules/vux/src/styles/1px.less';
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
            .card{
                display: flex;
                padding: 10px 0;
                div{
                    flex: 1;
                    text-align: center;
                    font-size: 12px;
                }
                span{
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
                margin-top:10px;
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
