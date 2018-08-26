/**
 * 扫码支付
 * Created by lip on 2016/7/1.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');
var Hammer = require('hammerjs');
require('jquery-qrcode');

var Util = require('../Util');
var QRCodeImage = require('./QRCodeImage');
var Modal = require('./Modal');

//扫码支付二维码
var nativePayCodeInstance = null;

//微信引导二维码
var wxGuideCodeInstance = null;

/**
 * 微信支付引导
 */
var WxGuideQrModal = React.createClass({
    deleteIconHandler() {
        this.refs.modal.hide();
    },

    show() {
        this.refs.modal.show();
    },

    render() {
        return (<Modal ref="modal">
            <QRCodeImage url={this.props.url} bottomText={this.props.text}
                         deleteIconHandler={this.deleteIconHandler} />
        </Modal>);
    }
});


class QRCodePay {
    /**
     * 显示微信扫码支付二维码
     * @param url
     * @param $container
     */
    static showPayQrCode(url,$container) {
        //PayController.scrollToPayCenter();

        $container = $container || $('#payCon');

        $container.attr('class', 'qrcode-pay');
        $container.html(null);

        nativePayCodeInstance = ReactDom.render(
            <QRCodeImage url={url} topText="长按二维码，微信支付" />,
            $container[0]);
    }

    /**
     * 显示微信分享二维码
     * @param url
     * @param text
     * @param $container
     */
    static showWxQrCode(url, text, $container) {
        if( !wxGuideCodeInstance ) {
            //生成实例
            wxGuideCodeInstance = ReactDom.render(<WxGuideQrModal url={url} text="保存图片后，微信扫一扫打开" />,
                $container[0]);
        }else {
            //否则直接显示
            wxGuideCodeInstance.show();
        }
        Util.lockScroll();

    }

    /**
     * 是否需要扫码支付
     * @returns {boolean|*}
     */
    static isNeedQRCodePay() {
        return false;
        //微信端以及订阅号时才有扫码支付
        // console.log('isNeedQRCodePay',Util.isWeixin() , Util.getUrlPara('dingyuehao'))
        // return Util.isWeixin() && Util.getUrlPara('dingyuehao');
    }
}
window.QRCodePay = QRCodePay;

module.exports = QRCodePay;