var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");

var cardFunction=require("./cardFunction.jsx");
//显示大图
var Public_bigImg=require("./Public_bigImg.jsx");
//公共评论
var Public_comment=require("./Public_comment.jsx");
//数据错误提示
var Public_error=require("./Public_error.jsx");

//删除评论
var Public_deleteComment=require("./Public_deleteComment.jsx");

//身体数据变化子模块
var StudentInfo_bodyChange=require("./StudentInfo_bodyChange.jsx");
//打卡子模块
var StudentInfo_cardList =require("./StudentInfo_cardList.jsx");
//运动数据信息子模块
var StudentInfo_trainInfo =require("./StudentInfo_trainInfo.jsx");
//身体基本信息子模块
var StudentInfo_baseInfo =require("./StudentInfo_baseInfo.jsx");
//部分页面公用参数

var publicData={
	pageIndex:1,//判断在个人主页还是营内动态
	time1:0,
	hasNextBtn1:true,
	ajaxBtn1:true,
	pageIndex1:0,//type1的接口页数
	checkType1:9,//接口的请求类型,用于筛选
	checkTypeNum1:9,//存储checkType1上一个数值，用于与checkType1当前数值对比，筛选时参数
	checkTypeBtn:false,//判断是不是和筛选
	type1Week:{//第几周修改，用于筛选时重置
		checkDayBtn:0,
		isFirstLoad:0,
		isCampOver:false,
		joinweek:0
	},
	type1left:{//第几周修改，用于筛选时重置
		checkDayBtn:0,
		isCampOver:false,
		joinweek:0
	},
	time2:0,
	hasNextBtn2:true,
	pageIndex2:0,//type2的接口页数
	checkType2:9,//接口的请求类型,用于筛选
	checkTypeNum2:9,//存储checkType1上一个数值，用于与checkType1当前数值对比，筛选时参数
	checkTypeBtn2:false,//判断是不是和筛选
	count:20,
	cardType:["早餐","午餐","晚餐","加餐","运动"],
	cardTypeBg:["https://cdn2.picooc.com/web/res/fatburn/image/student/student-20.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-21.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-22.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-23.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-24.png"],
	cardTypeBg2:["https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-1.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-2.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-3.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-4.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-5.png"],
	objImg:{},//图片预览对象
	commentBtn:false,//判断评论框是否显示出来
	msgScrollTop:0,//滚动的高度
	functionType:1,//评论框判断页面来源，1、个人主页 2、他人主页 3、营内动态 4、教练端 info、info页
	inputSelect:false,//评论输入框是否选中
	firstInputSelect:false,//评论输入框是否选中，用来判断滚动是否隐藏输入框
	pageBtn:true,//滚动时请求接口判断
	tabBtn:true,//滚动时请求接口判断
	commentBtn:false,//滚动时请求接口判断
	targetRoleId:getParamByUrl("targetRoleId"),
	needRefresh:false,
	hasGetChart:false,
	reloadPage1:false,//点击运动时间打卡，返回刷新页面
	isCanDianZan:true, //防止点赞连续点击
	weekSummaryNum:0,//周表现总结数量
	isCampStatus:false//是否在营：true：在营，false：已结营
}
window.publicData=publicData;
var SXiaoXiXiangQing={//和info.js匹配
	SCategory_SXiaoXiXiangQing:5060700,
	SXiaoXiXiangQing_ZuoBianTouXiangTiaoZhuan:5060701,//左边头像跳转
	SXiaoXiXiangQing_YouBianNiChengTiaoZhuan:5060702,//右边昵称跳转
	SXiaoXiXiangQing_YuLanTuPian:5060703,//预览图片
	SXiaoXiXiangQing_ShanChuDaka:5060704,//删除打卡
	SXiaoXiXiangQing_QuXiaoShanChu:5060705,//取消删除
	SXiaoXiXiangQing_QueDingShanChu:5060706,//确定删除
	SXiaoXiXiangQing_FenXiangXiaoXi:5060707,//分享消息
	SXiaoXiXiangQing_DianZan:5060708,//点赞
	SXiaoXiXiangQing_PingLunXiaoXi:5060709,//评论消息
	SXiaoXiXiangQing_DianZanXueYuanTouXiang:5060710,//点赞学员头像
	SXiaoXiXiangQing_BangDingHuiFuShiJian:5060711,//绑定回复事件
	SXiaoXiXiangQing_ShanChuZiJiPingLun:5060712,//删除自己评论
	SXiaoXiXiangQing_QuXiaoShanChuZiJiPingLun:5060713,//取消删除自己评论
	SXiaoXiXiangQing_HuiFuShuRuKuang:5060714,//回复输入框
	SXiaoXiXiangQing_DianJiFaSong:5060715//点击发送
};
window.SXiaoXiXiangQing=SXiaoXiXiangQing;

