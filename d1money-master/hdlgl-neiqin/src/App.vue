<template>
    <div id="app">
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <transition
            @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
            :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
            <router-view style="width: 100%;"></router-view>
        </transition>
    </div>
</template>

<script>
    import {querystring, TransferDom, Loading} from 'vux'
    import {mapState} from 'vuex'
    export default {
        name: 'app',
        directives: {
            TransferDom
        },
        components: {
            Loading
        },
        methods: {
            // 获取jssdk ajax
            ajaxGetJsSDKConfigParam() {
                return new Promise((resolve, reject) => {
                    this.$http.post('/ys/gzrz/services/getJsSDKConfigParam', querystring.stringify({url: window.location.href.split('#')[0]}))
                        .then(response => {
                            let result = response.data
                            if (result.code !== 'SUCCESS') {
//                                alert(`getJsSDKConfigParam错误! ${result.msg}`)
                                this.$vux.toast.show({
                                    type: 'cancel',
                                    text: result.msg
                                })
                                reject()
                                return
                            }
                            let data = result.body
                            // 微信注册
                            this.$wechat.config({
                                // 必须这么写，否则在微信插件有些jsapi会有问题
                                beta: true,
                                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                debug: false,
                                // 必填，企业微信的cropID
                                appId: data.appId,
//                                appId: 'wwbb2775eca6964984',
                                // 必填，生成签名的时间戳
                                timestamp: data.timestamp,
//                                timestamp: 1508144016,
                                // 必填，生成签名的随机串
//                                nonceStr: '6881c8c6-7dbb-4cff-a9ba-63a0e1904cd9',
                                nonceStr: data.nonceStr,
                                // 必填，签名，见[附录1](#11974)
                                signature: data.signature,
//                                signature: '59d4fcfbd48743f568dbe2de9123c903050d8653',
                                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                                jsApiList: [
                                    'onMenuShareAppMessage',
                                    'onMenuShareWechat',
                                    'startRecord',
                                    'stopRecord',
                                    'onVoiceRecordEnd',
                                    'playVoice',
                                    'pauseVoice',
                                    'stopVoice',
                                    'onVoicePlayEnd',
                                    'uploadVoice',
                                    'downloadVoice',
                                    'chooseImage',
                                    'previewImage',
                                    'uploadImage',
                                    'downloadImage',
                                    'previewFile',
                                    'getNetworkType',
                                    'openLocation',
                                    'getLocation',
                                    'onHistoryBack',
                                    'hideOptionMenu',
                                    'showOptionMenu',
                                    'hideMenuItems',
                                    'showMenuItems',
                                    'hideAllNonBaseMenuItem',
                                    'showAllNonBaseMenuItem',
                                    'closeWindow',
                                    'scanQRCode',
                                    'selectEnterpriseContact',
                                    'openEnterpriseChat',
                                    'chooseInvoice'
                                ]
                            })
                            this.$wechat.ready(() => {
                                resolve()
                            })
                            this.$wechat.error((res) => {
                                this.$vux.loading.hide()
                                this.$vux.toast.show({
                                    type: 'cancel',
                                    text: JSON.stringify(res)
                                })
                            })
                        })
                        .catch(error => {
                            console.log(error)
                            this.$vux.toast.show({
                                type: 'cancel',
                                text: '请求ajax Js-sdk失败'
                            })
                        })
                })
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.vux.isLoading,
                direction: state => state.vux.direction
            })
        },
        mounted() {
            this.ajaxGetJsSDKConfigParam()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import '~vux/src/styles/reset.less';

    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    body {
        background-color: #fbf9fe;
        #app {
            height: 100%;
        }
    }

    .dm-padding-r-0{
        padding-right:0 !important;
    }

    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 500ms;
        height: 100%;
        top: 0;
        bottom: 0;
        position: absolute;
        backface-visibility: hidden;
        -webkit-perspective: 1000;
        perspective: 1000;
    }

    .vux-pop-out-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    @weuiBtnConfirmBg: #68BAF9;
    @weuiBtnConfirmFontColor: #FFFFFF;
    @weuiBtnConfirmActiveFontColor: rgba(255, 255, 255, 0.5);
    @weuiBtnConfirmActiveBg: rgba(104, 186, 249, 0.5);

    .weui-btn_confirm {
        background-color: @weuiBtnConfirmBg;
        color: @weuiBtnConfirmFontColor;
        &:not(.weui-btn_disabled):visited {
            color: @weuiBtnConfirmFontColor;
        }
        &:not(.weui-btn_disabled):active {
            color: @weuiBtnConfirmActiveFontColor;
            background-color: @weuiBtnConfirmActiveBg;
        }
    }

    @weuiBtnCancelBg: #FFFFFF;
    @weuiBtnCancelFontColor: #000000;
    @weuiBtnCancelActiveFontColor: rgba(0, 0, 0, 0.5);
    @weuiBtnCancelActiveBg: rgba(255, 255, 255, 0.5);

    .weui-btn.weui-btn_cancel {
        background-color: @weuiBtnCancelBg;
        color: @weuiBtnCancelFontColor;
        &:not(.weui-btn_disabled):visited {
            color: @weuiBtnCancelFontColor;
        }
        &:not(.weui-btn_disabled):active {
            color: @weuiBtnCancelActiveFontColor;
            background-color: @weuiBtnCancelActiveBg;
        }
    }

    .weui-toast_text {
        .dm-icon-info {

        }
    }

    * {
        -webkit-touch-callout: none;
        /*系统默认菜单被禁用*/
        -webkit-user-select: none;
        /*webkit浏览器*/
        -khtml-user-select: none;
        /*早期浏览器*/
        -moz-user-select: none;
        /*火狐*/
        -ms-user-select: none;
    }

    input,
    textarea {
        -webkit-user-select: auto;
        /*webkit浏览器*/
    }
</style>
