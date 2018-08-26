var React = require("react");
var ReactDOM = require("react-dom");
//var PubSub = require("pubsub-js");
//alert("RankListError");
var Public_error = React.createClass({
    ErrorClick: function (event) {
        event.stopPropagation();
        var ele = ReactDOM.findDOMNode(this.refs.errorAlert);
        ele.style.display = 'none';
    },
    render: function () {
        return (
            <div className="row errorAlert" ref="errorAlert">
                <div className="col-xs-12 col-sm-12 error-main">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 error-main-t"></div>
                        <div className="col-xs-12 col-sm-12 error-main-btn">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 error-main-btn1" onClick={this.ErrorClick}>我知道了</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = Public_error;