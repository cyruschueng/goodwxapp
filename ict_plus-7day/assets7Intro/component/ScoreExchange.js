var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
var OnFire =require('onfire.js');
var DoneToast = require('./DoneToast');
var Material = require('../Material');
var ExchangeRecord = require('./ExchangeRecord');
var Toast = require('./Toast');

var User = require('../User');
var Dimensions = require('../Dimensions');

var ScoreExchange = React.createClass({
    getPropsType() {
        return {

        }
    },

    getInitialState() {
        return {
            userProfile:{},//用户简介
            bonus: 0, //积分
            prizeInfo: Material.getAllPrize(),  //所有的奖品信息
            showExchangeRecord: false //显示兑换记录
        }
    },

    componentWillMount(){
        OnFire.on('OAUTH_SUCCESS',(userInfo)=> {

            if (User.getUserInfo()) {
                //获取用户基本信息
                User.getUserProfileFromServer(User.getUserInfo().userId)
                .done((data)=> {
                    this.setState({
                        userProfile: data,
                        bonus: data.bonusPoint
                    });
                })
                .fail((data)=> {
                    console.log('执行失败输出值2', data);
                });
            }

            //获取奖品信息
            Material.getPrizeFromServer(userInfo.userId)
            .done((prizeInfo)=>{
                this.setState({
                    prizeInfo
                })
            })

        });
    },


    /**
     * 积分兑换
     * @param id 奖品id
     */
    clickHandler(id){
        console.log('积分兑换 id',id);

        let userProfile = this.state.userProfile;

        if(!userProfile.userId){
            Toast.show('找不到你的信息，暂时换不了哈');
            return
        }

        let prizeInfo = this.state.prizeInfo;

        for(let i of prizeInfo) {
            if( i.id == id) {
                if(this.state.bonus >= i.price){
                    this.exchangePrize(i.id,i.price);
                }
            }
        }
    },

    /**
     * 兑换奖品
     * @param id 奖品id
     * @param price 奖品积分
     */
    exchangePrize(id,price) {
        Material.postExchangePrize(id)
        .done(()=>{
            //显示
            DoneToast.show('积分兑换成功');
            //更新积分
            this.setState({
                bonus:this.state.bonus - price
            });
            //获取奖品信息
            Material.getPrizeFromServer(User.getUserInfo().userId)
                .done((prizeInfo)=>{
                    this.setState({
                        prizeInfo
                    })
                });
            OnFire.fire('EXCHANGE_SUCCESS',this.state.userProfile.userId);
        })
    },

    /**
     * 查看积分兑换
     */
    exchangeRecordHandler() {
        this.setState({
           showExchangeRecord: true
        });
    },

    /**
     * 返回
     */
    onBackHandler() {
        this.setState({
            showExchangeRecord: false
        });
    },


    render() {
        let userProfile = this.state.userProfile;
        let bonus =this.state.bonus;
        let prizeInfo = this.state.prizeInfo;

        let showGoods=[] ,cls,text;

        for(let i of prizeInfo){

            if(bonus >= i.price){
               // text = item.changed ? '已兑换' :'立即兑换';
                text= '立即兑换';
                cls = 'change_btn';
            }else{
                cls = 'unable_btn';
                text ='积分不足';
            }

            showGoods.push(<div>
                <div className="item">
                    <div className="info">
                        <img className="goods_img" src={i.surface} style={{width:'3.2rem'}}/>
                        <div className="goods_info">
                            <p className="goods_desc">{i.name}</p>
                            <p className="need_score"><span className="need_num">{i.price}</span>积分</p>
                        </div>
                    </div>
                    <div className="change_info">
                        <p className="has_change_num">{i.purchaseQuantity}人已兑</p>
                        <div className={cls} onClick={this.clickHandler.bind(this,i.id)}>{text}</div>
                    </div>
                </div>
            </div>)
        }


        let changeStyle={};
        changeStyle.display = this.state.showExchangeRecord ? 'none' : 'block';

        return (<div>
            <div className="exchange_page" style={changeStyle}>

                <div className="top">
                    <div >
                        <div className="user_img"
                             style={{backgroundImage:'url('+ userProfile.portrait + ')',backgroundSize:'cover'}}>
                        </div>
                        <p className="user_name">{userProfile.nickName}</p>
                    </div>
                    <div className="score_record">
                        <div className="score">
                            <img className="score_img"src="build21/coin.png" style={{width:'11%'}}/>
                            <p>积分</p>
                            <p className="num">{this.state.bonus}</p>
                        </div>
                        <div className="record">
                            <img className="record_img"src="build21/record.png" style={{width:'9%'}} />
                            <p onClick={this.exchangeRecordHandler}>兑换记录</p>
                        </div>
                    </div>
                </div>

                <div className="goods">
                    {showGoods}
                </div>
            </div>
            <ExchangeRecord showView={this.state.showExchangeRecord}
                            onBack={this.onBackHandler}/>
        </div>);
    }
});

module.exports = ScoreExchange;