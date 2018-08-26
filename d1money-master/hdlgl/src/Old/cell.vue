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
            <tree :list.sync="list" :expand='expandClick'></tree>
            <!--<template v-if="receivedVisitingRecords.list.length !=0">-->
            <!--<group class="customList__group">-->
            <!--<template v-for="(item, index) in receivedVisitingRecords.list">-->
            <!--<cell-->
            <!--:title="item.name"-->
            <!--class="customList__cell"-->
            <!--@click.native="goto('TeamMemberVisitingRecord',{userid: item.userid, name: item.name})"-->
            <!--&gt;-->
            <!--<div class="userImg" slot="icon">-->
            <!--<img :src="item.avatar" alt="用户头像">-->
            <!--</div>-->
            <!--<template v-if="item.visitTime" slot="inline-desc">-->
            <!--最后拜访: {{time(item.visitTime, 1, 1)}}-->
            <!--</template>-->
            <!--<template v-else slot="inline-desc">-->
            <!--暂无拜访-->
            <!--</template>-->
            <!--今日 {{item.todayCount}} 访-->
            <!--</cell>-->
            <!--</template>-->
            <!--</group>-->
            <!--</template>-->
        </scroller>
    </div>
</template>

<script>
    import {Flexbox, FlexboxItem, Group, Cell, Card, Countup, dateFormat} from 'vux'
    import Tree from '../components/tree/Tree.vue'

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
                list: [
                    {
                        id: 1,
                        name: '第一财富网',
                        childrens: [
                            {
                                id: 11,
                                name: '曲曲',
                                avatar: 'http://wmimage.qn.d1money.com/head/201512/08/168695/132.jpg?v=1509951116981',
                                visitTime: '2017-10-24',
                                todayCount: 0
                            },
                            {
                                id: 11,
                                name: '开发部',
                                avatar: '',
                                visitTime: '2017-10-24',
                                todayCount: 0,
                                childrens: [
                                    {
                                        id: 11,
                                        name: '张三1',
                                        avatar: 'http://wmimage.qn.d1money.com/head/201512/08/168695/132.jpg?v=1509951116981',
                                        visitTime: '2017-10-24',
                                        todayCount: 0
                                    },
                                    {
                                        id: 12,
                                        name: '李四1',
                                        avatar: 'http://wmimage.qn.d1money.com/head/201512/08/168695/132.jpg?v=1509951116981',
                                        visitTime: '2017-10-24',
                                        todayCount: 0
                                    }
                                ]
                            },
                            {
                                id: 12,
                                name: '学习部',
                                avatar: '',
                                visitTime: '2017-10-24',
                                todayCount: 0,
                                childrens: []
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: '第二财富网',
                        childrens: [
                            {
                                id: 11,
                                name: '张三',
                                avatar: 'http://wmimage.qn.d1money.com/head/201512/08/168695/132.jpg?v=1509951116981',
                                visitTime: '2017-10-24',
                                todayCount: 0
                            },
                            {
                                id: 12,
                                name: '李四',
                                avatar: 'http://wmimage.qn.d1money.com/head/201512/08/168695/132.jpg?v=1509951116981',
                                visitTime: '2017-10-24',
                                todayCount: 0
                            },
                            {
                                id: 11,
                                name: '开发部',
                                avatar: '',
                                visitTime: '2017-10-24',
                                todayCount: 0,
                                childrens: [
                                    {
                                        id: 11,
                                        name: 'IOS部',
                                        avatar: '',
                                        visitTime: '2017-10-24',
                                        todayCount: 0,
                                        childrens: [
                                            {
                                                id: 11,
                                                name: '小三',
                                                avatar: 'http://wmimage.qn.d1money.com/head/201512/08/168695/132.jpg?v=1509951116981',
                                                visitTime: '2017-10-24',
                                                todayCount: 0
                                            },
                                            {
                                                id: 14,
                                                name: '小四',
                                                avatar: 'http://wmimage.qn.d1money.com/head/201512/08/168695/132.jpg?v=1509951116981',
                                                visitTime: '2017-10-24',
                                                todayCount: 0
                                            },
                                            {
                                                id: 14,
                                                name: '小五',
                                                avatar: 'http://wmimage.qn.d1money.com/head/201512/08/168695/132.jpg?v=1509951116981',
                                                visitTime: '2017-10-24',
                                                todayCount: 0
                                            },
                                            {
                                                id: 14,
                                                name: '小组1',
                                                avatar: '',
                                                visitTime: '2017-10-24',
                                                todayCount: 0,
                                                childrens: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
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
                this.receivedVisitingRecords.pageNo = 0
                this.ajaxLoadTodayAndYestdayVisitingRecordCount()
                let receivedVisitingRecords = await this.ajaxPageReceivedVisitingRecordsByCurrentUser()
                this.receivedVisitingRecords.list = receivedVisitingRecords.list
                this.receivedVisitingRecords.pageCount = receivedVisitingRecords.pageCount
                done()
            },
            async infinite(done) {
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
            ajaxLoadTodayAndYestdayVisitingRecordCount() {
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/hdlgl/services/loadTodayAndYestdayVisitingRecordCount')
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
            ajaxPageReceivedVisitingRecordsByCurrentUser() {
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/hdlgl/services/pageReceivedVisitingRecordsByCurrentUser')
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
            },
            // 展开部门  异步加载
            expandClick(m) {
                console.log(JSON.parse(JSON.stringify(m)))
                // 点击异步加载
                if (m.isExpand) {
                    // 动态加载子节点, 模拟ajax请求数据
                    // 请注意 id 不能重复哦。
                    if (m.hasOwnProperty('childrens')) {
                        m.loadNode = 1 // 正在加载节点
                        setTimeout(() => {
                            m.loadNode = 2 // 节点加载完毕
                            m.isFolder = !m.isFolder
                            m.children.push({
                                id: +new Date(),
                                name: '动态加载节点1',
                                path: '',
                                clickNode: false,
                                isFolder: false,
                                isExpand: false,
                                loadNode: 0,
                                children: [{
                                    id: +new Date() + 1,
                                    name: '动态加载末节点',
                                    path: '',
                                    clickNode: false,
                                    isExpand: false,
                                    isFolder: false,
                                    loadNode: 0
                                }]
                            })
                        }, 1000)
                    }
                }
            },
            // 数据整理
            dataReduce(users, depts) {
//                console.log(users)
//                console.log(depts)
                let _depts = depts.map((item) => {
                    item.childrens = []
                    return item
                })
                return users.concat(_depts)
            }
        },
        async mounted() {
            // 禁止上拉加载
            this.$refs.myscroller.finishInfinite()
//            this.ajaxLoadTodayAndYestdayVisitingRecordCount()
//            let receivedVisitingRecords = await this.ajaxPageReceivedVisitingRecordsByCurrentUser()
            let receivedVisitingRecords = {
                ReceivedVisitingRecordslist: [
                    {
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'visitTime': '2017-10-31 17:03',
                        'name': '吴晓晖',
                        'todayCount': 0,
                        'avatar': 'http://p.qlogo.cn/bizmail/c5eyqXFRFuxBqAZticEaSGQDXhgGibbDb86uIzQzjuQXibicmIL2gmDeAQ/0',
                        'id': 'WuXiaoHui'
                    },
                    {
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'visitTime': '2017-10-31 17:01',
                        'name': '王斌',
                        'todayCount': 0,
                        'avatar': 'http://p.qlogo.cn/bizmail/OIDkEBctSRZibo8ia6ba5NLJWTemibCicQyCVySgWZ6ns32ljLmnWbfdfg/0',
                        'id': 'ozynqst5Q5XKaf2qNJdiofYyIuQk'
                    },
                    {
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'visitTime': '2017-10-31 10:57',
                        'name': '陈冠',
                        'todayCount': 0,
                        'avatar': 'http://p.qlogo.cn/bizmail/GZGT76rticR4G1hT20hnRrpkZGeTmJfuna4HmAib0JcJcukNOv3QO6Iw/0',
                        'id': '823f0e5baf6a21159f33083bd015ea5c'
                    },
                    {
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'visitTime': '2017-10-30 14:53',
                        'name': '韩林峰',
                        'todayCount': 0,
                        'avatar': 'http://p.qlogo.cn/bizmail/Rl8Wb8oUiaadkqm5ic8CoxibTpKBtYykM0UqPt0dDBfObswy8MY31SgHA/0',
                        'id': 'HanLinFeng'
                    },
                    {
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'visitTime': '2017-10-30 12:00',
                        'name': '夏前永',
                        'todayCount': 0,
                        'avatar': 'http://p.qlogo.cn/bizmail/4ZZ9fyXzJzia9jC3ZY6zUgjTmnl0sOZC1Cib142nwMptylOZdt4yQkUw/0',
                        'id': 'ozynqsoEr45dtZursNkRjpzydFCc'
                    },
                    {
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'visitTime': '2017-10-27 14:21',
                        'name': '高世超',
                        'todayCount': 0,
                        'avatar': 'http://p.qlogo.cn/bizmail/5AQfDKA1zPRPia5zXq1K6hqP9ORlTKNV7fL0a6jpsIb6lwS0YODogrA/0',
                        'id': 'GaoShiChao'
                    },
                    {
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'visitTime': '2017-10-26 16:42',
                        'name': '李宁',
                        'todayCount': 0,
                        'avatar': 'http://p.qlogo.cn/bizmail/Z8FiaP4I5L2ZPqibNeiaNIRy6drfFYdShFnJZf6ibK9CCGaeWmOO866YwQ/0',
                        'id': 'LiNing'
                    },
                    {
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'visitTime': '2017-10-20 20:19',
                        'name': '张曲军',
                        'todayCount': 0,
                        'avatar': 'http://p.qlogo.cn/bizmail/Gj053Xb3mJ53JI29sKVCyPOuwqkLuOSibDXEM3BNNyTuL3ZicuNaf5Hw/0',
                        'id': 'ZhangQuJun'
                    },
                    {
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'name': '韩林峰2号',
                        'todayCount': 0,
                        'avatar': 'http://p.qlogo.cn/bizmail/RnUF8I69t5CWmvHk5pHoBiaNDN7hB7xP7II6bEw50M9JXG10JicNqe8w/0',
                        'id': 'HanLinfeng_No.2'
                    }
                ],
                partyList: [
                    {
                        'name': '课程部',
                        'id': 3
                    },
                    {
                        'name': '销售部',
                        'id': 4
                    }
                ]
            }
            console.log(receivedVisitingRecords)
            console.log(this.dataReduce(receivedVisitingRecords.ReceivedVisitingRecordslist, receivedVisitingRecords.partyList))
            this.list = this.dataReduce(receivedVisitingRecords.ReceivedVisitingRecordslist, receivedVisitingRecords.partyList)
//            this.receivedVisitingRecords.list = receivedVisitingRecords.list
//            this.receivedVisitingRecords.pageCount = receivedVisitingRecords.pageCount
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
