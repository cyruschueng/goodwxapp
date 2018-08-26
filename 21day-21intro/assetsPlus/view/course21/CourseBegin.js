/**
 * Created by ichangtou on 2017/7/21.
 */
/**
 * Created by yiran1 on 2017/5/5.
 */
const React = require('react');

//根目录
const Tools = require('../../GlobalFunc/Tools');
const convertHtmlToBase64 = require('../../ImageShare');
const Dimensions = require('../../Dimensions');
const Material = require('../../Material');
var User = require('../../User');
const WxConfig = require('../../WxConfig');
const Util = require('../../Util');

const FixedBg = require('../../component/course/FixedBg');
const Actions = require('../../GlobalStorage/Actions');

const ModalMask = require('../../component/common/ModalMask');

const CourseBegin = React.createClass({
    getInitialState: function() {

        return {
            content: this.props.content,
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
            // myName: '',
            isNoteCardDomShow: true,
            isButtonShow: false,
            randomInit: 3.45,
            useTime: [180,25,15,5],
            signUpInfo: {},
            ifBgShowShare: false,
            ifBgShowSign: false,
        };
    },


    componentWillMount() {
        // let type2Name = {
        //     'select': '关注',
        //     'other': '分享',
        //     'mine': '社群',
        // }
        // MyStorage.whenEnterPage('begin',[type2Name[this.props.params.type]]);
        MyStorage.whenEnterPage('begin');
        let userId;
        let type = this.props.params.type;
        //选择界面查看成就卡
        if (type === 'select') {
            this.setState({type: 'select'});

            Tools.fireRace(User.getUserInfo().userId,"OAUTH_SUCCESS").then(()=>{
                this.state.senior.name = User.getUserInfo().nickName;
                this.state.senior.headImg = User.getUserInfo().headImage;
                this.setState({senior: this.state.senior});
                Loading.hideLoading();
            });

            //TODO yiran 获得下线名字 这边名字会改成多个.并且成就卡那边也需要这个功能.
            // Material.getShareInfo(userId).always( (name)=>{
            //     this.setState({friendName: name});
            //     // this.setShareConfig();
            // });
        } else if(type === 'other') {
            this.setState({type: 'other'});
            //下线
            userId = Util.getUrlPara('ictchannel');
            //获得上线头像/姓名并设置
            Material.getUserAdvanceInfo(userId).done((result)=>{
                this.state.senior.name = result.username;
                this.state.senior.headImg = result.headImage;
                this.setState({senior: this.state.senior});
            })
            this.state.senior.name = '';
            this.state.senior.headImg = '';
            this.setState({senior: this.state.senior});

        } else if(type === 'mine'){
            //查看自己的毕业证
            //获取班级群信息
            let courseId = sessionStorage.getItem('courseId');
            Actions.ifCourseSignUp(courseId);
            Tools.fireRaceCourse(courseId).then((value)=>{
                this.state.signUpInfo = value;
                this.setState({
                    signUpInfo: value,
                });
                this.showQQInfo(0);
            });


            userId = User.getUserInfo().userId;
            Tools.fireRace(User.getUserInfo().userId,"OAUTH_SUCCESS").then(()=>{
                this.setState({type: 'mine'});
                this.setState({userInfo: User.getUserInfo()});

                this.state.senior.name = User.getUserInfo().nickName;
                this.state.senior.headImg = User.getUserInfo().headImage;
                this.setState({senior: this.state.senior});
                // this.setShareConfig();
                Loading.hideLoading();
            });
        }
    },

    componentDidMount () {
        return;
        console.log('didmount');
        const element = document.getElementById('need-draw');
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        Tools.fireRace(User.getUserInfo().userId,"OAUTH_SUCCESS").then(()=>{
            const userId = this.state.type === 'mine' ? User.getUserInfo().userId : Util.getUrlPara('ictchannel');
            if(this.props.params.mine) {
                console.log('wait');
                setTimeout(() => {
                    console.log('finish');
                    convertHtmlToBase64(element, height, width).then((base64)=> {
                        setTimeout(() => {
                            this.setState({
                                shareImgUrl: base64,
                                isNoteCardDomShow: false
                            });
                            Loading.hideLoading()
                        }, 1000)
                    })
                },1000)
            } else {
                Material.getOtherHeadImage(userId).always( (img)=>{
                    // this.state.senior.headImg = img.responseText;
                    this.state.senior.headImg = '';
                    this.setState({senior: this.state.senior}, ()=>{
                        setTimeout(() => {
                            convertHtmlToBase64(element, height, width).then(
                                base64 => {
                                    this.setState({
                                        shareImgUrl: base64,
                                        // isNoteCardDomShow: false
                                    });
                                    Loading.hideLoading()
                                }
                            )
                        },1000)
                    });
                });
            }
        });
        // Material.getNoteCardText(courseId).done((data) => {
        //     this.setState({
        //         noteText: data.message
        //     }, () => {
        //     })
        // })
    },

    /**
     * 设置分享内容1
     * @param fmid
     * @param title
     */
    // setShareConfig() {
    //     //开课证分享
    //     let shareInfo = GlobalConfig.getShareInfo(sessionStorage.getItem('courseId'),'courseBegin');
    //     let shareTitle = shareInfo.title,
    //         link = shareInfo.link,
    //         desc = shareInfo.desc;
    //     link = link + '&goPath=' + 'courseBegin';
    //     link = link + '&courseId=' + sessionStorage.getItem('courseId');
    //     WxConfig.shareConfig(shareTitle,desc,link);
    //
    //     WxConfig.shareConfig('');
    // },

    // goSignUp(type) {
    //     if(type === 0) {
    //         Material.postData('下线_点击鼓励_getGraduated');
    //         window.dialogAlertComp.show('小伙伴受到鼓励啦','你的鼓励会让TA再接再厉哦。','棒棒哒',()=>{},'',false);
    //         this.setState({isButtonShow: 'true'});
    //     } else {
    //         Material.postData('下线_点击跳转_getGraduated');
    //         location.hash = "/payPage";
    //     }
    // },

    // style = {fullbg}
    render() {
        // let style = {
        //     display: 'flex',
        //     flexWrap: 'wrap',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     fontSize: '20px',
        //     width: '100%',
        //     height: '100%',
        //     backgroundColor: 'rgba(144,118,96,0.9)'
        // };
        return(
            <div className="get-begin-course21">
                <FixedBg/>
                {/*扫二维码*/}
                {/*<ModalMask type = {false} cbfClick = {this.cbfModalClick} isShow = {this.state.ifBgShowSign} imageBg = {`./assetsPlus/image/${GlobalConfig.getCourseName()}/paypage_share.png`}>*/}
                    {/*<div style = {style}>*/}
                        {/*<div>*/}
                            {/*<img style={{width: '310px'}} src={`./assetsPlus/image/${GlobalConfig.getCourseName()}/wxSignCode.png`}/>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</ModalMask>*/}

                {/*{this.renderLineBar(0)}*/}
                {/*{this.renderLineBar(1)}*/}
                <ModalMask type = {true} cbfClick = {this.cbfModalClick} isShow = {this.state.ifBgShowShare} imageBg = {`./assetsPlus/image/${GlobalConfig.getCourseName()}/paypage_share.png`}/>

                {/*8-3 按钮栏 变为垂直样式*/}
                {/*<div className="reward-button-graduated">{this.buttonRender()}</div>*/}
                {this.renderContentByType()}
            </div>
        )
    },

    renderContentByType() {
        let arr = [];
        switch(this.props.params.type) {
            case 'mine':
                arr.push(this.renderAfterSignUp());
                break;
            case 'other':
                arr.push(this.renderGraduatedPage());
                break;
            case 'select':
                arr.push(this.renderGraduatedPage());
                break;
        }
        return arr;
    },


    renderAfterSignUp() {
        let imgs = [`./assetsPlus/image/${GlobalConfig.getCourseName()}/begin_course_info.png`,`./assetsPlus/image/${GlobalConfig.getCourseName()}/qq-icon.png`];
        let arr = [];
        arr.push(this.renderTitle());
        arr.push(<div className = 'line'>
            <img src = {imgs[0]}/>
        </div>);
        arr.push(<div className="bottom-line" onClick = {()=>{location.href = this.state.signUpInfo.qqGroupUrl;}}>
            <p>暗号:<strong>{this.state.signUpInfo.secret}</strong></p>
            <div className = 'qq-line'>
                <img src = {imgs[1]}/>
                <span>加入QQ群:<strong> {this.state.signUpInfo.qqGroup} </strong></span>
                <span className="big"></span>
            </div>
            <p className="small">获取学习资料\老师指导</p>
        </div>);
        return arr;
    },

    renderGraduatedPage() {
        let arr = [];

        arr.push(this.renderGraduatedBefore());
        arr.push(<div className = 'line'>{this.buttomBarRender()}</div>);
        return(arr);
    },

    cbfModalClick() {
        this.setState({
            ifBgShowShare: false,
            ifBgShowSign: false,
        })
    },

    renderTitle() {
        if( this.props.params.type !== 'mine') {
            return
        }
        let img = './assetsPlus/image/course21/begin_title.png';
        return (<div className = 'line'>
            <img src = {img}/>
        </div>)
    },

    renderLineBar(index) {
        if( this.props.params.type !== 'mine') {
            return
        }
        let imgs = ['./assetsPlus/image/course21/begin_qq_info.png','./assetsPlus/image/course21/begin_sign_up.png'];
        return (<div className = 'line' onClick = {this.showQQInfo.bind(this,index)}>
            <img src = {imgs[index]}/>
        </div>)
    },

    buttomBarRender() {
        console.log('!!!!!!!!!title');
        let type = this.props.params.type;

        let arr = [];
        let img = './assetsPlus/image/course21/share_payPage.png';
        let fonts = ['我也要报名','分享给小伙伴显摆显摆'];

        switch (type) {
            case 'other':
                //signup
                arr.push(<div className="bottom-line" onClick={this.showQQInfo.bind(this, 3)}>
                    <div className="button">
                        <span>{fonts[0]}</span>
                    </div>
                </div>);
                break;
            default:
                //share
                arr.push(<div className="bottom-line" onClick={this.showQQInfo.bind(this, 2)}>
                    <div className="inner-line">
                        <img src={img}/>
                        <span>{fonts[1]}</span>
                    </div>
                </div>)
                break;
        }
        return arr
    },

    renderGraduatedBefore() {
        return(
            <div id = 'need-draw' className="get-graduated-before" style = {{backgroundImage: 'url("./assetsPlus/image/course21/graduated.png")'}}>
                <img className="head" src={this.state.senior.headImg}/>
                {/*<img className="head" src="./assetsPlus/image/course21/share_payPage.png"/>*/}
                <div className="title">
                    <p>
                        <span className="name">{this.state.senior.name} 同学</span><br/>
                        {/*欢迎加入21天训练营<br/>*/}
                    </p>
                </div>
            </div>
        )
    },

    calcRandom(index){
        if(index === 0) {
            return Math.floor(Number(this.state.randomInit));
        }
        if(index===5){
            return (this.state.senior.rank % 10 * 1.23 +76).toFixed(1);
        }
        let random = 0;
        // if(index!==3){
        //     random = Math.random().toFixed(2);
        // }
        // let answer = ((this.state.randomInit/this.state.useTime[index]) + random).toFixed(2);
        let answer = (this.state.randomInit/this.state.useTime[index]).toFixed(2);
        //总学习时间 比上 各个平均时间
        return answer;
    },


    renderGraduated() {
        return(
            <div>
                <div id = 'need-draw' className="get-graduated" style = {{backgroundImage: 'url("./assetsPlus/image/course21/graduated.png")'}}>
                    <img className="head" src={this.state.senior.headImg}/>
                    {/*<img className="head" src="./assetsPlus/image/course21/share_payPage.png"/>*/}
                    <div className="title">
                        <p>
                            恭喜<span className="name">{this.state.senior.name}</span>同学<br/>
                            加入21天训练营，<br/>
                            祝你在接下来的日子里<br/>
                            成功迈出理财第一步<br/>
                        </p>
                    </div>
                </div>
            </div>
        )
    },

    // buttonRender() {
    //     let arr = [];
    //     let imgs = ['./assetsPlus/image/course21/wx_payPage.png','./assetsPlus/image/course21/share_payPage.png','./assetsPlus/image/course21/qqGroup_payPage.png'];
    //     let fonts = ['每日作业','分享','找老师'];
    //     if(this.props.params.type === 'mine') {
    //         for(let i =0; i<3; i++) {
    //             arr.push(<div className="button" onClick = {this.showQQInfo.bind(this,i)}>
    //                 <img src={imgs[i]}/>
    //                 <span>{fonts[i]}</span>
    //             </div>)
    //         }
    //     } else if(this.props.params.type === 'select'){
    //         arr.push(<div className="button" onClick = {this.showQQInfo.bind(this,1)}>
    //             <img src={imgs[1]}/>
    //             <span>{fonts[1]}</span>
    //         </div>)
    //     } else if(this.props.params.type === 'other'){
    //         arr.push(<div className="button" onClick = {this.showQQInfo.bind(this,3)}>
    //             <img src={imgs[3]}/>
    //             <span>{fonts[3]}报名</span>
    //         </div>)
    //     }
    //
    //     // arr.push((<div key={1} className="reward-button-graduated" onClick = {this.showQQInfo}>
    //     //     <img className="button-img" src={'./assetsPlus/image/course/btnSignin.png'}/>
    //     //     <p className="button-p">qq群</p>
    //     // </div>));
    //     return arr;
    // },

    showQQInfo(type) {
        //中文上报的合适例子.目的是让数据接收者不需要再次计算.
        // let type2Name = {
        //     '0': '关注',
        //     '1': '分享',
        //     '2': '社群',
        //     '3': '下线跳转',
        // }
        // Statistics.postDplusData('点击按钮栏_按钮',[type2Name[type]]);
        switch (type) {
            case 0:
                Statistics.postDplusData('点击_社群_按钮');
                window.dialogAlertComp.show('加入QQ群（学习群务必加入）',`群号${this.state.signUpInfo.qqGroup},暗号${this.state.signUpInfo.secret}`,'点击加入',()=>
                {location.href = this.state.signUpInfo.qqGroupUrl;},'我加过了',true);
                break;
            case 1:
                Statistics.postDplusData('点击_关注_按钮');
                this.setState({ifBgShowSign: true});
                break;
            case 2:
                Statistics.postDplusData('点击_分享_按钮');
                this.setState({ifBgShowShare: true});
                break;
            case 3:
                Statistics.postDplusData('点击_报名_按钮');
                Tools.GoRouter('pay');
                break;
            default:
                break
        }

    },

    renderFont(text) {
        return(
            <div className="text-stroke">
                <p className="text-stroke-out">{text}</p>
                <p className="text-stroke-inner">{text}</p>
            </div>)
    },


});

module.exports = CourseBegin;