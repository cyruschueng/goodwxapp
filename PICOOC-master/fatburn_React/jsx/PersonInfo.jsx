var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");

//数据错误提示
var Public_error=require("./Public_error.jsx");
//身体基本信息子模块
var StudentInfo_baseInfo =require("./StudentInfo_baseInfo.jsx");

//部分页面公用参数
var publicData={
	targetRoleId:getParamByUrl("roleId")
}
window.publicData=publicData;

var StudentInfoTop = React.createClass({
	getInitialState:function(){
        var me = this;
        window.getImg = me.getImg;
        return {
        }
    },
    changeHeaderImg:function(){
        var data={
            maxNum:1 ,//上传图片的最大个数
            imageType:"userHeader"
        }
        data=JSON.stringify(data);
        appFc.uploadImg(data);
        setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_XiuGaiTouXiang);
    },
    getImg:function(url){
	    var userHeader=url[0];
	    $(".head").attr("src",userHeader);
	    publicData.needRefresh=true;
	    leftControl(publicData.needRefresh,false);
	},
	componentDidUpdate :function(){
		var baseInfoStatus=getCookie("baseInfo");
		if(baseInfoStatus == 1){
			delCookie("baseInfo");
			this.showPage(3);
		}
	},
    render:function (){
    	var me = this;
    	var data = me.props.baseInfo;
    	/*console.info(data);*/
    	if(typeof data.resp != "undefined"){
    		var headerImg = "";
    		if(data.resp.title.sex == 0){
				headerImg="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/girl.png";
			}else{
				headerImg="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/boy.png";
			}
			return (
				<div>
	                <div className="top-info">
						<div className="row top-img">
							<img className="head"  src={data.resp.title.head} onClick={me.changeHeaderImg} onError={imgError.bind(this,data.resp.title.sex)} />
							<img className="sex" src={headerImg} />
						</div>
						<div className="row account">
							<span id="accountVal">{data.resp.roleName}</span>
						</div>
						<div className="row info-tag">
							<div className="row navBar"></div>
						</div>
					</div>
					
	            </div>
			);
		}
        return (
            <i></i>
        );
    }
})


var PersonInfoContainer = React.createClass({
	getInitialState:function(){
        var me = this;
        me.getBaseInfo();
        var titleData = {
            title:"个人资料",
            color:"",
            opacity:"",
            backgroundColor:"",
            backgroundOpacity:""
        };
        titleData=JSON.stringify(titleData);
        appFc.controlTitle(titleData);
        return {
            baseInfo:[]
        }
    },
	//左上角刷新返回功能
	leftControl :function(needRefresh,isHidden){
	    var getPageInfo = function (){
	        var data = {
	            iconType:0,
	            iconColor:"",
	            backNum:0,
	            closeWebview:1,
	            hidden:isHidden,
	            isHandle:false,
	            functionName:"",
	            isRefreshPage:needRefresh
	        };
	        return JSON.stringify(data);
	    }
	    appFc.controlLeft(getPageInfo());
	},
	getBaseInfo:function(){
		var targetRoleId = publicData.targetRoleId;
		var me = this;
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrl=host+"/v1/api/camp/getBasicInfo"+window.location.search+"&targetRoleId="+targetRoleId;
		console.info(finalUrl);
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					me.setState({baseInfo:data});
					console.info("baseInfo-------");
					console.info(me.state.baseInfo);
				}else{
					$(".error-main-t").html("服务器开小差了～");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);	
				}
			}		
		});
	},
    render:function (){
    	var me = this;
        return (
            <div>
                <StudentInfoTop baseInfo={me.state.baseInfo}/>
                <StudentInfo_baseInfo baseInfo={me.state.baseInfo} isPersonInfo={true} />
            </div>
        );
    }
})

var Component = React.createClass({
	getInitialState:function(){
        var me = this;
        return {
            imgArr:"",
            bigImgArr:""
        }
    },
    render:function (){
        return (
            <div>
                <PersonInfoContainer />
                <Public_error />
            </div>
        );
    }
});
ReactDOM.render(
    <Component />,document.getElementById('personInfoMain')
);