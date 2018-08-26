/**
 * Created by yiran1 on 2017/5/5.
 */
const React = require('react');
const Dimensions = require('../../Dimensions');
const Material = require('../../Material');
var User = require('../../User');
const WxConfig = require('../../WxConfig');
const Util = require('../../Util');
var OnFire =require('onfire.js');
const courseInfo = require('../../CourseInfo');
//根目录
const Tools = require('../../GlobalFunc/Tools');

const FixedBg = require('../../component/course/FixedBg');

const GetReward = React.createClass({
    getInitialState: function() {

        return {
            content: this.props.content,
            type: '',
            userInfo: {},
            senior: {
                courseId: 10,
                name: '长投学员',
                rank: 0,
                headImg: '',
                userId: '',
            },
            friendInfo: [],
            friendName: '',
            myName: '',
            shareImgUrl: '',
            isNoteCardDomShow: true,
            freeChance: false,//是否可以分享
            isPay: false,
            freeRewardLink: false,//是否是试听链接
            noteText: ''
        };
    },

    componentWillMount() {
        MyStorage.whenEnterPage('reward');

        Loading.showLoading('正在生成笔记卡');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        let userId;
        //判定是否有分享成就卡
        let isMine = this.props.params.mine;
        //下线查看别人的成就卡
        if (!isMine) {
            this.state.senior.courseId = Util.getUrlPara('dayId');
                Material.getNoteCardText(this.state.senior.courseId).done((data) => {
                this.setState({
                    noteText: data.message
                })
            });
            userId = Util.getUrlPara('ictchannel');
            if (User.getUserInfo().userId) {
                // Material.postData('下线_进入笔记卡_getReward');
                this.setState({myName: User.getUserInfo().nickName})
            } else {
                OnFire.on('OAUTH_SUCCESS',()=>{
                    // Material.postData('下线_进入笔记卡_getReward');
                    this.setState({myName: User.getUserInfo().nickName})
                });
            }
            this.state.senior.userId = userId;
            this.state.senior.name = Util.getUrlPara('name');
            this.state.senior.rank = Util.getUrlPara('rank');
            this.setState({type: 'other'});
            this.state.type = 'other';
            //todo 如果是试听分享链接
            if (Util.getUrlPara('freeLesson')) {
                //todo sta 下线_进入_GetReword
                this.setState({freeRewardLink: true}, () => {
                    this.setShareConfig('freeChance');
                });
                //todo 获得所有绑定的名字,并保存这些名字
                this.setShareInfo(userId);
            } else {
                this.setShareConfig('share');
            }
            Loading.hideLoading()
        } else {    //查看自己的
            userId = User.getUserInfo().userId;
            // Material.postData('上线_进入笔记卡_getReward');
            let courseId = this.props.params.dayId;
            this.setState({type: 'mine', userInfo: User.getUserInfo()});
            this.state.type = 'mine';
            this.state.senior.name = User.getUserInfo().nickName;
            this.state.senior.headImg = User.getUserInfo().headImage;
            this.state.senior.courseId = this.props.params.dayId;

            //获得自己的课程排名
            Material.courseFinishRank(courseId,userId).done((data) =>{

                this.state.senior.rank = data;
                this.setState({senior: this.state.senior});
                this.setShareConfig('share');
                //1是否是付费用户?
                Tools.fireRaceCourse(sessionStorage.getItem('courseId')).then((value)=>{
                    if(value.pay){
                        this.setState({
                            isPay: true,
                        });
                        //2是否是当天完成?
                        Material.getUpstreamShare(courseId).done( (result)=>{
                            if (result) {
                                //设置分享权限
                                this.setState({
                                    freeChance: true
                                });
                                this.setShareInfo(userId);
                                //设置分享内容
                                this.setShareConfig('freeChance');
                            }
                            Loading.hideLoading();
                        });
                    } else {
                        Loading.hideLoading();
                    }
                });
            })
        }
    },

    setShareInfo(userId) {
        //获取当前的分享情况
        Material.getShareInfo(userId || this.state.senior.userId,this.state.senior.courseId).always( (info)=>{
            this.setState({friendInfo: info});
        });
    },

    /**
     * 设置分享内容
     * @param fmid
     * @param title
     */
    setShareConfig(type) {
        let senior = this.state.senior;
        let data = {}
        let course = courseInfo.find(
            course => {
                return course.id === parseInt(senior.courseId)
            }
        )
        switch (type) {
            //分享当日免费课(高级分享)
            case 'freeChance':
                data = {
                    name: senior.name,
                    rank: senior.rank,
                    dayId: senior.courseId,
                    freeLesson: true,
                    dayTitle: course.dayTitle,
                };
                WxConfig.shareConfig('getRewardFree',data);
                // WxConfig.shareConfig(shareTitle,desc,link,'笔记卡高级分享');
                break;
            //普通分享
            case 'share':
                data = {
                    name: senior.name,
                    rank: senior.rank,
                    dayId: senior.courseId,
                    dayTitle: course.dayTitle,
                };
                WxConfig.shareConfig('',data);
                // WxConfig.shareConfig(shareTitle,desc,link,'笔记卡普通分享');
                break;
            default:
                console.log('error')
        }
    },

    // handleClick() {
    //     location.hash = "/select";
    // },

    //上线点击
    goCommand() {
        // Util.postCnzzData("笔记卡页面点击我要分享");
        // Material.postData('上线_点击我要分享_getReward');
        Statistics.postDplusData('点击_分享_按钮');
        window.dialogAlertComp.show('快快分享你的进步吧','点击右上角三个点点，分享到你的朋友圈吧！','好哒师兄',()=>{},()=>{},false);
    },

    //下线点击
    goSignUp() {
        //todo 数据统计 下线点击
        // Util.postCnzzData("笔记卡页面点击按钮");
        if (User.getUserInfo().userId) {
            // Material.postData('下线_点击按钮_getReward');
        } else {
            OnFire.on('OAUTH_SUCCESS',()=>{
                // Material.postData('下线_点击按钮_getReward');
            });
        }

        //如果是高级链接
        if (this.state.freeRewardLink) {
            //如果还有名额
            if (this.state.friendInfo.length <= 3) {
                //如果不是付费用户.就能领取.上线id,课程id
                if(!this.state.isPay){
                    if (User.getUserInfo().userId) {
                        Material.GetFreeShareLesson(this.state.senior.userId,this.state.senior.courseId).done(
                            data => {
                                data ?  Statistics.postDplusData('点击_领取免费课_按钮') : ''
                            }
                        )

                    } else {
                        OnFire.on('OAUTH_SUCCESS',()=>{
                            Material.GetFreeShareLesson(this.state.senior.userId,this.state.senior.courseId).done(
                                data => {
                                    data ? Statistics.postDplusData('点击_领取免费课_按钮') : ''
                                }
                            )

                        });
                    }
                }
                Tools.MyRouter('','/listenCourse/' + this.state.senior.courseId);
            } else {
                Tools.MyRouter('','/listenCourse/10');
            }
        } else {      //如果是普通链接
            Statistics.postDplusData('点击_试听_按钮');
            Tools.MyRouter('','/listenCourse/10');

        }
    },

    render() {
        return(
            <div className="get-reward-fund">
                <FixedBg/>
                {this.renderFinishCard()}
            </div>
        )
    },

    renderFinishCard() {
        const isNoteCardDomShow = this.state.isNoteCardDomShow
        const freeRewardLink = this.state.freeRewardLink
        const freeChance = this.state.freeChance
        const cardStyleNormal = {
            marginTop:'3.7rem'
        }
        const cardStyleSenior = {
            marginTop:'0'
        }
        let course = courseInfo.find(
            course => {
                return course.id === parseInt(Util.getUrlPara('dayId') || this.props.params.dayId)
            }
        )
        const imgClassName = course.id === 10 ? 'reward-pic-img-big' : 'reward-pic-img'
        return(
            <div>
                {<div className="note-card-title" style={cardStyleSenior}>恭喜，{this.state.senior.name}是第{this.state.senior.rank}名完成当天学习任务的人</div>}
                {/*<img className="reward-light" onClick={this.handleClick} src={'./assetsPlus/image/course/bglight.png'}/>*/}
                {/*<img className="reward-pic" onClick={this.handleClick} src={this.state.type ==='mine' ? this.state.lockPicHQ[this.state.senior.courseId - 1] : this.state.lockPic[this.state.senior.courseId - 1] }/>*/}
                <img className={imgClassName} src={course.noteCardUrl}/>
                {/*isNoteCardDomShow && this.renderShareCard()*/}
                {(freeRewardLink || freeChance) && <p className="note-card-tips">
                    <img src="./assetsPlus/image/course/indDown.png" alt="" />
                    <p>
                        你可以分享这个页面<br/>邀请三位朋友免费听今天的课程
                    </p>
                    <img src="./assetsPlus/image/course/indDown.png" alt="" />
                </p>}
                {(freeRewardLink || freeChance) && this.shareUserList()}
                {this.buttonRender()}
            </div>
        )
    },
    // renderShareCard () {
    //     const text = this.state.noteText
    //     const textArr = text ? text.split('#') : ''
    //     const content = textArr ? textArr[1].replace(/\r\n/g, '<br>') : ''
    //     let course = courseInfo.find(
    //         course => {
    //             return course.id === parseInt(Util.getUrlPara('dayId') || this.props.params.dayId)
    //         }
    //     )
    //     console.log(course)
    //     return (
    //         <div className="reward-pic" style={{backgroundImage:"url('./assetsPlus/image/fund/noteCard.png')"}}>
    //             <p className="note-card-project-title">14天基金定投训练营</p>
    //             <p className="note-card-header">-{course.cardTitle}-</p>
    //             <p className="note-card-content-title">{textArr && textArr[0]}</p>
    //             <div className="note-card-text" dangerouslySetInnerHTML={{__html:content || ''}}></div>
    //             <div className="share-qrcode"><img src="./assetsPlus/image/course/shareqrcode.png" alt=""/></div>
    //         </div>
    //     )
    // },


    buttonRender() {
        const freeRewardLink = this.state.freeRewardLink
        const isPay = this.state.isPay
        const type = this.state.type
        const friendInfo = this.state.friendInfo
        const isGetLesson = freeRewardLink && !isPay && type === 'other' && friendInfo.length < 3
        const isGetFree = freeRewardLink && !isPay && type === 'other' && friendInfo.length >= 3
        return (
            <div><div className="reward-share-button" onClick={type === 'mine' ? this.goCommand : this.goSignUp}>
                {type === 'mine' ? '我要分享' : isGetLesson ? '获取免费试听' : '去听听免费课吧'}
        </div></div>)
    },

    shareUserList() {
        return (
            <div className="share-user-list">
                <div className="share-user-title">已经获得免费听课资格的好友</div>
                {this.shareUser()}
            </div>
        )
    },
    shareUser() {
        const userArr = [1, 2, 3];
        const friendInfo = this.state.friendInfo
        const userList = userArr.map(user =>
            <div className="share-user-logo" key={user}>
                <div className={!friendInfo[user-1] ? 'share-user-headimage-noborder' : 'share-user-headimage'}><div>{friendInfo[user-1] && <img src={friendInfo[user-1].headImg} />}</div></div>
                <div className="share-user-name">{friendInfo[user-1] && friendInfo[user-1].name || '用户'+user}</div>
            </div>
        )
        return userList
    }

});

module.exports = GetReward;