<template>

    <div class="customDesc" style="margin-bottom: 10px;">
        <div class="customDesc__from">
            <group class="customName" :gutter="0">
                <x-input title="姓名" v-model="result.userName" placeholder="请填写客户姓名" :debounce="1"
                         :disabled="true"></x-input>
            </group>
            <group class="position" :gutter="0">
                <x-input title="手机" v-model="result.phoneNumber" is-type="china-mobile" placeholder="请输入手机号"
                         :debounce="1" disabled></x-input>
            </group>
            <group class="position" :gutter="0">
                <x-input title="地址" v-model="result.position" placeholder="请选择地理位置" :debounce="1" disabled></x-input>
            </group>
        </div>
        <div class="customDesc__visit">
            <group class="visitTime__group">
                <template v-for="(item, index) in visitTimeList">
                    <cell>
                        <div class="visitTime__title" slot="after-title">
                            <flexbox justify="space-between" :gutter="0">
                                <flexbox-item class="nickName">
                                    第{{index + 1}}次拜访
                                </flexbox-item>
                                <flexbox-item class="time">
                                    {{item.time}}
                                </flexbox-item>
                            </flexbox>
                        </div>
                        <div class="visitTime__content" slot="inline-desc">
                            <p class="desc">
                                {{item.desc}}
                            </p>
                            <p class="position">
                                <i class="iconfont icon-dingwei"></i>{{item.position}}
                            </p>
                        </div>
                    </cell>
                </template>
            </group>

        </div>
    </div>
</template>

<script>
    import {XInput, Group, XButton, Cell, Flexbox, FlexboxItem, XImg, XTextarea} from 'vux'

    export default {
        data() {
            return {
                result: {
                    userName: '陈慧',
                    phoneNumber: '17853593651',
                    position: '上海市江宁路133号'
                },
                visitTimeList: [
                    {
                        userName: '张倩倩',
                        time: '2017-10-07 18:59',
                        desc: '客户是一位年轻的单身白领女性。目前对健康类疾病保险很有兴趣,也对今后可能用到的生育保险有一定的关注。洽谈中感觉成单可能一般',
                        position: '上海市江宁路183号'
                    },
                    {
                        userName: '张倩倩',
                        time: '2017-10-07 18:59',
                        desc: '客户是一位年轻的单身白领女性。目前对健康类疾病保险很有兴趣,也对今后可能用到的生育保险有一定的关注。洽谈中感觉成单可能一般',
                        position: '上海市江宁路183号'
                    }
                ],
                visitNum_Now: 0,
                visitNum_yesteday: 0
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
        methods: {},
        mounted() {
            console.log(this.$route.params.id)
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .customDesc {
        .customDesc__from {
            .weui-input {
                color: #969696 !important;
            }
        }
        .customDesc__visit {

            .visitTime__group {
                .visitTime__title {
                    margin-bottom: 5px;
                    .time {
                        color: #969696;
                    }
                }
            }
        }
    }
</style>
