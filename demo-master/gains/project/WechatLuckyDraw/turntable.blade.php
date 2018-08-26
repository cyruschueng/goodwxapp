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
</head>

<body>
    <div id="app" class="container" v-cloak>
        <div class="lucky-draw">
            <div class="login" @click='userCenter'>
                <!-- <span>个人中心</span> -->
            </div>
            <div class="logo">
                <img src="/luckyDraw/img/font_zhuangpan.png">
            </div>
            <div id="xycoordinates"></div>
            <div class="operate">
                <div class="outer-cont">
                    <div class="outer">
                        <canvas class="my-canvas" id="wheelcanvas" width="280px" height="280px"></canvas>
                    </div>
                </div>
                <div class="inner-cont">
                    <div class="inner">
                        <img @click.stop="turnCircle" class="pointer" src="/luckyDraw/img/bt_lijichuojian.png">
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
            return {}
        },
        created: function() {
            this.phpData = [];
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
            this.drawRouvarteWheel();
        },
        methods: {}
    })
    </script>
</body>

</html>