<!DOCTYPE html>
<html>

<head>
    <title>{{ $lucky_draw['base']['title'] }}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="renderer" content="webkit">
    <meta name="description" content="抽奖">
    <meta name="keyword" content="抽奖">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <link href="/luckyDraw/css/module/raffle.css" rel="stylesheet">
    <link href="/luckyDraw/css/module/picker.css" rel="stylesheet">
    <style type="text/css">
    .container .lucky-draw {

        background: url("/luckyDraw/img/bg_top_a.png") no-repeat;
        background-size: cover;
    }

    .content {
        background-color: #ff423a;
    }

    .footer {
        background-image: url("/luckyDraw/img/bg_dibu_a.png");
    }

    .login {
        top: 0;
    }

    .operate .outer {
        background-image: url("/luckyDraw/img/bg_yaoshouj.png");
    }

    .operate .outer .item {
        display: none;
    }

    .operate .inner-cont {
        top: 77px;
        left: 8px;
    }

    .operate .inner {
        width: 168px;
        max-width: 168px;
        height: 160px;
    }

    @-moz-keyframes shake {
        0% {
            -moz-transform: scale(1);
        }
        10%,
        20% {
            -moz-transform: scale(0.9) rotate(-3deg);
        }
        30%,
        50%,
        70%,
        90% {
            -moz-transform: scale(1.2) rotate(3deg);
        }
        40%,
        60%,
        80% {
            -moz-transform: scale(1.2) rotate(-3deg);
        }
        100% {
            -moz-transform: scale(1) rotate(0);
        }
    }

    @-webkit-keyframes shake {
        0% {
            -webkit-transform: scale(1);
        }
        10%,
        20% {
            -webkit-transform: scale(0.9) rotate(-3deg);
        }
        30%,
        50%,
        70%,
        90% {
            -webkit-transform: scale(1.2) rotate(3deg);
        }
        40%,
        60%,
        80% {
            -webkit-transform: scale(1.2) rotate(-3deg);
        }
        100% {
            -webkit-transform: scale(1) rotate(0);
        }
    }

    .pointer-shake {
        -webkit-animation: shake 1s .2s ease both;
        -moz-animation: shake 1s .2s ease both;
    }


    audio:not([controls]) {
        display: none;
    }

    .hide {
        display: none;
    }

    .music .btn {
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
        line-height: 2.55555556;
        border-radius: 5px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        overflow: hidden;
        background-color: #E64340;
    }
    </style>
</head>

