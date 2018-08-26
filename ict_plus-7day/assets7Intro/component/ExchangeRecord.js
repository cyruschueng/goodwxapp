/**
 * Created by Administrator on 16-9-28.
 */
var React = require('react');

var User = require('../User');
var Material = require('../Material');
var OnFire =require('onfire.js');

var ExchangeRecord = React.createClass({

    getPropsType(){
        return {
            showView: React.PropTypes.bool.isRequired,
            onBack: React.PropTypes.func.isRequired
        }
    },

    getInitialState() {
        return {
            exchangeRecord: Material.getPrizeExchangeRecord() //兑换记录
        }
    },

    /**
     * 返回操作
     */
    backHandler() {
        this.props.onBack && this.props.onBack()
    },


    componentWillMount() {
        let userInfo = User.getUserInfo();

        if (userInfo.userId) {
            console.log('1=',userInfo.userId);
            this.getExchangeRecord(userInfo.userId);
        }else{
            OnFire.on('OAUTH_SUCCESS',(userInfo)=> {
                console.log('2=',userInfo.userId);
                this.getExchangeRecord(userInfo.userId);
            });
        }

        //兑换成功后，更新兑换记录
        OnFire.on('EXCHANGE_SUCCESS',(userId)=>{
            console.log('3=',userInfo.userId);
            this.getExchangeRecord(userId || userInfo.userId);
        });
    },


    /**
     * 获取兑换记录
     * @param userId
     */
    getExchangeRecord(userId){
        Material.getExchangeRecord(userId)
            .done(
                (exchangeRecord)=>{
                    this.setState({
                        exchangeRecord
                    })
                }
            );
    },


    /**
     * 获取兑换记录
     * @returns {*}
     */
    getExchangeItem() {
        let exchangeRecord = this.state.exchangeRecord;
        let exchangeItems = [];
        let status = '未发货';


        for(let i of exchangeRecord){
            if(i.status=='Y'){
                status = '已发货';
            }

            exchangeItems.push(
            <div className="exchange-item">
                <img src={i.product.surface} className="exchange-item-surface"/>

                <div className="exchange-item-info">
                    <div className="exchange-item-name">
                        {i.product.name}
                        <span className="exchange-item-price">{i.price}积分</span>
                    </div>

                    <div className="exchange-item-station">
                        {status}
                        <span className="exchange-item-time">{i.createTime}</span>
                    </div>
                </div>



            </div>)
        }

        return exchangeItems;

    },



    render() {
        let viewStyle = {};
        viewStyle.display = this.props.showView ? 'block':'none';

        return (
            <div style={viewStyle} className="exchange-record-view">
                <div className="back-title-bar">
                    <span onClick={this.backHandler} className="title-bar-back">返回</span>
                    <span className="title-bar-title">奖品兑换记录</span>
                </div>
                {this.getExchangeItem()}
            </div>
        )
    }

});

module.exports = ExchangeRecord;