var SWoDeGeRenZhuYe={
    SCategory_SWoDeGeRenZhuYe:5061200,
    SWoDeGeRenZhuYe_ShenTiBianHua:5061201,//查看身体变化
    SWoDeGeRenZhuYe_DaKaJiLu:5061202,//查看打卡记录
    SWoDeGeRenZhuYe_JiBenXinXi:5061203,//查看基本信息
   /* SWoDeGeRenZhuYe_ChaKanTiZhong:5061204,//查看体重
    SWoDeGeRenZhuYe_ChaKanZhiFang:5061205,//查看脂肪
    SWoDeGeRenZhuYe_ChaKanYaoWei:5061206,//查看腰围*/
    SWoDeGeRenZhuYe_GengDuoZhiBiaoBianHua:5061207,//查看更多指标变化
    SWoDeGeRenZhuYe_TiaoZhuanXiuGaiGeRenZiLiao:5061208,//跳转修改个人资料
    SWoDeGeRenZhuYe_JiaoLianChaKanXueYuanShenCai:5061209,//教练查看学员身材
    SWoDeGeRenZhuYe_XiuGaiShenGao:5061210,//修改身高
    SWoDeGeRenZhuYe_XiuGaiShengRi:5061211,//修改生日
    SWoDeGeRenZhuYe_XiuGaiShengLiQi:5061212,//修改生理期
    SWoDeGeRenZhuYe_XiuGaiXiGuanCeLiangShiDuan:5061213,//修改习惯测量时段
    SWoDeGeRenZhuYe_XiuGaiTouXiang:5061214,//修改头像
    SWoDeGeRenZhuYe_DianJiShaiXuan:5061215//我的个人主页点击筛选
};
window.SWoDeGeRenZhuYe=SWoDeGeRenZhuYe;
var StudentInfoTop = React.createClass({
	getInitialState:function(){
        var me = this;
        window.getImg = me.getImg;

        return {
        	
        }
    },
	showPage:function(index){
		var currentIndex=0;
		var nextIndex=index;
		var slideWidth=(parseInt(nextIndex-currentIndex)*0.25)*$(window).width();
		var nextColor="";
		var me=this;
		$(".page"+(parseInt(nextIndex)+1)).css("display","block").siblings().css("display","none");
		if(parseInt(nextIndex)==0 && publicData.reloadPage1){
			publicData.reloadPage1=false;
			publicData.time1=0;
			publicData.hasNextBtn1=true;
			publicData.ajaxBtn1=true;
			publicData.pageIndex1=0;//type1的接口页数
			publicData.checkType1=9;//接口的请求类型,用于筛选
			publicData.checkTypeNum1=9;//存储checkType1上一个数值，用于与checkType1当前数值对比，筛选时参数
			publicData.checkTypeBtn=false;//判断是不是和筛选
			publicData.type1Week={//第几周修改，用于筛选时重置
				checkDayBtn:0,
				isFirstLoad:0,
				isCampOver:false,
				joinweek:0
			};
			publicData.type1left={//第几周修改，用于筛选时重置
				checkDayBtn:0,
				isCampOver:false,
				joinweek:0
			};
			PubSub.publish("reload",true);
		}
		$(".info-tag .info-tag-item:eq("+nextIndex+")").css("color","#fff").siblings().css("color","rgba(255,255,255,0.5)");
		$(window).scrollTop(0);
		$(".info-tag").removeClass("nav-fixed");
    	$("#tag-content").removeClass("content");
    	$(".navBar").animate({left:slideWidth},200);
    	if(nextIndex == 0){
			$(".info-tag .info-tag-item:eq(0) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo5.png");
			$(".info-tag .info-tag-item:eq(1) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainInfo6.png");
			$(".info-tag .info-tag-item:eq(2) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange6.png");
			$(".info-tag .info-tag-item:eq(3) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo6.png");
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_DaKaJiLu);
		}else if(nextIndex == 1){
			$(".page2").css("height",($(window).innerHeight()-$(".top-info").height()-2.5625*fontHeight)+"px");
			$(".info-tag .info-tag-item:eq(0) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo6.png");
			$(".info-tag .info-tag-item:eq(1) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainInfo5.png");
			$(".info-tag .info-tag-item:eq(2) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange6.png");
			$(".info-tag .info-tag-item:eq(3) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo6.png");
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_DaKaJiLu);
		}else if(nextIndex == 2){
			/*this.refs.getChartData.getBodyChange(publicData.targetRoleId);*/
			if(!publicData.hasGetChart){
				this.props.getChartData(publicData.targetRoleId);
				publicData.hasGetChart = true;
			}
	
			$(".info-tag .info-tag-item:eq(0) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo6.png");
			$(".info-tag .info-tag-item:eq(1) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainInfo6.png");
			$(".info-tag .info-tag-item:eq(2) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange5.png");
			$(".info-tag .info-tag-item:eq(3) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo6.png");
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ShenTiBianHua);
		}else{
			$(".info-tag .info-tag-item:eq(0) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo6.png");
			$(".info-tag .info-tag-item:eq(1) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainInfo6.png");
			$(".info-tag .info-tag-item:eq(2) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange6.png");
			$(".info-tag .info-tag-item:eq(3) div").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo5.png");
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_JiBenXinXi);
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
	    /*var deviceType=isMobile();//判断是不是app的方法
	    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
	        var data={
	            imgUrl:userHeader
	        }
	        data=JSON.stringify(data);
	        if(getParamByUrl("os")=="android"){
	            mobileApp.test(data);
	        }
	        else{
	            mobileApp.test.postMessage(data);
	        }
	    }*/
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
							<div className="row">
								<div className="col-xs-3 col-sm-3 info-tag-item" onClick={me.showPage.bind(this,0)}>
									<div>
										<img src="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo3.png" />
									</div>
									<span>打卡记录</span>
								</div>
								<div className="col-xs-3 col-sm-3 info-tag-item" onClick={me.showPage.bind(this,1)}>
									<div>
										<img src="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainInfo6.png" />
									</div>
									<span>运动数据</span>
								</div>
								<div className="col-xs-3 col-sm-3 info-tag-item" onClick={me.showPage.bind(this,2)}>
									<div>
										<img src="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange4.png" />
									</div>
									<span>身体变化</span>
								</div>
								
								<div className="col-xs-3 col-sm-3 info-tag-item" onClick={me.showPage.bind(this,3)}>
									<div>
										<img src="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo4.png" />
									</div>
									<span>基本信息</span>
								</div>
							</div>
							<div className="row navBar">
								<div></div>
							</div>
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


