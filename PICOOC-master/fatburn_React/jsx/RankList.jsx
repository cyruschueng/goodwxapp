var React=require("react");
var ReactDOM=require("react-dom");
//var RankListError = require("./RankListError");
//var RankListContainer = require("./RankListContainer");
//var PubSub = require("pubsub-js");
var Public_error = require('./Public_error.jsx');
var SPaiHangBang={
	SCategory_SPaiHangBang:5061400,
	SPaiHangBang_TiaoZhuanGeRenZhuYe:5061401,//跳转个人主页
	SPaiHangBang_FenXiangPaiHangBang:5061402//分享排行榜
};

var RankListContainer=React.createClass({
	getInitialState:function(){
		var me=this;
		me.getRankListFc();
		var titleData = {
			title:"有品燃脂营减脂排名",
			color:"",
			opacity:"",
			backgroundColor:"",
			backgroundOpacity:""
		};
		titleData=JSON.stringify(titleData);
		appFc.controlTitle(titleData);
		return {
			RankData:{}
		}
	},
	render:function (){//render渲染两次
		var me=this;
		var list=[];
		var data= me.state.RankData;
		var rankTime = "";
		var campName = "";
		var rankLists = "";
		var infoUrl = "";
		var targetRoleId=getParamByUrl("roleId");
		var classID=getParamByUrl("campId");
		if(data.resp != undefined  && data.resp.stuList.length>0){
			rankLists=data.resp.stuList;
			rankTime = data.resp.day;
			var isOverCamp= getParamByUrl("targetCampId")== "false" ? false:true;
			if(isOverCamp){
				campName = data.resp.campName;
			}else{
				campName = "第"+data.resp.week+"周减脂排名";
			}

			me.appShare(data.resp.roleName);

		}

		if(typeof me.state.RankData.resp != "undefined"){
			var listLength = data.resp.stuList.length;
			var num=[];
			var rankIcon=[];
			for(var i=0;i<listLength;i++){
				if(i<3){
					var name="userRank"+(i+1);
					num=<span className={name} key={i}>{i+1}</span>;
					var iconImg = "";
					if(i==0){
						iconImg = "http://cdn2.picooc.com/web/res/fatburn/image/rankList/jin.png";
					}else if(i==1){
						iconImg = "http://cdn2.picooc.com/web/res/fatburn/image/rankList/yin.png";
					}else{
						iconImg = "http://cdn2.picooc.com/web/res/fatburn/image/rankList/tong.png";
					}
					rankIcon=<img className="rankIcon" src={iconImg} key={i+3}/>;
				}
				else{
					num=[];
					rankIcon=[];
				}

				infoUrl="studentOtherInfo.html"+window.location.search+"&targetRoleId="+rankLists[i].roleId+"&targetCampId="+classID;
				if(roleId == rankLists[i].roleId){
					infoUrl="studentStudentInfo.html"+window.location.search+"&targetRoleId="+rankLists[i].roleId+"&targetCampId="+classID;
				}else{
					infoUrl="studentOtherInfo.html"+window.location.search+"&targetRoleId="+rankLists[i].roleId+"&targetCampId="+classID;
				}

				list.push(

					<div className="row rankItem" key={i} data-index={i} onClick={this.getNewWebWiew.bind(this,infoUrl)}>

						<div className="rankLeft col-xs-6 col-sm-6">


							<img className="userHeader" src={data.resp.stuList[i].url} onError={imgError.bind(this,data.resp.stuList[i].sex)}/>


							<span className="userName">{data.resp.stuList[i].name}</span>

							{rankIcon}
							<img className="userSex" src={data.resp.stuList[i].sex==0?"http://cdn2.picooc.com/web/res/fatburn/image/rankList/girl.png":"http://cdn2.picooc.com/web/res/fatburn/image/rankList/boy.png"}/>
							{num}
						</div>
						<div className="rankRight col-xs-6 col-sm-6">
							<div className="row">
								<div className="col-xs-6 col-sm-6">
									<div>脂肪</div>
									<div style={ data.resp.stuList[i].fatChange.substring(0,1) == "+" ? {color:'#fb5562'} : {} }><span className="fatNum">{data.resp.stuList[i].fatChange}</span>%</div>
								</div>
								<div className="col-xs-6 col-sm-6">
									<div>体重</div>
									<div style={ data.resp.stuList[i].weightChange.substring(0,1) == "+" ? {color:'#fb5562'} : {} }><span className="fatNum">{data.resp.stuList[i].weightChange}</span>KG</div>
								</div>
							</div>
						</div>
					</div>

				);
			}
		}

		return (
			<div className="container">
				<div className="row rankTitle">
					<div>
						<img src="http://cdn2.picooc.com/web/res/fatburn/image/rankList/start.png"/>
						<span className="title">{campName}</span>
						<img src="http://cdn2.picooc.com/web/res/fatburn/image/rankList/start.png"/>
					</div>
					<div className="rankTime">更新时间: {rankTime}</div>
				</div>

				<div className="row rankList">
					{list}
				</div>
			</div>
		);
	},
	getRankListFc:function(){
		var me=this;
		var targetRoleId=getParamByUrl("roleId");
		var classID=getParamByUrl("campId");
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrl=host+"/v1/api/campCommon/campRankList"+window.location.search;
		//console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function (data) {
				//console.log(data);
				if(data.code == 200){

					if(typeof me.state.RankData.resp != "undefined"){
						if(me.state.RankData.resp.stuList.length > 0){
							data.resp.stuList =  me.state.RankData.resp.stuList.concat(data.resp.stuList);
						}
					}
					me.setState({RankData:data});

				}else{
					// alert("服务器开小差了～");
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		});
	},
	//打开一个新的webWiew
	getNewWebWiew:function (url){
		setMaiDian(SPaiHangBang.SCategory_SPaiHangBang,SPaiHangBang.SPaiHangBang_TiaoZhuanGeRenZhuYe);
		url=absoluteUrl+url;
		//console.info(url);
		var getPageInfo = function (){
			var data = {
				link:url,
				animation: 1//默认1从右到左，2从下到上
			};
			return JSON.stringify(data);
		};
		//appFc.openWebview(getPageInfo());
		var deviceType=isMobile();
        if(deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")){
            appFc.openWebview(getPageInfo());
        }else{
            window.location.href=url;
        }
	},
	//设置截图分享数据
	appShare: function (userName){
		//右上角
		var iconUrl = "";
		var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
		if (getParamByUrl("os") == "android") {
			iconUrl = iconShare[0];
		}
		else {
			iconUrl = iconShare[1];
		}
		var getPageInfo2 = function () {
			var data5 = {
				iconType: 0,//0走图片逻辑，1走文案逻辑
				rightStr: {
					str: "",
					color: "",
					opacity: "",
					id: "0"
				},
				rightIcon: [
					{
						type: "1",
						id: "1",
						functionName: "",
						iconUrl: iconUrl,
						iconName: "分享",
						redDotType: "1",
						redDotShow: false,
						redDotNum: "0",
						nativeType: "0",
						content: {
							shareTitle: '有品·燃脂营',
							shareUrl: "",
							shareIcon: "",
							shareDesc: '#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
							shareTag: "",
							shareType: 1,
							shareBackgroundColor: "#eeeff3",
							shareTypeDesc: "有品燃脂营 · 减脂排名",
							fatBurnName: userName
						}
					}]
			};
			return JSON.stringify(data5);
		};
		appFc.controlRight(getPageInfo2());
	}
});

var Component=React.createClass({

	render:function (){
		return (
			<div>
				<RankListContainer />
				<Public_error />
			</div>
		);
	}
});

ReactDOM.render(
	<Component />,document.getElementById('main')
);