/**
  * ModalHelper helpers resolve the modal scrolling issue on mobile devices
  * https://github.com/twbs/bootstrap/issues/15852
  * requires document.scrollingElement polyfill https://github.com/yangg/scrolling-element
  */
var ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-open');

// 定义一个混入对象
var luckyDrawMixins = {
    data: function() {
        return {
            phpData: {}, //后台数据
            user: {
                phone: '',
            },
            curAward: { //当前中奖
                award_id: 0,
                history_id: 0,
                award_name: '',
                prize_name: '',
                prize_url: '',
                prize_type: 0,
                mesg: '',
            },
            turnplate: {
                addAwardItem: ['谢谢参与', '再接再厉', ],
                restaraunts: [], // ["一等奖", "二等奖", "三等奖", "四等奖", "5等奖", "6等奖", "7等奖 "], //大转盘奖品名称
                colors: [], //大转盘奖品区块对应背景颜色
                id: [],
                outsideRadius: 120, //大转盘外圆的半径,140
                textRadius: 80, //大转盘奖品位置距离圆心的距离
                insideRadius: 40, //大转盘内圆的半径
                startAngle: 0, //开始角度
                bRotate: false, //false:停止;ture:旋转
                clickNum: 0, //可抽奖次数   
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
            isShowAward: false, //大转盘
            isShowLook: false, //查看，红包，打电话，快递
            isShowArea: false, //填写地址
            toast: {
                isShowToast: false,
                text: '',
                duration: 2500,
            },
            shareInfo: {
                title: '',
                friend: '',
                friend_circle: '',
                image: '',
            },
            sharePhpInfo: {
                appId: '', // 必填，公众号的唯一标识
                timestamp: '', // 必填，生成签名的时间戳
                nonceStr: '', // 必填，生成签名的随机串
                signature: '',
                url: '',
                jsapi_ticket: '',
            },
            isCanShake: true,
        }
    },
    mounted: function() {
        this.getAwardData();
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.getShareInfo();
        };
    },
    computed: {},
    watch: {
        'isShowPhoneNumber':function(val){
            if (val) {
                ModalHelper.afterOpen();
            }else{
                ModalHelper.beforeClose();
            }
        },
        'isShowAward':function(val){
            if (val) {
                ModalHelper.afterOpen();
            }else{
                ModalHelper.beforeClose();
            }
        },
        'isShowLook':function(val){
            if (val) {
                ModalHelper.afterOpen();
            }else{
                ModalHelper.beforeClose();
            }
        },
        'isShowArea':function(val){
            if (val) {
                ModalHelper.afterOpen();
            }else{
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
            }else{
                 ModalHelper.beforeClose();
            }
        }
    },
    methods: {
        wxConfig: function() {
            var that = this;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: that.sharePhpInfo.appId, // 必填，公众号的唯一标识
                timestamp: that.sharePhpInfo.timestamp, // 必填，生成签名的时间戳
                nonceStr: that.sharePhpInfo.noncestr, // 必填，生成签名的随机串
                signature: that.sharePhpInfo.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                success: function(res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            });
            wx.ready(function() {
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                wx.onMenuShareAppMessage({ //分享朋友
                    title: that.shareInfo.title, // 分享标题
                    desc: that.shareInfo.friend, // 分享描述
                    link: that.sharePhpInfo.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: that.shareInfo.image,
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        that.toast.text = '分享成功';
                        that.toast.isShowToast = true;
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareTimeline({ //分享朋友圈
                    title: that.shareInfo.title, // 分享标题
                    link: that.sharePhpInfo.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: that.shareInfo.image, // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        that.toast.text = '分享成功';
                        that.toast.isShowToast = true;
                    },
                })
                /*wx.onMenuShareQQ({//分享qq
                    title: pageTitle, // 分享标题
                    desc: document.title, // 分享描述
                    link: document.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://' + window.location.host + '/static/image/logo.png',
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        that.toast('分享成功');
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareQZone({//分享空间
                    title: pageTitle, // 分享标题
                    desc: document.title, // 分享描述
                    link: document.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://' + window.location.host + '/static/image/logo.png',
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        that.toast('分享成功');
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });*/
            });
        },
        getShareInfo: function() {
            var that = this;
            var id = that.phpData.base.id;
            axios({
                method: 'get',
                url: '/wechat_lucky_draw/' + id + '/share',
                params: {},
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'X-Requested-with': 'XMLHttpRequest'
                }
            }).then(function(res) {
                if (res.data.code === 0) {
                    console.log(res.data)
                    that.shareInfo.title = res.data.title;
                    that.shareInfo.friend = res.data.friend;
                    that.shareInfo.friend_circle = res.data.friend_circle;
                    that.shareInfo.image = res.data.image;
                    that.wxConfig();
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
                this.isCanShake = false;
                if (parseInt(type) == 0) { //实物
                    if (parseInt(this.phpData.base.accept_type) === 0) { //线下快递
                        this.isShowArea = true;
                    } else if (parseInt(this.phpData.base.accept_type) === 1) { //线下电话
                        this.getAwardOnce(id); //立即领取
                    }
                } else if (parseInt(type) === 1) { // 线上红包，跳转页面
                    this.getAwardOnce(id); //立即领取
                }
            } else if (parseInt(status) === 1) { //查看
                this.isShowLook = true;
                this.checkLook();
            } else {
                return;
            }
        },
        userCenter: function() {
            window.location.href = '/wechat_lucky_draw/user_center'
        },
        turnCircle: function() {
            if (this.turnplate.bRotate) return;
            this.curAward = { //当前中奖
                award_id: 0,
                history_id: 0,
                award_name: '',
                prize_name: '',
                prize_url: '',
                prize_type: 0,
                mesg: '',
            };
            this.postAward();
            /*if (this.turnplate.bRotate) return;
            if (this.turnplate.clickNum >= 1) {
                this.curAward = { //当前中奖
                    award_id: 0,
                    history_id: 0,
                    award_name: '',
                    prize_name: '',
                    prize_url: '',
                    prize_type: 0,
                };
                this.postAward();
            } else {
                this.turnplate.bRotate = !this.turnplate.bRotate;
            }*/
        },
        refreshAwardData: function() {
            this.getAwardData();
        },
        getAwardData: function() {
            var that = this;
            axios({
                method: 'get',
                url: '/wechat_lucky_draw/win_history',
                params: {
                    ld_id: that.phpData.base.id,
                    page: that.page,
                    rows: that.rows,
                },
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'X-Requested-with': 'XMLHttpRequest'
                }
            }).then(function(res) {
                if (res.data.code === 0) {
                    console.log(res.data.data);
                    that.awardData = res.data.data;
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
        postAward: function() {
            var that = this;
            var id = that.phpData.base.id;
            that.turnplate.bRotate = true; //防止连续点击
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
                }, 1000)
                if (parseInt(res.data.code) === 0) { //0为参与成功，其它为参与失败
                    that.turnplate.clickNum = res.data.join;
                    that.phpData.join = res.data.join;
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
                        that.toast.text = res.data.mesg;
                        that.toast.isShowToast = true;
                    }
                    that.turnplate.clickNum = parseInt(that.turnplate.clickNum) - 1; //抽奖次数
                    that.rotateFn(itemIndex + 1, that.turnplate.restaraunts[itemIndex]); //转盘
                    that.refreshAwardData();
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
            if (that.phoneNumberData.phone === '') {
                that.toast.text = '请输入手机号';
                that.toast.isShowToast = true;
                return false;
            } else if (!/^1[34578]\d{9}$/.test(that.phoneNumberData.phone)) {
                that.toast.text = '请输入正确的手机号';
                that.toast.isShowToast = true;
                return false;
            }
            that.codeTimer();
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
                    console.log(that.curAwardData.status, that.curAwardData.id, that.curAwardData.prize_type);
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
                that.toast.text = '请输入2-10个汉字或4-20个字母数字或_-';
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
                    that.isCanShake = true;
                    that.refreshAwardData();
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
                    that.refreshAwardData();
                    that.toast.text = res.data.mesg;
                    that.toast.isShowToast = true;
                    that.isCanShake = true;
                } else if (res.data.code == '200014') {
                    window.location.href = res.data.url;
                    console.log('领取红包，重定向')
                } else if (res.data.code == '200013') {
                    console.log('填写地址');
                    // that.isShowArea = true;
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
        //旋转转盘 item:奖品位置; txt：提示语;
        rotateFn: function(item, txt) {
            var that = this;
            var angles = item * (360 / this.turnplate.restaraunts.length) - (360 / (this.turnplate.restaraunts.length * 2));
            console.log(angles);
            if (angles < 270) { angles = 270 - angles; } else { angles = 360 - angles + 270; }
            $('#wheelcanvas').stopRotate();
            $('#wheelcanvas').rotate({
                angle: 0,
                animateTo: angles + 1800,
                duration: 3000,
                callback: function() { //回调
                    that.isShowAward = true;
                }
            });
        },
        rnd: function(n, m) {
            var random = Math.floor(Math.random() * (m - n + 1) + n);
            return random;
        },
        drawRouvarteWheel: function() {
            var canvas = document.getElementById("wheelcanvas");
            if (canvas.getContext) {
                //根据奖品个数计算圆周角度
                var arc = Math.PI / (this.turnplate.restaraunts.length / 2);
                var ctx = canvas.getContext("2d");
                //在给定矩形内清空一个矩形
                ctx.clearRect(0, 0, 280, 280);
                //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
                ctx.strokeStyle = "#FFBE04";
                //font 属性设置或返回画布上文本内容的当前字体属性
                // ctx.font = '300 1em/1.8 Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans';
                ctx.font = '600 18px/20px -apple-system-font, Helvetica Neue, Helvetica, sans-serif';
                for (var i = 0; i < this.turnplate.restaraunts.length; i++) {
                    var angle = this.turnplate.startAngle + i * arc;
                    // ctx.fillStyle = this.turnplate.colors[i];
                    // "#ff8584" "#fed077"
                    if (i % 2) {
                        ctx.fillStyle = "rgba(254,208,119,0.8)";
                    } else {
                        ctx.fillStyle = "rgba(255,133,132,0.8)";
                    };
                    ctx.beginPath();
                    //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
                    ctx.arc(140, 140, this.turnplate.outsideRadius, angle, angle + arc, false);
                    ctx.arc(140, 140, this.turnplate.insideRadius, angle + arc, angle, true);
                    ctx.stroke();
                    ctx.fill();
                    //锁画布(为了保存之前的画布状态)
                    ctx.save();
                    //改变画布文字颜色
                    var b = i + 2;
                    // "#fff"
                    if (b % 2) {
                        ctx.fillStyle = "rgba(255,255,255,1)";
                    } else {
                        ctx.fillStyle = "rgba(255,255,255,1)";
                    };
                    var text = this.turnplate.restaraunts[i];
                    var line_height = 20;
                    //translate方法重新映射画布上的 (0,0) 位置
                    ctx.translate(140 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 140 + Math.sin(angle + arc / 2) * this.turnplate.textRadius);

                    //rotate方法旋转当前的绘图
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);

                    // ctx.font = "17px/20px 兰亭粗黑 GBK";
                    /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                    if (text.length > 4) { //奖品名称长度超过一定范围 
                        text = text.substring(0, 4) + "||" + text.substring(4);
                        var texts = text.split("||");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                        }
                    } else {
                        //在画布上绘制填色的文本。文本的默认颜色是黑色
                        //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                    }
                    //把当前画布返回（调整）到上一个save()状态之前 
                    ctx.restore();
                }
            }
        },
    }
}