<body>
    <div id="app" class="container" v-cloak>
        <div class="lucky-draw">
            <div class="login" @click='userCenter'>
                <!-- <span>个人中心</span> -->
            </div>
            <div class="logo">
                <img src="/luckyDraw/img/font_yaoyiyao.png">
            </div>
            <div id="xycoordinates"></div>
            <div class="operate">
                <div class="outer-cont">
                    <div class="outer">
                        <canvas class="item" id="wheelcanvas" width="280px" height="280px"></canvas>
                    </div>
                </div>
                <div class="inner-cont">
                    <div class="inner">
                        <img onclick="return false" class="pointer" :class="turnplate.bRotate ? 'pointer-shake' : ''" src="/luckyDraw/img/pic_yaoshouji.png">
                    </div>
                </div>
            </div>
            <div class="next">
                <img src="/luckyDraw/img/ic_down_jiantou.png">
            </div>
        </div>
        <div class="content">
            <div class="box recodes">
                <div class="nav">
                    <div class="nav-box">
                        <span>本轮还剩下<i class="num">@{{turnplate.clickNum}}</i>次机会</span>
                    </div>
                </div>
                <div class="title"><span>中奖记录</span></div>
                <div class="detail">
                    <ul>
                        <li class="table-header">
                            <div class="tr">抽奖奖项</div>
                            <div class="tr">抽中时间</div>
                            <div class="tr">状态</div>
                        </li>
                    </ul>
                    <ul class="table-body-box">
                        <li class="table-body" v-for="item in awardData">
                            <div class="td" :class="(item.status ==0 || item.status==1)?'red-color':''">@{{item.award_name}}</div>
                            <div class="td">@{{item.created_at}}</div>
                            <div class="td" @click="alertWindow(item.status,item.history_id,item.prize_type)">
                                <span v-if="item.status === '1'">查看</span>
                                <span v-if="item.status === '0'">领取</span>
                                <span v-if="item.status === '2'">过期</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="box rules">
                <div class="title"><span>活动规则</span></div>
                <div class="detail">
                    <p class="active intro">活动简介</p>
                    <div class="text-box">
                        <div class="des">@{{ phpData.base.description }}</div>
                    </div>
                    <p class="active time">活动总时间</p>
                    <div class="text-box">
                        <div class="des">
                            <p v-for="item in phpData.round">
                                <span>@{{ item.name }}</span>
                                <span>@{{ item.start_time }}</span><span>---</span><span>@{{ item.end_time }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer"></div>
        </div>
        <!-- 抽奖 -->
        <div class="alert-box" v-show="isShowAward">
            <div class="wrapper">
                <div class="box award">
                    <!-- <p v-if="curAward.award_id!=0" class="win-logo"></p>
                    <p v-if="curAward.award_id==0" class="no-win-logo"></p> -->
                    <P>@{{curAward.mesg}}</P>
                    <div class="middle">
                        <div class="bg"></div>
                        <div class="icon">
                            <div class="win" v-if="curAward.award_id!=0">
                                <div class="award-detail">
                                    <p class="order">@{{curAward.award_name}}</p>
                                    <p class="des">@{{curAward.prize_name}}</p>
                                    <p class="img">
                                        <img :src="curAward.prize_url">
                                    </p>
                                </div>
                            </div>
                            <div class="no-win" v-if="curAward.award_id==0"></div>
                        </div>
                    </div>
                    <div class="btn" v-if="curAward.award_id!=0" @click="alertWindow(0,curAward.history_id,curAward.prize_type)">
                        <span class="text">立即领取</span>
                    </div>
                    <div class="btn" v-if="curAward.award_id==0" @click="isShowAward=false">
                        <span class="text">继续抽奖</span>
                    </div>
                    <div class="close" @click="isShowAward=false"></div>
                </div>
            </div>
        </div>
        <div class="alert-box" v-show="isShowLook">
            <div class="wrapper">
                <div class="box post">
                    <div class="title"><span>奖品领取信息</span></div>
                    <div class="detail">
                        <p><span>活动名称</span><span>@{{curAwardData.activity_name}}</span></p>
                        <p><span>中奖奖项</span><span>@{{curAwardData.award_name}}</span></p>
                        <p><span>中奖奖品</span><span>@{{curAwardData.prize_name}}</span></p>
                        <p><span>中奖时间</span><span>@{{curAwardData.created_at}}</span></p>
                        <div v-if="curAwardData.status==1 && curAwardData.prize_type==0 && curAwardData.accept_type==0">
                            <p><span>收货人</span><span>@{{curAwardData.receive_name}}</span></p>
                            <p><span>联系方式</span><span>@{{curAwardData.receive_phone}}</span></p>
                            <p><span>收货地址</span><span>@{{curAwardData.receive_region}}@{{curAwardData.receive_address}}</span></p>
                        </div>
                        <p>
                            <span>是否领取</span>
                            <span v-if="curAwardData.status==0">未领取</span>
                            <span v-if="curAwardData.status==1">已领取</span>
                        </p>
                        <p>
                            <span>是否发放</span>
                            <span v-if="curAwardData.prize_send==0">未发放</span>
                            <span v-if="curAwardData.prize_send==1">已发放</span>
                        </p>
                    </div>
                    <div class="close" @click="isShowLook=false"></div>
                </div>
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
                            <div class="code">
                                <div v-show="code.isShowCodeBtn" class="code-btn" @click="getCode">@{{code.text}}</div>
                                <div v-show="!code.isShowCodeBtn" class="code-btn"><span class="second" v-html="code.codeTime"></span>秒后重获</div>
                            </div>
                        </div>
                        <div class="btn" @click="bindPhone">确认绑定</div>
                    </div>
                    <div class="close" @click="isShowPhoneNumber=false;isCanShake=true"></div>
                </div>
            </div>
        </div>
        <!-- 填写地址 -->
        <div class="alert-box" v-show="isShowArea">
            <div class="wrapper">
                <div class="box area">
                    <div class='form'>
                        <div class="form-title">地址填写</div>
                        <div class="ipt">
                            <input class="form-control" placeholder="收货人" v-model="areaData.name" type="text">
                        </div>
                        <div class="ipt">
                            <input class="form-control" placeholder="手机号码" v-model="areaData.phone" type="text">
                        </div>
                        <div class="ipt" @click="selectRegion">
                            <input class="form-control" placeholder="所在地区" v-model="areaData.region" type="text">
                            <i class="arrow"></i>
                        </div>
                        <div class="ipt">
                            <textarea class="form-control area-detail" placeholder="详细地址" v-model="areaData.address"></textarea>
                        </div>
                        <div class="btn" @click="bindArea">确认绑定</div>
                    </div>
                    <div class="close" @click="isShowArea=false;isCanShake=true"></div>
                </div>
            </div>
        </div>
        <!-- 初次加载音频 -->
        <div class="alert-box" v-show="isShowIphoneMusic">
            <div class="wrapper">
                <div class="box music">
                    <div class='box'>
                        <!-- <div class="btn" >开始抽奖</div> -->
                        <img @click="musicOnload" src="/luckyDraw/img/tanchu.png">
                    </div>
                    <!-- <div class="close" @click="isShowIphoneMusic=false"></div> -->
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
        <div class="hide" id="shark">
            <audio id="audioplay" src="/luckyDraw/music/shark.mp3" ref="audioRef" @play="canplay" @error="error" @timeupdate="timeupdate" @ended="ended">
                你的浏览器不支持HTML5
            </audio>
        </div>
    </div>
    <script type="text/javascript" src="/luckyDraw/js/vue-2.5.13.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/axios-0.17.1.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/awardRotate.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/jweixin-1.2.0.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/city.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/picker.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/luckyDrawMixins.js"></script>
    <script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        mixins: [luckyDrawMixins],
        data: function() {
            return {
                lastX: 0,
                lastY: 0,
                lastZ: 0,
                lastTime: new Date(),
                threshold: 25, //用来判定的加速度阈值，太大了则很难触发
                timeout: 2000,
                spriteData: {
                    shark: {
                        start: 0,
                        length: 1.5
                    },
                    result: {
                        start: 2.4,
                        length: 2.5
                    }
                },
                playPeriod: true, //播放前面一段，叮叮
                isShowIphoneMusic: true,
                currentTime: 0, //播放时间
                shareInfo: {
                    title: '',
                    friend: '',
                    friend_circle: '',
                    image: '',
                }
            }
        },
        created: function() {
            this.user.phone = <?php echo json_encode($user['phone'] );?>;
            this.phpData = JSON.parse(JSON.stringify(<?php echo json_encode($lucky_draw);?>));
            this.turnplate.clickNum = this.phpData.join;
            for (var i = 0; i < this.phpData.award.length; i++) {
                this.turnplate.restaraunts.push(this.phpData.award[i].name);
            };
            if (!(this.phpData.award.length % 2)) { //偶数个，额外加一个奖项
                this.turnplate.restaraunts.splice(this.turnplate.restaraunts.length / 2, 0, this.turnplate.addAwardItem[1]); //中间位置增加元素
            }
            this.turnplate.restaraunts.push(this.turnplate.addAwardItem[0]);

            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                //微信分享
                this.sharePhpInfo.appId = <?php echo json_encode($wechat_share['appid']);?>;
                this.sharePhpInfo.noncestr = <?php echo json_encode($wechat_share['noncestr']);?>;
                this.sharePhpInfo.timestamp = <?php echo json_encode($wechat_share['timestamp']);?>;
                this.sharePhpInfo.signature = <?php echo json_encode($wechat_share['sign']);?>;
                this.sharePhpInfo.url = <?php echo json_encode($wechat_share['url']);?>;
                this.sharePhpInfo.jsapi_ticket = <?php echo json_encode($wechat_share['jsapi_ticket']);?>;
            }

        },
        mounted: function() {
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', this.deviceMotionHandler, false);
            }

            if (this.isShowIphoneMusic) {
                ModalHelper.afterOpen();
            }
        },
        computed: {},
        watch: {
            'isShowIphoneMusic': function(val) {
                if (val) {
                    ModalHelper.afterOpen();
                } else {
                    ModalHelper.beforeClose();
                }
            },
        },
        methods: {
            musicOnload: function() {
                document.getElementById('audioplay').load();
                this.isShowIphoneMusic = false;
            },
            deviceMotionHandler: function(e) {
                if (this.turnplate.bRotate) return;
                if (this.isShowPhoneNumber) { return };
                if (this.isShowAward) { return };
                if (this.isShowLook) { return };
                if (this.isShowArea) { return };
                if (!this.isCanShake) { return };
                if (this.isShowIphoneMusic) { return };
                var current = e.accelerationIncludingGravity;
                var currentTime;
                var timeDifference;
                if (((Math.abs(this.lastX - current.x) > this.threshold)) || (Math.abs(this.lastY - current.y) > this.threshold) || (Math.abs(this.lastZ - current.z) > this.threshold)) {
                    currentTime = new Date();
                    timeDifference = currentTime.getTime() - this.lastTime.getTime();
                    if (timeDifference > this.timeout) {
                        this.lastTime = new Date();
                        this.turnCircle();
                        /*var audioSprite = document.getElementById('audioplay');
                        audioSprite.addEventListener('timeupdate', this.handler, false);*/
                    }
                }
                this.lastX = current.x;
                this.lastY = current.y;
                this.lastZ = current.z;
            },
            canplay() {},
            error() {},
            timeupdate(e) {
                this.currentTime = e.target.currentTime;
                if (this.playPeriod) {
                    if (this.currentTime >= this.spriteData.shark.start + this.spriteData.shark.length) { //摇的声音
                        this.$refs.audioRef.pause();
                        this.playPeriod = false;
                    } else {
                        if (this.currentTime >= this.spriteData.result.start + this.spriteData.result.length) { //摇结果的声音
                            this.$refs.audioRef.pause();
                        }
                    }
                }
            },
            ended() {},
            postAward: function() {
                var that = this;
                var id = that.phpData.base.id;
                that.turnplate.bRotate = true; //防止连续点击
                that.$refs.audioRef.currentTime = that.spriteData.shark.start;
                that.$refs.audioRef.play();
                that.playPeriod = true;
                axios({
                    method: 'post',
                    url: '/wechat_lucky_draw/' + id + '/join',
                    data: {},
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-with': 'XMLHttpRequest'
                    }
                }).then(function(res) {
                    console.log(res)
                    var itemIndex = null;
                    setTimeout(function() { //防止连续点击
                        that.turnplate.bRotate = false;
                        that.$refs.audioRef.currentTime = that.spriteData.result.start;
                        that.$refs.audioRef.play();
                        that.playPeriod = false;
                    }, 1000)

                    if (parseInt(res.data.code) === 0) { //0为参与成功，其它为参与失败  
                        if (parseInt(res.data.award_id) === 0) { //没中奖                            
                            // console.log('没中奖')
                            that.curAward.mesg = res.data.mesg;
                            var curAddAwardItemIndex = null;
                            if (!(that.phpData.award.length % 2)) { //偶数个，额外加一个奖项
                                curAddAwardItemIndex = that.rnd(1, that.turnplate.addAwardItem.length);
                            } else { //奇数个
                                curAddAwardItemIndex = 1;
                            }
                            for (var i = 0; i < that.turnplate.restaraunts.length; i++) {
                                if (that.turnplate.restaraunts[i] === that.turnplate.addAwardItem[curAddAwardItemIndex - 1]) {
                                    itemIndex = i;
                                }
                            }
                        } else if (parseInt(res.data.award_id) > 0) { //中奖
                            console.log('中奖');
                            console.log(res.data.award_name);
                            that.curAward.award_id = parseInt(res.data.award_id);
                            that.curAward.award_name = res.data.award_name;
                            that.curAward.prize_name = res.data.prize_name;
                            that.curAward.prize_url = res.data.prize_url;
                            that.curAward.history_id = res.data.history_id;
                            that.curAward.mesg = res.data.mesg;
                            for (var i = 0; i < that.phpData.award.length; i++) {
                                if (parseInt(that.phpData.award[i].id) === parseInt(res.data.award_id)) {
                                    var curAwardName = that.phpData.award[i].name
                                    for (var i = 0; i < that.turnplate.restaraunts.length; i++) {
                                        if (that.turnplate.restaraunts[i] === curAwardName) {
                                            itemIndex = i;
                                        }
                                    }
                                };
                            }
                        } else {
                            setTimeout(function() { //防止连续点击
                                that.toast.text = res.data.mesg;
                                that.toast.isShowToast = true;
                            }, 3000)
                        }
                        that.turnplate.clickNum = parseInt(that.turnplate.clickNum) - 1; //抽奖次数
                        that.rotateFn(itemIndex + 1, that.turnplate.restaraunts[itemIndex]); //转盘
                        that.refreshAwardData();
                    } else {
                        setTimeout(function() { //防止连续点击
                            that.toast.text = res.data.mesg;
                            that.toast.isShowToast = true;
                        }, 3000)

                    }
                }).catch(function(err) {
                    console.log(err);
                    setTimeout(function() { //防止连续点击
                        that.toast.text = res.data.mesg;
                        that.toast.isShowToast = true;
                    }, 3000)
                });
            },
        }
    })
    </script>
</body>

</html>