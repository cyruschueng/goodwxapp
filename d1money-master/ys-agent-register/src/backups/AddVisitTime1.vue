<template>
    <div v-cloak class="addVisitTime" :style="{height: screenHeight + 'px'}">
        <div class="addVisitTime__bd" :class="{'hideSpeechCode' : !isspecking}">
            <group class="customName" :gutter="0">
                <x-input title="客户姓名" :is-type="be2333" placeholder="请填写客户姓名" :debounce="1"></x-input>
            </group>

            <group class="desc" title="拜访记录" :gutter="0">
                <p class="position">
                    <i class="iconfont icon-dingwei"></i>上海市江宁路133号
                </p>
                <textarea id="desc" v-model="value" @focus="onFocus()" @blur="onBlur()"
                          placeholder="请输入拜访记录"></textarea>
            </group>
        </div>
        <!--<div class="addVisitTime__speechCode">-->
            <!--<div class="speechCode " :class="[{'recording' : isspecking} , {'transCoding' : istranscoding}]">-->
                <!--&lt;!&ndash;recording 录音中 transCoding 转码中  &ndash;&gt;-->
                <!--<div class="record one"></div>-->
                <!--<div class="record two"></div>-->
                <!--<div class="record three"></div>-->
                <!--<div class="record four"></div>-->
                <!--<div class="record five"></div>-->
                <!--<div class="record six"></div>-->
                <!--<div class="record seven"></div>-->
                <!--<div class="record eight"></div>-->
                <!--<div class="record nine"></div>-->
                <!--<div class="record ten"></div>-->
            <!--</div>-->
            <!--<div class="time">-->
                <!--00:05-->
            <!--</div>-->
        <!--</div>-->
        <div class="addVisitTime__ft">
            <div class="speechCodeBtn">
                <flexbox wrap="wrap" :gutter="0">
                    <template v-if="isspecking">
                        <flexbox-item class="btn" @click.native="speckfinish">
                            说完了
                        </flexbox-item>
                    </template>

                    <template v-else>
                        <flexbox-item class="btn"
                                      @click.native="!isspecking&&istranscoding ? '' : isspecking = !isspecking ">
                            <template v-if="!isspecking&&istranscoding">
                                <i class="iconfont icon-yuyin"></i> 转码中
                                <p class="istranscodingBox">
                                    <span class="istranscoding">...</span>
                                </p>
                            </template>
                            <template v-else>
                                <i class="iconfont icon-yuyin"></i> 录音
                            </template>
                        </flexbox-item>
                        <flexbox-item class="btn" @click.native="speckfinish"
                                      style="background-color:#68baf9; color: #ffffff;">
                            提交
                        </flexbox-item>
                    </template>
                </flexbox>
            </div>
        </div>
    </div>
</template>

