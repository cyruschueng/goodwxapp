/**
 * Created by Administrator on 16-12-22.
 */
const React = require('react');
const ReactDom = require('react-dom');
const $ = require('jquery');
const OnFire =require('onfire.js');
const GHGuider = require('./GHGuider');

const User = require('../User');
const Dimensions = require('../Dimensions');
const PayController = require('../PayController');
const Util = require('../Util');
const Material = require('../Material');
const Loading = require('../Loading');
const DialogAlert = require('./DialogAlert');
const DoneToast = require('./DoneToast');


const SharePanel = React.createClass({

    getPropsType(){
        return {
            onClose: React.PropTypes.func.isRequired
        }
    },

    clickHandler() {
        this.props.onClose();
    },


    /**
     *
     * @returns {XML}
     */
    render(){
        return (<div className="share-panel-view">
            <p className="share-title">报名已经结束惹</p>
            {/*<img src="./assets/image/logo.png" className="share-img"/>*/}
            <p className="share-desc">不过，偷偷告诉你小技巧：</p >
            <p className="share-desc">让好友邀请你报名试试？或许有惊喜噢！</p >

            {!this.props.isSubscribed &&
              <div>
                <br/>
                <p className="share-desc">别忘了长按扫描下方二维码进入课程公号</p >
                <p className="share-desc">及时通知你最新开课信息呦</p >
                <div className="page-div">
                    <img className="page-image" src="./assets21Intro/image/tousha-qrcode.jpg"/>
                </div>
              </div>}

            <div className="share-confirm-button" onClick={this.clickHandler}>知道了</div>
        </div>)
    }


});

module.exports = SharePanel;
