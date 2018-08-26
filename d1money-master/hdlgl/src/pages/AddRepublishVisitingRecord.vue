<template>
    <div v-cloak class="addVisitTime">
        <div class="addVisitTime__bd">
            <div class="customNameSelectList" v-if="fromValus.customerName!='' && selecUsers.show">
                <template v-for="(item, index) in selecUsers.list">
                    <div @click="selectUser(index)">
                        {{item.name}}
                    </div>
                </template>
            </div>

            <group class="customName" :gutter="0">
                <!--客户姓名-->
                <x-input v-model="fromValus.customerName"
                         title="客户姓名"
                         placeholder="请填写客户姓名"
                         @on-change="ajaxSelecUsers"
                ></x-input>
                <!--拜访时间-->
                <calendar style="border-top: 1px solid rgba(217, 217, 217,.5);" v-model="fromValus.time" title="日期"
                          show-popup-header popup-header-title="请选择日期" disable-future></calendar>
            </group>
            <!--拜访记录-->
            <group class="desc" title="拜访记录" :gutter="0">
                <x-textarea
                    v-model="fromValus.content"
                    :show-counter="true"
                    :max="1000"
                    :height="200"
                    placeholder="请输入拜访记录"
                    style="padding: 0;"
                ></x-textarea>
                <!--<textarea ref="desc" id="desc" v-model="fromValus.content" placeholder="请输入拜访记录"></textarea>-->
            </group>

            <!--按钮-->
            <flexbox style="margin-top: 20px;">
                <flexbox-item style="padding: 0px 4px 0px 8px;">
                    <x-button @click.native="startRecord" type="cancel">
                        继续录音
                    </x-button>
                </flexbox-item>
                <flexbox-item style="padding: 0px 8px 0px 4px; margin-left: 0px">
                    <x-button type="confirm" @click.native="ajaxFrom">提交</x-button>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="soundRecordingDialog" v-transfer-dom>
            <confirm v-model="soundRecordingDialogIsShow"
                     title="录音中..."
                     confirm-text="说完了"
                     cancel-text="取消"
                     @on-cancel="soundRecordingDialogIsShow_onCancel"
                     @on-confirm="soundRecordingDialogIsShow_onConfirm">
                <flexbox :gutter="0">
                    <flexbox-item class="icon">
                        <i class="iconfont icon-huatong"></i>
                    </flexbox-item>
                    <flexbox-item class="voice">
                        <div class="voice_item"></div>
                        <div class="voice_item"></div>
                        <div class="voice_item"></div>
                        <div class="voice_item"></div>
                        <div class="voice_item"></div>
                        <div class="voice_item"></div>
                    </flexbox-item>
                </flexbox>
                <p>
                    00:
                    <template v-if="speckTime.time<10">0</template>
                    <countdown v-model="speckTime.time" :start="speckTime.start"
                               @on-finish="soundRecordingDialogIsShow_onConfirm"></countdown>
                </p>
            </confirm>
        </div>
    </div>
</template>

