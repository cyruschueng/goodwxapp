<template>

    <div class="customDesc" style="margin-bottom: 10px;">
        <div class="customDesc__from">
            <group class="customName" :gutter="0">
                <x-input title="姓名" v-model="userInfo.userName" placeholder="请填写客户姓名" readonly></x-input>
            </group>

            <group v-if="userInfo.phoneNumber" class="position" :gutter="0">
                <x-input title="手机" v-model="userInfo.phoneNumber" is-type="china-mobile" placeholder="请输入手机号"
                         readonly></x-input>
            </group>
            <group v-if="userInfo.address" class="position" :gutter="0">
                <x-input title="地址" v-model="userInfo.address" placeholder="请选择地理位置" readonly></x-input>
            </group>
        </div>
        <div class="customDesc__visit">
            <scroller
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="myscroller"
                style="position:relative;height: 100%;"
            >
                <group class="visitTime__group">
                    <template v-for="(item, index) in list">
                        <cell>
                            <div class="visitTime__title" slot="after-title">
                                <flexbox justify="space-between" :gutter="0">
                                    <flexbox-item class="nickName">
                                        第{{list.length - index}}次拜访
                                    </flexbox-item>
                                    <flexbox-item class="time">
                                        {{time(item.time, 1, 1)}}
                                    </flexbox-item>
                                </flexbox>
                            </div>
                            <div class="visitTime__content" slot="inline-desc">
                                <p class="desc">
                                    <template v-if="item.type===1">【补充拜访记录】</template>
                                    {{item.desc}}
                                </p>
                                <template v-if="item.position">
                                    <p class="position">
                                        <i class="iconfont icon-ai-seat"></i>{{item.position}}
                                    </p>
                                </template>
                            </div>
                        </cell>
                    </template>
                </group>
            </scroller>
        </div>
    </div>
</template>

<script>
    import {XInput, Group, XButton, Cell, Flexbox, FlexboxItem, XImg, XTextarea, querystring, dateFormat} from 'vux'

    export default {
        props: ['customerId', 'userid'],
        data() {
            return {
                userInfo: {
                    userName: '',
                    phoneNumber: '',
                    address: ''
                },
                list: [],
                pageNo: 0,
                pageSize: 10,
                pageCount: 1
            }
        },
        components: {
            XInput,
            Group,
            XButton,
            Cell,
            Flexbox,
            FlexboxItem,
            XImg,
            XTextarea
        },
        computed: {},
        methods: {
            async refresh(done) {
                this.pageNo = 0
                let visitingRecords = await this.ajaxPageVisitingRecordsByCustomerId()
                this.list = visitingRecords.list
                this.pageCount = visitingRecords.pageCount
                this.userInfo.userName = this.list[0].userName ? this.list[0].userName : ''
                this.userInfo.phoneNumber = this.list[0].phoneNumber ? this.list[0].phoneNumber : ''
                this.userInfo.address = this.list[0].address ? this.list[0].address : ''
                done()
            },
            async infinite(done) {
                if (this.pageNo >= this.pageCount - 1) {
                    this.$refs.myscroller.finishInfinite(2)
                    return
                }
                this.pageNo++
                let visitingRecords = await this.ajaxPageVisitingRecordsByCustomerId()
                this.pageCount = visitingRecords.pageCount
                this.list = this.list.concat(visitingRecords.list)
                done()
            },
            // 分页加载团队拜访记录
            ajaxPageVisitingRecordsByCustomerId() {
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/gzrz/services/pageVisitingRecordsByLeaderSelectedCustomerId', querystring.stringify({
                        pageNo: this.pageNo,
                        pageSize: this.pageSize,
                        customerId: this.customerId,
                        userid: this.userid
                    }))
                        .then(result => {
                            if (result.data.code === 'SUCCESS') {
                                this.pageCount = result.data.body.pageCount
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
            }
        },
        async mounted() {
            let visitingRecords = await this.ajaxPageVisitingRecordsByCustomerId()
            this.list = visitingRecords.list
            this.userInfo.userName = this.list[0].userName ? this.list[0].userName : ''
            this.userInfo.phoneNumber = this.list[0].phoneNumber ? this.list[0].phoneNumber : ''
            this.userInfo.address = this.list[0].address ? this.list[0].address : ''
        },
        destroyed() {
//            this.$router.push({
//                name: 'myVisitingRecord', params: {currentIndex: 1}
//            })
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .customDesc {
        height: 100%;
        input:disabled, textarea:disabled {
            color: #000000 !important;
        }
        .customDesc__from {

        }
        .customDesc__visit {
            height: 100%;
            .visitTime__group {
                .visitTime__title {
                    margin-bottom: 5px;
                    .nickName {
                        font-size: 14px;
                    }
                    .time {
                        color: #666;
                        font-size: 12px;
                        font-weight: 300;
                        text-align: right;
                    }
                }
                .visitTime__content {
                    .desc {
                        font-size: 16px;
                        color: #000000;
                    }
                    .position {
                        margin-top: 5px;
                        color: #666666;
                        font-size: 12px;
                        font-weight: 300;
                        i.iconfont {
                            font-size: 12px;
                            color: #999999;
                        }
                    }
                }
            }
        }
    }
</style>
