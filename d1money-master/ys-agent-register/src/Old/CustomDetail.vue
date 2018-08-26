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
        <div class="customDesc_btn">
            <!--查看添加备忘录-->
            <div class="btn mermorandumBtn" @click="seeMermorandum">
                <i class="iconfont icon-jilu1"></i>
            </div>
            <!--添加数据-->
            <router-link class="btn addBtn" :to="{ name: 'AddRepublishVisitingRecord', query: {customerName: userInfo.userName} }" tag="div">
                <i class="iconfont icon-jia"></i>
            </router-link>
        </div>

        <!--<div v-transfer-dom>-->
            <!--<x-dialog v-model="mermorandum.show" class="dialog" hide-on-blur>-->
                <!--<p class="dialog-title" style="padding: 15px 0 0; font-size: 18px">备忘录</p>-->
                <!--<textarea v-model="mermorandum.desc" class="desc" placeholder="请填写备忘录"-->
                          <!--style="box-sizing: border-box;height:256px ;max-height:256px;width: 100%;padding:15px;overflow:scroll;-webkit-overflow-scrolling:touch;resize: none;font-size: 14px;outline: none;-->
    <!--border: none;color: #666;"></textarea>-->
                <!--<x-button @click.native="ajaxDoCommitMermorandum" type="cancel">-->
                    <!--提交-->
                <!--</x-button>-->
            <!--</x-dialog>-->
        <!--</div>-->

        <div v-transfer-dom>
            <confirm v-model="mermorandum.show" class="customDetail__dialog" hide-on-blur
                     title="备忘录"
                     cancel-text="关闭"
                     confirm-text="保存"
                     @on-cancel="mermorandum.show = !mermorandum.show"
                     @on-confirm="ajaxDoCommitMermorandum"
                     @on-show="onShow"
                     @on-hide="onHide">
                <group class="customDetail__dialog__hd" :gutter="0">
                    <x-textarea
                        v-model="mermorandum.desc"
                        :show-counter="true"
                        :max="1000"
                        :height="150"
                        placeholder="请填写备忘记录"
                    ></x-textarea>
                </group>
            </confirm>
        </div>
    </div>
</template>

<script>
    import {XInput, Group, XButton, Cell, Flexbox, FlexboxItem, XImg, XTextarea, querystring, XDialog, Confirm, dateFormat} from 'vux'
    export default {
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
                pageCount: 1,
                mermorandum: {
                    show: false,
                    desc: ''
                }
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
            XTextarea,
            XDialog,
            Confirm
        },
        computed: {},
        methods: {
            //  去空
            trim(str) {
                return str.replace(/^\s+|\s+$/g, '')
            },
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
                    this.$http.post('/ys/gzrz/services/pageVisitingRecordsByCustomerId', querystring.stringify({
                        pageNo: this.pageNo,
                        pageSize: this.pageSize,
                        customerId: this.$route.params.customerId
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
            // 获取备忘录
            ajaxLoadMermorandumByCustomerId(){
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/gzrz/services/loadMermorandumByCustomerId', querystring.stringify({
                        customerId: this.$route.params.customerId
                    }))
                        .then(result => {
                            this.$vux.loading.hide()
                            if (result.data.code === 'SUCCESS') {
                                if (result.data.body === null) {
                                    resolve(result.data.body)
                                } else {
                                    resolve(result.data.body.content)
                                }
                            } else {
                                console.error(`错误Code: ${result.data.code}, 错误信息: ${result.data.msg}`)
                                reject(result.data)
                            }
                        })
                        .catch(error => {
                            this.$vux.loading.hide()
                            console.error(`ajax异常 ${JSON.stringify(error)}`)
                            this.$vux.toast.show({
                                type: 'cancel',
                                text: '请求超时'
                            })
                            reject(error)
                        })
                })
            },
            // 提交备忘录
            ajaxDoCommitMermorandum(){
                if (this.trim(this.mermorandum.desc) === '') {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '请填备忘录'
                    })
                    return
                }
                this.$vux.loading.show({
                    text: '更新备忘录中...'
                })
                this.$http.post('/ys/gzrz/services/doCommitMermorandum', querystring.stringify({
                    customerId: this.$route.params.customerId,
                    content: this.mermorandum.desc
                }))
                    .then(result => {
                        this.$vux.loading.hide()
                        if (result.data.code === 'SUCCESS') {
                            this.$vux.toast.show({
                                type: 'success',
                                time: 1000,
                                text: '提交成功'
                            })
                            this.mermorandum.show = false
                        } else {
                            console.error(`错误Code: ${result.data.code}, 错误信息: ${result.data.msg}`)
                        }
                    })
                    .catch(error => {
                        this.$vux.loading.hide()
                        console.error(`ajax异常 ${JSON.stringify(error)}`)
                        this.$vux.toast.show({
                            type: 'cancel',
                            text: '请求超时'
                        })
                    })
            },
            // 查看备忘录
            async seeMermorandum(){
                this.$vux.loading.show({
                    text: '加载备忘录中...'
                })
                this.mermorandum.desc = await this.ajaxLoadMermorandumByCustomerId()
                this.mermorandum.show = true
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
        async created(){
            let visitingRecords = await this.ajaxPageVisitingRecordsByCustomerId()
            this.list = visitingRecords.list
            this.userInfo.userName = this.list[0].userName ? this.list[0].userName : ''
            this.userInfo.phoneNumber = this.list[0].phoneNumber ? this.list[0].phoneNumber : ''
            this.userInfo.address = this.list[0].address ? this.list[0].address : ''
        },
        async mounted() {

        },
        destroyed(){
//            this.$router.push({
//                name: 'myVisitingRecord', params: {currentIndex: 1}
//            })
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import '~vux/src/styles/close';

    .customDesc {
        @styleColor: #68baf9;
        @styleColorOther: #fbcf4b;
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
        .customDesc_btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            .btn {
                width: 50px;
                height: 50px;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border-radius: 100%;
                line-height: 50px;
                text-align: center;
                color: #ffffff;
                z-index: 999;
                i.iconfont {
                    font-size: 35px;

                }
                &:last-child {
                    margin-top: 20px;
                }
            }
            .addBtn {
                background-color: @styleColor;
                box-shadow: 0 0px 15px 0px #ccc;

            }
            .mermorandumBtn {
                background-color: @styleColorOther;
                box-shadow: 0 0px 15px 0px #ccc;
            }
        }
    }
    .customDetail__dialog{
        .weui-dialog__hd{
            padding-bottom:0;
        }
        .weui-dialog__bd{
            padding:0;
        }
        .customDetail__dialog__hd .weui-cells{
            &:after,&:before{
                display: none;
            }
        }
    }
</style>