<script>
    import {XInput, Group, XButton, Cell, Flexbox, FlexboxItem, XImg, XTextarea} from 'vux'

    export default{
        components: {
            XInput,
            Group,
            XButton,
            Cell,
            Flexbox,
            FlexboxItem,
            XImg,
            XTextarea
        },
        data(){
            return {
                value: '客户是一位年轻的单身白领女性。目前对健康类疾病保险很有兴趣,也对今后可能用到的生育保险有一定的关注。洽谈中感觉成单可能一般',
                be2333: function (value) {
                    return {
                        valid: false,
                        msg: '不能为空'
                    }
                },
                speechCodePopup: true,
                // 当前屏幕的高度
                screenHeight: null,
                // 是否在录音
                isspecking: true,
                // 是否在转码
                istranscoding: false,
                // 录音时间
                speckTime: null
            }
        },
        computed: {},
        methods: {
            speckfinish(){
                let That = this
                let desc = document.getElementById('desc')
                desc.focus()
                this.isspecking = false
                this.istranscoding = true
                this.$wechat.stopRecord({
                    success: function (res) {
                        let localId = res.localId
                        console.log(`localId: ${localId}`)

                        That.$wechat.playVoice({
                            localId: localId
                        })
                    }
                })
                setTimeout(() => {
                    this.istranscoding = false
                }, 2000)
            },
            onFocus(e) {
                let cnt = 0
                setInterval(() => {
                    if (cnt < 3) {
                        cnt++
                    } else {
                        clearInterval()
                        return
                    }
                    document.body.scrollTop = document.body.scrollHeight
                }, 300)
            },
            onBlur(e) {
                clearInterval()
            },
            ajaxGetJsSDKConfigParam(){
                return new Promise((resolve, reject) => {
                    this.$http.get('/ys/gzrz/services/getJsSDKConfigParam?url=http://test.d1money.com:8083/ys/gzrz/index')
                        .then(response => {
                            console.log(response)
                            let result = response.data
                            if (result.code !== 'SUCCESS') {
                                alert(`getJsSDKConfigParam错误! ${result.msg}`)
                                reject()
                                return
                            }
                            let data = result.body
                            // 微信注册
                            this.$wechat.config({
                                // 必须这么写，否则在微信插件有些jsapi会有问题
                                beta: true,
                                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                debug: true,
                                // 必填，企业微信的cropID
                                appId: data.appId,
                                // 必填，生成签名的时间戳
                                timestamp: data.timestamp,
                                // 必填，生成签名的随机串
                                nonceStr: data.nonceStr,
                                // 必填，签名，见[附录1](#11974)
                                signature: data.signature,
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
                            resolve()
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
            }
        },
        async mounted(){
            this.screenHeight = document.body.clientHeight
            await this.ajaxGetJsSDKConfigParam()

            this.$wechat.getLocation({
                // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                type: 'wgs84',
                success: function (res) {
                    // 纬度，浮点数，范围为90 ~ -90
                    let latitude = res.latitude
                    // 经度，浮点数，范围为180 ~ -180。
                    let longitude = res.longitude
                    // 速度，以米/每秒计
                    let speed = res.speed
                    // 位置精度
                    let accuracy = res.accuracy
                    console.log(`纬度: ${latitude}, 经度: ${longitude}, 速度: ${speed}, 位置精度: ${accuracy}`)
                }
            })
            this.$wechat.startRecord()
        }
    }

</script>

<style lang="less" rel="stylesheet/less">
    @styleColor: #68baf9;
    @bgColor: #f1f1f1;
    .addVisitTime {
        position: relative;
        overflow: hidden;
        .addVisitTime__bd {
            &.hideSpeechCode {
                height: calc(~ "100% - 44px");
            }
            height: calc(~ "100% - 206px");
            background-color: @bgColor;
            /*拜访记录*/
            .desc {
                box-sizing: border-box;
                height: calc(~ "100% - 44px");
                background-color: #ffffff;
                .position {
                    padding: 10px 15px 0;
                    color: #aaaaaa;
                    font-size: 14px;
                    font-weight: 300;
                    i.iconfont {
                        font-size: 16px;
                        margin-right: 5px;
                    }

                }
                .weui-cells {
                    box-sizing: border-box;
                    height: calc(~ "100% - 34px");
                    &:before {
                        display: none
                    }
                    textarea {
                        width: 100%;
                        height: 100%;
                        height: 50px;
                        box-sizing: border-box;
                        outline: none;
                        border: none;
                        resize: none;
                        overflow-y: auto;
                        color: #666666;
                        padding: 10px 15px;
                        font-size: 17px;
                        line-height: 1.41176471;
                    }
                }
                /*删除底部横线*/
                .weui-cells.vux-no-group-title {
                    height: 100%;
                    &:after, &:before {
                        display: none;
                    }
                }
                /*修改拜访记录标题样式*/
                .weui-cells__title {
                    color: #000;
                    width: 5em;
                    line-height: 1.41176471;
                    font-size: 17px;
                    word-wrap: break-word;
                    word-break: break-all;
                    padding: 10px 15px 0;
                    margin: 0;
                }
            }
            /*上传图片*/
            .uploadImg {
                @media screen and (min-width: 768px) {
                    height: 200px;
                }
                box-sizing: border-box;
                background-color: @bgColor;
                height: 90px;
                padding: 15px 0;
                overflow: hidden;

                .weui-cells.vux-no-group-title {
                    height: 100%;
                    padding-right: 15px;
                    background-color: @bgColor;
                    &:after, &:before {
                        display: none;
                    }
                    .uploadImgFlexbox {
                        height: 100%;
                    }
                }
                .uploadImg__item {
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    padding-left: 15px;
                    box-sizing: border-box;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .addIcon {
                        height: 100%;
                        width: 60px;
                        height: 60px;
                        text-align: center;
                        line-height: 60px;
                        border: 1px solid #aaaaaa;
                        box-sizing: border-box;
                        i.iconfont {
                            font-size: 40px;
                            color: #aaaaaa;
                        }
                        @media screen and (min-width: 768px) {
                            height: 170px;
                            width: 170px;
                            line-height: 170px;
                            i.iconfont {
                                font-size: 140px;
                                color: #aaaaaa;
                            }
                        }
                    }
                }
            }
        }
        .addVisitTime__speechCode {
            height: 162px;
            .speechCode {
                box-sizing: border-box;
                height: 132px;
                width: 182px;
                padding: 30px 0 20px;
                margin: 0 auto;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .ten {
                    width: 6px;
                    margin-left: 10px;
                    border-radius: 50px;
                    background-color: @styleColor;
                    vertical-align: middle;
                    display: inline-block;
                }
                .record {
                    transform: translateZ(0);
                    height: 6px;
                }
                &.recording {
                    .record {
                        height: 100%;
                    }
                    .one {
                        animation: record .65s infinite 0.1s;
                        -webkit-animation: record 1.1s infinite 0.1s;
                    }
                    .two {
                        animation: record 1.1s infinite 0.2s;
                        -webkit-animation: record 1.1s infinite 0.2s;
                    }
                    .three {
                        animation: record 1.1s infinite 0.3s;
                        -webkit-animation: record 1.1s infinite 0.3s;
                    }
                    .four {
                        animation: record 1.1s infinite 0.4s;
                        -webkit-animation: record 1.1s infinite 0.4s;
                    }
                    .five {
                        animation: record 1.1s infinite 0.5s;
                        -webkit-animation: record 1.1s infinite 0.5s;
                    }
                    .six {
                        animation: record 1.1s infinite 0.6s;
                        -webkit-animation: record 1.1s infinite 0.6s;
                    }
                    .seven {
                        animation: record 1.1s infinite 0.7s;
                        -webkit-animation: record 1.1s infinite 0.7s;
                    }
                    .eight {
                        animation: record 1.1s infinite 0.8s;
                        -webkit-animation: record 1.1s infinite 0.8s;
                    }
                    .nine {
                        animation: record 1.1s infinite 0.9s;
                        -webkit-animation: record 1.1s infinite 0.9s;
                    }
                    .ten {
                        animation: record 1.1s infinite 1.0s;
                        -webkit-animation: record 1.1s infinite 1.0s;
                    }
                }

                &.transCoding {
                    .record {
                        height: 10px;
                    }
                    .one {
                        animation: transCoding .65s infinite 0.1s;
                        -webkit-animation: transCoding 1.1s infinite 0.1s;
                    }
                    .two {
                        animation: transCoding 1.1s infinite 0.2s;
                        -webkit-animation: transCoding 1.1s infinite 0.2s;
                    }
                    .three {
                        animation: transCoding 1.1s infinite 0.3s;
                        -webkit-animation: transCoding 1.1s infinite 0.3s;
                    }
                    .four {
                        animation: transCoding 1.1s infinite 0.4s;
                        -webkit-animation: transCoding 1.1s infinite 0.4s;
                    }
                    .five {
                        animation: transCoding 1.1s infinite 0.5s;
                        -webkit-animation: transCoding 1.1s infinite 0.5s;
                    }
                    .six {
                        animation: transCoding 1.1s infinite 0.6s;
                        -webkit-animation: transCoding 1.1s infinite 0.6s;
                    }
                    .seven {
                        animation: transCoding 1.1s infinite 0.7s;
                        -webkit-animation: transCoding 1.1s infinite 0.7s;
                    }
                    .eight {
                        animation: transCoding 1.1s infinite 0.8s;
                        -webkit-animation: transCoding 1.1s infinite 0.8s;
                    }
                    .nine {
                        animation: transCoding 1.1s infinite 0.9s;
                        -webkit-animation: transCoding 1.1s infinite 0.9s;
                    }
                    .ten {
                        animation: transCoding 1.1s infinite 1.0s;
                        -webkit-animation: transCoding 1.1s infinite 1.0s;
                    }
                }

            }
            .time {
                height: 30px;
                line-height: 20px;
                text-align: center;
                color: #969696;
            }
        }
        .addVisitTime__ft {
            height: 44px;
            /*按钮*/
            .speechCodeBtn {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: #fbf9ff;
                .btn {
                    height: 44px;
                    line-height: 44px;
                    border-top: 1px solid @styleColor;
                    text-align: center;
                    font-size: 16px;
                    border-left: 1px solid @styleColor;
                    box-sizing: border-box;
                    color: @styleColor;
                    &:first-child {
                        border-left: none;
                    }
                    i.iconfont {
                        font-size: 20px;
                    }
                    .istranscodingBox {
                        display: inline-block;
                        width: 26px;
                        letter-spacing: 3px;
                        height: 44px;
                        line-height: 44px;
                        position: relative;
                        .istranscoding {
                            vertical-align: bottom;;
                            display: inline-block;
                            font-size: 20px;
                            width: 26px;
                            overflow: hidden;

                            position: relative;
                            &:after {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background-color: #fbf9ff;
                                z-index: 9999;
                                animation: istranscoding 1s steps(3) infinite;
                            }
                        }
                    }

                }
            }
        }
    }

    .previewer {
        .previewer-delete-icon-box {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 44px;
            height: 44px;
            /*line-height: 22px;*/
            padding: 11px;
            text-align: center;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
        }
    }

    .keyframes (@name, @frames) {
        @-webkit-keyframes @name { @frames();
        }
        @-moz-keyframes @name { @frames();
        }
        @-ms-keyframes @name { @frames();
        }
        @-o-keyframes @name { @frames();
        }
        @keyframes @name { @frames();
        }
    }

    /*转码中 样式*/
    .keyframes(transCoding, { 0% {
        transform: rotateX(0deg);
    } 20% {
          transform: rotateX(40deg);
      } 50% {

            transform: rotateX(60deg);
        } 90% {

              transform: rotateX(70deg);
          } 100% {

                transform: rotateX(0deg);
            } });

    /*录音样式*/
    .keyframes(record, { 0% {
        transform: rotateX(0deg);
    } 20% {
          transform: rotateX(45deg);
      } 60% {

            transform: rotateX(90deg);
        } 80% {

              transform: rotateX(45deg);
          } 100% {

                transform: rotateX(0deg);
            } });

    /*转码中动画样式*/
    .keyframes(istranscoding, { 0% {
        transform: translateX(0)
    } 33.33% {
          transform: translateX(13px)
      } 66.66% {
            transform: translateX(26px)
        } });
    [v-cloak] {
        display: none
    }
</style>
