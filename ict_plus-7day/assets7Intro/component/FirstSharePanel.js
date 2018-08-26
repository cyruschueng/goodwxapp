/**
 * Created by chuzhenzhen on 2017/3/24.
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


const FirstSharePanel = React.createClass({

    getPropsType(){
        return {
            // onClose: React.PropTypes.func.isRequired
        }
    },

    clickSkip() {
        // window.location.href = "http://h5test.ichangtou.com.cn/redPacket/index.html";
        // Util.postCnzzData('跳转到拆红包页面');
    },


    /**
     *
     * @returns {XML}
     */
    render(){
        return (
            <div className="first-share-panel">
                <div className="share-bottom">
                    <div className="share-title">
                        <p>首次分享成功!</p>
                    </div>
                    <div className="share-center">
                        <p>感谢你的分享</p>
                        <p>赠送你一个鼓励红包</p>
                        <a href="https://h5.ichangtou.com/redPacket/index.html"><div className="share-next" onClick={this.clickSkip()}>
                            马上去拆
                        </div></a>

                    </div>
                </div>
            </div>
        )
    }
});

module.exports = FirstSharePanel;