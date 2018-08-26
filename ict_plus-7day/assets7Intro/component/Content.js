/**
 * Created by Administrator on 16-8-2.
 */
var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');

var User = require('../User');
var Dimensions = require('../Dimensions');
var PayController = require('../PayController');


var Content = React.createClass({

    getPropType() {
        return  {
            active: React.PropTypes.bool.isRequired  //是否激活显示

        };
    },

    getInitialState(){
        return {

        };
    },

    componentWillMount(){

    },
    /**
     * 支付动作
     */
    payHandler() {
        PayController.wechatPay();
    },

    render(){

        return (
            <div>
                <div>介绍报名的规则：</div>
                <div className="pay-button shine2"
                     ref="payButton" id="payButton"
                     onClick={this.payHandler}>立即报名
                </div>;
            </div>
        )
    }

});

module.exports = Content;