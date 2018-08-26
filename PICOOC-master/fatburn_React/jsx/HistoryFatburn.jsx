var React = require("react");
var ReactDOM = require("react-dom");
var Public_Error = require('./Public_error.jsx');
var PubSub = require("pubsub-js");

var HistoryList = React.createClass({

    render: function () {
        var HistoryListData = this.props.HistoryListData;
        var index = this.props.index;
        var hrefUrl = "student.html" + window.location.search + "&targetCampId=";
        return (
            <a className="historyItem row" key={index} href={hrefUrl + HistoryListData[index].id}>
                <div className="title">
                    <span>燃脂营 <span className="theBlod">{HistoryListData[index].name}</span></span>
                </div>
                <div className="date">
                    <span>{HistoryListData[index].beginTime + '-'}{HistoryListData[index].endTime}</span>
                </div>
            </a>
        )
    }
});

var HistoryContainer = React.createClass({
    getInitialState: function () {
        var tdata = {
            title: '历史燃脂营',
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        tdata = JSON.stringify(tdata);
        appFc.controlTitle(tdata);
        return {
            hrefUrl: '',
            HistoryListData: []
        }

    },
    componentWillMount: function () {
        var campId = getParamByUrl("campId");
        var host = window.location.protocol + "//" + window.location.host;
        var finalUrl = host + "/v1/api/campStu/getCampHistory" + window.location.search + "&campId=" + campId;
        this.serverRequet = $.get(finalUrl, function (data) {
            if (data.code == 200) {
                var searchUrl = removeParamByUrl("targetCampId");
                this.setState({
                    HistoryListData: data.resp
                });
            }
            else {
                $(".error-main-t").html(data.result.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.serverRequet.abort();
    },
    componentDidMount: function () {
        $(".container").css("minHeight", $(window).height());

    },
    render: function () {
        var HistoryListData = this.state.HistoryListData;
        var listHTML = [];
        for (var i = 0; i < HistoryListData.length; i++) {
            listHTML.push(<HistoryList HistoryListData={HistoryListData} key={i} index={i} />)
        }
        return (
            <div>
                <div className="historyList row">
                    {listHTML}
                </div>
                <Public_Error />
            </div>
        )
    }
});

ReactDOM.render(<HistoryContainer />, document.getElementById('container'));
