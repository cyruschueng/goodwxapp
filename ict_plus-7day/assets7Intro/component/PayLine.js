/**
 * Created by doudou on 16-8-3.
 * 付费分割线
 */


var React = require('react');
var ReactDom = require('react-dom');


//var User = require('../User');
var PayController = require('../PayController');


var PayLine = React.createClass({

    getPropType() {
        return {
            isPaid: React.PropTypes.bool.isRequired //是否付费
        }
    },

    getInitialState() {
        return {
            hasPaid: false
        }

    },

    componentWillMount() {




    },

    clickHandler () {
        //if(!this.props.isPaid) {
        //    //去付费
        //}

        console.log('clickHandler');
        PayController.pay();
    },

    render() {
        let content;

        if(this.props.isPaid){
            content =  (
                <div className="split_line">
                    <div className="line"></div>
                    <div className="text" ref="payHint">你已付费，完成报名</div>
                    <div className="line"></div>
                </div>
            )
        }else{
            content = (
                <div>
                    <div className="split_line">
                        <div className="line"></div>
                        <div className="text" ref="payHint">没有付费，报名失败</div>
                        <div className="line"></div>
                    </div>

                    <div className="pay_button " ref="payButton" onClick={this.clickHandler}>
                        立即报名
                    </div>
                </div>
            )
        }

        return (<div>{content}</div>);
    }

});

module.exports = PayLine;