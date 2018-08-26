/**
 * Created by lip on 2016/6/7.
 */
var $ = require('jquery');
var Hammer = require('hammerjs');
var React = require('react');

var User = require('./User');
var Util = require('./Util');
var Loading = require('./Loading');
var Dimensions = require('./Dimensions');
var Config = require('./Config');
var QRCodePay = require('./component/QRCodePay');


var OnFire =require('onfire.js');

const GET_ORDER_API = Util.getAPIUrl('get_order');//获取统一下单API
const COURSE_PRICE = 4;//课程价格，和长投数据库对应的数据，价格(元)

/**
 * 模块变量
 */
var payInfo = {};  //支付信息
var payPullingFlag = false;//正在拉取支付信息的flag
var orderConfirmationInstance = null;//订单确认实例
var payButtonHammer = null; //支付按钮


class PayController {
    static init() {
        //支付按钮
        PayController.$payButton = $('#payButton');

        //支付提示
        payButtonHammer = new Hammer(this.$payButton[0]);

        payButtonHammer.on('tap', () => {
            if( payPullingFlag ) {
                //如果正在拉取支付数据，阻止，避免重复请求
                setTimeout(()=>{
                    payPullingFlag = false;
                }, 3000);
            }

            PayController.scrollToPayCenter();

            if( !Util.isWeixin() ){
                QRCodePay.showWxQrCode(location.href, '保存二维码，微信扫描购买', $('#modal'));
                return;
            }


            //获取通用订单
            if( QRCodePay.isNeedQRCodePay() ) {
                //订阅号微信的IOS用户要使用扫码支付
                PayController.getOrder(null, 0, true);
            }else {
                PayController.getOrder();
            }


        });
    }

    static setPayPullingFlagFalse() {
        payPullingFlag = false;
    }

    static wechatPay(orderInfo) {
        console.log('wechatPay');
        if( payPullingFlag ) {
            //如果正在拉取支付数据，阻止，避免重复请求
            setTimeout(()=>{
                payPullingFlag = false;
            }, 3000);
        }


        if( !Util.isWeixin() ){
            QRCodePay.showWxQrCode(location.href, '保存二维码，微信扫描购买', $('#modal'));
            return;
        }


        //获取通用订单
        if( QRCodePay.isNeedQRCodePay() ) {
            //订阅号微信的IOS用户要使用扫码支付
            console.log('获取通用订单');
            PayController.getOrder(null, 0, true,orderInfo);

        }else {
            PayController.getOrder(null,null,false,orderInfo);
        }

    }

    /**
     * 去除支付按钮的点击事件
     */
    static removePayButtonHanlder() {
        //去掉原先的点击事件
        return;
        payButtonHammer.off('tap');
    }

    /**
     * 滚动到支付按钮为中心的区域
     */
    static scrollToPayCenter() {
        return;
        scroll(0, PayController.$payButton.offset().top - Dimensions.getWindowHeight()/2 - 60);
    }

    /**
     * 获取支付信息
     * @returns {{}}
     */
    static getPayInfo() {
        return payInfo;
    }

