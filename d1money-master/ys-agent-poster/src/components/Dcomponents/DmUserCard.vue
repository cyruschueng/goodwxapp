<style scoped rel="stylesheet/less" lang="less">
    .dmUserCard {
        position: relative;
        .bg {
            background-image: url('./../../assets/user_bg.jpg');
            background-size: 100% 100%;
            height: 90px;
        }
        .userImg{
            position: absolute;
            top: 30px;
            left: 15px;
            width: 75px;
            height: 75px;
            background-color: #aeaeae;
            text-align: center;
            z-index: 1;
            img{
                box-sizing: border-box;
                width:100%;
                height:100%;
                padding: 10px;
                margin:auto;
            }
        }
        .userDesc{
            position: absolute;
            top:30px;
            left: 100px;
            right:0;
            bottom:5px;
            color: #ffffff;
            .name{
                position: absolute;
                top:0;
                left:0;
                right:0;
                line-height: 1em;
                font-size: 20px;
            }
            .data{
                position: absolute;
                bottom:0;
                font-size: 12px;
                span{
                    line-height:1em;
                    margin-right: 20px;
                }
            }
        }
        .customList{
            position: absolute;
            right: 10px;
            top: 10px;
            border:1px solid #ffffff;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            color: #ffffff;
            font-size: 12px;
            padding:0 10px;
            i.iconfont{
                color: #ffffff;
                font-size: 12px;
            }
        }
    }
</style>
<template>
    <div class="dmUserCard">
        <div class="bg"></div>
        <div class="userImg">
            <img v-if="!img" src="../../assets/default_userImg.png" alt="">
            <img style="padding:0" v-else :src="img" alt="">
        </div>
        <div class="userDesc">
            <div class="name">
                <slot name="title"></slot>
            </div>
            <div class="data">
                <slot name="desc"></slot>
            </div>
        </div>
        <slot name="rightIcon"></slot>
    </div>
</template>
<script>
    export default {
        props: {
            img: {
                type: String
            }
        },
        data() {
            return {}
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {}
    }
</script>
