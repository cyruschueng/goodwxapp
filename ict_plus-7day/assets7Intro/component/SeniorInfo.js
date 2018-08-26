/**
 * Created by Administrator on 16-11-15.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

var User = require('../User');
var OnFire = require('onfire.js');
var Material = require('../Material');

var SeniorInfo = React.createClass({

    getInitialState() {
        return {
            seniorImg: './assets7Intro/image/logo.png',
            seniorName: '你的小伙伴',
            test: false
        }
    },

    componentWillMount() {

        let seniorId = Util.getUrlPara('ictchannel');

        //查询上线信息
        seniorId && Material.getSeniorInfoFromServer(seniorId)
        .done((data)=> {
            console.log('data',data);
            this.setState({
                seniorImg: data.portrait||'./assets7Intro/image/logo.png',
                seniorName: data.nickName
            });
        })
    },



    render() {
        return (<div className="senior-info-view">
            <div className="senior-image-box">
                <span className="img-border"/>
                <img src={this.state.seniorImg} className="senior-image"/>
                <span className="img-border"/>
            </div>

            <p className="senior-name">{this.state.seniorName}</p>

            {this.state.test && <div className="test-box">
                <p className="test-text">你的好友{this.state.seniorName}邀请你来</p>
                <p className="test-text">7天理财小白训练营一起学习</p>
            </div>}

            {!this.state.test && <div className="coupon-box">
                <div className="coupon-info">
                    <p className="coupon-text">你的好友{this.state.seniorName}邀请你来</p>
                    <p className="coupon-text">7天理财小白训练营一起学习</p>
                </div>
            </div>}

            <p className="slogan">“我参加了这个训练营，非常棒，你也来试试”</p>
        </div>)
    }
});

module.exports = SeniorInfo;