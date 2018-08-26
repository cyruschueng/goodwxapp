<style scoped rel="stylesheet/less">
    .sub-item {
        color: #888;
    }

    .slide {
        padding: 0 20px;
        overflow: hidden;
        max-height: 0;
        transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    }

    .animate {
        max-height: 9999px;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
    }
</style>
<template>
    <group :gutter="0" style="margin-top: 10px;">
        <template v-for="(item, index) in list">
            <tree-item :tree="item" :expandfunc='expand'></tree-item>
        </template>
    </group>
</template>
<script>
    import {Flexbox, FlexboxItem, Group, Cell, Card, Countup} from 'vux'
    import TreeItem from './TreeItem.vue'

    export default {
        props: {
            list: {},
            // 是否展开
            isOpen: {
                type: Boolean,
                twoWay: true,
                default: false
            },
            // 展开回调
            expand: {
                type: Function,
                default: null
            }
        },
        watch: {
            'list': {
                handler: function () {
                    this.initTreeData()
                },
                deep: true
            }
        },
        components: {
            Flexbox,
            FlexboxItem,
            Group,
            Cell,
            Card,
            Countup,
            TreeItem
        },
        data() {
            return {
                myIsOpen: this.isOpen
            }
        },
        mounted() {
        },
        beforeDestroy() {

        },
        methods: {
            initTreeData() {
                let tempList = JSON.parse(JSON.stringify(this.list))
                // 递归操作，增加删除一些属性。比如: 展开/收起
                let recurrenceFunc = (data) => {
                    data.forEach((m) => {
                        if (!m.hasOwnProperty('clickNode')) {
                            m.clickNode = m.hasOwnProperty('clickNode') ? m.clickNode : false
                        }
                        m.children = m.children || []
                        if (!m.hasOwnProperty('isFolder')) {
                            m.isFolder = m.hasOwnProperty('open') ? m.open : this.isOpen
                        }
                        if (!m.hasOwnProperty('isExpand')) {
                            m.isExpand = m.hasOwnProperty('open') ? m.open : this.isOpen
                        }
                        m.loadNode = 0
                        recurrenceFunc(m.children)
                    })
                }
                recurrenceFunc(tempList)
                this.treeDataSource = tempList
            }
        }
    }
</script>
