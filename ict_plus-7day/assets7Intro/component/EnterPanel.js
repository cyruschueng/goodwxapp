/**
 * Created by chuzhenzhen on 2017/4/18.
 */

const React = require('react');



const EnterPanel = React.createClass({

    getPropsType(){
        return {
            onClose: React.PropTypes.func.isRequired
        }
    },

    clickHandler() {
        Util.postCnzzData('从FM进入7天报名页');
    },

    /**
     *
     * @returns {XML}
     */
    render(){
        return (<div className="share-panel-view">
            <p className="share-title">您还未报名参加训练营</p>
            <img src="./assets/image/logo.png" className="share-img"/>
            <p className="share-desc">暂时不能听课呦！</p >
            <p className="share-desc">快快报名吧</p >
            <p className="share-desc">只需4￥</p >
            <p className="share-desc">理财课程抱回家</p >
            <p className="share-title">抓住时机，下一个百万富翁就是你</p>
            <a href="https://h5.ichangtou.com/minic/index7Intro.html" onClick={this.clickHandler}> <div className="share-confirm-button" >现在就报名</div></a>
        </div>)
    }


});

module.exports = EnterPanel;