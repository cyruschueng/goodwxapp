<style rel="stylesheet/less" lang="less">
    .columns-4 {
        .scroller-item {
            font-size: 14px !important;
            text-align: center;
        }
    }
    .columns-5 {
        .scroller-item {
            font-size: 12px !important;
            text-align: center;
        }
    }
</style>
<template>
    <div>
        <input type="number" v-model="columns">
        {{columns}}
        <group title="chained columns" :class="'columns-' + columns">
            <popup-picker :isTransferDom="false" title="test1" :data="list" :columns="columns" v-model="value3"
                          ref="picker3" popup-title="选择数据统计范围"></popup-picker>
        </group>
    </div>
</template>
<script>
    import {PopupPicker, Group, Cell, Picker, XButton, Divider, XSwitch} from 'vux'

    export default {
        components: {
            PopupPicker,
            Group,
            Picker,
            XButton,
            Divider,
            Cell,
            XSwitch
        },
        data() {
            return {
                columns: 5,
                value3: [],
                list: [],
                list5: [
                    {
                        name: '上海分公司',
                        value: 'all',
                        parent: 0
                    }, {
                        name: '全部',
                        value: 'all1',
                        parent: 'all'
                    }, {
                        name: '全部',
                        value: 'all2',
                        parent: 'all1'
                    }, {
                        name: '全部',
                        value: 'all3',
                        parent: 'all2'
                    }, {
                        name: '全部',
                        value: 'all4',
                        parent: 'all3'
                    }, {
                        name: '黄埔支公司',
                        value: 'hp',
                        parent: 0
                    }, {
                        name: '全部',
                        value: 'hpall',
                        parent: 'hp'
                    }, {
                        name: '全部',
                        value: 'hpall1',
                        parent: 'hpall'
                    }, {
                        name: '小草部',
                        value: 'xc',
                        parent: 'hp'
                    }, {
                        name: '全部',
                        value: 'yqall',
                        parent: 'xc'
                    }, {
                        name: '姚琼组',
                        value: 'yq',
                        parent: 'xc'
                    }, {
                        name: '陆春华组',
                        value: 'lch',
                        parent: 'xc'
                    }, {
                        name: '全部',
                        value: 'lchall',
                        parent: 'lch'
                    }, {
                        name: '高世超分组',
                        value: 'gsc',
                        parent: 'lch'
                    }, {
                        name: '鸿运部',
                        value: 'hyb',
                        parent: 'hp'
                    }, {
                        name: '陈晓丽组',
                        value: 'cxl',
                        parent: 'hyb'
                    }, {
                        name: '吴金凤组',
                        value: 'wjf',
                        parent: 'hyb'
                    }, {
                        name: '陆家嘴支公司',
                        value: 'ljz',
                        parent: 0
                    }, {
                        name: '扬玖部',
                        value: 'yjb',
                        parent: 'ljz'
                    }, {
                        name: '赵亚楠组',
                        value: 'zyn',
                        parent: 'yjb'
                    }, {
                        name: '唐丽萍组',
                        value: 'tlp',
                        parent: 'yjb'
                    }, {
                        name: '俊华部',
                        value: 'jh',
                        parent: 'hp'
                    }, {
                        name: '赵丹丹组',
                        value: 'zdd',
                        parent: 'jh'
                    }, {
                        name: '徐俊华组',
                        value: 'xjh',
                        parent: 'jh'
                    }]
            }
        },
        mounted() {
            this.list = this['list' + this.columns]
            console.log(document.querySelector('.vux-popup-picker'))
            document.querySelector('.vux-popup-picker').setAttribute('class', document.querySelector('.vux-popup-picker').getAttribute('class') + ' columns-5')
            console.log(document.querySelector('.vux-popup-picker'))
        },
        beforeDestroy() {

        },
        methods: {}
    }
</script>