var StudentInfoCenter = React.createClass({
	getBodyChange:function(){
		this.refs.getChartData.getBodyChange(publicData.targetRoleId);
	},
	render:function (){
    	var me = this;
    	var baseInfo = me.props.baseInfo;
    	console.info(baseInfo.resp);
    	if(typeof baseInfo.resp != "undefined"){
    		return (
	            <div className="row" id="tag-content">
	            	<StudentInfo_cardList reload={me.props.reload} />
	            	<StudentInfo_trainInfo />
	                <StudentInfo_bodyChange ref="getChartData" />
	                <StudentInfo_baseInfo baseInfo={baseInfo} isPersonInfo={false} />
	            </div>
	        );
    	}
    	return (<i></i>);
        
    }
});

var StudentInfoContainer = React.createClass({
	getInitialState:function(){
        var me = this;
        me.getBaseInfo();
        var titleData = {
            title:"我的个人主页",
            color:"",
            opacity:"",
            backgroundColor:"",
            backgroundOpacity:""
        };
        titleData=JSON.stringify(titleData);
        appFc.controlTitle(titleData);
        return {
            baseInfo:[],
            reload:false
        }
    },
    componentDidMount:function(){
   		PubSub.subscribe("reload",function(evName,data){
			this.setState({reload:data});
		}.bind(this));
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
	bodyChangeChart:function(){
		console.info("container");
		console.info(this.refs);
		this.refs.getChartData.getBodyChange(publicData.targetRoleId);
	},
    render:function (){
    	var me = this;
        return (
            <div>
                <StudentInfoTop baseInfo={me.state.baseInfo} getChartData={this.bodyChangeChart}/>
                <StudentInfoCenter baseInfo={me.state.baseInfo} reload={me.state.reload} ref="getChartData"/>
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

				{/*1.7新增弹窗*/}
				<div className="row newAlertBox">
					<div className="col-xs-12 col-sm-12 newAlert">
						<div className="row">
							<div className="col-xs-12 col-sm-12 content" style={{marginTop:'0'}}>111</div>
							<div className="col-xs-12 col-sm-12 iKnow">
								<div className="row">
									<div className="col-xs-12 col-sm-12 iKnow1" onClick={this.newAlertKnow}>我知道了</div>
								</div>
							</div>
						</div>
					</div>
				</div>

                <StudentInfoContainer />
                <Public_error />
                <Public_deleteComment />
            </div>
        );
    },

	//1.7新增弹框newAlertKnow
	newAlertKnow:function(){
		$('.newAlertBox').hide();
		$('html, body').css('overflow', 'auto').off("touchmove");
	}

});
ReactDOM.render(
    <Component />,document.getElementById('studentMain')
);