<!--容器组件-->
<style scoped rel="stylesheet/less" lang="less">
    .dmPanel {
        position: relative;
        /*!*上下边框*!*/
        /*&:after {*/
        /*content: " ";*/
        /*position: absolute;*/
        /*left: 0;*/
        /*bottom: 0;*/
        /*right: 0;*/
        /*height: 1px;*/
        /*border-bottom: 1px solid #D9D9D9;*/
        /*color: #D9D9D9;*/
        /*-webkit-transform-origin: 0 100%;*/
        /*transform-origin: 0 100%;*/
        /*-webkit-transform: scaleY(0.5);*/
        /*transform: scaleY(0.5);*/
        /*}*/
        background-color: #ffffff;
        .dmPanelContent {
            display: flex;
            flex-flow: row nowrap;
            align-items: flex-start;
        }
        padding: 15px;
        /*panel左边部分*/
        .dmPanel__hd {
            width: 55px;
            margin-right: 10px;
            .dmPanel__hd__img {
                width: 100%;
                height: 100%;
                line-height: 0;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        /*panel内容部分*/
        .dmPanel__bd {
            flex: 1;
            .dmPanel__bd__title {
                font-size: 18px;
                color: #333333;
                font-weight: 500;
                margin-bottom: 2px;
                position: relative;
            }
            .dmPanel__bd__titleDesc {
                font-size: 12px;
                color: #56678e;
            }
            .dmPanel__bd__content {
                font-size: 14px;
                color: #333333;

                &.lin2 {
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                &.lin3 {
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
            .dmPanel__bd__footer {

                .position {
                    font-size: 12px;
                    color: #56678e;
                }
            }
        }
    }
</style>
<template>
    <div class="dmPanel" :style="{alignItems: alignItems}">
        <div class="dmPanelContent">
            <div class="dmPanel__hd" :style="{width: headWidth,height: headHeight}">
                <div class="dmPanel__hd__img" v-if="img">
                    <img :src="img">
                </div>
                <template v-else>
                    <slot name="head"></slot>
                </template>
            </div>
            <div class="dmPanel__bd">
                <h3 v-if="title" class="dmPanel__bd__title" v-html="title"></h3>
                <slot name="title"></slot>
                <p v-if="titleDesc" class="dmPanel__bd__titleDesc" v-html="titleDesc"></p>
                <template v-else>
                    <slot name="titleDesc"></slot>
                </template>
                <div :class="['dmPanel__bd__content','lin' + lineClamp]">
                    <slot></slot>
                </div>
                <div class="dmPanel__bd__footer">
                    <div v-if="position" class="position" v-html="position"></div>
                    <div v-else class="position">
                        <slot name="position"></slot>
                    </div>
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
        <slot name="other"></slot>
    </div>
</template>
<script>
    import {XImg} from 'vux'

    export default {
        props: {
            img: {
                type: String
            },
            title: {
                type: String
            },
            titleDesc: {
                type: String
            },
//            地理位置,坐标
            position: {
                type: String
            },
            // 左右两盒子的布局方式
            alignItems: {
                type: String,
                default: 'flex-start'
            },
            // 左侧宽度
            headWidth: {
                type: String,
                default: '55px'
            },
            // 左侧宽度
            headHeight: {
                type: String,
                default: 'auto'
            },
            // 内容隐藏函数
            lineClamp: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                defaultSrc: '/static/agent/article/img/default_user.png'
            }
        },
        components: {
            XImg
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {}
    }
</script>
