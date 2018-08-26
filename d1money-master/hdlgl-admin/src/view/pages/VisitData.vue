<style scoped rel="stylesheet/less" lang="less">
    .visitData {
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
    <div class="visitData">
        <Row :gutter="0" style="height: 100%;">
            <i-col span="4" class="leftMain" style="">
                <Spin size="large" fix v-if="partyListLoading"></Spin>
                <Tree
                    :data="partyUsers"
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
                        @on-change="ajaxLoadVisitRecordByUserid"
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
                        @on-change="ajaxLoadVisitRecordByUserid"
                    ></DatePicker>
                </div>
                <div class="content">
                    <Spin fix v-if="visitListLoading">
                        <Icon type="load-c" size=18    class="demo-spin-icon-load"></Icon>
                        <div>加载中...</div>
                    </Spin>
                    <dm-article
                        v-if="visitList.length !== 0"
                        v-for="item in visitList"
                        :avatar="selectUser.avatar"
                        :title="'拜访客户 · ' + item.customerName"
                        :type="item.type"
                        :content="item.content"
                        :time="item.time"
                    >
                    </dm-article>
                    <template v-if="visitList.length === 0 && selectUser.userId">
                        暂无数据
                    </template>
                    <template v-if="!selectUser.userId">
                        请选择用户
                    </template>
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
                partyListLoading: false,
                partyList: [],
                selectUser: {
                    userId: null,
                    avatar: null
                },
                // 拜访记录
                visitListLoading: false,
                visitList: []
            }
        },
        components: {
            'dm-article': Article
        },
        computed: {
            // 整理后的部门成员
            partyUsers() {
                if (!this.partyList || this.partyList.length === 0) {
                    return []
                }
                let node = {}
                for (let i = 0, length = this.partyList.length; i < length; i++) {
                    let partyNode = this.partyList[i]
                    if (node[partyNode.partyid]) {
                        node[partyNode.partyid].children.push({
                            userName: partyNode.userName,
                            userid: partyNode.userid,
                            avatar: partyNode.avatar
                        })
                    } else {
                        node[partyNode.partyid] = {
                            parentId: partyNode.parentId,
                            partyid: partyNode.partyid,
                            partyName: partyNode.partyName,
                            expand: false,
                            children: [{
                                userName: partyNode.userName,
                                userid: partyNode.userid,
                                avatar: partyNode.avatar
                            }]
                        }
                    }
                }
                let arr = []
                for (let i in node) {
                    console.log(node[i])
                    arr.push(node[i])
                }
                let attributes = {
                    // 标识字段名
                    keyField: 'partyid',
                    // 上级标识字段名
                    parentKeyField: 'parentId',
                    // 文本字段名
                    textField: 'partyName',
                    // 根节点标识
                    rootKey: 0
                }
                let partyUsersTree = this.convertTreeData(arr, attributes)
                partyUsersTree[0].expand = true
                return partyUsersTree
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
                this.ajaxLoadVisitRecordByUserid(this.datepicker.week)
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
                                    data.expand = !data.expand
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
                                h('span', data.partyName)
                            ])
                        ])
                } else {
                    return h('span', {
                        class: ['treeChildren'],
                        on: {
                            click: () => {
                                this.loadVisitList(root, node, data)
                            }
                        }
                    }, [
                        h('span', [
                            h('Avatar', {
                                props: {
                                    icon: 'person',
                                    size: 'small',
                                    src: data.avatar
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', data.userName)
                        ])
                    ])
                }
            },
            loadVisitList(root, node, data) {
                console.log('查看用户信息')
                console.log(data.userid)
                this.selectUser.userId = data.userid
                this.selectUser.avatar = data.avatar
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
                this.ajaxLoadVisitRecordByUserid(dateTime)
            },
            // 所有部门成员接口
            ajaxLoadAllPartyUsers() {
                this.partyListLoading = true
                this.$http.post('loadAllPartyUsers')
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
            ajaxLoadVisitRecordByUserid(data) {
                if (!this.selectUser.userId) {
                    this.$Message.warning('请先选择用户')
                    return
                }
                this.visitListLoading = true
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
                this.$http.post('loadVisitRecordByUserid', {
                    userid: this.selectUser.userId,
                    datetype: type,
                    date
                }).then(res => {
                    console.log(res)
                    this.visitList = res
                    this.visitListLoading = false
                }).catch((code, msg) => {
                    this.visitListLoading = false
                    this.$Notice.error({
                        title: '获取数据失败',
                        desc: '错误码:' + code + ', 错误信息: ' + msg
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
                this.ajaxLoadVisitRecordByUserid(date)
            }
        },
        created() {
            // 初始化日期
            this.datepicker.day = new Date()
            this.handleChange()
            this.datepicker.month = new Date()
            this.ajaxLoadAllPartyUsers()
        },
        mounted() {

        },
        beforeDestroy() {

        }
    }
</script>
