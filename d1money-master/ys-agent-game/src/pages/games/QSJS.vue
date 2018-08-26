<style lang="less" rel="stylesheet/less" scoped="scoped">
    .qsjs {
        height: 100%;
        width: 100%;
        background-image: url("./../../assets/qsjs.jpeg");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        text-align: center;
        .bottom{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            width:100%;
        }
        .button {
            display: inline-block;
            margin:15px auto 0;
            padding: 10px 15px;
            background-color: #4aa1f0;
            color: #ffffff;
            border-radius: 2px;
            box-shadow: 0px 0px 6px 2px #fff;
        }
    }
</style>
<template>
    <div class="qsjs">

        <div class="bottom">
            <group>
                <x-input title="姓名" v-model="userName" :show-clear="false">
                    <div slot="right" @click="confirmModal=true">
                       点击测一测
                    </div>
                </x-input>
            </group>

        </div>
        <x-dialog v-model="confirmModal" class="dialog-demo" hide-on-blur>
            <div class="img-box">
                <img src="../../assets/qsjs.jpeg" style="max-width:100%"/>
            </div>
            <div @click="confirmModal=false">
                <span class="vux-close"></span>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import {XDialog, XInput, Group} from 'vux'

    export default {
        data() {
            return {
                userName: '',
                confirmModal: false
            }
        },
        components: {
            XDialog,
            XInput,
            Group
        },
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>
