<style scoped rel="stylesheet/less" lang="less">
    .sub-item {
        color: #888;
    }

    .slide {
        overflow: hidden;
        max-height: 0;
        transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    }

    .animate {
        max-height: 9999px;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
    }

    /*客户列表*/
    .treeItem.customList__group {
        margin-top: 0 !important;
        .customList__cell {
            position: relative;
            padding-right: 25px;
            border-bottom: 1px solid #f2f2f2;
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
</style>
<template>
    <div class="customList__group treeItem">
        <template v-if="tree.childrens">
            <cell
                is-link
                :border-intent="false"
                :arrow-direction="tree.isFolder ? 'up' : 'down'"
                @click.native="open(tree)"
                style="border-bottom: 1px solid #f2f2f2"
            >
                <template slot="title">
                    {{tree.name}}
                    <span v-if='tree.loadNode==1'>
                        <inline-loading></inline-loading>
                    </span>
                </template>
            </cell>
        </template>
        <template v-else>
            <cell
                :title="tree.name"
                class="customList__cell"
                @click.native="goto('TeamMemberVisitingRecord',{userid: tree.id, name: tree.name})"
            >
                <div class="userImg" slot="icon">
                    <img :src="tree.avatar" alt="用户头像">
                </div>
                <template v-if="tree.visitTime" slot="inline-desc">
                    最后拜访: {{time(tree.visitTime, 1, 1)}}
                </template>
                <template v-else slot="inline-desc">
                    暂无拜访
                </template>
                今日 {{tree.todayCount}} 访
            </cell>
        </template>
        <div v-if="tree.childrens && tree.childrens.length!=0" class="slide" :class="tree.isFolder?'animate':''" style="padding-left: 10px">
            <tree-item v-for="item in tree.childrens" :tree="item" :expandfunc='expandfunc'></tree-item>
        </div>
    </div>
</template>
<script>
    import {Flexbox, FlexboxItem, Group, Cell, Card, Countup, dateFormat, InlineLoading} from 'vux'

    export default {
        name: 'tree-item',
        props: {
            tree: {},
            // 是否展开
            isOpen: {
                type: Boolean,
                default: false
            },
            expandfunc: {
                type: Function
            }
        },
        components: {
            Flexbox,
            FlexboxItem,
            Group,
            Cell,
            Card,
            Countup,
            InlineLoading
        },
        data() {
            return {
                myIsOpen: this.isOpen
            }
        },
        mounted() {
            this.myIsOpen = this.isOpen
        },
        beforeCreate: function () {
            this.$options.components.TreeItem1 = require('./TreeItem.vue')
        },
        beforeDestroy() {
        },
        methods: {
            open(m) {
                // 展开
                m.isExpand = !m.isExpand
                this.myIsOpen = !this.myIsOpen
                if (typeof this.expandfunc === 'function' && m.isExpand) {
                    if (m.loadNode !== 2) {
                        // 没有加载过
                        this.expandfunc.call(null, m)
                    } else {
                        m.isFolder = !m.isFolder
                    }
                } else {
                    m.isFolder = !m.isFolder
                    this.expandfunc.call(null, m)
                }
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
            }
        }
    }
</script>
