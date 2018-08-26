<style lang="less" rel="stylesheet/less" scoped="scoped">
    .customerDetail {
        .customerDetail__hd {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            padding: 10px;
            position: relative;
            background-color: #ffffff;
            &:before {
                content: " ";
                position: absolute;
                left: 0;
                bottom: -1px;
                right: 0;
                height: 1px;
                border-top: 1px solid #D9D9D9;
                color: #D9D9D9;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }
            .img {
                width: 46px;
                height: 46px;
                overflow: hidden;
                border-radius: 5px;
                margin-right: 15px;
                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
            }
            .content {
                flex: 1;
                display: flex;
                flex-flow: column nowrap;
                .nickname {
                    .name {
                        color: #333;
                        font-size: 16px;
                        margin-right: 10px;
                    }
                }
                .desc {
                    .tips {
                        background-color: #f2f2f2;
                        padding: 0 5px;
                        font-size: 12px;
                        border-radius: 2px;
                        margin-right: 5px;
                        &:last-child {
                            margin-right: 0;
                        }
                        &.friend {
                            background-color: #4aa1f0;
                            color: #fff;
                        }
                    }
                }
            }
            .right {
                i.iconfont {
                    font-size: 30px;
                    color: #4aa1f0;
                }
            }
        }
        .customerDetail__bd {
            margin-top: 10px;
            .datasGrid {
                background-color: #ffffff;
                a {
                    font-weight: 300;
                    color: #969696;
                }
                :global {
                    .weui-grid {
                        &:before {
                            top: 10px;
                            bottom: 10px;
                        }
                        &:last-child {
                            &:before {
                                display: none;
                            }
                        }
                    }
                }
            }
            .infoGrid {
                margin-top: 10px;
                position: relative;
                .item {
                    background-color: #ffffff;
                }
                :global {
                    .weui-cell {
                        font-size: 14px;
                        color: #333;
                    }
                }
                &:after {
                    content: " ";
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    height: 1px;
                    border-top: 1px solid #D9D9D9;
                    color: #D9D9D9;
                    -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
                    -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
                }
                &:before {
                    content: " ";
                    position: absolute;
                    left: 0;
                    bottom: -1px;
                    right: 0;
                    height: 1px;
                    border-bottom: 1px solid #D9D9D9;
                    color: #D9D9D9;
                    -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
                    -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
                }
            }
        }
    }
</style>
<template>
    <div class="customerDetail">
        <div class="customerDetail__hd">
            <div class="img">
                <img :src="detail ? detail.headurl : '' " alt="">
            </div>
            <div class="content">
                <p class="nickname">
                    <span class="name">{{realname}}</span>
                </p>
                <div class="desc">
                    <span v-if="detail && detail.minlevel>2" class="tips">非好友</span>
                    <span v-else="detail && detail.minlevel>2" class="tips friend">好友</span>
                </div>
            </div>
            <div class="right">
                <a :href="'tel:' + phonenum">
                    <i class="iconfont icon-phone"></i>
                </a>
            </div>
        </div>
        <div class="customerDetail__bd">
            <grid class="datasGrid" :cols="5">
                <grid-item style="padding: 10px 0;" v-for="(item, index) in countlist" :key="index">
                    <div style="font-size: 12px; text-align: center">
                        <b style="color: #666;font-size: 16px;">{{item.totalcount}}</b>
                        <br/>
                        {{item.typename}}
                    </div>
                </grid-item>
                <grid-item style="padding: 10px 0;" v-for="i in (5 -  countlist.length % 5)" :key="'datasGrid'+ i">
                    <div style="font-size: 12px; text-align: center;color:#fff;visibility: hidden">
                        <b style="color: #666;font-size: 16px;">占位</b>
                        <br/>
                        占位
                    </div>
                </grid-item>
            </grid>
            <div class="infoGrid" ref="infoForm">
                <group class="item" :gutter="0">
                    <x-input
                        style="display: none"
                        name="customeruserid"
                        v-model="id"
                        type="number"
                        :required="false"
                    ></x-input>
                    <selector
                        title="客户关系"
                        name="minlevel"
                        v-model="minlevel"
                        type="number"
                        placeholder="请选择客户关系"
                        :options="[{id: 2, name: '好友'}, {id: 3, name: '非好友'}]"
                        :value-map="['id', 'name']">
                    </selector>
                    <selector
                        title="客户状态"
                        name="stateid"
                        v-model="stateid"
                        type="number"
                        placeholder="请选择客户状态"
                        :options="statusList"
                        :value-map="['id', 'name']">
                    </selector>
                    <selector
                        title="客户分级"
                        name="gradeid"
                        v-model="gradeid"
                        type="number"
                        placeholder="请选择客户等级"
                        :options="classificationList"
                        :value-map="['id', 'name']">
                    </selector>
                    <p style="margin-top: 10px;"></p>
                    <x-input
                        title="姓名"
                        name="realname"
                        v-model="realname"
                        placeholder="请填写您的姓名"
                        :required="false"
                        :should-toast-error="false"
                    ></x-input>
                    <x-input
                        title="手机号"
                        name="phonenum"
                        v-model="phonenum"
                        placeholder="请填写手机号"
                        type="tel"
                        is-type="china-mobile"
                        :required="false"
                        :should-toast-error="true"
                    ></x-input>
                </group>

                <group class="item" :gutter="10">
                    <x-input
                        title="年龄"
                        name="age"
                        v-model="age"
                        placeholder="请填写您的年龄"
                        type="number"
                        :required="false"
                        :should-toast-error="false"
                    ></x-input>
                    <x-input
                        title="子女"
                        name="children"
                        v-model="children"
                        placeholder="请填写子女数量"
                        type="number"
                        :required="false"
                        :should-toast-error="false"
                    ></x-input>
                    <selector
                        title="性别"
                        name="sex"
                        v-model="sex"
                        placeholder="请选择客户性别"
                        :options="[{id:0,name: '未知'},{id:1,name: '男'},{id:2,name:'女'}]"
                        :value-map="['id', 'name']">
                    </selector>
                    <selector
                        title="是否已婚"
                        name="married"
                        v-model="married"
                        placeholder="请选择客户是否已婚"
                        :options="[{id:0, name: '未婚'}, {id:1,name: '已婚'}]"
                        :value-map="['id', 'name']"
                    ></selector>

                    <datetime
                        v-model="birthday"
                        title="生日"
                        format="YYYY-MM-DD"
                    >
                    </datetime>
                </group>
                <box gap="15px 20px">
                    <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="updateInfo">修改</x-button>
                </box>
            </div>
        </div>
    </div>
</template>

<script>
    import {Group, Grid, GridItem, Selector, XInput, XButton, Box, Datetime} from 'vux'
    import DmFormMixin from './../../mixins/DmFormMixin.vue'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    export default {
        props: ['id'],
        mixins: [DmFormMixin],
        data() {
            return {
                loading: true,
                detail: null,
                countlist: [],
                classificationList: [],
                statusList: [],
                stateid: null,
                gradeid: null,
                minlevel: null,
                realname: null,
                phonenum: null,
                sex: null,
                age: null,
                children: null,
                married: null,
                birthday: null
            }
        },
        components: {
            Group,
            Grid,
            GridItem,
            Selector,
            XInput,
            XButton,
            Box,
            Datetime,
            DmLoading
        },
        computed: {},
        methods: {
            init() {
                Promise.all([
                    this.ajaxLoadCustomerdetail(),
                    this.ajaxLoadCustomerlevelList(),
                    this.ajaxLoadCustomerStatusList()
                ]).then(res => {
                    const [detail, classificationList, statusList] = res
                    this.detail = detail

                    this.stateid = detail.stateid
                    this.gradeid = detail.gradeid
                    this.minlevel = detail.minlevel
                    this.realname = detail.realname
                    this.sex = detail.sex
                    this.age = detail.age
                    this.children = detail.children
                    this.phonenum = detail.phonenum
                    this.married = detail.married
                    this.birthday = detail.birthday ? detail.birthday.substring(0, 10) : null

                    this.countlist = detail.countlist
                    this.classificationList = classificationList
                    this.statusList = statusList
                    this.loading = false
                })
            },
            ajaxLoadCustomerdetail() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/customer/services/loadCustomerdetail',
                        data: {
                            customeruserid: this.id
                        }
                    }).then(res => {
                        resolve(res)
                    })
                })
            },
            // 获取客户分级列表
            ajaxLoadCustomerlevelList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/customer/services/selectAllCustomerGrade'
                    }).then((res) => {
                        resolve(res)
                    })
                })
            },
            // 获取客户状态列表
            ajaxLoadCustomerStatusList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/customer/services/selectAllCustomerState'
                    }).then((res) => {
                        resolve(res)
                    })
                })
            },
            updateInfo() {
                if (this.phonenum !== null) {
                    const pa = /^1[345789]\d{9}$/
                    if (!pa.test(this.phonenum)) {
                        this.$vux.toast.text('手机号码格式不对哦~', 'center')
                        return
                    }
                }
                this.$vux.loading.show({
                    text: '加载中...'
                })
                let appendData = {}
                if (this.birthday) {
                    appendData = {
                        birthday: this.birthday
                    }
                }
                this.formMixin_submit({
                    formRef: 'infoForm',
                    url: '/agent/customer/services/updateCustomerdetail',
                    appendData
                }).then(res => {
                    console.log(res)
                    this.$vux.loading.hide()
                })
            }
        },
        created() {
            this.init()
        },
        mounted() {
        }
    }
</script>
