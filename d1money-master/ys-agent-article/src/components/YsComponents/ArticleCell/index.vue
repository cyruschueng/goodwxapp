<style lang="less" rel="stylesheet/less" scoped="scoped">
    .articleCell {
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
            &:before{
                display: none;
            }
        }
        .articleCell__left {
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
        .articleCell__right {
            width: 35%;
            margin-left: 10px;
            .img {
                width: 100%;
                height: 100%;
                min-height: 70px;
                line-height: 0;
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
    <a :href="url" class="articleCell">
        <div class="articleCell__left">
            <slot name="title"></slot>
            <div class="data">
                <slot name="data"></slot>
            </div>
        </div>
        <div class="articleCell__right">
            <div class="img">
                <img :src="img">
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
