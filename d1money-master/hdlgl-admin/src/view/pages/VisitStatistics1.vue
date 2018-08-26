<style scoped rel="stylesheet/less" lang="less">
    .visitData {
        height: calc(~ "100% - 41px");
        .leftMain {

        }
        .rightMain {
            .searchBox {
                margin-bottom: 20px;
            }
            .table {
                .userDescModalBox {
                    h1 {
                        font-size: 16px;
                        font-weight: normal;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="visitData">
        <Row :gutter="0" style="height: 100%;">
            <i-col span="4" style="border:1px solid #dedede;border-radius: 5px;height: 100%;">
                <Tree
                    :data="data5"
                    :render="renderContent"
                ></Tree>
            </i-col>
            <i-col span="20" class="rightMain" style="padding-left: 20px;">
                <div class="searchBox">
                    <RadioGroup v-model="type" type="button">
                        <Radio label="1">日</Radio>
                        <Radio label="7">周</Radio>
                        <Radio label="30">月</Radio>
                    </RadioGroup>
                    <DatePicker v-show="type == 1" type="date" :options="selectday" placeholder="请选择开始日期"
                                :editable="false" style="width: 200px"></DatePicker>
                    <DatePicker v-show="type == 7"
                                :open="openWeekPicker"
                                :value="WeekPickerValue"
                                type="date"
                                :options="selectWeek"
                                placeholder="请选择开始日期"
                                style="width: 200px"
                                @on-change="handleChange"
                    >
                        <Input
                            v-model="WeekPickerValue"
                            placeholder="请选择开始日期"
                            style="width: 200px"
                            icon="ios-calendar-outline"
                            @on-focus="onfocus1"
                            @on-blur="onblur"
                        ></Input>
                    </DatePicker>
                    <DatePicker v-show="type == 30" type="month" :options="selectMounth" placeholder="请选择开始日期"
                                :editable="false" style="width: 200px"></DatePicker>
                </div>
                <div class="table">
                    <Table :loading="loading" width="100%" border :columns="changeColumns" :data="data3"></Table>
                    <Modal v-model="userDescModal" width="420">
                        <p slot="header" style="text-align:center;font-size: 18px;">
                            <Icon type="information-circled"></Icon>
                            <span>拜访详情1</span>
                        </p>
                        <div style="height: 400px;overflow-y: auto;">
                            <template v-for="i in 8">
                                <Article></Article>
                            </template>
                        </div>
                        <div slot="footer">
                            <Button type="primary" size="large" long @click="toggleUserDescModal">关闭</Button>
                        </div>
                    </Modal>
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
                data5: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ],
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
                WeekPickerValue: null,
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
                columns2: [
                    {
                        title: '姓名',
                        key: 'name',
                        fixed: 'left'
                    },
                    {
                        title: '部门',
                        key: 'age'
                    },
                    {
                        title: 'Province',
                        key: 'province'
                    },
                    {
                        title: 'City',
                        key: 'city'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: '汇总',
                        key: 'zip'
                    }
                ],
                data3: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        province: 'America',
                        city: 'New York',
                        zip: 100000
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'Washington, D.C. No. 1 Lake Park',
                        province: 'America',
                        city: 'Washington, D.C.',
                        zip: 100000
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        province: 'Australian',
                        city: 'Sydney',
                        zip: 100000
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        province: 'Canada',
                        city: 'Ottawa',
                        zip: 100000
                    }
                ]
            }
        },
        components: {
            Article
        },
        computed: {
            changeColumns() {
//                console.log(this.columns2)
                return this.columns2
            }
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            handleChange(data) {
                let date = new Date(data + ' 00:00:00')
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
                this.WeekPickerValue = `${weekFristDayFormat.year}-${weekFristDayFormat.month}-${weekFristDayFormat.day} 至 ${weekLastDayFormat.year}-${weekLastDayFormat.month}-${weekLastDayFormat.day}`
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
                                h('span', data.title)
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
                        h('span', {
                            class: ['treeChildren_12']
                        }, [
                            h('Avatar', {
                                props: {
                                    icon: 'person',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', data.title)
                        ])
                    ])
                }
            },
            loadVisitList(root, node, data) {
                console.log('查看用户信息')
                console.log(root)
                console.log(node)
                console.log(data)
            },
            toggleUserDescModal(){
                if ( this.userDescModal ) {
                    this.userDescModal = false
                } else {
                    this.userDescModal = true
                }
            }
        }
    }
</script>
