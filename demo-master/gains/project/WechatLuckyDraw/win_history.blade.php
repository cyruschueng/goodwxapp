<!DOCTYPE html>
<html>

<head>
    <title>历史记录</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="renderer" content="webkit">
    <meta name="description" content="历史记录">
    <meta name="keyword" content="历史记录">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <link href="/luckyDraw/css/module/raffle.css" rel="stylesheet">
    <link href="/luckyDraw/css/module/picker.css" rel="stylesheet">
    <style type="text/css">
    .history {
        width: 100wh;
        /*height: 100vh;*/
        min-height: 100%;
        background: #eee7d7;
    }

    nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 35px;
        background-color: #fbf7eb;
    }

    nav span {
        font-size: 13px;
        line-height: 13px;
        letter-spacing: 0px;
        color: #bfb69e;
    }

    .content {
        margin-top: 0px;
        padding: 20px;
        background-color: #eee7d7;
    }

    .content .list {
        margin-top: 18px;
    }

    .content .list.more {
        display: flex;
        justify-content: center;
        border: 1px solid #ad9f71;
        padding: 4px;
        font-size: 16px;
        width: 100px;
        margin: 18px auto 0;
        color: #ad9f71;
        border-radius: 6px;
    }

    .content .list.all-load {
        display: flex;
        justify-content: center;
        padding: 4px;
        font-size: 12px;
        width: 100px;
        margin: 18px auto 0;
        color: #ad9f71;
    }

    .list:first-child {
        margin-top: 0;
    }

    .list .title {
        width: 100%;
        height: 20px;
        padding-left: 18px;
        background-color: #f63937;
        border-radius: 4px 4px 0px 0px;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
    }

    .list .detail {
        display: flex;
        padding: 18px;
        background-color: #fbf7eb;
        box-shadow: 0px 8px 7px 0px rgba(0, 0, 0, 0.07);
        border-radius: 4px;
    }

    .list .detail .logo {
        width: 50px;
        height: 50px;
        border-radius: 4px;
        padding-top: 0!important;
    }

    .list .detail .msg {
        display: flex;
        flex: 1;
        justify-content: space-between;
    }

    .list .detail .msg .des {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding-left: 10px;
    }

    .detail .msg .award {
        font-size: 14px;
        line-height: 14px;
        letter-spacing: 0px;
        color: #ff544c;
    }

    .detail .msg .time {
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ad9f71;
    }

    .detail .msg .btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .detail .msg .btn span {
        font-size: 14px;
        line-height: 14px;
        letter-spacing: 0px;
        color: #a59a7e;
    }
    </style>
</head>

