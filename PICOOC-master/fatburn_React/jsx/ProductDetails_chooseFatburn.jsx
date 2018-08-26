var React=require("react");
var PubSub = require("pubsub-js");
var ProductDetails_chooseFatburn=React.createClass({

    getInitialState:function(){
        var me = this;
        return {
            nowType:'', //当前类型，默认A类
            inDesc:'',//商品描述
            userEvaluation:''//用户评价
        };
    },

    componentWillMount:function(){
        var me = this;
        var data = me.props.chooseFatburn;

        var nowTypeNum = 0;
        for(var i=0; i<data.resp.info.length; i++){
            if(data.resp.info[i].hasStock){
                nowTypeNum = i;
                break;
            }
        }

        var userEvaluation = data.resp.info[nowTypeNum].userEvaluation.split(',');
        var inDesc = data.resp.info[nowTypeNum].inDesc;
        me.setState({
            nowType: nowTypeNum,
            userEvaluation:userEvaluation,
            inDesc:inDesc
        });
    },
    componentDidMount:function(){
        var me = this;
        var data = me.props.chooseFatburn;
        PubSub.subscribe("chooseType", function(msg, chooseType){

            var inDesc = data.resp.info[chooseType].inDesc;
            var userEvaluation = data.resp.info[chooseType].userEvaluation.split(',');
            me.setState({
                inDesc:inDesc,
                userEvaluation:userEvaluation
            });

        });
    },

    render:function(){
        var me = this;
        var data = me.props.chooseFatburn;
        var chooseFatburnStr = "";
        if(data.code ==200){

            var inDesc = me.state.inDesc;
            var userEvaluation = me.state.userEvaluation;
            //底部的商品详情图
            var strDesc=[];
            //var DescArr = JSON.parse(data.resp.good_desc);
            var strDesc2=[];


            if(userEvaluation){
                userEvaluation.map(function (item, index) {
                    strDesc2.push(
                        <img key={index} className="commentDetail" src={userEvaluation[index]}/>
                    );
                })
            }
            chooseFatburnStr =
                <div>
                    <aside className="choose detailOrComment detailOrComment1" ref="detailBox">
                        <div id="expandDetails" dangerouslySetInnerHTML={{__html:inDesc}}>

                        </div>
                    </aside>
                    <aside className="comments detailOrComment" style={{display:"none"}} ref="commentBox">
                        {strDesc2}
                    </aside>
                </div>
        }

        return (
            /*选择燃脂营*/
            <div>
                {chooseFatburnStr}
            </div>
        );
    }

});

module.exports = ProductDetails_chooseFatburn;