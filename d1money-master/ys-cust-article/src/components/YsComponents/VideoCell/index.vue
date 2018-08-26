<style lang="less" rel="stylesheet/less" scoped="scoped">

    .videoCell {
        padding: 15px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: #ffffff;
        position: relative;
        font-size: 14px;
        line-height: 22px;
        color: #333;
        font-weight: 300;
        &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 15px;
            right: 15px;
            border-bottom: 1px solid #f2f2f2;
        }
        &:last-child {
            &:before {
                display: none;
            }
        }
        .videoCell__right {
            flex: 1;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            min-height: 70px;
            .data {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                font-size: 12px;
                font-weight: 300;
                color: #969696;
                > * {
                    margin-right: 10px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        .videoCell__left {
            width: 35%;
            margin-right: 10px;
            .img {
                width: 100%;
                height: 100%;
                min-height: 70px;
                line-height: 0;
                padding-bottom: 5px;
                img {
                    width: 100%;
                    height: 100%;
                    min-height: 80px;
                    object-fit: cover;
                }
            }
        }
    }
</style>
<template>
    <a :href="url" class="videoCell">
        <div class="videoCell__left">
            <div class="img">
                <img :src="img">
            </div>
        </div>
        <div class="videoCell__right">
            <slot name="title"></slot>
            <div class="data">
                <slot name="data"></slot>
            </div>
        </div>
    </a>
</template>

<script>
    export default {
        props: {
            url: {
                type: String,
                default: 'javascript:;'
            },
            img: {
                type: String,
                default: 'https://dummyimage.com/1x1/f2f2f2/f2f2f2'
            }
        },
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