    /**
     * 支付课程
     */
    /**
     * 之前授权登录的那个接口多了两返回值，userId和sessionId，请在发支付请求时放在header里传给我。
     X-iChangTou-Json-Api-User ： userId
     X-iChangTou-Json-Api-Session : sessionId

     api: http://app.ichangtou.com.cn/payment/jsapi/order
     params: {body:'轻课'，price:0.01}
     */
    /**
     *
     * @param userInfo   用户注册信息
     * @param sum   价格(如不传，默认用全局的COURSE_SUM)
     * @param isNative 是否是扫码支付
     */
    static getOrder(userInfo, sum, isNative, orderInfo) {

        if( payPullingFlag ) {
            return;
        }
        //期数信息
        let period;
        if(orderInfo) {
            period = orderInfo;
        }

        userInfo = userInfo || window.User.getUserInfo();
        sum = Util.getPrice();
        console.log('getNormalPrice',sum);
        let seniorId = window.sessionStorage.getItem('ictchannel') ? window.sessionStorage.getItem('ictchannel') : ''
        let teacherId = window.sessionStorage.getItem('teacherId') ? window.sessionStorage.getItem('teacherId') : ''
        let dingyuehao = window.sessionStorage.getItem('dingyuehao') ? window.sessionStorage.getItem('dingyuehao') : 0

        if(!seniorId){
            seniorId = '';
        }
        let jsonData;
        switch (sessionStorage.getItem('courseId')) {
            case '0':
                jsonData = JSON.stringify(
                    {
                        "body":'7天训练营报名' ,
                        "deal": {
                            "items": [
                                {
                                    // dealType: 1, //交易类型
                                    // itemId: Util.getCurrentBatch(),
                                    // mchantType: 5, //商品类型 21days
                                    // misc: Util.getUrlPara('dingyuehao')||'0'+'@'+seniorId+'@'+teacherId,
                                    // price: sum,
                                    dealType: 102, //交易类型
                                    itemId: 2,
                                    mchantType: 11, //商品类型 21days
                                    misc: '',
                                    price: sum
                                }
                            ]
                        },
                        "openId": userInfo.openId && userInfo.openId.toString(),
                        "sum": sum
                    }
                );
                break;
            case '1':
                jsonData = JSON.stringify(
                    {
                        "body":'基金课报名' ,
                        "deal": {
                            "items": [
                                {
                                    // dealType: 1, //交易类型
                                    // itemId: Util.getCurrentBatch(),
                                    // mchantType: 5, //商品类型 21days
                                    // misc: Util.getUrlPara('dingyuehao')||'0'+'@'+seniorId+'@'+teacherId,
                                    // price: sum,
                                    dealType: 103, //交易类型
                                    // itemId: Util.getCurrentBatch(),
                                    itemId: 1,//基金课,应该改成全局
                                    mchantType: 11, //商品类型 21days
                                    misc: period,
                                    price: sum
                                }
                            ]
                        },
                        "openId": userInfo.openId && userInfo.openId.toString(),
                        "sum": sum
                    }
                );
            case '2':
                jsonData = JSON.stringify(
                    {
                        "body":'21天训练营报名' ,
                        "deal": {
                            "items": [
                                {
                                    // dealType: 1, //交易类型
                                    // itemId: Util.getCurrentBatch(),
                                    // mchantType: 5, //商品类型 21days
                                    // misc: Util.getUrlPara('dingyuehao')||'0'+'@'+seniorId+'@'+teacherId,
                                    // price: sum,
                                    dealType: 1, //交易类型
                                    itemId: 23,
                                    mchantType: 5, //商品类型 21days
                                    misc: dingyuehao + '@' + seniorId + '@' + teacherId,
                                    price: sum
                                }
                            ]
                        },
                        "openId": userInfo.openId && userInfo.openId.toString(),
                        "sum": sum
                    }
                );
                break;
            case GlobalConfig.getBetaInfo().courseId.toString():
                jsonData = JSON.stringify(
                    {
                        "body":'股票课测试报名' ,
                        "deal": {
                            "items": [
                                {
                                    // dealType: 1, //交易类型
                                    // itemId: Util.getCurrentBatch(),
                                    // mchantType: 5, //商品类型 21days
                                    // misc: Util.getUrlPara('dingyuehao')||'0'+'@'+seniorId+'@'+teacherId,
                                    // price: sum,
                                    dealType: 103, //交易类型
                                    // itemId: Util.getCurrentBatch(),
                                    itemId: GlobalConfig.getBetaInfo().courseId,//基金课,应该改成全局
                                    mchantType: 11, //商品类型 21days
                                    misc: period,
                                    price: sum
                                }
                            ]
                        },
                        "openId": userInfo.openId && userInfo.openId.toString(),
                        "sum": sum
                    }
                );
                break;
            case '3':
                jsonData = JSON.stringify(
                    {
                        "body":'基金课报名' ,
                        "deal": {
                            "items": [
                                {
                                    // dealType: 1, //交易类型
                                    // itemId: Util.getCurrentBatch(),
                                    // mchantType: 5, //商品类型 21days
                                    // misc: Util.getUrlPara('dingyuehao')||'0'+'@'+seniorId+'@'+teacherId,
                                    // price: sum,
                                    dealType: 103, //交易类型
                                    // itemId: Util.getCurrentBatch(),
                                    itemId: 3,//基金课,应该改成全局
                                    mchantType: 11, //商品类型 21days
                                    misc: period,
                                    price: sum
                                }
                            ]
                        },
                        "openId": userInfo.openId && userInfo.openId.toString(),
                        "sum": sum
                    }
                );
                break;
            case '1004':
                jsonData = JSON.stringify(
                    {
                        "body":'入门课报名' ,
                        "deal": {
                            "items": [
                                {
                                    // dealType: 1, //交易类型
                                    // itemId: Util.getCurrentBatch(),
                                    // mchantType: 5, //商品类型 21days
                                    // misc: Util.getUrlPara('dingyuehao')||'0'+'@'+seniorId+'@'+teacherId,
                                    // price: sum,
                                    dealType: 103, //交易类型
                                    // itemId: Util.getCurrentBatch(),
                                    itemId: 1004,//基金课,应该改成全局
                                    mchantType: 11, //商品类型 21days
                                    misc: -1,
                                    price: sum
                                }
                            ]
                        },
                        "openId": userInfo.payOpenId && userInfo.payOpenId.toString(),
                        "sum": sum
                    }
                );
            default:
                break;
        }
        console.log('jsonData',jsonData);
        //扫码支付 和 公众号支付调用不同的接口
        let apiUrl = isNative ? Util.getAPIUrl('get_native_order') : GET_ORDER_API;

        //标记正在拉取数据
        payPullingFlag = true;
        //显示loading界面
        Loading.showLoading('请求微信支付');
        $.ajax({
            url: apiUrl,
            data: jsonData,
            type: 'post',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            headers: {
                Accept:"application/json"
            },

            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-Token",
                    Util.getApiToken());

                request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);

                request.setRequestHeader("X-iChangTou-Json-Api-Session", userInfo.sessionId);
            },

