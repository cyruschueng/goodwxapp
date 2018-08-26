/**
 * Created by yiran1 on 2017/5/5.
 */
const $ = window.$ = require('jquery');
const React = require('react');
const Dimensions = require('../../Dimensions');
const Material = require('../../Material');
var User = require('../../User');
const WxConfig = require('../../WxConfig');
const Util = require('../../Util');
var OnFire =require('onfire.js');

const GetReward = React.createClass({
    getInitialState: function() {

        return {
            content: this.props.content,
            lockPic: [
                "./assets7Intro/image/course/card_1.png",
                "./assets7Intro/image/course/card_2.png",
                "./assets7Intro/image/course/card_3.png",
                "./assets7Intro/image/course/card_4.png",
                "./assets7Intro/image/course/card_5.png",
                "./assets7Intro/image/course/card_6.png",
                "./assets7Intro/image/course/card_7.png",
            ],
            lockPicHQ: [
                "./assets7Intro/image/course/card_1_b.png",
                "./assets7Intro/image/course/card_2_b.png",
                "./assets7Intro/image/course/card_3_b.png",
                "./assets7Intro/image/course/card_4_b.png",
                "./assets7Intro/image/course/card_5_b.png",
                "./assets7Intro/image/course/card_6_b.png",
                "./assets7Intro/image/course/card_7_b.png",
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
            friendName: '',
            myName: ''
        };
    },

    componentWillMount() {
        console.log('get reward');
        let userId;
        //判定是否有分享成就卡
        this.state.senior.courseId = Util.getUrlPara('courseId');
        //下线查看别人的成就卡
        if (this.state.senior.courseId) {
            userId = Util.getUrlPara('ictchannel');
            if (User.getUserInfo().userId) {
                Material.postData('下线_查看_getReward');
                this.setState({myName: User.getUserInfo().nickName})
            } else {
                OnFire.on('OAUTH_SUCCESS',()=>{
                    Material.postData('下线_查看_getReward');
                    this.setState({myName: User.getUserInfo().nickName})
                });
            }
            this.state.senior.userId = userId;
            Material.getOtherHeadImage(userId).always( (img)=>{
                this.state.senior.headImg = img.responseText;
                this.setState({senior: this.state.senior});
            });
            this.state.senior.name = Util.getUrlPara('name');
            this.state.senior.rank = Util.getUrlPara('rank');
            this.setState({type: 'other'});
            Material.getShareInfo(userId).always( (name)=>{
                this.setState({friendName: name});
                // this.setShareConfig();
            });
        } else {//查看自己的
            userId = User.getUserInfo().userId;
            Material.postData('上线_进入_getReward');
            //获得课程的Id
            let courseId = this.props.params.courseId;
            this.setState({type: 'mine'});
            this.setState({userInfo: User.getUserInfo()});
            //获得自己的课程排名
            Material.courseFinishRank(courseId,userId).done((data) =>{
                this.state.senior.name = User.getUserInfo().nickName;
                this.state.senior.headImg = User.getUserInfo().headImage;
                this.state.senior.rank = data;
                this.state.senior.courseId = this.props.params.courseId;
                this.setState({senior: this.state.senior});
                this.setShareConfig();
                Loading.hideLoading();
            })
        }
    },

    componentWillUnmount () {
        console.log('didUnMount')
        let senior = this.state.senior;
        let shareTitle = '快和我一起参加财商训练营吧',
            link = Util.getShareLink(),
            desc = '点击链接报名只需3元哦,按时毕业还有奖学金!';
        WxConfig.shareConfig(shareTitle,desc,link);
    },

    /**
     * 设置分享内容
     * @param fmid
     * @param title
     */
    setShareConfig() {
        let senior = this.state.senior;
        let shareTitle = '我是第'+ this.state.senior.rank+'名完成'+this.state.shareTitle[ this.state.senior.courseId - 1] + '课的人，快来看看我的成就卡吧！',
            link = Util.getShareLink(),
            desc = '快比比谁的财商更高吧?';
        link = link + '&goPath=' + '/getReward/' + senior.courseId;
        link = link + '&courseId=' + senior.courseId;
        link = link + '&name=' + senior.name;
        link = link + '&rank=' + senior.rank;
        WxConfig.shareConfig(shareTitle,desc,link);
    },


    handleClick() {
        location.hash = "/select";
    },

    // + '&code=' + Util.getUrlPara('code')
    goSignUp() {
        Util.postCnzzData("成就页面报名");
        if (User.getUserInfo().userId) {
            Material.postData('下线_点击_getReward');
        } else {
            OnFire.on('OAUTH_SUCCESS',()=>{
                Material.postData('下线_点击_getReward');
            });
        }
        let url = Util.getHtmlUrl() + '?ictchannel=' + Util.getUrlPara('ictchannel');
        location.href = url;
    },

    render() {
        return(
            <div className="get-reward" style = {{backgroundImage: 'url("./assets7Intro/image/course/bg_1.png")',width: Dimensions.getWindowWidth(), height: Dimensions.getWindowHeight()}}>
                {this.renderFinishCard()}
                <img className="reward-light" onClick={this.handleClick} src={this.state.type ==='mine' ? './assets7Intro/image/course/bglight_b.png' : './assets7Intro/image/course/bglight.png'}/>
            </div>
        )
    },

    renderFinishCard() {
        return(
            <div>
                {this.renderTitle()}
                {/*<img className="reward-light" onClick={this.handleClick} src={'./assets7Intro/image/course/bglight.png'}/>*/}
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
        Util.postCnzzData("成就页面点击分享");
        Material.postData('上线_点击_getReward');
        window.dialogAlertComp.show('快快分享你的进步吧','点击右上角三个点点，分享到你的朋友圈吧！','好哒师兄',()=>{},()=>{},false);
    },

    buttonRender() {
        let arr = [];
        if(this.state.type ==='mine') {
            return <div className="reward-button" onClick = {this.goCommand}>
                <img className="button-img" src={'./assets7Intro/image/course/btnSignin.png'}/>
                <p className="button-p">我要分享</p>
            </div>
        } else {
            return <div className="reward-button" onClick = {this.goSignUp.bind(this,1)}>
                <img className="button-img" src={'./assets7Intro/image/course/btnSignin.png'}/>
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