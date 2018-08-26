<style scoped rel="stylesheet/less" lang="less">
    .visitStatistics {
        height: calc(~ "100% - 41px");

        :global {
            .leftMain {
                border: 1px solid rgb(222, 222, 222);
                border-radius: 5px;
                height: 100%;
                max-height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
            }
        }

        .rightMain {
            height: 100%;
            .searchBox {
                margin-bottom: 20px;
            }
            .content {
                position: relative;
                height: calc(~ "100% - 52px");
                overflow-y: auto;
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
    <div class="visitStatistics">
        <Row :gutter="0" style="height: 100%;">
            <i-col span="4" style="border:1px solid #dedede;border-radius: 5px;min-height: 100%;overflow-x: hidden">
                <Spin size="large" fix v-if="partyListLoading"></Spin>
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
                    <Button
                        type="primary"
                        :loading="exportExcelLoading"
                        icon="ios-cloud-download"
                        shape="circle"
                        @click="ajaxExportExcel"
                    >
                        <span v-if="!exportExcelLoading">导出excel</span>
                        <span v-else>导出中...</span>
                    </Button>
                </div>
                <div class="content">
                    <div class="table">
                        <template v-if="visitList.length === 0 && !selectPartyId">
                            请先选择部门
                        </template>
                        <template v-else>
                            <i-table
                                :loading="tableDataLoading"
                                width="100%" border
                                :columns="changeColumns"
                                :data="tableData"
                                ref="table"
                            ></i-table>
                        </template>
                        <Modal v-model="userDescModal.show" width="420">
                            <p slot="header" style="text-align:center;font-size: 18px;">
                                <Icon type="information-circled"></Icon>
                                <span>{{userDescModal.title}}</span>
                            </p>
                            <div style="height: 400px;overflow-y: auto;">
                                <Spin size="large" fix v-if="visitListLoading"></Spin>
                                <dm-article
                                    v-if="visitList.length !== 0"
                                    v-for="item in visitList"
                                    :title="'拜访客户 · ' + item.customerName"
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
                userDescModal: {
                    show: false,
                    title: '拜访详情'
                },
                partyListLoading: true,
                partyList: [],
                selectPartyId: null,
                selectPartyName: null,
                selectUser: {
                    userId: null,
                    avatar: null
                },
                // 拜访记录
                visitListLoading: false,
                visitList: [],
                // table
                tableDataLoading: false,
                tableData: [],
                // 导出excel
                exportExcelLoading: false,
                msg: {
                    selectPartyName: null,
                    date: null
                }
            }
        },
        components: {
            'dm-article': Article
        },
        computed: {
            // 整理后的部门成员
            partys() {
                if (!this.partyList || this.partyList.length === 0) {
                    return []
                }
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
                let partysTree = this.convertTreeData1(this.partyList, attributes)
                partysTree[0].expand = true
                return partysTree
            },
            changeColumns() {
                let tableHeader = [
                    {
                        title: '姓名',
                        key: 'username',
                        fixed: 'left',
                        width: 130,
                        align: 'center'
                    },
                    {
                        title: '部门',
                        key: 'partyName',
                        width: 130,
                        align: 'center'
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
                                width: 130,
                                align: 'center'
                            })
                        } else {
                            if (!['userid', 'avatar'].includes(i)) {
                                tableHeader.push({
                                    title: i.slice(0, 10),
                                    key: i,
                                    width: 130,
                                    align: 'center',
                                    render: (h, params) => {
                                        return h('div', {
                                            style: {
                                                cursor: 'pointer'
                                            },
                                            on: {
                                                click: () => {
                                                    this.toggleUserDescModal(params)
                                                }
                                            }
                                        }, [
                                            h('strong', params.row[i])
                                        ])
                                    }
                                })
                            }
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
                                        type: 'folder'
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
                this.msg.selectPartyName = data.name
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
            toggleUserDescModal(params) {
                if (this.userDescModal.show) {
                    this.userDescModal.show = false
                } else {
                    console.log(params)
                    this.selectUser.userId = params.row.userid
                    this.selectUser.avatar = params.row.avatar

                    if (params.row.username === '汇总') {
                        return
                    }
                    if (!this.selectUser.userId) {
                        this.$Message.warning('请先选择部门')
                        return
                    }
                    this.userDescModal.show = true
                    this.userDescModal.title = `${params.row.username}${params.column.title}拜访记录`
                    this.ajaxLoadVisitRecordByUserid(params.column.title)
                }
            },
            // 所有部门接口
            ajaxLoadAllPartys() {
                this.partyListLoading = true
                this.$http.post('loadAllPartys')
                    .then(res => {
                        console.log(res)
                        this.partyList = res
                        this.partyListLoading = false
                    })
                    .catch((code, msg) => {
                        this.partyListLoading = false
                        this.$Notice.error({
                            title: '获取数据失败',
                            desc: '错误码:' + code + ', 错误信息: ' + msg
                        })
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
                this.msg.date = date
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
            },
            // 他人拜访记录
            ajaxLoadVisitRecordByUserid(date) {
                this.visitListLoading = true
                this.$http.post('loadVisitRecordByUserid', {
                    userid: this.selectUser.userId,
                    datetype: 1,
                    date
                }).then(res => {
                    console.log(res)
                    this.visitList = res
                    this.visitListLoading = false
                }).catch((err) => {
                    console.log(err)
                    this.visitListLoading = false
                    this.$Notice.error({
                        title: '数据请求失败',
                        desc: '数据请求失败, 可能由于您的网络未连接或太长时间停留在页面, 检查网络, 并重新登陆企业应用进入服务商后台! '
                    })
                })
            },
            // 导出excel
            ajaxExportExcel() {
                console.log(this.datepicker.week)
                console.log(this.datepicker)
                if (!this.selectPartyId) {
                    this.$Message.warning('请先选择部门')
                    return
                }
                if (this.tableData.length === 0) {
                    this.$Message.warning('没有数据可以导出!')
                    return
                }

                this.$refs.table.exportCsv({
                    filename: `${this.msg.selectPartyName}${this.msg.date}拜访数据`
                })
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
