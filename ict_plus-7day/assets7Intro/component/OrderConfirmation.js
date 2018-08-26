/**
 * 订单确认模块
 * Created by lip on 2016/7/8.
 */

var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
var Hammer = require('hammerjs');

var Util = require('../Util');
var Modal = require('./Modal');
var QRCodePay = require('./QRCodePay');
var ShareGuider = require('./ShareGuider');

/**
 * 模块变量
 */
var giftGuiderInstance = null;

var OrderConfirmation = React.createClass({
    //获取支付订单
    getPayOrder() {
        //获取通用订单
        if( QRCodePay.isNeedQRCodePay() ) {
            //订阅号微信的IOS用户要使用扫码支付
            PayController.getOrder(null, 0, true);

            PayController.removePayButtonHanlder();
        }else {
            PayController.getOrder();
        }
    },

    //赠送礼物
    giveGift() {
        this.refs.modal.hide();
        ShareGuider.show();
    },

    show() {
        this.refs.modal.show();
    },

    hide() {
        this.refs.modal.hide();
    },

    render() {
        let name = Util.getMinicName();

        return (
            <Modal ref="modal">
                <div className="order-confirmation">
                    <p className="price">¥ {PayController.getCoursePrice()}</p>
                    <p className="course-name">
                        <p>报名页面</p>
                    </p>
                    <a href="javascript:void(0);"
                       onTouchEnd={ this.getPayOrder }
                       className="pay weui_btn weui_btn_plain_primary">{PayController.getCoursePrice()}元购买</a>
                    <a href="javascript:void(0);"
                       onTouchEnd={ this.giveGift }
                       className="gift weui_btn weui_btn_primary">免费 · 赠一得一</a>
                </div>
            </Modal>
        );
    }
});

module.exports = OrderConfirmation;