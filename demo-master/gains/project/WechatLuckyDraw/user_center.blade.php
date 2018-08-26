<!DOCTYPE html>
<html>

<head>
    <title>微信红包</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="renderer" content="webkit">
    <meta name="description" content="微信红包">
    <meta name="keyword" content="微信红包">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <link href="/luckyDraw/css/module/raffle.css" rel="stylesheet">
    <style type="text/css">
    .personal {
        width: 100vw;
        height: 100vh;
        padding: 18px 20px;
        background: #eee7d7;
    }

    .base {
        display: flex;
        align-items: center;
        padding: 20px;
        background-color: #fbf7eb;
        box-shadow: 0px 8px 7px 0px rgba(0, 0, 0, 0.07);
        border-radius: 4px;
    }

    .base .logo {
        width: 50px;
        height: 50px;
        margin: 0;
        padding: 0;
    }

    .base .text {
        padding: 12px;
    }

    .base .text span {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #b3a47e;
    }

    .content {
        margin-top: 21px;
        background-color: #fbf7eb;
        box-shadow: 0px 8px 7px 0px rgba(0, 0, 0, 0.07);
        padding: 0;
    }

    .content .line {
        display: flex;
        justify-content: space-between;
        padding: 14px 10px;
        border-bottom: 1px solid #eee7d7;
    }

    .content .line:nth-child(2n) {
        border: none;
    }

    .content .line .title,
    .content .line .msg {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #a59a7e;
    }

    .content .line .msg {
        display: inline-block;
    }

    .content .line i {
        display: inline-block;
        position: relative;
        width: 10px;
        height: 100%;
        padding-left: 5px;
    }

    .content .line i:after {
        border: 2px solid #c4bba5;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        position: absolute;
        top: -3px;
        right: 0;
        width: 8px;
        height: 8px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }
    </style>
</head>

