var React = require("react");
var ReactDOM = require("react-dom");
//var  $ = require('jquery');
var Public_error = require('./Public_error.jsx');
// 下单成功的icon
var OrderSuccessIcon = React.createClass({
    getInitialState: function () {
        var titleData = {
            title: "下单成功",
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        titleData = JSON.stringify(titleData);
        appFc.controlTitle(titleData);
        return {}
    },
    //leftFunction
    leftFunction:function(){
        window.location.href = 'productDetails.html?eventName=fatBurn&typeSize=1&refer=1&linkId='+getParamByUrl('linkId');
    },
    render: function () {
        var me = this;
        return (
            <div>
                <div className="row noAppTitle" style={{ display: 'none' }}>
                    <div className="col-xs-4 col-sm-4 left" onClick={me.leftFunction}>关闭</div>
                    <div className="col-xs-4 col-sm-4 middle"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/logoLeft.png" /></div>
                    <div className="col-xs-4 col-sm-4"></div>
                </div>
                <div className="head">恭喜您下单成功！</div>
            </div>
        )
    }
});
// 无称，下单成功提示
var OutAppTips = React.createClass({
    ClickHandle:function(){
        window.location.href = 'myInfo.html'+removeParamByUrl('orderId');
    },
    DownladClick:function(){
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.picooc&g_f=991653'
    },
    render: function () {
        return (
            <div className="bodytext">
                <div className="orderedtips">
                    <div className="OutTips">
                        <p>激活码已经短信发送至您的手机</p>
                        <p>请您<em>下载并注册</em>有品·PICOOC，</p>
                        <p>激活您的燃脂营服务~</p>
                    </div>
                    <div className="picoocIcon"></div>
                </div>
                <div className="searchBtnCon"><button onClick={this.ClickHandle}>查看我的订单</button><button onClick={this.DownladClick}>下载有品·PICOOC</button></div>
            </div>
        )

    }
});
// 有称，app版本过低，下单成功提示
var OrderedCon = React.createClass({
     ClickHandle:function(){
        window.location.href = 'myInfo.html'+removeParamByUrl('orderId');
    },
    DownladClick:function(){
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.picooc&g_f=991653';
        console.log('2');
    },
    render: function () {
        if(getParamByUrl('os') == 'android'){
            var buttonStyle = {
                'textAlign':'center',
            }
            var shengji = {
                'display':'none'
            }
        }
        return (
            <div className="bodytext">
                <div className="orderedtips">
                    <div className="OutTips">
                        <p>激活码已经短信发送至您的手机，</p>
                        <p> 请您<em>升级并登录</em>有品·PICOOC，</p>
                        <p>在<em>【我的-我的燃脂营】</em>中，激活您的燃脂营服务~</p>
                    </div>
                </div>
                <div className="searchBtnCon" style={buttonStyle}><button className="searchBtn" onClick={this.ClickHandle}>查看我的订单</button><button className="updateBtn" onClick={this.DownladClick} style={shengji}>升级有品·PICOOC</button></div>
            </div>
        )
    }
});

// 有称，下单成功提示
var InnerAppTips = React.createClass({
    ClickHandle:function(){
        window.location.href = 'myInfo.html'+removeParamByUrl('orderId');

    },
    render: function () {
        return (
            <div className="bodytext">
                <div className="orderedtips innerappText">
                    <div className="OutTips">
                        <p>激活码已经短信发送至您的手机，</p>
                        <p> 请您<em>登录有品·PICOOC，</em></p>
                        <p>在<em>【我的-我的燃脂营】</em>中，激活您的燃脂营服务~</p>
                    </div>
                </div>
                <div className="searchorder searchBtnCon"><button onClick={this.ClickHandle}>查看我的订单</button></div>
            </div>
        )
    }
});

var ContentBox =  React.createClass({
    

    render:function(){
        var is_balance = getParamByUrl('isOwnPicooc');
        var webver = getParamByUrl('webver');
        var Content;
        if(is_balance == 1){
            if(webver < 2){
                Content = <OrderedCon />;
            }
            else{
                Content = <InnerAppTips />;
            }
            
        }
        else{
            Content = <OutAppTips />;
        }
        return (
            <div>
                {Content}
            </div>
        )
    }
})
ReactDOM.render(
    <div>
        <OrderSuccessIcon />
        <ContentBox />
    </div>, document.getElementById('orderedBox'))