<script>
    import jsonp from 'jsonp'
    import {
        XInput,
        Group,
        XButton,
        Cell,
        Flexbox,
        FlexboxItem,
        XImg,
        XTextarea,
        Confirm,
        querystring,
        Countdown,
        Calendar,
        TransferDomDirective as TransferDom
    } from 'vux'
    import {mapState} from 'vuex'
    export default {
        directives: {
            TransferDom
        },
        components: {
            XInput,
            Group,
            XButton,
            Cell,
            Flexbox,
            FlexboxItem,
            XImg,
            XTextarea,
            Confirm,
            Countdown,
            Calendar
        },
        data() {
            return {
                // 用户提交数据
                fromValus: {
                    customerId: -1,
                    customerName: '',
                    content: '',
                    time: 'TODAY'
                },
                // 用户模糊搜索列表
                selecUsers: {
                    // 辅助列表现隐
                    show: false,
                    // 点击选择的时候 禁用ajax搜索
                    flag: false,
                    list: []
                },
                be2333: function (value) {
                    return {
                        valid: false,
                        msg: '不能为空'
                    }
                },
                speechCodePopup: true,
                // 当前屏幕的高度
                screenHeight: null,
                // 录音时间
                speckTime: {
                    start: false,
                    time: 59
                },
                // 录音窗口是否显示
                soundRecordingDialogIsShow: false,
                // 用户Id
                customerInfo: {},
                // 语音Id
                localId: null
            }
        },
        computed: {
            ...mapState({
                isLeader: state => state.vux.userInfo
            })
        },
        methods: {
            // 取消按钮
            soundRecordingDialogIsShow_onCancel() {
                const This = this
                This.$wechat.stopRecord({
                    success: function (res) {
                        This.speckTime.start = false
                        This.speckTime.time = 59
                    }
                })
            },
            // 重新录音
            reSoundRecording() {
                const This = this
                This.soundRecordingDialogIsShow = true
                This.speckTime.start = false
                This.$wechat.stopRecord({
                    success: function (res) {
                        This.speckTime.time = 59
                        This.$wechat.startRecord()
                        This.speckTime.start = true
                    }
                })
            },
            // 录音完成
            soundRecordingDialogIsShow_onConfirm() {
                let This = this
                This.soundRecordingDialogIsShow = false
                This.speckTime.start = false
                if (This.speckTime.time > 57) {
                    This.$vux.toast.show({
                        type: 'text',
                        text: '说话时间太短'
                    })
                    This.$wechat.stopRecord({
                        success: function (res) {
                        }
                    })
                    return
                }
                This.speckTime.time = 59
                This.$wechat.stopRecord({
                    success: function (res) {
                        This.localId = res.localId
                        console.log(`localId: ${This.localId}`)
                        // 进行语音转文字
                        This.uploadVoice()
                    }
                })
            },
//            经纬度转地址 ajax
            ajaxLonlatToLocation(longitude, latitude) {
                let This = this
                return new Promise((resolve, reject) => {
                    console.log(`longitude: ${longitude}, latitude: ${latitude}`)
                    jsonp(`http://api.map.baidu.com/geoconv/v1/?coords=${parseFloat(longitude)},${parseFloat(latitude)}&from=1&to=5&ak=zsuelrht1HcGTyZGG6BzP9HQ`, null, function (err, data) {
                        if (err) {
                            console.error(err.message)
                            This.$vux.toast.show({
                                type: 'cancel',
                                text: '转换百度坐标失败'
                            })
                        } else {
                            console.log(data)
                            jsonp(`http://api.map.baidu.com/geocoder/v2/?ak=zsuelrht1HcGTyZGG6BzP9HQ&output=json&location=${parseFloat(data.result[0].y)},${parseFloat(data.result[0].x)}`, null, function (err, data) {
                                if (err) {
                                    console.error(err.message)
                                    This.$vux.toast.show({
                                        type: 'cancel',
                                        text: '坐标转地址失败'
                                    })
                                    reject(err.message)
                                } else {
                                    console.log(data)
                                    resolve(data.result.formatted_address)
                                }
                            })
                        }
                    })
                })
            },
            // 根据客户名称模糊查询获取当前用户的客户列表接口
            ajaxSelecUsers() {
                if (this.selecUsers.flag) {
                    this.selecUsers.flag = false
                    return
                }
                this.selecUsers.show = true
                this.$http.post('/ys/gzrz/services/loadAllCustomersByCurrentUserAndName', querystring.stringify({
                    name: this.fromValus.customerName
                }))
                    .then(result => {
                        if (result.data.code === 'SUCCESS') {
                            this.selecUsers.list = result.data.body
                            this.selecUsers.show = true
                        } else {
                            console.error(`错误Code: ${result.data.code}, 错误信息: ${result.data.msg}`)
                        }
                    })
                    .catch(error => {
                        console.log(`ajax异常 ${JSON.stringify(error)}`)
                    })
            },
//            提交
            ajaxFrom() {
                if (this.trim(this.fromValus.customerName) === '') {
                    this.$vux.toast.show({
                        type: 'text',
                        text: '请填写客户姓名'
                    })
                    return
                }
                if (this.trim(this.fromValus.content) === '') {
                    this.$vux.toast.show({
                        type: 'text',
                        text: '请填写拜访记录'
                    })
                    return
                }
                this.$vux.loading.show({
                    text: '提交中...'
                })
                for (let i = 0; i < this.selecUsers.list.length; i++) {
                    let userName = this.fromValus.customerName
                    if (userName === this.selecUsers.list[i].name) {
                        this.fromValus.customerId = this.selecUsers.list[i].id
                        break
                    }
                }
                this.$http.post('/ys/gzrz/services/doSubmitRepublishVisitingRecord', querystring.stringify({
                    isLeader: this.isLeader,
                    customerId: this.fromValus.customerId,
                    customerName: this.fromValus.customerName,
                    time: this.fromValus.time,
                    content: this.fromValus.content
                })).then(result => {
                    this.$vux.loading.hide()
                    if (result.data.code === 'SUCCESS') {
                        this.$vux.toast.show({
                            type: 'success',
                            time: 1000,
                            text: '提交成功'
                        })
                        setTimeout(() => {
                            if (this.$route.query.customerName) {
                                this.$router.go(-1)
                            } else {
                                this.$router.replace({name: 'MyVisitingRecord'})
                            }
                        }, 800)
                    } else {
                        this.$vux.toast.show({
                            type: 'cancel',
                            text: result.data.msg
                        })
                        console.error(`错误Code: ${result.data.code}, 错误信息: ${result.data.msg}`)
                        console.log(result.data)
                    }
                }).catch(error => {
                    console.log(`ajax异常 ${JSON.stringify(error)}`)
                    console.log(error)
                    this.$vux.toast.show({
                        type: 'cancel',
                        text: '请求超时'
                    })
                    this.$vux.loading.hide()
                })
            },
//            微信定位 提交
            getLocation() {
                return new Promise((resolve, reject) => {
                    this.$wechat.getLocation({
                        type: 'wgs84',
                        success: function (res) {
                            resolve(res)
                        }
                    })
                })
            },
            // 选择客户
            selectUser(index) {
                this.selecUsers.show = false
                this.selecUsers.flag = true
                this.fromValus.customerName = this.selecUsers.list[index].name
                this.fromValus.customerId = this.selecUsers.list[index].id
            },
            // 开始录音
            startRecord() {
                this.soundRecordingDialogIsShow = true
                this.speckTime.time = 59
                this.$wechat.startRecord()
                this.speckTime.start = true
            },
            // 上传语音接口 语音转文字接口
            uploadVoice() {
                const This = this
                This.$vux.loading.show({
                    text: '语音转码中...'
                })
                This.$wechat.uploadVoice({
                    // 需要上传的音频的本地ID，由stopRecord接口获得
                    localId: This.localId,
                    // 默认为1，显示进度提示
                    isShowProgressTips: 0,
                    success: function (res) {
                        // 返回音频的服务器端ID
                        This.$http.post('/ys/gzrz/services/doConvertAudioToText', querystring.stringify({
                            serverId: res.serverId
                        })).then(res => {
                            This.$vux.loading.hide()

                            if (res.data.code === 'SUCCESS') {
                                if (This.trim(res.data.body) === '') {
                                    This.$vux.toast.show({
                                        type: 'text',
                                        text: '抱歉,没有听清'
                                    })
                                }
                                This.fromValus.content += res.data.body
                            } else {
                                This.$vux.toast.show({
                                    type: 'text',
                                    text: '抱歉,没有听清'
                                })
                                console.log('code:' + res.data.code + ',msg:' + res.data.msg)
                            }
                        }).catch(() => {
                            This.$vux.loading.hide()
                            This.$vux.toast.show({
                                type: 'cancel',
                                text: '语音转码失败'
                            })
                        })
                    }
                })
            },
            // 播放语音
            playVoice() {
                const This = this
                this.$wechat.playVoice({
                    localId: This.localId
                })
            },
            //  去空
            trim(str) {
                return str.replace(/^\s+|\s+$/g, '')
            }
        },
        async mounted() {
            console.log(this.isLeader)
            if (this.$route.query.customerName) {
                this.fromValus.customerName = this.$route.query.customerName
                this.selecUsers.flag = true
            }
            this.$wechat.ready(() => {
                this.startRecord()
            })
        },
        destroyed() {
            this.soundRecordingDialogIsShow_onCancel()
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
            position: relative;
            .customNameSelectList {
                position: absolute;
                top: 44px;
                left: 0;
                padding-left: calc(~ "5em + 15px");
                right: 0;
                z-index: 1;
                background-color: #fbf9fe;
                font-size: 17px;
                div {
                    padding: 10px 15px;
                }
            }
            /*拜访记录*/
            .desc {
                box-sizing: border-box;
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
                    &:before {
                        display: none
                    }
                    textarea {
                        width: 100%;
                        height: 200px;
                        box-sizing: border-box;
                        outline: none;
                        border: none;
                        resize: none;
                        overflow-y: auto;
                        color: #666666;
                        padding: 10px 15px;
                        font-size: 17px;
                        line-height: 1.41176471;
                        -webkit-overflow-scrolling: touch;
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

    /*录音Dialog*/
    .soundRecordingDialog {
        .icon {
            text-align: right;
            display: inline-block;
            i.iconfont {
                vertical-align: bottom;
                font-size: 54px;
                color: @styleColor;
            }
        }
        .voice {
            display: inline-block;
            height: 100%;
            .voice_item {
                height: 4px;
                border-radius: 10px;
                margin-bottom: 5px;
                background-color: @styleColor;
                transition: 1s all;
                opacity: 0;
                animation: voicline 1.5s infinite linear;
                -webkit-animation: voicline 1.5s infinite linear;
                &:nth-child(1) {
                    width: 25px;
                    /*animation-delay: 1.25s;*/
                    animation: voicline 1.5s infinite linear 1.25s;
                }
                &:nth-child(2) {
                    width: 22px;
                    /*animation-delay: 1s;*/
                    animation: voicline 1.5s infinite linear 1s;
                }
                &:nth-child(3) {
                    width: 19px;
                    /*animation-delay: .75s;*/
                    animation: voicline 1.5s infinite linear .75s;
                }
                &:nth-child(4) {
                    width: 16px;
                    /*animation-delay: .5s;*/
                    animation: voicline 1.5s infinite linear .5s;
                }
                &:nth-child(5) {
                    width: 13px;
                    animation-delay: .25s;
                    animation: voicline 1.5s infinite linear .25s;
                }
                &:nth-child(6) {
                    width: 10px;
                    animation-delay: 0s;
                    animation: voicline 1.5s infinite linear 0s;
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

    .keyframes (voicline, { 0% {
        opacity: 1;
    } 50% {
          opacity: .5;
      } });

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
