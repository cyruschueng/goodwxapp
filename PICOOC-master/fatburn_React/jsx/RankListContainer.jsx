var React=require("react");
var ReactDOM=require("react-dom");
//var PubSub = require("pubsub-js");
var RankListContainer=React.createClass({
    getInitialState:function(){
        this.getInfo();
        return {
            campName:"123"
        }

    },
    getInfo:function(){
        var me = this;
        var getList1type = this.props.getRankList;
        console.log(getList1type,"001111111111111");
        if(getList1type.code == 200){
            alert(1);
            if(typeof getList1type.resp != "undefined"){
                //$(".rank").css("display","none");
                me.setState({display:"none"});

            }else{
                //$(".rank").css("display","block");
                me.setState({display:"block"});
                var rankLists=getList1type.resp.stuList;
                var isOverCamp= getParamByUrl("targetCampId")== "false" ? false:true;
                if(isOverCamp){
                    me.setState({campName:getList1type.resp.campName});
                }else{
                    me.setState({campName:"第"+getList1type.resp.campName+"周"})
                }
                me.setState({rankLists:getList1type.resp.stuList});
                console.log(me.state.rankLists);
            }
        }
    },
    render:function (){
        var getList1type = this.props.getRankList;
        console.log(getList1type,"555555555555");
        //console.log(typeof getList1type.resp != "undefined");//render渲染两次，getList1type.code第一次undefined，第二次有值；
        var campName=this.state.campName;
        var isOverCamp= getParamByUrl("targetCampId")== "false" ? false:true;
        console.log(isOverCamp);
        return (
            <div className="container">
                <div className="row rankTitle">
                    <div>
                        <img src="http://cdn2.picooc.com/web/res/fatburn/image/rankList/start.png"/>
                        <span className="title">{campName}</span>
                        <img src="http://cdn2.picooc.com/web/res/fatburn/image/rankList/start.png"/>
                    </div>
                    <div className="rankTime"></div>
                </div>

                <div className="row rankList">
                    <div className="row rankItem">
                        <div className="rankLeft col-xs-6 col-sm-6">
                            <img className="userHeader" src="image/rankList/header.png"/>
                            <span className="userName">小C君小C君小C君</span>
                            <img className="rankIcon" src="image/rankList/jin.png"/>
                            <img className="userSex" src="image/rankList/girl.png"/>
                            <span className="userRank">1</span>
                        </div>
                        <div className="rankRight col-xs-6 col-sm-6">
                            <div className="row">
                                <div className="col-xs-6 col-sm-6">
                                    <div>脂肪</div>
                                    <div><span className="fatNum">-3.3</span>%</div>
                                </div>
                                <div className="col-xs-6 col-sm-6">
                                    <div>体重</div>
                                    <div><span className="fatNum">-3.6</span>KG</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = RankListContainer;