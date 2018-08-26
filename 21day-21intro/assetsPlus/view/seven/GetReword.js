/**
 * Created by yiran1 on 2017/5/5.
 */
const React = require('react');
var OnFire =require('onfire.js');
//根目录
const Tools = require('../../GlobalFunc/Tools');
const Dimensions = require('../../Dimensions');
const Material = require('../../Material');
var User = require('../../User');
const WxConfig = require('../../WxConfig');
const Util = require('../../Util');

const FixedBg = require('../../component/course/FixedBg');

const GetReward = React.createClass({
    getInitialState: function() {

        return {
            content: this.props.content,
            lockPic: [
                "./assetsPlus/image/seven/card_1.png",
                "./assetsPlus/image/seven/card_2.png",
                "./assetsPlus/image/seven/card_3.png",
                "./assetsPlus/image/seven/card_4.png",
                "./assetsPlus/image/seven/card_5.png",
                "./assetsPlus/image/seven/card_6.png",
                "./assetsPlus/image/seven/card_7.png",
            ],
            lockPicHQ: [
                "./assetsPlus/image/seven/card_1_b.png",
                "./assetsPlus/image/seven/card_2_b.png",
                "./assetsPlus/image/seven/card_3_b.png",
                "./assetsPlus/image/seven/card_4_b.png",
                "./assetsPlus/image/seven/card_5_b.png",
                "./assetsPlus/image/seven/card_6_b.png",
                "./assetsPlus/image/seven/card_7_b.png",
            ],
            title: [
                '第一课',
                '第二课',
                '第三课',
                '第四课',
                '第五课',
                '第六课',
                '第七课',
            ],
            shareTitle: [
                '储蓄',
                '货币基金',
                '保险',
                '债券',
                '指数基金',
                '股票',
                '资产配置',
            ],
            type: '',
            userInfo: {},
            senior: {
                courseId: 1,
                name: '长投学员',
                rank: 214,
                headImg: '',
                userId: '',
            },
            myName: ''
        };
    },

    componentWillMount() {
        MyStorage.whenEnterPage('reward');
        let userId;
        //判定是否有分享成就卡
        this.state.senior.courseId = Util.getUrlPara('dayId');
        let isMine = this.props.params.mine;
        //下线查看别人的成就卡
        if (this.state.senior.courseId && !isMine) {
            userId = Util.getUrlPara('ictchannel');
            Tools.fireRace(User.getUserInfo().userId,"OAUTH_SUCCESS").then(()=>{
                // Material.postData('下线_查看_getReward');
                this.setState({myName: User.getUserInfo().nickName})
            });
            this.state.senior.userId = userId;
            Material.getOtherHeadImage(userId).always( (img)=>{
                this.state.senior.headImg = img.responseText;
                this.setState({senior: this.state.senior});
            });
            this.state.senior.name = Util.getUrlPara('name');
            this.state.senior.rank = Util.getUrlPara('rank');
            this.setState({type: 'other'});
        } else {//查看自己的
            Tools.fireRace(User.getUserInfo().userId,"OAUTH_SUCCESS").then(()=>{
                // Material.postData('上线_进入_getReward');
                userId = User.getUserInfo().userId;
                //获得课程的Id
                let courseId = this.props.params.dayId;
                this.setState({type: 'mine'});
                this.setState({userInfo: User.getUserInfo()});
                //获得自己的课程排名
                Material.courseFinishRank(courseId,userId).done((data) =>{
                    this.state.senior.name = User.getUserInfo().nickName;
                    this.state.senior.headImg = User.getUserInfo().headImage;
                    this.state.senior.rank = data;
                    this.state.senior.courseId = this.props.params.dayId;
                    this.setState({senior: this.state.senior});
                    this.setShareConfig();
                    Loading.hideLoading();
                })
            });
        }
    },

    /**
     * 设置分享内容
     * @param fmid
     * @param title
     */
    setShareConfig() {
        let senior = this.state.senior;
        let data = {
            name: senior.name,
            rank: senior.rank,
            dayId: senior.courseId,
            courseName: this.state.shareTitle[ senior.courseId - 1]
        };
        WxConfig.shareConfig('',data);
    },


    handleClick() {
        Tools.MyRouter('',"/select");
    },

    // + '&code=' + Util.getUrlPara('code')
    goSignUp() {
        Statistics.postDplusData('点击_报名_按钮');
        Tools.MyRouter('',"/payPage");
    },

    render() {
        return(
            <div className="get-reward-seven">
                <FixedBg/>
                {this.renderFinishCard()}
                <img className="reward-light" onClick={this.handleClick} src={this.state.type ==='mine' ? './assetsPlus/image/seven/bglight_b.png' : './assetsPlus/image/seven/bglight.png'}/>
            </div>
        )
    },

    renderFinishCard() {
        return(
            <div>
                {this.renderTitle()}
                {/*<img className="reward-light" onClick={this.handleClick} src={'./assetsPlus/image/seven/bglight.png'}/>*/}
                <img className="reward-pic" onClick={this.handleClick} src={this.state.type ==='mine' ? this.state.lockPicHQ[this.state.senior.courseId - 1] : this.state.lockPic[this.state.senior.courseId - 1] }/>
                {this.buttonRender()}
            </div>
        )
    },

    renderTitle() {
        if(this.state.type ==='mine') {
            return (<div className="card-title">
                {this.renderFont('恭喜你成为')}
                {this.renderFont('第' + this.state.senior.rank+'名')}
                {this.renderFont('完成该课程的学员')}
            </div>)
        } else {
            return (<div className="card-title">
                {this.renderFont(this.state.senior.name+'是')}
                {this.renderFont('第' + this.state.senior.rank+'名')}
                {this.renderFont('完成'+this.state.shareTitle[this.state.senior.courseId - 1] + '课的学员')}
            </div>)
        }
    },

    goCommand() {
        // Util.postCnzzData("成就页面点击分享");
        // Material.postData('上线_点击_getReward');
        Statistics.postDplusData('点击_分享_按钮');
        window.dialogAlertComp.show('快快分享你的进步吧','点击右上角三个点点，分享到你的朋友圈吧！','好哒师兄',()=>{},()=>{},false);
    },

    buttonRender() {
        let arr = [];
        if(this.state.type ==='mine') {
            return <div className="reward-button" onClick = {this.goCommand}>
                <img className="button-img" src={'./assetsPlus/image/seven/btnSignin.png'}/>
                <p className="button-p">我要分享</p>
            </div>
        } else {
            return <div className="reward-button" onClick = {this.goSignUp.bind(this,1)}>
                <img className="button-img" src={'./assetsPlus/image/seven/btnSignin.png'}/>
                <p className="button-p">我也去看看</p>
            </div>
        }
    },

    renderFont(text) {
        return(
            <div className="text-stroke">
                <p className="text-stroke-out">{text}</p>
                <p className="text-stroke-inner">{text}</p>
            </div>)
    }
});

module.exports = GetReward;