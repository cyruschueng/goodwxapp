<style scoped rel="stylesheet/less" lang="less">
    .visitData {
        height: calc(~ "100% - 41px");
        .leftMain {

        }
        .rightMain {
            .searchBox {
                margin-bottom: 20px;
            }
            .content {
                position: relative;
                .demo-spin-icon-load {
                    animation: ani-demo-spin 1s linear infinite;
                }
                @keyframes ani-demo-spin {
                    from {
                        transform: rotate(0deg);
                    }
                    50% {
                        transform: rotate(180deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="visitData">
        <Row :gutter="0" style="height: 100%;">
            <i-col span="4" style="border:1px solid #dedede;border-radius: 5px;min-height: 100%;overflow-x: hidden">
                <Tree
                    :data="partys"
                    :render="renderContent"
                ></Tree>
            </i-col>
            <i-col span="20" class="rightMain" style="padding-left: 20px;">
                <div class="searchBox">
                    <RadioGroup v-model="type" type="button" @on-change="selectTypeChange">
                        <Radio label="1">日</Radio>
                        <Radio label="7">周</Radio>
                        <Radio label="30">月</Radio>
                    </RadioGroup>
                    <DatePicker
                        v-show="type == 1"
                        type="date"
                        :options="selectday"
                        placeholder="请选择开始日期"
                        :editable="false" style="width: 200px"
                        v-model="datepicker.day"
                        @on-change="ajaxVisitStatistics"
                    ></DatePicker>
                    <DatePicker v-show="type == 7"
                                :open="openWeekPicker"
                                :value="datepicker.week"
                                type="date"
                                :options="selectWeek"
                                placeholder="请选择开始日期"
                                style="width: 200px"
                                @on-change="handleChange"
                    >
                        <Input
                            v-model="datepicker.week"
                            placeholder="请选择开始日期"
                            style="width: 200px"
                            icon="ios-calendar-outline"
                            @on-focus="onfocus1"
                            @on-blur="onblur"
                        ></Input>
                    </DatePicker>
                    <DatePicker
                        v-show="type == 30"
                        v-model="datepicker.month"
                        type="month"
                        :options="selectMounth"
                        placeholder="请选择开始日期"
                        :editable="false" style="width: 200px"
                        @on-change="ajaxVisitStatistics"
                    ></DatePicker>
                </div>
                <div class="content">
                    <div class="table">
                        <i-table
                            :loading="tableDataLoading"
                            width="100%" border
                            :columns="changeColumns"
                            :data="tableData"
                        ></i-table>
                        <Modal v-model="userDescModal" width="420">
                            <p slot="header" style="text-align:center;font-size: 18px;">
                                <Icon type="information-circled"></Icon>
                                <span>拜访详情</span>
                            </p>
                            <div style="height: 400px;overflow-y: auto;">
                                <dm-article
                                    v-if="visitList.length !== 0"
                                    v-for="item in visitList"
                                    :avatar="selectUser.avatar"
                                    :type="item.type"
                                    :content="item.content"
                                    :time="item.time"
                                >
                                </dm-article>
                                <template v-if="visitList.length === 0">
                                    暂无数据
                                </template>
                            </div>
                            <div slot="footer">
                                <Button type="primary" size="large" long @click="toggleUserDescModal">关闭</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </i-col>
        </Row>

    </div>
</template>
<script>
    import UtilMixin from './../../mixins/UtilMixin.vue'
    import Article from './../components/article.vue'

    export default {
        mixins: [UtilMixin],
        data() {
            return {
                type: 1,
                datepicker: {
                    day: null,
                    week: null,
                    month: null
                },
                selectday: {
                    shortcuts: [
                        {
                            text: '今天',
                            value() {
                                return new Date()
                            }
                        },
                        {
                            text: '昨天',
                            value() {
                                const date = new Date()
                                date.setTime(date.getTime() - 3600 * 1000 * 24)
                                return date
                            }
                        },
                        {
                            text: '上周',
                            value() {
                                const date = new Date()
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                                return date
                            }
                        }
                    ],
                    disabledDate(date) {
                        return date && date.valueOf() > Date.now()
                    }
                },
                openWeekPicker: false,
                selectWeek: {
                    shortcuts: [
                        {
                            text: '本周',
                            value() {
                                return new Date()
                            }
                        },
                        {
                            text: '上周',
                            value() {
                                const date = new Date()
                                return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
                            }
                        }
                    ],
                    disabledDate(date) {
                        return date && date.valueOf() > Date.now()
                    }
                },
                selectMounth: {
                    shortcuts: [
                        {
                            text: '本月',
                            value() {
                                const date = new Date()
                                let year = date.getFullYear()
                                let mounth = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
                                return `${year}-${mounth}`
                            }
                        },
                        {
                            text: '上月',
                            value() {
                                const date = new Date()
                                let year = date.getFullYear()
                                let mounth = date.getMonth() > 9 ? date.getMonth() : '0' + (date.getMonth() )
                                return `${year}-${mounth}`
                            }
                        }
                    ],
                    disabledDate(date) {
                        return date && date.valueOf() > Date.now()
                    }
                },
                loading: false,
                userDescModal: true,
                partyList: [
                    {
                        'authCorpInfoCorpId': null,
                        'suiteId': null,
                        'partyid': 1,
                        'name': '第一财富网',
                        'parentId': 0,
                        'order': 100000000,
                        'createTime': null,
                        'updateTime': null
                    },
                    {
                        'authCorpInfoCorpId': null,
                        'suiteId': null,
                        'partyid': 4,
                        'name': '销售部',
                        'parentId': 1,
                        'order': 99998750,
                        'createTime': null,
                        'updateTime': null
                    },
                    {
                        'authCorpInfoCorpId': null,
                        'suiteId': null,
                        'partyid': 5,
                        'name': '视频部',
                        'parentId': 1,
                        'order': 99999562,
                        'createTime': null,
                        'updateTime': null
                    },
                    {
                        'authCorpInfoCorpId': null,
                        'suiteId': null,
                        'partyid': 3,
                        'name': '课程部',
                        'parentId': 1,
                        'order': 100000375,
                        'createTime': null,
                        'updateTime': null
                    },
                    {
                        'authCorpInfoCorpId': null,
                        'suiteId': null,
                        'partyid': 2,
                        'name': '开发部',
                        'parentId': 1,
                        'order': 100002000,
                        'createTime': null,
                        'updateTime': null
                    },
                    {
                        'authCorpInfoCorpId': null,
                        'suiteId': null,
                        'partyid': 6,
                        'name': '推广部',
                        'parentId': 4,
                        'order': 100000000,
                        'createTime': null,
                        'updateTime': null
                    }
                ],
                selectPartyId: null,

                selectUser: {
                    userId: null,
                    avatar: null
                },
                // 拜访记录
                visitList: [
                    {
                        'id': 426,
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'userId': '823f0e5baf6a21159f33083bd015ea5c',
                        'customerId': 161,
                        'location': '上海市普陀区常德路1200号',
                        'longitude': 121.4334,
                        'latitude': 31.24211,
                        'content': '准备开门红太忙没时间，明天就是开门红产品抢购日子，好像是7点，还在统计人员联系什么的。',
                        'type': 0,
                        'time': 1512980825000,
                        'createTime': 1512980825000
                    },
                    {
                        'id': 426,
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'userId': '823f0e5baf6a21159f33083bd015ea5c',
                        'customerId': 161,
                        'location': '上海市普陀区常德路1200号',
                        'longitude': 121.4334,
                        'latitude': 31.24211,
                        'content': '准备开门红太忙没时间，明天就是开门红产品抢购日子，好像是7点，还在统计人员联系什么的。',
                        'type': 0,
                        'time': 1512980825000,
                        'createTime': 1512980825000
                    },
                    {
                        'id': 426,
                        'authCorpInfoCorpId': 'wwbb2775eca6964984',
                        'suiteId': 'tj2507563a2b3801a0',
                        'userId': '823f0e5baf6a21159f33083bd015ea5c',
                        'customerId': 161,
                        'location': '上海市普陀区常德路1200号',
                        'longitude': 121.4334,
                        'latitude': 31.24211,
                        'content': '准备开门红太忙没时间，明天就是开门红产品抢购日子，好像是7点，还在统计人员联系什么的。',
                        'type': 0,
                        'time': 1512980825000,
                        'createTime': 1512980825000
                    }
                ],
                // table
                tableDataLoading: false,
                columns2: [
                    {
                        title: '姓名',
                        key: 'username',
                        fixed: 'left'
                    },
                    {
                        title: '部门',
                        key: 'partyName'
                    },
                    {
                        title: '2017-12-12 00:00:00',
                        key: '2017-12-12 00:00:00'
                    },
                    {
                        title: '汇总',
                        key: 'zip'
                    }
                ],
                tableData: [
                    {
                        'partyName': '第一财富网',
                        '2017-12-17 00:00:00': 0,
                        '2017-12-15 00:00:00': 0,
                        '2017-12-13 00:00:00': 0,
                        '2017-12-12 00:00:00': 0,
                        '2017-12-14 00:00:00': 0,
                        '2017-12-16 00:00:00': 0,
                        'username': '宁芬'
                    },
                    {
                        'partyName': '第一财富网',
                        '2017-12-12 00:00:00': 0,
                        '2017-12-13 00:00:00': 0,
                        '2017-12-14 00:00:00': 0,
                        '2017-12-15 00:00:00': 0,
                        '2017-12-16 00:00:00': 0,
                        '2017-12-17 00:00:00': 0,
                        'username': '杨珺'
                    },
                    {
                        'partyName': '第一财富网',
                        '2017-12-12 00:00:00': 0,
                        '2017-12-13 00:00:00': 0,
                        '2017-12-14 00:00:00': 0,
                        '2017-12-15 00:00:00': 0,
                        '2017-12-16 00:00:00': 0,
                        '2017-12-17 00:00:00': 0,
                        'username': '管一泓'
                    },
                    {
                        'partyName': '第一财富网',
                        '2017-12-12 00:00:00': 0,
                        '2017-12-13 00:00:00': 0,
                        '2017-12-14 00:00:00': 0,
                        '2017-12-15 00:00:00': 0,
                        '2017-12-16 00:00:00': 0,
                        '2017-12-17 00:00:00': 0,
                        'username': '第一财富网小秘书'
                    },
                    {
                        'partyName': '第一财富网',
                        '2017-12-12 00:00:00': 0,
                        '2017-12-13 00:00:00': 0,
                        '2017-12-14 00:00:00': 0,
                        '2017-12-15 00:00:00': 0,
                        '2017-12-16 00:00:00': 0,
                        '2017-12-17 00:00:00': 0,
                        'username': 'Benson'
                    },
                    {
                        'partyName': '第一财富网',
                        '2017-12-12 00:00:00': 0,
                        '2017-12-13 00:00:00': 0,
                        '2017-12-14 00:00:00': 0,
                        '2017-12-15 00:00:00': 0,
                        '2017-12-16 00:00:00': 0,
                        '2017-12-17 00:00:00': 0,
                        'username': '小韩 备用号'
                    },
                    {
                        'partyName': '第一财富网',
                        '2017-12-12 00:00:00': 0,
                        '2017-12-13 00:00:00': 0,
                        '2017-12-14 00:00:00': 0,
                        '2017-12-15 00:00:00': 0,
                        '2017-12-16 00:00:00': 0,
                        '2017-12-17 00:00:00': 0,
                        'username': 'Bella '
                    }
                ]
            }
        },
        components: {
            'dm-article': Article
        },
        computed: {
            // 整理后的部门成员
            partys() {
                let attributes = {
                    // 标识字段名
                    keyField: 'partyid',
                    // 上级标识字段名
                    parentKeyField: 'parentId',
                    // 文本字段名
                    textField: 'name',
                    // 根节点标识
                    rootKey: 0
                }
                return this.convertTreeData1(this.partyList, attributes)
            },
            changeColumns() {
                let tableHeader = [
                    {
                        title: '姓名',
                        key: 'username',
                        fixed: 'left',
                        width: 130
                    },
                    {
                        title: '部门',
                        key: 'partyName',
                        width: 130
                    }
                ]
                if (this.tableData.length === 0) {
                    return []
                }
                let tableDataOne = this.tableData[0]
                console.log(tableDataOne)
                let newkeys = Object.keys(tableDataOne).sort()
                console.log(newkeys)
                newkeys.map((i) => {
                    if (!['partyName', 'username'].includes(i)) {
                        if (i === 'total') {
                            tableHeader.push({
                                title: '汇总',
                                key: i,
                                width: 130
                            })
                        } else {
                            tableHeader.push({
                                title: i.slice(0, 10),
                                key: i,
                                width: 130,
                                render(row, column, index) {
                                    return '<Icon type="person"></Icon> <strong>' + row[i] + '</strong>'
                                }
                            })
                        }
                    }
                })
                return tableHeader
            }
        },
        methods: {
            handleChange(data) {
                let date = data ? new Date(data + ' 00:00:00') : new Date()
                let day = date.getDay() || 7
                const weekFristDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day)
                const weekLastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (7 - day))
                let weekFristDayFormat = {
                    year: weekFristDay.getFullYear(),
                    month: weekFristDay.getMonth() + 1 > 9 ? weekFristDay.getMonth() + 1 : '0' + (weekFristDay.getMonth() + 1),
                    day: weekFristDay.getDate() > 9 ? weekFristDay.getDate() : '0' + weekFristDay.getDate()
                }
                let weekLastDayFormat = {
                    year: weekLastDay.getFullYear(),
                    month: weekLastDay.getMonth() + 1 > 9 ? weekLastDay.getMonth() + 1 : '0' + (weekLastDay.getMonth() + 1),
                    day: weekLastDay.getDate() > 9 ? weekLastDay.getDate() : '0' + weekLastDay.getDate()
                }
                this.datepicker.week = `${weekFristDayFormat.year}-${weekFristDayFormat.month}-${weekFristDayFormat.day} 至 ${weekLastDayFormat.year}-${weekLastDayFormat.month}-${weekLastDayFormat.day}`
                this.ajaxVisitStatistics(this.datepicker.week)
            },
            onfocus1() {
                this.openWeekPicker = !this.openWeekPicker
            },
            onblur() {
                this.openWeekPicker = !this.openWeekPicker
            },
            renderContent(h, {root, node, data}) {
                if (data.children) {
                    return h('span',
                        {
                            style: {
                                display: 'inline-block',
                                width: '100%',
                                cursor: 'pointer'
                            },
                            on: {
                                click: () => {
                                    this.loadVisitList(root, node, data)
                                }
                            }
                        },
                        [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-paper-outline'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', data.text)
                            ])
                        ])
                }
            },
            loadVisitList(root, node, data) {
                console.log('查看部门')
                console.log(data)
                this.selectPartyId = data.partyid
                let dateTime = ''
                let nowDate = new Date()
                let nowDateFormat = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1 > 9 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1),
                    day: nowDate.getDate() > 9 ? nowDate.getDate() : '0' + nowDate.getDate()
                }
                if (parseInt(this.type) === 1) {
                    dateTime = `${nowDateFormat.year}-${nowDateFormat.month}-${nowDateFormat.day}`
                } else if (parseInt(this.type) === 30) {
                    dateTime = `${nowDateFormat.year}-${nowDateFormat.month}`
                }
                this.ajaxVisitStatistics(dateTime)
            },
            toggleUserDescModal() {
                if (this.userDescModal) {
                    this.userDescModal = false
                } else {
                    this.userDescModal = true
                }
            },
            // 所有部门接口
            ajaxLoadAllPartys() {
                this.$http.post('loadAllPartys')
                    .then(res => {
                        console.log(res)
                        this.partyList = res
                    })
            },
            // 他人拜访记录
            ajaxVisitStatistics(data) {
                if (!this.selectPartyId) {
                    this.$Message.warning('请先选择用户')
                    return
                }
                this.tableDataLoading = true
                const type = parseInt(this.type)
                let date = data
                if (type === 1) {
                    console.log('日')
                } else if (type === 7) {
                    console.log('周')
                    date = this.datepicker.week
                } else if (type === 30) {
                    console.log('月')
                }
                this.$http.post('VisitStatistics', {
                    partyid: this.selectPartyId,
                    datetype: type,
                    date
                }).then(res => {
                    console.log(res)
                    this.tableData = res
                    this.tableDataLoading = false
                }).catch((code, msg) => {
                    this.tableDataLoading = false
                    this.$Notice.error({
                        title: `错误提示: ${code}`,
                        desc: msg
                    })
                })
            },
            selectTypeChange(type) {
                let nowDate = new Date()
                let nowDateFormat = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1 > 9 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1),
                    day: nowDate.getDate() > 9 ? nowDate.getDate() : '0' + nowDate.getDate()
                }
                let date = ''
                if (parseInt(type) === 1) {
                    date = `${nowDateFormat.year}-${nowDateFormat.month}-${nowDateFormat.day}`
                } else if (parseInt(type) === 30) {
                    date = `${nowDateFormat.year}-${nowDateFormat.month}`
                }
                this.ajaxVisitStatistics(date)
            }
        },
        created() {
            this.ajaxLoadAllPartys()
            // 初始化日期
            this.datepicker.day = new Date()
            this.datepicker.month = new Date()
            this.handleChange()
        },
        mounted() {
        },
        beforeDestroy() {

        }
    }
</script>
