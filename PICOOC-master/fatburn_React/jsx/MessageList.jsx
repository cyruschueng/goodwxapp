var React = require("react");
var ReactDOM = require("react-dom");
var Public_error = require('./Public_error.jsx');


//alert(window.location.href);

var SXiaoXiLieBiao={
    SCategory_SXiaoXiLieBiao:5060600,
    SXiaoXiLieBiao_QianWangXiaoXiXiangQing:5060601,//前往消息详情
    SXiaoXiLieBiao_ChaKanGengZaoHuiFu:5060602//查看更早回复
};

var MessageList=React.createClass({
    getInitialState:function(){

        var me=this;
        return {
            //readedMessageData:[]
        }
    }, 
    setMessageStatus:function(replyId,url,checkId){
        var me=this;
        var validData = [];
        setMaiDian(SXiaoXiLieBiao.SCategory_SXiaoXiLieBiao,SXiaoXiLieBiao.SXiaoXiLieBiao_QianWangXiaoXiXiangQing);
        console.info(url);
        var host=window.location.protocol+"//"+window.location.host;
        var finalUrl=host+"/v1/api/camp/checkState"+window.location.search+"&replyId="+replyId+"&checkId="+checkId;
        $.ajax({
            type: "get",
            url: finalUrl,
            success : function (data) {
                
                if(data.resp.check && data.resp.reply){
                    var host1=window.location.protocol+"//"+window.location.host;
                    var finalUrl1=host1+"/v1/api/camp/changeReplyRead"+window.location.search+"&replyId="+replyId;
                    $.ajax({
                        type: "get",
                        url: finalUrl1,
                        success : function (data1) {
                            if(data1.code != 200){
                                $(".error-main-t").html("服务器开小差了～");
                                $(".errorAlert").css("display","block");
                                $(".error-main").css("margin-top",-$(".error-main").height()/2);
                            }else{
                                //打开一个新的webWiew
                                var deviceType=isMobile();
                                if(deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")){
                                    me.openNewWebview(url);
                                }else{
                                    window.location.href=url;
                                }
                                
                            }
                        }
                    });
                }else{
                    if(!data.resp.check){
                        $(".error-main-t").html("该条打卡已被删除~");
                        $(".errorAlert").css("display","block");
                        $(".error-main").css("margin-top",-$(".error-main").height()/2);
                        for(var i=0;i<me.props.messageData.resp.replyList.length;i++){
                            if(me.props.messageData.resp.replyList[i].checkId != checkId){
                                validData.push(me.props.messageData.resp.replyList[i]);
                            }
                        }
                        me.props.getVaildFc(validData);
                    }else{
                        $(".error-main-t").html("该条评论已被删除~");
                        $(".errorAlert").css("display","block");
                        $(".error-main").css("margin-top",-$(".error-main").height()/2);
                        for(var i=0;i<me.props.messageData.resp.replyList.length;i++){
                            if(me.props.messageData.resp.replyList[i].replyId != replyId){
                                validData.push(me.props.messageData.resp.replyList[i]);
                            }
                        }
                        me.props.getVaildFc(validData);
                    } 
                    var noMsgNum=$("#noReadMessage li").length;
                    //$("#"+checkId).remove();
                    if(noMsgNum == 1){
                        $("#getDataButton").find("span").click();
                    }
                }
            }
        });
    },
    openNewWebview:function(url){
        //url=absoluteUrl+url;
        console.info(url);
        var getPageInfo = function (){
            var data = {
                link:url,
           animation: 1//默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };
        var deviceType=isMobile();
        if(deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")){
            appFc.openWebview(getPageInfo());
        }else{
            window.location.href=url;
        }
    },
    render:function (){
        var me=this;
        var list=[];
        var data= me.props.messageData;
        console.info(JSON.stringify(data) == "{}");
        //if(data.resp.replyList.length > 0){
        if(!(JSON.stringify(data) == "{}")){
            var listLength = data.resp.replyList.length;
            for(var i=0;i<listLength;i++){
                var notifyUrl=absoluteUrl+"info.html"+window.location.search+"&checkId="+data.resp.replyList[i].checkId+"&replyId="+data.resp.replyList[i].replyId;
                //data.resp.replyList[i].content=data.resp.replyList[i].content.replace(/<br\s*\/?>/gi,"\r\n");
                list.push(  <li className="li_border" id={data.resp.replyList[i].checkId} key={i} data-index = {i}>
                                <div className="tidings_list_header">
                                    <img src={data.resp.replyList[i].headImg} onError={imgError.bind(this,data.resp.replyList[i].sex)} />
                                </div>
                                <div className="tidings_list_right">
                                    <div onClick={me.setMessageStatus.bind(this,data.resp.replyList[i].replyId,notifyUrl,data.resp.replyList[i].checkId)}>
                                        <div className="tidings_list_one">
                                            <span className="tidings_list_name" style={ data.resp.replyList[i].isCoach ? {color:'#ffa200'} : {} }>{data.resp.replyList[i].roleName}</span>
                                            回复了您：
                                        </div>
                                        <div className="tidings_list_con" dangerouslySetInnerHTML={{__html:data.resp.replyList[i].content}}>{}</div>
                                        <div className="tidings_list_time">{data.resp.replyList[i].time}</div>
                                        <span className="tidings_list_icon"></span>
                                    </div>
                                </div>
                            </li> );
            }  
        }
        return (
            <ul id="readedMessage">
                {list}
            </ul>
        );
    }
});

var DateBtn=React.createClass({
    getInitialState:function(){
        var me=this;
        return {
            //hasNextData:0
        }
    },
    getDataBtn:function(){
        var me=this;
        var data= me.props.messageData;
        if(!(JSON.stringify(data) == "{}")){
            if(data.resp.hasNext == 1){
                me.props.getMessageListFc(data.resp.time);
            }
        }
        
    },
    render:function (){
        var me=this;
        var data= me.props.messageData;
        var btnHtml;
        if(!(JSON.stringify(data) == "{}")){
            if(data.resp.hasNext == 0){
                if(data.resp.replyList.length == 0){
                    $(".loading").css("display","block");
                    $(".loading").text("目前没有消息回复哦");
                }
                btnHtml =   <li className="tidings_list_prompt noMoreData">
                                <div className="tidings_list_prompt_div">
                                    <span style={{display:'block'}}></span>
                                </div>
                            </li>;
            }else{
                btnHtml =   <li className="tidings_list_prompt noMoreData">
                                <div className="tidings_list_prompt_div">
                                    <span style={{display:'block'}} onClick={me.getDataBtn} >查看更早的回复&nbsp;</span>&nbsp;&nbsp;
                                    <span className="tidings_list_icon2"></span>
                                </div>
                            </li>
            }
        }
        return (
            <div id="getDataButton">
                {btnHtml}
            </div>
        );
    }
});

var MessageListContainer=React.createClass({
     getInitialState:function(){
        var me=this;
        me.getMessageListFc("-1");

        var titleData = {
            title:"消息列表",
            color:"",
            opacity:"",
            backgroundColor:"",
            backgroundOpacity:""
        };
        titleData=JSON.stringify(titleData);
        appFc.controlTitle(titleData);
        return {
            hasNextData:0,
            messageData:{}
        }
    },
    getVaildFc:function(validData){
        var me=this;
        var oldData = me.state.messageData ;
        oldData.resp.replyList = validData
        console.info(oldData);
        me.setState({messageData:oldData});
    },
    getMessageListFc:function(lastDateTime){
        var me=this;
        var targetRoleId=getParamByUrl("roleId");
        var classID=getParamByUrl("campId");
        var type=1;
        var dataNum=10;
        var host=window.location.protocol+"//"+window.location.host;
        var finalUrl="";
        if(lastDateTime == "-1"){
            finalUrl=host+"/v1/api/camp/getReplyList"+window.location.search+"&type="+type;
        }else{
            finalUrl=host+"/v1/api/camp/getReplyList"+window.location.search+"&count="+dataNum+"&time="+lastDateTime+"&type="+type;
        }

        console.info(finalUrl);
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                $(".loading").css("display","none");
                if(data.code == 200){
                    if(!(JSON.stringify(me.state.messageData) == "{}")){
                        if(me.state.messageData.resp.replyList.length > 0){
                            data.resp.replyList =  me.state.messageData.resp.replyList.concat(data.resp.replyList);
                        }
                    }
                    me.setState({messageData:data});
                }else{
                    $(".error-main-t").html("服务器开小差了～");
                    $(".errorAlert").css("display","block");
                    $(".error-main").css("margin-top",-$(".error-main").height()/2);
                }
            }
        });
    },
    componentDidUpdate:function(prevProps, prevState) {
        var me=this;
        var data=me.state.messageData;
        if(data.resp.hasNext == 1 && data.resp.replyList.length == 0){
           me.getMessageListFc(0);
        }
    },
    getDataClick: function(event) {
        var me=this;
    },
    render:function (){
        var me=this;
        return (
            <div className="container">
                <div className="row tidings_list">
                    <span className="loading">数据正在努力加载...</span>
                    <MessageList messageData = {me.state.messageData} getVaildFc = {me.getVaildFc} />
                    <DateBtn messageData = {me.state.messageData} getMessageListFc = {me.getMessageListFc} />
                </div>
            </div>
        );
    }
});


var Component=React.createClass({

    render:function (){
        return (
            <div>
                <MessageListContainer />
                <Public_error />
            </div>
        );
    }
})
ReactDOM.render(
    <Component />,document.getElementById('messageMain')
);
