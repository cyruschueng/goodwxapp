<style lang="less" rel="stylesheet/less" scoped="scoped">
    .uploadAvatar {
        height: 100%;
        position: relative;
        .cropper {
            width: 100%;
            height: calc(~'100% - 62px');
            position: relative;
            background-color: rgba(0, 0, 0, .7);
            background-image: none;
            .img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 100%;
                max-height: 100%;
                height: auto;
            }
        }
        .selectPic {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 62px;
            padding: 10px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, .7);
            display: flex;
            flex-flow: row nowrap;
            label, .btn {
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, rgb(29, 98, 240), rgb(25, 213, 253));
                position: relative;
                display: block;
                margin-left: auto;
                margin-right: auto;
                padding-left: 14px;
                padding-right: 14px;
                box-sizing: border-box;
                font-size: 18px;
                text-align: center;
                text-decoration: none;
                color: #FFFFFF;
                line-height: 2.33333333;
                border-radius: 5px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                overflow: hidden;
                &.cancel {
                    background: #F8F8F8;
                    color: #333;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
<template>
    <div class="uploadAvatar">
        <template v-if="shearPicture">
            <vueCropper
                class="cropper"
                ref="cropper"
                :img="userAvatar"
                :outputSize="option.size"
                :outputType="option.outputType"
                :canMove="false"
                :autoCrop="option.autoCrop"
                :fixed="true"
                :autoCropWidth="132"
                :autoCropHeight="132"
                :original="false"
            ></vueCropper>
        </template>
        <template v-else="shearPicture">
            <div class="cropper">
                <img class="img" :src="userAvatar" alt="">
            </div>
        </template>
        <div class="selectPic">
            <template v-if="!option.autoCrop">
                <label for="img-upload-avatar">
                    <upload-img
                        model-name="avatar"
                        @changeImg="openPhonePics"
                    ></upload-img>
                    从手机相册选择
                </label>
            </template>
            <template v-else="!option.autoCrop">
                <div class="btn cancel" @click="cancelUploadAvatar">
                    取消
                </div>
                <div class="btn" @click="uploadAvatar">
                    完成
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import VueCropper from 'vue-cropper'
    import {XButton} from 'vux'
    import UploadImg from '@/components/Dcomponents/DmUploadImg/uploadImg.vue'

    export default {
        data() {
            return {
                userAvatar: window.YS_USER_AVATAR[0],
                shearPicture: false,
                option: {
                    size: 1,
                    outputType: 'png',
                    autoCrop: false
                }
            }
        },
        components: {
            VueCropper,
            XButton,
            UploadImg
        },
        computed: {},
        methods: {
            openPhonePics(data, nodelName) {
                this.userAvatar = data
                this.option.autoCrop = true
                this.shearPicture = true
            },
            cancelUploadAvatar() {
                this.option.autoCrop = false
                this.userAvatar = window.YS_USER_AVATAR[0]
            },
            uploadAvatar() {
                const _this = this
                this.$vux.loading.show({
                    text: '上传图片中...'
                })
                this.$refs.cropper.getCropData((data) => {
                    // do something
                    this.$axios.upload({
                        url: '/agent/user/services/doUploaUserHeadImgSrc',
                        data: {
                            file: data
                        },
                        tips: true
                    }).then(res => {
                        this.$vux.loading.hide()
                        this.userAvatar = data
                        this.$set(this.option, 'autoCrop', false)
                        window.YS_USER_AVATAR[0] = data
                        window.YS_USER_AVATAR[46] = data
                        window.YS_USER_AVATAR[64] = data
                        window.YS_USER_AVATAR[96] = data
                        window.YS_USER_AVATAR[132] = data
                        this.shearPicture = false
                        this.$vux.toast.show({
                            text: '头像上传成功!',
                            time: 1000,
                            onHide() {
                                _this.$router.go(-1)
                            }
                        })
                    }).catch(() => {
                        this.$vux.loading.hide()
                    })
                })
            }
        },
        mounted() {
        }
    }
</script>
