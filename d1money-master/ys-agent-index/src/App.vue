<template>
    <div id="app">
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <transition
            @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
            :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" style="width: 100%;"></router-view>
            </keep-alive>
        </transition>
        <transition
            @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
            :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
            <router-view v-if="!$route.meta.keepAlive" style="width: 100%;"></router-view>
        </transition>
    </div>
</template>

<script>
    import {querystring, TransferDomDirective as TransferDom, Loading, ViewBox} from 'vux'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'app',
        directives: {
            TransferDom
        },
        data() {
            return {}
        },
        components: {
            Loading,
            ViewBox,
            DmLoading
        },
        methods: {
            // 获取jssdk ajax
            ajaxGetJsSDKConfigParam() {
                return new Promise((resolve, reject) => {
                    this.$http.post('/getJsSDKConfigParam', querystring.stringify({url: window.location.href.split('#')[0]}))
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
                                    'onMenuShareTimeline',
                                    'onMenuShareAppMessage',
                                    'onMenuShareQQ',
                                    'onMenuShareWeibo',
                                    'onMenuShareQZone',
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
                                    'translateVoice',
                                    'getNetworkType',
                                    'openLocation',
                                    'getLocation',
                                    'hideOptionMenu',
                                    'showOptionMenu',
                                    'hideMenuItems',
                                    'showMenuItems',
                                    'hideAllNonBaseMenuItem',
                                    'showAllNonBaseMenuItem',
                                    'closeWindow',
                                    'scanQRCode',
                                    'chooseWXPay',
                                    'openProductSpecificView',
                                    'addCard',
                                    'chooseCard',
                                    'openCard'
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
            },
            ...mapActions([
                'updateUserInfo'
            ])
        },
        computed: {
            ...mapState({
                isLoading: state => state.vux.isLoading,
                direction: state => state.vux.direction,
                isLeader: state => state.vux.userInfo
            })
        },
        async mounted() {
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import '~vux/src/styles/1px.less';
    @import '~vux/src/styles/reset.less';
    @import '../static/css/resetVux.less';

    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    body {
        #app {
            height: 100%;
            background-color: #fbf9fe;
        }
    }

    div, p, span, b, i, a, h1, h2, h3, h4, h5, h6 {
        font-family: 'PingFang SC';
    }

    .dm-border-b {
        position: relative;
        &:after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #d9d9d9;
            color: #d9d9d9;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
    }

    .dm-border-t {
        position: relative;
        &:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #d9d9d9;
            color: #d9d9d9;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
    }

    .dm-margin-t-15 {
        margin-top: 15px;
    }

    .dm-padding-t-30 {
        padding-top: 30px !important;
    }

    .dm__panel {
        .head {
            em {
                font-size: 18px;
                font-weight: 600;
                font-style: normal;
            }
            span, p {
                line-height: 1em;
                font-size: 12px;
                color: #333333;
            }
        }
        .dmPanel__bd__titleDesc {
            i.iconfont {
                margin-left: 2px;
                margin-right: 5px;
                font-size: 12px;
            }
        }
    }

    .dm-modal {
        .weui-dialog__bd {
            padding: 0;
            .weui-cells {
                &:before, &:after {
                    display: none;
                }
            }
        }
    }
    .vux-loading{
        .weui-toast {
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
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
