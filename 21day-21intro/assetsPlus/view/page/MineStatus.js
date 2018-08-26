/**
 * Created by ichangtou on 2017/7/8.
 */


/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');
const Material = require('../../Material');
const Tools = require('../../GlobalFunc/Tools');
const ProcessBarContain = require('../../component/Complex/ProcessBar/ProcessBarContain');
const ModalMask = require('../../component/common/ModalMask');

const MineStatus = React.createClass({
    getInitialState: function() {
        // console.log('123');
        return {
            subTitle: ['我的资产','金币交易所','我的优惠券','成就屋'],
            localExpInfo: {
            },
            kValue: 1,
            dTime: 0,
            ifBgShow: false,
        };
    },

    componentWillMount() {
        MyStorage.whenEnterPage('homeinfo');
        //下拉经验值
        // this.initExp();

    },



    // getUserInfo() {
    //     let userId = User.getUserInfo().userId;
    //     Tools.fireRace(userId,"OAUTH_SUCCESS").then(()=>{
    //         Material.getUserAdvanceInfo(userId).done((result)=>{
    //             this.state.userAdvanceInfo = result;
    //             this.setState({userAdvanceInfo: this.state.userAdvanceInfo});
    //         })
    //     });
    // },

    


    //渲染前计算
    calcExp() {
        this.state.kValue = this.state.localExpInfo.current/this.state.localExpInfo.max;
        return this.state.kValue;
        // this.setState({
        //     kValue: this.state.kValue,
        // });

    },

    //这种在渲染render里的东西很容易造成bug
    //设置父组件会让子组件再次渲染.会再次调用父组件
    //解决方案1)档掉无用的渲染
    //2)状态提升到父组件自行解决.
    calcLevelUp(isSetTimer) {
        if(!isSetTimer) {
            return
        }
        if(this.state.localExpInfo.levelUp) {
            setTimeout(()=>{
                this.props.cbfModalChange('levelUp');
                console.log('level up')
            },this.state.dTime * 1100)
        } else {
            setTimeout(()=>{
                console.log('up finish')
            },this.state.dTime * 1100)
        }
    },

    //渲染变化时间
    calcDTime() {
        console.log('calcDTime');
        if(this.state.localExpInfo.level > -1) {
            let distance = this.props.userExpInfo.current - this.state.localExpInfo.current;
            if(distance < 0){
                distance = 0;
            }
            //速度 = 长度/时间
            let v = this.state.localExpInfo.max/2;
            this.state.dTime = distance/v;
            this.state.localExpInfo = JSON.parse(JSON.stringify(this.props.userExpInfo));
            return this.state.dTime;
            // this.setState({dTime: this.state.dTime});
            // this.setState({localExpInfo: this.state.localExpInfo});
        } else {
            this.state.localExpInfo = JSON.parse(JSON.stringify(this.props.userExpInfo));
            // this.setState({dTime: 0,
            //     localExpInfo: this.state.localExpInfo})
            return 0
        }


    },



    // style = {fullbg}
    render() {
        let style = {
            backgroundColor: '#dbf2ff'
        };
        this.calcRenderExp();
        return(
            <div style = {style} className="mine-status">
                {this.renderModal()}
                {this.topInfo()}
                {this.midInfo()}
            </div>
        )
    },

    renderModal() {
        let style = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(35,24,21,0.5)'
        };
        let styleImg = {
            width: '256px',
            height: '297px',
        };
        return(
            <ModalMask cbfClick = {()=>{this.setState({ifBgShow: false})}} isShow = {this.state.ifBgShow}>
                <div style = {style}>
                    <div>
                        <img style = {styleImg} src={`./assetsPlus/image/exp_help_txt.png`}/>
                    </div>
                </div>
            </ModalMask>
        )
    },

    signUp() {
        if(this.props.canSignUp) {
            GlobalExp.expUpEvent('signUp').then((value)=>{
                //1弹出获取经验弹窗
                if(value) {
                    Statistics.postDplusData('点击_签到',[true]);
                    this.props.cbfModalChange('getExp',value);
                    this.props.cbfSignUp();
                } else {
                    Statistics.postDplusData('点击_签到',[false]);
                }
            })
        } else {
            Statistics.postDplusData('点击_签到',[false]);
            window.dialogAlertComp.show('明天再来吧','您今天已经签过到啦','知道啦',()=>{},'',false);
        }

    },

    //返回true表示.是有意义的更新.
    isUsefulUpdata() {
        let local = this.state.localExpInfo;
        let props = this.props.userExpInfo;
        let equal = true;
        let params = ['max','level','current','levelUp'];
        if(local.level) {
            for(let i = 0; i< params.length; i++){
                if(local[params[i]] !== props[params[i]]) {
                    equal = false;
                    break;
                }
            }
        } else {
            equal = false;
        }

        if(equal) {
            return false
        } else {
            return true
        }
    },

    calcRenderExp() {
        let isSetTimer = this.isUsefulUpdata();
        this.calcDTime();
        this.calcExp();
        this.calcLevelUp(isSetTimer);
    },

    renderExpProcess() {

        return(<div className="process">
            <span className="inner-number">{this.state.localExpInfo.current}/{this.state.localExpInfo.max}</span>

            <ProcessBarContain kValue = {this.state.kValue}
                               dTime = {this.state.dTime}/>


        </div>);
    },

    topInfo() {
        let userAdvanceInfo = this.props.userAdvanceInfo;
        let style = {
            backgroundColor: '#4498c7'
        };
        return(<div style = {style} className="user-info">
            <div className="head-info">
                <img src={userAdvanceInfo.headImage}/>
                <div className="level-line">
                    <p className="level-icon">Lv.{this.state.localExpInfo.level}</p>
                </div>
            </div>
            <div className="base-info">
                <p className="name">{userAdvanceInfo.username}</p>
                {/*<p>金币数：{userAdvanceInfo.gold}</p>*/}
                <div className="process-bar">
                    {this.renderExpProcess()}
                    {this.renderGetHelpInfo()}
                </div>
                <div style = {{width: '50px'}} onClick = {this.signUp}>{this.renderSignUp()}</div>
            </div>
            <div className="right-bottom">

            </div>

        </div>)
    },

    renderGetHelpInfo() {
        let style = {
            width: '25px',
            height: '25px',
        };
        return(<img style = {style} src={'./assetsPlus/image/exp_help_logo.png'} onClick = {()=>{this.setState({ifBgShow: true})}}/>)
    },

    renderSignUp() {
        let arr = [];
        let style = {
            width: '59px',
            height: '29px',
        };
        if(this.props.canSignUp) {
            arr.push(<img style = {style} src={'./assetsPlus/image/exp_sign_on.png'}/>)
        } else {
            arr.push(<img style = {style} src={'./assetsPlus/image/exp_sign_off.png'}/>)
        }
        return arr;
    },

    midInfo() {
       return(<div className="other-info">{this.subInfo()}</div>)
    },

    subInfo() {
        let subTitle = this.state.subTitle;
        let arr = [];
        for (let i = 0; i< subTitle.length; i++) {
            arr.push(
                <div onClick = {this.subClick.bind(this,i)}className="subs-out">
                    <div className="sub-inner"></div>
                    <div className="sub-out-border"></div>
                    <span className="sub-title">{subTitle[i]}</span>
                </div>)

        }
        return arr;
    },

    subClick(index) {
        Statistics.postDplusData('点击_内容_导航栏',[index]);
        // window.dialogAlertComp.show('即将开启','新鲜的内容正在精心准备中，敬请期待！','知道啦',()=>{},'',false);
    }
});

module.exports = MineStatus;