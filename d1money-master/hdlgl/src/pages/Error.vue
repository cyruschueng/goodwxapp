<template>
    <div class="errorMsg">
        <div class="errorMsg__icon">
            <icon type="info" is-msg></icon>
        </div>
        <div class="errorMsg__bd">
            <h1 class="errorMsg__title">{{$route.meta.title}}</h1>
            <p class="errorMsg__desc">
                {{$route.meta.desc}}
            </p>
        </div>
        <div class="errorMsg__btns">
            <x-button type="primary" @click.native="goBack">返回上一页</x-button>
        </div>
    </div>
</template>

<script>
    import { Icon, XButton } from 'vux'
    export default{
        data(){
            return {}
        },
        components: {
            Icon,
            XButton
        },
        computed: {},
        methods: {
            goBack(){
                console.log(this.$router.go(-1))
            }
        },
        mounted(){
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped="scoped">
    .errorMsg{
        position: absolute;
        top:50%;
        left:0;
        right:0;
        transform: translateY(-70%);
        margin-top:30px;
        .errorMsg__icon{
            margin-bottom:30px;
            text-align: center;
        }
        .errorMsg__bd{
            margin-bottom: 25px;
            padding: 0 20px;
            .errorMsg__title{
                text-align: center;
                margin-bottom: 5px;
                font-weight: 400;
                font-size: 20px;
            }
            .errorMsg__desc{
                text-align: center;
                font-size: 14px;
                color: #999999;
            }
        }
        .errorMsg__btns{
            /*position: absolute;*/
            /*bottom:200px;*/
            /*left:0;*/
            /*right:0;*/
            margin-top:80px;
            margin-bottom: 25px;
            padding: 0 20px;
        }

    }
</style>
