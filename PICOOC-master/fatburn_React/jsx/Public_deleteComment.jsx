var React=require("react");
//删除打卡，删除评论
//var PubSub = require("pubsub-js");
//alert("RankListError");
var Public_deleteComment=React.createClass({
    render:function (){
        return (
            <aside className="row fixbg">
                <div className="col-xs-12 col-sm-12 fixbg-main">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 fixbg-main-t">您确定删除这条评论吗？</div>
                        <div className="col-xs-12 col-sm-12 fixbg-main-btn">
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 fixbg-main-btn1">取消</div>
                                <div className="col-xs-6 col-sm-6 fixbg-main-btn2">确定</div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
});
module.exports = Public_deleteComment;