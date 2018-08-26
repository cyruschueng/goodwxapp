<style lang="less" rel="stylesheet/less" scoped="scoped">
    .lockStep {
        position: relative;
        height: 20vh;
        .line {
            position: relative;
            height: 10vh;
            box-sizing: border-box;
            &.vertical, &.horizontal {
                &:before {
                    position: absolute;
                    content: '';
                }
            }
        }
        .content {
            position: absolute;
            width: 100%;
            height: 60px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            .round {
                width: 60px;
                height: 60px;
                border-radius: 100%;
                background-color: #f2f2f2;
                overflow: hidden;
                .icon {
                    width: 45px;
                    height: 45px;
                    margin: 7.5px auto;
                    border-radius: 100%;
                    background-color: #dedede;
                }
            }
        }
        &:nth-child(2n) {
            .line {
                &.vertical {
                    // 水平
                    &:before {
                        top: 0;
                        bottom: 0;
                        right: 0;
                        width: 50%;
                        border-radius: 0 0 20px 0;
                        border-right: 2px dashed #cccccc;
                        border-bottom: 2px dashed #cccccc;
                    }
                }
                &.horizontal {
                    // 垂直
                    &:before {
                        top: -2px;
                        bottom: 0;
                        left: 0;
                        width: 50%;
                        border-radius: 20px 0 0 0;
                        border-top: 2px dashed #cccccc;
                        border-left: 2px dashed #cccccc;
                    }
                }
            }
            .content {
                justify-content: flex-end;
                bottom: 15vh;
                left: 30px;
                .round {
                    order: 2;
                    float: right;
                    margin-left: 10px;
                }
            }
        }
        &:nth-child(2n+1) {
            .line {
                &.vertical {
                    // 水平
                    &:before {
                        position: absolute;
                        content: '';
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 50%;
                        border-radius: 0 0 0 20px;
                        border-left: 2px dashed #cccccc;
                        border-bottom: 2px dashed #cccccc;
                    }
                }
                &.horizontal {
                    // 垂直
                    &:before {
                        position: absolute;
                        content: '';
                        top: -2px;
                        bottom: 0;
                        right: 0;
                        width: 50%;
                        border-radius: 0 20px 0 0;
                        border-top: 2px dashed #cccccc;
                        border-right: 2px dashed #cccccc;
                    }
                }
            }
            .content {
                justify-content: flex-start;
                bottom: 15vh;
                left: -30px;
                .round {
                    order: 0;
                    margin-right: 10px;
                }
            }
        }
        &:first-child {
            margin-top: 0;
        }
        &:last-child {
            .line {
                display: none;
            }
        }
    }
</style>
<template>
    <div class="lockStep">
        <div class="line vertical"></div>
        <div class="line horizontal"></div>
        <router-link :to="link" tag="div" class="content">
            <div class="round">
                <div class="icon"></div>
            </div>
            <slot name="desc"></slot>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: ['link'],
        data() {
            return {}
        },
        components: {},
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>