<body>
    <div id="app" class="personal" v-cloak>
        <div class="base">
            <div class="logo">
                <img src="{{$user['headimgurl']}}">
            </div>
            <div class="text">
                <span>{{$user['nickname']}}</span>
            </div>
        </div>
        <div class="content">
            <div class="line" @click="isShowPhoneNumber=true" v-if='!user.phone'>
                <span class="title">手机号</span>
                <span class="msg" v-if='!user.phone'>未绑定<i></i></span>
            </div>
            <div class="line" v-if='user.phone'>
                <span class="title">手机号</span>
                <span class="msg">@{{user.phone}}</span>
            </div>
            <div class="line" @click="history">
                <span class="title">中奖记录</span>
                <span class="msg"><i></i></span>
            </div>
        </div>
        <!-- 填写电话&验证手机号码 -->
        <div class="alert-box" v-show="isShowPhoneNumber">
            <div class="wrapper">
                <div class="box phone-number">
                    <div class='form'>
                        <div class="form-title">手机号绑定</div>
                        <div class="ipt">
                            <input class="form-control" placeholder="请输入手机号" v-model="phoneNumberData.phone" type="text">
                        </div>
                        <div class="ipt">
                            <input class="form-control" placeholder="请输入验证码" v-model="phoneNumberData.code" type="text">
                            <!-- <div class="code" @click="getCode">获取验证码</div> -->
                            <div class="code" :class="!code.isShowCodeBtn?'active':''">
                                <div v-show="code.isShowCodeBtn" class="code-btn" @click="getCode">@{{code.text}}</div>
                                <div v-show="!code.isShowCodeBtn" class="code-btn"><span class="second" v-html="code.codeTime"></span>秒后重获</div>
                            </div>
                        </div>
                        <div class="btn" @click="bindPhone">确认绑定</div>
                    </div>
                    <div class="close" @click="isShowPhoneNumber=false"></div>
                </div>
            </div>
        </div>
        <!-- 打电话红包直接领取，不用写弹窗 -->
        <!-- <div class="toast" v-if="toast.isShowToast">
            <span class="text">@{{toast.text}}</span>
        </div> -->
        <!-- 提示 -->
        <div class="alert-box" v-if="toast.isShowToast">
            <div class="wrapper">
                <div class="box phone">
                    <div class="title"><span>提示</span></div>
                    <div class="prompt">
                        <p class="active">@{{toast.text}}</p>
                    </div>
                    <div class="close" @click="toast.isShowToast=false"></div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/luckyDraw/js/vue-2.5.13.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/axios-0.17.1.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/luckyDrawMixins.js"></script>
    <script type="text/javascript">
    new Vue({
        el: '#app',
        mixins: [],
        data: function() {
            return {
                isShowPhoneNumber: false,
                phoneNumberData: {
                    phone: '',
                    code: '',
                },
                code: {
                    isShowCodeBtn: true,
                    codeTime: 60,
                    text: '获取验证码'
                },
                toast: {
                    isShowToast: false,
                    text: '可以',
                    duration: 1000,
                },
                user: {
                    phone: '',
                },
            }
        },
        created: function() {
            this.user.phone = <?php echo json_encode($user['phone'] );?>;
        },
        mounted: function() {},
        computed: {},
        watch: {
            'isShowPhoneNumber': function(val) {
                if (val) {
                    ModalHelper.afterOpen();
                } else {
                    ModalHelper.beforeClose();
                }
            },
            'toast.isShowToast': function(val) {
                var that = this;
                console.log(val);
                if (val) {
                    ModalHelper.afterOpen();
                    clearTimeout(timer);
                    var timer = setTimeout(function() {
                        that.toast.isShowToast = false;
                    }, that.toast.duration)
                } else {
                    ModalHelper.beforeClose();
                }
            }
        },
        methods: {
            history: function() {
                window.location.href = './win_history_index'
            },
            //倒计时
            codeTimer: function() {
                var that = this;
                that.code.isShowCodeBtn = false;
                var interval = setInterval(function() {
                    that.code.codeTime--;
                    if (that.code.codeTime <= 0) {
                        that.code.isShowCodeBtn = true;
                        that.code.text = '重新获取验证码';
                        that.code.codeTime = 60;
                        clearInterval(interval);
                    }
                }, 1000);
            },
            getCode: function() {
                var that = this;
                that.codeTimer();
                if (that.phoneNumberData.phone === '') {
                    that.toast.text = '请输入手机号';
                    that.toast.isShowToast = true;
                    return false;
                } else if (!/^1[34578]\d{9}$/.test(that.phoneNumberData.phone)) {
                    that.toast.text = '请输入正确的手机号';
                    that.toast.isShowToast = true;
                    return false;
                }
                axios({
                    method: 'post',
                    url: '/phone_captcha',
                    data: {
                        phone: that.phoneNumberData.phone,
                    },
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-with': 'XMLHttpRequest'
                    }
                }).then(function(res) {
                    if (res.data.code === 0) {
                        // that.toast.text = res.data.mesg;
                        // that.toast.isShowToast = true;
                    } else {
                        that.toast.text = res.data.mesg;
                        that.toast.isShowToast = true;
                    }
                }).catch(function(err) {
                    that.toast.text = err;
                    that.toast.isShowToast = true;
                    console.log(err);
                });
            },
            bindPhone: function() {
                var that = this;
                if (that.phoneNumberData.phone === '') {
                    that.toast.text = '请输入手机号';
                    that.toast.isShowToast = true;
                    return false;
                } else if (!/^1[34578]\d{9}$/.test(that.phoneNumberData.phone)) {
                    that.toast.text = '请输入正确的手机号';
                    that.toast.isShowToast = true;
                    return false;
                }
                if (that.phoneNumberData.code === '') {
                    that.toast.text = '请输入验证码';
                    that.toast.isShowToast = true;
                    return false;
                } else if (!/^\d{6}$/.test(that.phoneNumberData.code)) {
                    that.toast.text = '请输入正确的验证码';
                    that.toast.isShowToast = true;
                    return false;
                }
                axios({
                    method: 'post',
                    url: '/wechat_user/phone',
                    data: {
                        phone: that.phoneNumberData.phone,
                        captcha: that.phoneNumberData.code,
                    },
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-with': 'XMLHttpRequest'
                    }
                }).then(function(res) {
                    if (res.data.code === 0) {
                        that.user.phone = that.phoneNumberData.phone;
                        that.isShowPhoneNumber = false;
                        that.toast.text = res.data.mesg;
                        that.toast.isShowToast = true;
                    } else {
                        that.toast.text = res.data.mesg;
                        that.toast.isShowToast = true;
                    }
                }).catch(function(err) {
                    console.log(err);
                    that.toast.text = err;
                    that.toast.isShowToast = true;
                });
            },
        }
    })
    </script>
</body>

</html>