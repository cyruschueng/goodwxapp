<style lang="less" rel="stylesheet/less">
    .d1customer {
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        .select {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            border-bottom: 1px solid #efefef;
            background-color: #fff;
            margin-bottom: 10px;
            .select__item {
                position: relative;
                flex: 1;
                text-align: center;
                select{
                    /*width: 100%;*/
                    height: 100%;
                    -webkit-appearance:none;
                    background-color: #fff;
                    /*flex: 1;*/
                    text-align: center;
                    width: auto;
                    padding: 10px 25%;
                    margin: 0;
                    outline: none;
                    border: none;
                    option {
                        text-align: center;
                    }
                }
                &:before{
                    position: absolute;
                    content: '';
                    top:5px;
                    bottom:5px;
                    right:0;
                    border-right:1px solid #f2f2f2;
                }
            }

        }
        .customerList {
            margin-top: 38px;
            padding-top: 8px;
            height: calc(~"100% - 44px") !important;
            .customer {
                background-color: #fff;
                display: flex;
                flex-flow: row nowrap;
                padding: 15px;
                position: relative;
                &:first-child {
                    &:before {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        content: '';
                        border-top: 1px solid #efefef;

                    }
                }
                &:after {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    content: '';
                    border-bottom: 1px solid #efefef;

                }
                .left {
                    width: 46px;
                    height: 46px;
                    margin-right: 10px;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        -webkit-border-radius: 5px;
                        -moz-border-radius: 5px;
                        border-radius: 5px;
                        overflow: hidden;
                    }
                }
                .content {
                    flex: 1;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: space-between;
                    .nickname {
                        font-size: 14px;
                        .tips{
                            background-color: #f2f2f2;
                            padding:0 5px;
                            font-size: 12px;
                            margin-left: 10px;
                            color: #333;
                            border-radius: 30px;
                            &.friend{
                                background-color: #4aa1f0;
                                color: #fff;
                            }
                        }
                        .time {
                            font-size: 12px;
                            float: right;
                        }
                    }
                    .applist {
                        margin-top: 5px;
                        width: 100%;
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        span{
                            font-size: 12px;
                            color: #333;
                            margin-right: 10px;
                            padding: 2px 5px;
                            border-radius: 2px;
                            &:last-child{
                                margin-right: 0;
                            }
                        }
                        img {
                            width: 15px;
                            height: 15px;
                            overflow: hidden;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="d1customer">
        <DmLoading v-if="loading" img="/static/common/img/loadingImg.png"></DmLoading>
        <template v-else="loading">
            <div class="select">
                <div class="select__item">
                    <select v-model="minlevel" @change="selectChangebyMinlevel">
                        <option value="-1" disabled selected>客户关系</option>
                        <option value="-1">全部</option>
                        <option v-for="(item, index) in customerRelations" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
                <div class="select__item">
                    <select v-model="gradeid" @change="selectChangebyGradeid">
                        <option value="-1" disabled selected>客户分级</option>
                        <option value="-1">全部</option>
                        <option v-for="(item, index) in classificationList" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
                <div class="select__item">
                    <select v-model="stateid" @change="selectChangebyStateid">
                        <option value="-1" disabled selected>客户状态</option>
                        <option value="-1">全部</option>
                        <option v-for="(item, index) in statusList" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
            </div>
            <scroller
                class="customerList"
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="dmscroller"
            >
                <router-link
                    class="customer"
                    v-for="(item, index) in list" :key="index"
                    :to="{name: 'CustomerDetail', params: {id: item.customeruserid}}"
                    tag="div"
                >
                    <div class="left">
                        <img :src="item.headurl" alt="">
                    </div>
                    <div class="content">
                        <p class="nickname">
                            {{item.realname}}
                            <span v-if="item.minlevel<=2" class="tips friend">好友</span>
                            <span v-else class="tips">非好友</span>
                            <span class="time">
                            {{timeAgoHasHourAndMinute(item.createtime)}}
                        </span>
                        </p>
                        <div class="applist">
                            <template v-if="item.typeicons" v-for="(typeiconitem, typeiconindex) in item.typeicons.split(',')">
                            <span
                                :style="{
                                    backgroundColor: typeiconitem.split('|')[3] ? typeiconitem.split('|')[1] : '#f2f2f2',
                                    color: typeiconitem.split('|')[3] ? '#fff' : '#333'
                                }"
                            >
                                {{typeiconitem.split('|')[0]}}
                            </span>
                                <!--<img :src="'/static/agent/index/img/appIcon/' + app.id + '.png'"/>-->
                                <!--<img :src="'../../static/img/appIcon/' + app.id + '.png'"/>-->
                            </template>
                        </div>
                    </div>
                </router-link>
            </scroller>
        </template>
    </div>
</template>

<script>
    import UtilMixin from './../mixins/UtilMixin.vue'
    import ScrollerMixin from './../mixins/ScrollerMixin.vue'
    import {Popover, Selector} from 'vux'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    export default {
        mixins: [UtilMixin, ScrollerMixin],
        data() {
            return {
                loading: true,
                isInit: false,
                gradeid: -1, // 客户关系
                stateid: -1,       // 客户状态
                minlevel: -1,   // 客户分级
                customerRelations: [
                    {
                        id: 1,
                        name: '好友'
                    },
                    {
                        id: 2,
                        name: '非好友'
                    }
                ],
                classificationList: [],
                statusList: [],
                list: []
            }
        },
        components: {
            Popover,
            Selector,
            DmLoading
        },
        computed: {},
        methods: {
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
            // 分页加载客户列表
            ajaxPageDateByList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/customer/services/loadCustomerlist',
                        data: {
                            gradeid: this.gradeid,
                            stateid: this.stateid,
                            minlevel: this.minlevel,
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        },
                        tips: true
                    }).then(result => {
                        resolve(result)
                    }).catch((code, msg) => {
                        reject(code, msg)
                    })
                })
            },
            init() {
                Promise.all([
                    this.ajaxPageDateByList(),
                    this.ajaxLoadCustomerlevelList(),
                    this.ajaxLoadCustomerStatusList()
                ]).then(res => {
                    console.log(res)
                    const [ result, classificationList, statusList ] = res

                    this.list = result.list
                    this.pageCount = result.pageCount

                    this.classificationList = classificationList
                    this.statusList = statusList
                    this.loading = false
                })
            },
            async selectChangebyGradeid(val){
                this.gradeid = val.target.value
                const result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
            },
            async selectChangebyMinlevel(val){
                this.minlevel = val.target.value
                const result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
            },
            async selectChangebyStateid(val){
                this.stateid = val.target.value
                const result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
            }
        },
        created() {
            this.init()
        },
        mounted() {
        }
    }
</script>