            success:function(data) {
                /**
                 timeStamp":
                 "nonceStr" :
                 "prepayId" :
                 "paySign" :
                 */
                if( isNative ) {
                    QRCodePay.showPayQrCode(data.codeURL);
                    Loading.hideLoading();
                    return;
                }

                payInfo = data;

                //获取订单数据成功后，调用支付控件
                PayController.pay();


                //隐藏loading界面
                Loading.hideLoading();
            },

            error : (data)=>{
                console.log('测试错误支付回调');
                Util.postCnzzData("error-请求微信支付失败" + data.status + '-' + data.statusText + '-uid:' + userInfo.userId);
                //标记请求结束
                Loading.showLoading('请求微信支付失败');
                payPullingFlag = false;
                Loading.hideLoading();
                OnFire.fire('PAID_LOSER','loserPay');
                //提醒用户加付费群
                window.dialogAlertComp.show('提示','你好像被流星砸中了...服务器君拿不到你的数据，请点击页面上的QQ群报名训练营','知道啦',()=>{},()=>{},false);
            }
        });
    }

    /**
     * 支付入口函数
     * @param data
     */
    static pay(){
        let data = PayController.getPayInfo();
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', PayController.pay, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', PayController.pay);
                document.attachEvent('onWeixinJSBridgeReady', PayController.pay);
            }
        }else{
            PayController.onBridgeReady(data);
        }
    }

    /**
     * 请求支付
     * @param data
     */
    static onBridgeReady(data) {
        var param = {
            "appId": Util.getPayOpenId(),
            "timeStamp": data.timeStamp.toString(),
            "nonceStr" : data.nonceStr,
            "package" : ("prepay_id=" + data.prepayId.toString()),
            "signType" : "MD5",
            "paySign" : data.paySign
        };

        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            param,
            (res) => {
                //标记请求支付完成
                payPullingFlag = false;
                //统一调用支付结束.重新发送请求判断支付状态.
                OnFire.fire('PAID_DONE','normalPay');
                // alert("支付完了:" + res.err_msg);
                // 微信支付返回值不靠谱，详情查看：
                // https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&index=6
                // if( res.err_msg == "get_brand_wcpay_request:ok"  ) {
                //   OnFire.fire('PAID_SUCCESS','normalPay');
                // } else {
                //   OnFire.fire('PAID_DONE','normalPay');
                // }
            }
        );
    }
    /**
     * 推送微信通知信息
     * @param murl 点击后的跳转地址
     * @returns {*}
     */
    static pushMessageToUser(murl,openId) {

        var Util = require('./Util');
        let apiUrl = Util.getAPIUrl('push_message');
        let d = new Date();
        let currentDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

        let modelId = Util.isFormalEnvironment() ?
            'b0Sk4F9-187rCVYNsaRKBCsV1jSC-I-pwsJuV4UqTw0' : //长投 正式
            'fbwFiruySvdhrrJq2N12pUwPdgBcajPWcbFtL7X8RoE';  //长投网 测试

        let data = JSON.stringify({
            "sql": "SELECT uid FROM `social_connect` WHERE `uid` = '" + openId+"'",
            "modelId": modelId,
            "modelType": "keyword_model",
            "redirect_url": murl,
            "first":"恭喜你报名成功",
            "keyword1":"7天小白理财训练营",
            "keyword2":currentDate,
            "remark":"点击立即进入。"
        });
        return $.ajax({
            url: apiUrl,
            type: 'post',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            data: data,
            headers: {
                Accept:"application/json"
            },
            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            }
        });
    }

    /**
     * 课程价格
     * @returns {number}
     */
    static getCoursePrice() {
        return COURSE_PRICE;
    }
}
window.PayController = PayController;

module.exports = PayController;
