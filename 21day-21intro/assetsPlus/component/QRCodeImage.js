/**
 * 二维码图片
 * Created by lip on 2016/7/8.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');
var Hammer = require('hammerjs');
var OnFire =require('onfire.js');
require('jquery-qrcode');

var Dimensions = require('../Dimensions');
var Dialog = require('./Dialog');
var Util = require('../Util');
var User = require('../User');
var Modal = require('./Modal');
var QRCodePay = require('./QRCodePay');
var Material = require('../Material');
//var DeleteIcon = require('./DeleteIcon');
var Toast = require('./DoneToast');
var Loading = require('../Loading');



var CHECK_NUM = 0;
/**
 * 二维码图片
 */
var QRCodeImage = React.createClass({
    getPropsType() {
        return {

        }
    },

    getInitialState() {
        return {
            display: true
        }
    },

    componentDidMount() {
        var $container = $(this.refs.qrcode);

        //二维码默认边长是200px
        let sideLength = this.props.sideLength > 0 ? this.props.sideLength : 200;

        //转换成二维码
        $container.qrcode({
            width: sideLength * Dimensions.getWidthScale(),
            height: sideLength * Dimensions.getWidthScale(),
            text: this.props.url
        });

        //渲染完毕后canvas转换成图片
        let me = this;
        setTimeout(()=>{
            let $canvas = $container.find('canvas');
            $canvas.hide();

            let image = new Image();
            image.src = $canvas[0].toDataURL("image/png");

            $container.append(image);

            $canvas.remove();

            //长按二维码显示支付对话框
            new Hammer(image).on('press', (e)=>{
                //2s后显示确认对话框
                setTimeout(()=>{
                    Dialog.showDialog(
                        '7天报名',
                        '支付是否已完成？',
                        '是',
                        '否',
                        me.checkPaidResult,
                        me.checkPaidResult
                    );


                    //隐藏二维码
                    me.hideHandler();
                }, 3000);

                setTimeout(()=>{
                    if(CHECK_NUM == -1){
                        Dialog.showDialog(
                            '7天报名',
                            '支付是否已完成？',
                            '是',
                            '否',
                            me.checkPaidResult,
                            me.checkPaidResult
                        );


                        //隐藏二维码
                        me.hideHandler();
                    }
                },6000);
            });

        //    new Hammer(image).on('tap', (e)=>{
        //        //2s后显示确认对话框
        //        setTimeout(()=>{
        //            Dialog.showDialog(
        //                '21天报名',
        //                '支付是否已完成？',
        //                '是ac',
        //                '否ac',
        //                me.checkPaidResult,
        //                me.checkPaidResult
        //            );
        //
        //
        //            //隐藏二维码
        //            me.hideHandler();
        //        }, 3000);
        //    });

        }, 100);


    },


    /**
     * 检查支付情况
     */
    checkPaidResult() {
        var User = require('../User');

        $('#dialog').hide();
        Loading.showLoading();
        Material.getRegisterRecord(Util.getCurrentBatch(),User.getUserInfo().userId)
            .done((record)=>{
                if(record.qqGroup){
                    OnFire.fire('PAID_SUCCESS');

                    Loading.hideLoading();

                }else{

                    if(CHECK_NUM >= 3) {
                        Toast.show('目前没有你的支付记录');
                        Loading.hideLoading();
                        CHECK_NUM = -1;
                    }else{
                        this.checkPaidResult();
                    }

                    CHECK_NUM++;
                }
            })
            .fail(()=>{
                Toast.show('暂时没有付费记录fail');
            })
    },


    /**
     * 隐藏
     */
    hideHandler() {
        console.log('hideHandler');
        this.setState({
            display: false
        });

        var PayController = require('../PayController');
        PayController.setPayPullingFlagFalse();
    },

    render() {
        let topText = this.props.topText ? <p className="top-text">{this.props.topText}</p> : null;

        let bottomText = this.props.bottomText ? <p className="bottom-text">{this.props.bottomText}</p> : null;

        let style = {};
        style.display = this.state.display ? 'block' : 'none';
        return (
            <div className="qrcode-image" ref="self" style={style}>
                <div className="delete-icon" ref="deleteIcon" onTouchEnd={this.hideHandler}></div>
                {topText}
                <p ref="qrcode"></p>
                {bottomText}
            </div>);

    }
});

module.exports = QRCodeImage;
