/**
 * Created by chuzhenzhen on 2017/4/10.
 */

const React = require('react');
const Material = require('../Material');
const Link = require('react-router').Link;
const User = require('../User');
const Modal = require('./Modal');
let divStyle = {
    backgroundImage: 'url(./assets/image/Checkin.png)',
    WebkitTransition: 'all', // 注意这里的首字母'W'是大写
    msTransition: 'all' // 'ms'是唯一一个首字母需要小写的浏览器前缀
};

const DidCheckinPanel = React.createClass({



    render() {

        return (
            <div>
                <Modal>
                    <div className="checkIn" style={divStyle}>
                        <div className="checkin-bottom">
                            <p className="continuity">连续签到 <span>{this.props.continueCheckInDays}</span> 天</p>
                            <div className="today-gold">
                                <p className="todayGoldDid">明天可领<span>{this.props.nextDayGoldCoin}</span>个金币</p>
                            </div>
                                <img src="./assets/image/checkin/two.png" className="goMall"/>
                        </div>
                    </div>
                </Modal>
            </div>

        )
    }
});

module.exports = DidCheckinPanel;