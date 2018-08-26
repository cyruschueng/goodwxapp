<style lang="less" rel="stylesheet/less">
    @styleColor: #68baf9;
    .customerList {
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
        /*页面锚链接*/
        .customList__alink {
            position: fixed;
            right: 0;
            top: 95px;
            bottom: 5px;
            z-index: 999;
            text-align: center;
            display: flex;
            flex-direction: column;
            transition: .5s all;
            a {
                flex: 1;
                padding: 0 5px;
                font-size: 12px;
                display: block;
                color: #000;
            }
        }
        .customerList__hd {
            .userImg {
                top: 15px;
                width: 60px;
                height: 60px;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border-radius: 100%;
                overflow: hidden;
            }
        }
        .customerList_bd {
            height: calc(~ "100% - 90px");
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            /*客户列表*/
            .customList__group {
                .customList__cell {
                    padding-right: 25px;
                    .userImg {
                        width: 44px;
                        height: 44px;
                        line-height: 44px;
                        text-align: center;
                        margin-right: 10px;
                        border-radius: 100%;
                        overflow: hidden;
                        /* background-color: #969696; */
                        border: .5px solid #969696;
                        color: #fff;
                        background-color: #969696;
                        font-size: 20px;
                        font-weight: 300;
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
<template>
    <div class="customerList">
        <dm-user-card class="customerList__hd" id="dmUserCard" :img="customInfo.avatar">
            <template slot="title">
                {{customInfo.name}}
            </template>
        </dm-user-card>
        <!--客户列表-->
        <div class="customerList_bd ">
            <template v-for="(item, index) in customerList">
                <group :title="item.familyname" class="customList__group" :id="'anchor-'+item.familyname">
                    <template v-for="(item, index) in item.list">
                        <cell
                            :title="item.userName"
                            class="customList__cell"
                            @click.native="routerLink('TeamMemberCustomDetail',{customerId: item.customerId}, {userName: customInfo.name, customName: item.userName, avatar: customInfo.avatar})"
                            :inline-desc="'已拜访'+item.visitNum+'次'"
                        >
                            <div class="userImg" slot="icon">
                                {{item.userName.split('')[0]}}
                            </div>
                            {{time(item.time, 1, 1)}}
                        </cell>
                    </template>
                </group>
            </template>
        </div>
        <div
            class="customList__alink"
        >
            <a
                href="javascript:void(0)"
                v-for="(item, index) in alink"
                @click="goAnchor('#anchor-'+item)"
            >
                {{item}}
            </a>
        </div>
    </div>
</template>

<script>
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import DmUserCard from '@/components/Dcomponents/DmUserCard.vue'

    import {
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Cell,
        CellBox,
        Flexbox,
        FlexboxItem,
        Group
    } from 'vux'

    export default {
        name: 'CustomerList',
        props: ['userid', 'name'],
        mixins: [UtilMixin],
        data() {
            return {
                customInfo: {
                    avatar: './../assets/default_userImg.png',
                    name: '客户',
                    fieldVisit: 0,
                    republishVisit: 0
                },
                alink: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                customerList: []
            }
        },
        components: {
            Tab,
            TabItem,
            Swiper,
            SwiperItem,
            Group,
            Cell,
            CellBox,
            Flexbox,
            FlexboxItem,
            DmUserCard
        },
        computed: {},
        methods: {
            // 锚点跳转
            goAnchor(selector) {
                if (selector === '#anchor-#') {
                    this.$el.querySelector('.customerList_bd').scrollTop = 0
                } else {
                    let anchor = this.$el.querySelector(selector)
                    anchor ? this.$el.querySelector('.customerList_bd').scrollTop = (anchor.offsetTop - 90) : ''
                }
            },
            // 数据整理
            dataReduction(list, key) {
                let $list = []
                for (let i = 0; i < list.length; i++) {
                    let index = this.isHasInArr($list, key, list[i][key])
                    if (index !== -1) {
                        $list[index].list = $list[index].list.concat(list[i])
                    } else {
                        let object = {}
                        object[key] = list[i][key]
                        object.list = []
                        object.list.push(list[i])
                        $list.push(object)
                    }
                }
                return $list
            },
            // 数组中的{ key: value} 是否存在
            isHasInArr(arr, key, val) {
                if (arr.length === 0) {
                    return -1
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i][key] === val) {
                        return i
                    }
                }
                return -1
            },
//            客户列表 ajax
            ajaxLoadAllCustomersByLeadSelectedUser() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'loadAllCustomersByLeadSelectedUser',
                        data: {
                            userid: this.userid
                        }
                    }).then(result => {
                        resolve(result)
                    })
                })
            },
            // 当前部门成员拜访记录头像及拜访次数接口 实地拜访多少 后补多少
            ajaxLoadheadUrlandVisitCount() {
                this.$axios.post({
                    url: 'loadheadUrlandVisitCountByUserId',
                    data: {
                        userId: this.userid
                    },
                    tips: false
                }).then(res => {
//                    console.log(res)
                    this.customInfo.name = res.name
                    this.customInfo.avatar = res.avatar
                    this.customInfo.fieldVisit = res.fieldVisit
                    this.customInfo.republishVisit = res.republishVisit
                }).catch((code, msg) => {
                    this.$vux.toast.show({
                        type: 'cancel',
                        text: '获取' + this.$route.params.name + '信息失败'
                    })
                })
            }
        },
        async created() {
            this.ajaxLoadheadUrlandVisitCount()
            // 获取客户列表
            let customers = await this.ajaxLoadAllCustomersByLeadSelectedUser()
            this.customerList = this.dataReduction(customers, 'familyname')
        },
        mounted() {
        }
    }
</script>


