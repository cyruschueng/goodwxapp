/**
 * Created by yiran1 on 2017/5/5.
 */
const React = require('react');
var OnFire =require('onfire.js');

//根目录
const Tools = require('../../GlobalFunc/Tools');
const convertHtmlToBase64 = require('../../ImageShare');
const Dimensions = require('../../Dimensions');
const Material = require('../../Material');
var User = require('../../User');
const WxConfig = require('../../WxConfig');
const Util = require('../../Util');


const FixedBg = require('../../component/course/FixedBg');

const GetGraduated = React.createClass({
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
            friendName: '',
            myName: ''
        };
    },

    componentWillMount() {
        MyStorage.whenEnterPage('graduate');


        let userId;
        this.state.senior.rank = Util.getUrlPara('rank');
        let isMine = this.props.params.mine;
        //下线查看别人的成就卡
        //下线查看别人的成就卡
        console.log('see who?');
        if (this.state.senior.rank && !isMine) {
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
            //TODO yiran 获得下线名字 这边名字会改成多个.并且成就卡那边也需要这个功能.
            console.log('seven 毕业证');
            Material.getCourseShareInfo(userId).always( (name)=>{
                this.setState({friendName: name});
                // this.setShareConfig();
            });
        } else {//查看自己的毕业证
            Tools.fireRace(User.getUserInfo().userId,"OAUTH_SUCCESS").then(()=>{
                // Material.postData('上线_进入_getGraduated');
                Material.getCourseShareInfo(User.getUserInfo().userId).always( (name)=>{
                    this.setState({friendName: name});
                });
                this.setState({type: 'mine'});
                // this.setState({userInfo: User.getUserInfo()});

                this.state.senior.name = User.getUserInfo().nickName;
                this.state.senior.headImg = User.getUserInfo().headImage;
                //获得排名
                this.state.senior.rank = sessionStorage.getItem('graduated-rank');
                this.setState({senior: this.state.senior});
                this.setShareConfig();
                Loading.hideLoading();
            });

        }
    },

    //重置分享链接
    componentWillUnmount () {
        WxConfig.shareConfig();
    },

    /**
     * 设置分享内容1
     * @param fmid
     * @param title
     */

    setShareConfig() {
        let senior = this.state.senior;
        let data = {
            name: senior.name,
            rank: senior.rank,
        };
        WxConfig.shareConfig('',data);
    },


    handleClick() {
        Tools.GoRouter('select') ;
    },

    // + '&code=' + Util.getUrlPara('code')
    goSignUp() {
        Tools.GoRouter('pay');
        return;
        // Util.postCnzzData("成就页面报名");
        if (User.getUserInfo().userId) {
            // Material.postData('下线_点击_getGraduated');
        } else {
            OnFire.on('OAUTH_SUCCESS',()=>{
                // Material.postData('下线_点击_getGraduated');
            });
        }
        let upId = this.state.senior.userId;
        let myId = User.getUserInfo().userId;
        let myName = User.getUserInfo().nickName;
        if (User.getUserInfo().userId) {
            this.getCourse(upId,myName);
        } else {
            OnFire.on('OAUTH_SUCCESS',()=>{
                this.getCourse(upId,myName);
            });
        }
    },

    getCourse(upId,myName) {
        Material.FreeShareSignUp(upId,myName).always( (result)=>{
            if (result.whether) {
                Statistics.postDplusData('点击_领取免费课_按钮');
                // Util.postCnzzData("毕业-成功领取");
                window.dialogAlertComp.show('已经成功领取','你已经领取啦','去课堂看看',()=>{
                    location.hash = "/paypage/1"
                },'待会再看',true);

            } else {
                Statistics.postDplusData('点击_报名_按钮');
                // Util.postCnzzData("毕业-也被领取跳转报名");
                location.hash = "/paypage";
            }
        });
    },

    // style = {fullbg}
    render() {
        return(
            <div className="get-reward-seven">
                <FixedBg/>
                {this.renderGraduated()}
                <img className="reward-light" onClick={this.handleClick} src={this.state.type ==='mine' ? './assetsPlus/image/seven/bglight_b.png' : './assetsPlus/image/seven/bglight.png'}/>
            </div>
        )
    },


    renderGraduated() {
        return(
            <div>
                <div className="get-graduated" style = {{backgroundImage: 'url("./assetsPlus/image/seven/graduated.png")'}}>
                    <img className="head" src={this.state.senior.headImg}/>
                    <div className="title">
                        <p className="name">{this.state.senior.name}</p>
                        <p className="rank">第{this.state.senior.rank}名</p>
                        <p>完成财商训练营的学员</p>
                    </div>
                </div>
                {this.buttonRender()}
            </div>
        )
    },

    goCommand() {
        Statistics.postDplusData('点击_分享_按钮',[this.state.friendName.message]);
        // Util.postCnzzData("成就页面点击分享");
        // Material.postData('上线_点击_getGraduated');
        if(this.state.friendName.message === '') {
            Util.postCnzzData("毕业-赠送朋友提示");
            window.dialogAlertComp.show('赠送课程给你的朋友','点击右上角三个点点，分享免费7天训练营名额给你的好友吧。','好哒师兄',()=>{},()=>{},false);
        } else {
            Util.postCnzzData("毕业-送给更多人提示");
            window.dialogAlertComp.show('告诉更多的朋友吧','你已经顺利毕业啦，鼓励更多的小伙伴被你的正能量带动，一同积极学习吧！点击右上角三个点点，分享到你的朋友圈吧！','好哒师兄',()=>{},()=>{},false);
        }
    },

    buttonRender() {
        let arr = [];
        if(this.state.type ==='mine') {
            if(this.state.friendName.message === '') {
                arr.push((<div key={1} className="graduated-tip">

                    {/*<p>由于你的优异成绩，你赢得了一次</p>*/}
                    {/*<p><span>免费</span>赠送课程给朋友学习的机会！</p>*/}
                    {/*<p>快去赠给你身边<span>最爱学习</span>的朋友吧！</p>*/}
                    <p>恭喜，你以优异的成绩毕业啦!</p>
                    <p>如果觉得内容还不错</p>
                    <p>就快去分享给身边<span>最爱学习</span>的朋友吧！</p>
                </div>));
                arr.push(<div key={2} className="reward-button-graduated" onClick = {this.goCommand}>
                    <img className="button-img" src={'./assetsPlus/image/seven/btnSignin.png'}/>
                    <p className="button-p">送给Ta</p>
                </div>)
            } else {
                arr.push((<div key={1} className="graduated-tip">
                    <p>你的课程赠送被<span> {this.state.friendName.message} </span>领走了！</p>
                    {/*<p>你还可以推荐更多的人来学习！</p>*/}
                </div>));
                arr.push(<div key={2} className="reward-button-graduated" onClick = {this.goCommand}>
                    <img className="button-img" src={'./assetsPlus/image/seven/btnSignin.png'}/>
                    <p className="button-p">送给更多的人</p>
                </div>)
            }
            return arr;
        } else {
            if(this.state.friendName.message === '') {
                if(this.state.myName !== ''){
                    arr.push((<div key={1} className="graduated-tip">
                        {/*<p><span>{this.state.senior.name} </span>坚持学完7天训练营！</p>*/}
                        {/*<p>赠送了一个<span>免费学习</span>名额给你。</p>*/}
                        <p><span>{this.state.myName}！</span>{this.state.senior.name}觉得你的<span>财商战斗力</span>为0！</p>
                        {/*<p>把唯一的训练营<span>免费学习</span>名额送送给你！</p>*/}
                        <p>觉得你有<span>无限潜力</span></p>
                        <p>快来学习新技能吧！</p>
                    </div>));
                    arr.push((<div key={2} className="reward-button-graduated" onClick = {this.goSignUp}>
                        <img className="button-img" src={'./assetsPlus/image/seven/btnSignin.png'}/>
                        <p className="button-p">我要学习</p>
                    </div>));
                }
            } else {
                arr.push((<div key={1} className="graduated-tip">
                    <p>真可惜，免费名额被<span> {this.state.friendName.message} </span>抢走了！</p>
                    <p>他们正在财商训练营中努力提升呢！</p>
                </div>));
                arr.push((<div key={2} className="reward-button-graduated" onClick = {this.goSignUp}>
                    <img className="button-img" src={'./assetsPlus/image/seven/btnSignin.png'}/>
                    <p className="button-p">去听听看</p>
                </div>));
            }
            return arr;
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

module.exports = GetGraduated;