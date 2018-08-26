var React=require("react");
var ReactDOM=require("react-dom");
//var PubSub = require("pubsub-js");
var RankListError=React.createClass({
    render:function (){
        return (
            <div className="row errorAlert">
                <div className="col-xs-12 col-sm-12 error-main">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 error-main-t"></div>
                        <div className="col-xs-12 col-sm-12 error-main-btn">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 error-main-btn1">我知道了</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = RankListError;