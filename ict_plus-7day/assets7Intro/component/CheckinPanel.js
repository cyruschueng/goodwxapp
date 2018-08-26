/**
 * Created by fucana on 2017/3/11.
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

const CheckinPanel = React.createClass({

    GoMall(){
        Util.postCnzzData('打卡成功渠道进入商城');
    },


    render() {

        return (
            <div>
                <Modal>
                <div className="checkIn" style={divStyle}>
                    <div className="checkin-bottom">
                        <p className="continuity">连续签到 <span>{this.props.continueCheckInDays}</span> 天</p>
                        <div className="today-gold">
                            <img className="gold" src="./assets/image/checkin/glods.png"/>
                            <p className="todayGolds">今日领金币 <span>{this.props.todayGoldCoin}</span>个</p>
                        </div>
                        <p className="tomGolds">明日领 <span>{this.props.nextDayGoldCoin}</span>个</p>
                        <Link to="/mall">
                        <img src="./assets/image/checkin/tomall.png" className="goMall" onClick={this.GoMall}/>
                        </Link>
                    </div>
                </div>
                </Modal>
            </div>

        )
    }
});

module.exports = CheckinPanel;