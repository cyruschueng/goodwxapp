<style lang="less" rel="stylesheet/less" scoped="scoped">
    .uploadAvatar{
        height: 100%;
        position: relative;
        .cropper{
            width: 100%;
            height: calc(~'100% - 62px');
            position: relative;
            background-color: #000;
            background-image: none;
        }
        .selectPic{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 62px;
            padding: 10px;
            box-sizing: border-box;
            background-color: #000000;
        }
    }
</style>
<template>
    <div class="uploadAvatar">
        <vueCropper
            class="cropper"
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :canScale="false"
            autoCrop="true"
            :autoCropWidth="96"
            :autoCropHeight="96"
            :autoCrop="true"
            :fixedBox="true"
        ></vueCropper>
        <div class="selectPic">
            <x-button :gradients="['#1D62F0', '#19D5FD']">从手机相册选择</x-button>
        </div>
    </div>
</template>

<script>
    import VueCropper from 'vue-cropper'
    import { XButton } from 'vux'
    export default {
        data() {
            return {
                option: {
                    img: 'http://wmimage.qn.d1money.com/pic/201801/15/2018011508390698105.jpeg-pic.M',
                    size: 1,
                    outputType: 'jpeg'
                }
            }
        },
        components: {
            VueCropper,
            XButton
        },
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>