<body>
    <div id="app" class="history" v-cloak>
        <!-- <nav>
            <span>查看</span>
            <span>查看</span>
            <span>查看</span>
        </nav> -->
        <div class="content">
            <ul>
                <li class="list" v-for="item in awardData">
                    <div class="title">@{{item.ld_title}}</div>
                    <div class="detail">
                        <div class="logo">
                            <img :src="item.prize_url">
                        </div>
                        <div class="msg">
                            <div class="des">
                                <p class="award">@{{item.award_name}}</p>
                                <p class="time">@{{item.created_at}}</p>
                            </div>
                            <div class="btn" @click="alertWindow(item.status,item.history_id,item.prize_type)">
                                <span v-if="item.status === '1'">查看</span>
                                <span v-if="item.status === '0'">领取</span>
                                <span v-if="item.status === '2'">过期</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list more" v-if="!isShowAllLoad" @click="loadMore">
                    <span>加载更多</span>
                </li>
                <li class="list all-load" v-if="isShowAllLoad">
                    <span>加载完成</span>
                </li>
            </ul>
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
                            <span v-if="curAwardData.prize_send!=1">未发放</span>
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
                            <!-- <div class="code" @click="getCode">获取验证码</div> -->
                            <div class="code">
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
                    <div class="close" @click="isShowArea=false"></div>
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
    <script type="text/javascript" src="/luckyDraw/js/city.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/picker.js"></script>    
    <script type="text/javascript" src="/luckyDraw/js/luckyDrawMixins.js"></script>
    <script type="text/javascript">
    new Vue({
        el: '#app',
        mixins: [],
        data: function() {
            return {
                user: {
                    phone: '',
                },
                awardData: [], //中奖记录
                curAwardData: { //查看和领取弹出
                    id: '',
                    created_at: '',
                    status: 0,
                    activity_name: '',
                    accept_type: 0,
                    award_name: '',
                    prize_name: '',
                    prize_type: 0,
                    prize_send: 0,
                    receive_name: '',
                    receive_phone: '',
                    receive_region: '',
                },
                page: 1,
                rows: 10,
                page_total: 0,
                total: 0,
                phoneNumberData: { //绑定手机
                    phone: '',
                    code: '',
                },
                code: { //验证码
                    isShowCodeBtn: true,
                    codeTime: 60,
                    text: '获取验证码'
                },
                areaData: { //地址信息
                    id: '',
                    name: '',
                    phone: '',
                    region: '',
                    address: '',
                },
                isShowPhoneNumber: false, //手机绑定
                isShowLook: false, //查看，红包，打电话，快递
                isShowArea: false, //填写地址
                isShowAllLoad: false,
                toast: {
                    isShowToast: false,
                    text: '可以',
                    duration: 1000,
                },
            }
        },
        created: function() {
            this.user.phone = <?php echo json_encode($user['phone'] );?>;
        },
        mounted: function() {
            this.getAwardData();
        },
        computed: {},
        watch: {
            'isShowPhoneNumber': function(val) {
                if (val) {
                    ModalHelper.afterOpen();
                } else {
                    ModalHelper.beforeClose();
                }
            },
            'isShowLook': function(val) {
                if (val) {
                    ModalHelper.afterOpen();
                } else {
                    ModalHelper.beforeClose();
                }
            },
            'isShowArea': function(val) {
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
            alertWindow: function(status, id, type) {
                //status,0为领取，1为查看，2为过期
                //type,0为实物，1为红包
                //accept_type，0为线上快递，1为线下电话，针对活动
                // console.log(this.user.phone);
                // console.log(status, id, type);
                // console.log(this.phpData.base.accept_type);
                if (parseInt(this.curAwardData.id) != parseInt(id)) { //重置地址信息
                    this.areaData = {
                        id: '',
                        name: '',
                        phone: '',
                        region: '',
                        address: '',
                    }
                };
                this.curAwardData.status = status;
                this.curAwardData.id = id;
                this.curAwardData.prize_type = type;
                if (!this.user.phone) { //先绑定手机
                    this.isShowPhoneNumber = true;
                    return;
                }
                //如果是立即领取
                if (this.isShowAward) {
                    this.isShowAward = false;
                }
                if (parseInt(status) === 0) { //领取
                    if (parseInt(type) == 0) { //实物
                        this.getAwardOnce(id);
                        /*if (parseInt(this.phpData.base.accept_type) === 0) { //线下快递
                            this.isShowArea = true;
                        } else if (parseInt(this.phpData.base.accept_type) === 1) { //线下电话
                            console.log('直接领取');
                            this.getAwardOnce(id); //立即领取
                        }*/
                    } else if (parseInt(type) === 1) { // 线上红包，跳转页面
                        this.getAwardOnce(id);
                        console.log('跳页面领取');
                    }
                } else if (parseInt(status) === 1) { //查看
                    this.isShowLook = true;
                    this.checkLook();
                } else {
                    return;
                }
            },
            refreshAwardData: function() {
                console.log(1);
                // this.getAwardData();
            },
            getAwardData: function() {
                var that = this;
                axios({
                    method: 'get',
                    url: '/wechat_lucky_draw/win_history',
                    params: {
                        ld_id: '',
                        page: that.page,
                        rows: that.rows,
                    },
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-with': 'XMLHttpRequest'
                    }
                }).then(function(res) {
                    if (res.data.code === 0) {
                        that.page_total = res.data.page_total;
                        if (that.page > that.page_total) {
                            that.isShowAllLoad = true;
                        } else {
                            that.awardData.push.apply(that.awardData, res.data.data);
                        }
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
            loadMore: function() {
                this.page++;
                this.getAwardData();
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
                        console.log(res.data.data);
                        /*that.toast.text = res.data.mesg;
                        that.toast.isShowToast = true;*/
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
                        console.log(res.data.data);
                        that.user.phone = that.phoneNumberData.phone;
                        that.isShowPhoneNumber = false;
                        that.toast.text = res.data.mesg;
                        that.toast.isShowToast = true;
                        that.alertWindow(that.curAwardData.status, that.curAwardData.id, that.curAwardData.prize_type);

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
            bindArea: function() {
                var that = this;
                // 收货人
                function getByteLen(val) {
                    var len = 0;
                    for (var i = 0; i < val.length; i++) {
                        var a = val.charAt(i);
                        if (a.match(/[^\x00-\xff]/ig) != null) {
                            len += 2;
                        } else {
                            len += 1;
                        }
                    }
                    return len;
                }
                var len = getByteLen(that.areaData.name);
                var verifyLen = len >= 4 && len <= 20;
                var verifyString = /^[\u4e00-\u9fa5a-zA-Z0-9_-]*$/.test(that.areaData.name);
                if (that.areaData.name === '') {
                    that.toast.text = '请输入收货人';
                    that.toast.isShowToast = true;
                    return false;
                } else if (!verifyLen || !verifyString) {
                    that.toast.text = '请输入2-20汉字数字或_-';
                    that.toast.isShowToast = true;
                    return false;
                }

                if (that.areaData.phone === '') {
                    that.toast.text = '请输入手机号';
                    that.toast.isShowToast = true;
                    return false;
                } else if (!/^1[34578]\d{9}$/.test(that.areaData.phone)) {
                    that.toast.text = '请输入正确的手机号';
                    that.toast.isShowToast = true;
                    return false;
                }
                if (that.areaData.region === '') {
                    that.toast.text = '请输入所在地区';
                    that.toast.isShowToast = true;
                    return false;
                }
                if (that.areaData.address === '') {
                    that.toast.text = '请输入详细地址';
                    that.toast.isShowToast = true;
                    return false;
                }
                axios({
                    method: 'post',
                    url: '/wechat_lucky_draw/receive_address',
                    data: {
                        history_id: that.curAwardData.id,
                        name: that.areaData.name,
                        phone: that.areaData.phone,
                        region: that.areaData.region,
                        address: that.areaData.address,
                    },
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-with': 'XMLHttpRequest'
                    }
                }).then(function(res) {
                    if (res.data.code === 0) {
                        that.isShowArea = false;
                        that.toast.text = res.data.mesg;
                        that.toast.isShowToast = true;
                        for (var i = 0; i < that.awardData.length; i++) {
                            if (that.awardData[i].history_id == that.curAwardData.id) {
                                that.awardData[i].status = 1 + '';
                            }
                        }
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
            checkLook: function() {
                var that = this;
                axios({
                    method: 'get',
                    url: '/wechat_lucky_draw/win_history_info',
                    params: {
                        history_id: that.curAwardData.id,
                    },
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-with': 'XMLHttpRequest'
                    }
                }).then(function(res) {
                    console.log(res);
                    if (res.data.code === 0) {
                        console.log(res);
                        that.curAwardData.created_at = res.data.created_at;
                        that.curAwardData.status = res.data.status;
                        that.curAwardData.activity_name = res.data.activity_name;
                        that.curAwardData.accept_type = res.data.accept_type;
                        that.curAwardData.award_name = res.data.award_name;
                        that.curAwardData.prize_name = res.data.prize_name;
                        that.curAwardData.prize_type = res.data.prize_type;
                        that.curAwardData.prize_send = res.data.prize_send;
                        that.curAwardData.receive_name = res.data.receive_name;
                        that.curAwardData.receive_phone = res.data.receive_phone;
                        that.curAwardData.receive_region = res.data.receive_region;
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
            getAwardOnce: function(id) {
                var that = this;
                console.log(id);
                axios({
                    method: 'post',
                    url: '/wechat_lucky_draw/accept_award',
                    data: {
                        history_id: id,
                    },
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-with': 'XMLHttpRequest'
                    }
                }).then(function(res) {
                    console.log(res);
                    if (res.data.code === 0) {
                        console.log('领取成功');
                        for (var i = 0; i < that.awardData.length; i++) {
                            if (that.awardData[i].history_id == id) {
                                that.awardData[i].status = 1 + '';
                            }
                        }
                        that.toast.text = res.data.mesg;
                        that.toast.isShowToast = true;
                    } else if (res.data.code == '200014') {
                        window.location.href = res.data.url;
                        console.log('领取红包，重定向')
                    } else if (res.data.code == '200013') {
                        console.log('填写地址');
                        that.isShowArea = true;
                    } else {
                        that.toast.text = res.data.mesg;
                        that.toast.isShowToast = true;
                    }
                    that.isShowAward = false;
                }).catch(function(err) {
                    console.log(err);
                    that.toast.text = err;
                    that.toast.isShowToast = true;
                });
            },
            selectRegion: function() {
                var that = this;
                new Picker({
                    "title": '', //标题(可选)
                    "defaultValue": that.areaData.region, //默认值-多个以空格分开（可选）
                    "data": cityData, //数据(必传)
                    "keys": {
                        "id": "Code",
                        "value": "Name",
                        "childData": "level" //最多3级联动
                    }, //数组内的键名称(必传，id、text、data)
                    "callBack": function(val) {
                        //回调函数（val为选择的值）
                        that.areaData.region = val;
                    }
                });
            },
        }
    })
    </script>
</body>

</html>