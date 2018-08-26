// student下的jsx说明
// StudentMsgType1_info.jsx//顶部的体重脂肪信息等
// 
// StudentMsgType1_change.jsx//我的方案
// 
// StudentMsgType1_list.jsx//打卡列表
// StudentMsgType1_list_part.jsx//card1的单个打卡
// StudentMsgType1_list_part_week.jsx//card1的筛选和星期

// StudentMsgType1_list_part_partleft.jsx//card1的单个打卡的左部分
// StudentMsgType1_list_part_right.jsx//card1的单个打卡的右部分
// StudentMsgType1_list_part_right_MsgTotol.jsx// 打卡右部分下面的点赞列表和评论列表的html

// Fc_right_MsgTotol.jsx// 打卡右部分下面的点赞列表和评论列表的方法
// Public_comment.jsx//评论的html
// Fc_comment.jsx// 评论的方法
// Public_bigImg.jsx//绑定大图预览的html
// Fc_bindBigImg.jsx//绑定图片预览的方法
// Public_error报错的方法


// StudentMsgType2_rank.jsx//card2顶部的排行榜
// StudentMsgType2_campReport.jsx//card2的公告
// StudentMsgType2_shaixuan.jsx //card2的筛选

// StudentMsgType2_list.jsx//card2的打卡列表



var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");
var StudentTop=require("./StudentTop.jsx");
var StudentMsgType1=require("./StudentMsgType1.jsx");
// var cardFunction=require("./ScrollLoad.jsx");
var Public_bigImg=require("./Public_bigImg.jsx");
var Public_comment=require("./Public_comment.jsx");
var Fc_comment=require("./Fc_comment.jsx");
var Public_error=require("./Public_error.jsx");
var Public_deleteComment=require("./Public_deleteComment.jsx");
//其他报错和弹窗等
var Student_otherInfo=require("./Student_otherInfo.jsx");
var Version=require("./Version.jsx");
var StudentMsgType2=require("./StudentMsgType2.jsx");

var Student_titleRight=require("./Student_titleRight.jsx");

//部分页面公用参数
var publicData={
	pageIndex:1,//判断在个人主页还是营内动态
	time1:0,
	hasNextBtn1:true,
	pageIndex1:0,//type1的接口页数
	checkType1:9,//接口的请求类型,用于筛选
	checkTypeNum1:9,//存储checkType1上一个数值，用于与checkType1当前数值对比，筛选时参数
	checkTypeBtn:false,//判断是不是和筛选
	ajaxBtn1:true,
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
	ajaxBtn2:true,//防止ajax时间差
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
	isCanDianZan:true, //防止点赞连续点击
	weekSummaryNum:0,//周表现总结数量
	isCampStatus:false//是否在营：true：在营，false：已结营
}
window.publicData=publicData;

//埋点参数
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
var SXueYuanShouYe={
	SCategory_SXueYuanShouYe:5060100,
	SXueYuanShouYe_GeRenJinZhan:5060101,//个人进展
	SXueYuanShouYe_YingNeiDongTai:5060102,//营内动态
	SXueYuanShouYe_WoDeTouXiang:5060103,//我的头像
	SXueYuanShouYe_GengDuoZhiBiao:5060104,//更多指标
	SXueYuanShouYe_TiZhong:5060105,//体重
	SXueYuanShouYe_ZhiFang:5060106,//脂肪
	SXueYuanShouYe_YaoWei:5060107,//腰围
	SXueYuanShouYe_WoDeFangAn:5060108,//我的方案
	SXueYuanShouYe_WoDeShenCai:5060109,//我的身材
	SXueYuanShouYe_DianJiShaixuan:5060110,//学员首页点击切筛选
	SXueYuanShouYe_DianJiQieHuanBiaoQian:5060111,//点击切换标签
	SXueYuanShouYe_WoYaoDaKa:5060112,//我要打卡
	SXueYuanShouYe_YingNeiGongGao:5060113,//营内公告
	SXueYuanShouYe_JianZhiPaiMingXiangQing:5060114,//减脂排名详情
	SXueYuanShouYe_ShaiXuanZaoCanDaKa:5060115,//筛选早餐打卡
	SXueYuanShouYe_ShaiXuanWuCanDaKa:5060116,//筛选午餐打卡
	SXueYuanShouYe_ShaiXuanWanCanDaKa:5060117,//筛选晚餐打卡
	SXueYuanShouYe_ShaiXuanJiaCanDaKa:5060118,//筛选加餐打卡
	SXueYuanShouYe_ShaiXuanYinShiDaKa:5060119,//筛选饮食打卡
	SXueYuanShouYe_ShaiXuanYunDongDaKa:5060120,//筛选运动打卡
};
window.SXueYuanShouYe=SXueYuanShouYe;
var Student=React.createClass({
	getInitialState:function(){
		window.student=this;
		//console.log(publicData.pageIndex);
		// this.getList1Fc();
		// this.getList2Fc();
		if(getCookie("stuPageJump")==2 || getCookie("campTrend")==2 || parseInt(getParamByUrl("jumpToStudent")==1)){
			publicData.pageIndex=2;
		}
		delCookie("stuPageJump");
		delCookie("stuPageJump");
		delCookie("campTrend");
		delCookie("campTrend");
		delCookie("isRefresh");
		delCookie("isRefresh");	
		if(publicData.pageIndex==1){
			this.getList1Fc();
		}
		else if(publicData.pageIndex==2){
			this.title();
			this.getList2Fc();
		}	
		return {
			bigImgArr:[],
			listState:publicData.pageIndex,
			getList1:{},
			getList2:{}
		}
	},
	title:function(){
		var targetRoleId=getParamByUrl("roleId");
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrl=host+"/v1/api/camp/getTrend"+window.location.search;
		var me=this;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					if(data.resp.isOver){
						var titleData = {
							title:"有品燃脂营"+data.resp.campName,
							color:"",
							opacity:"",
							backgroundColor:"",
							backgroundOpacity:""
						};
						titleData=JSON.stringify(titleData);
						appFc.controlTitle(titleData);
					}
					else{
						var titleData = {
							title:"有品燃脂营",
							color:"",
							opacity:"",
							backgroundColor:"",
							backgroundOpacity:""
						};
						titleData=JSON.stringify(titleData);
						appFc.controlTitle(titleData);
					}
				}
				else{
					var titleData = {
						title:"有品燃脂营",
						color:"",
						opacity:"",
						backgroundColor:"",
						backgroundOpacity:""
					};
					titleData=JSON.stringify(titleData);
					appFc.controlTitle(titleData);
				}
			}
		})
	},
	getList1Fc:function(){
		//card1
		
		if(publicData.checkTypeNum1!=publicData.checkType1){
			publicData.checkTypeBtn=true;
		}
		else{
			publicData.checkTypeBtn=false;
		}
		publicData.checkTypeNum1=publicData.checkType1;
		var me=this;
		if((publicData.hasNextBtn1 || publicData.checkTypeBtn) && publicData.ajaxBtn1){
			publicData.ajaxBtn1=false;
			var ajaxStr2;
			
			if(publicData.pageIndex1==0){
				ajaxStr2="&count="+publicData.count;
			}
			else{
				ajaxStr2="&count="+publicData.count+"&time="+publicData.time1;
			}
			var finalUrl=ajaxLink+"/v1/api/camp/checkList"+window.location.search+"&type=1&targetRoleId="+roleId+"&checkType="+publicData.checkType1+ajaxStr2;

			$.ajax({
				type:"get",
				url:finalUrl,
				dataType:"json",
				success:function(data){

					if(data.code == 200){
						console.log('finalUrl', finalUrl);
						publicData.isCampStatus = data.resp.isCamp;//是否在营
						if(!publicData.ajaxBtn1){
							publicData.ajaxBtn1=true;
							setCookie("campId",data.resp.campId,1);
							if(publicData.pageIndex1>0){
								data.resp.checkList=me.state.getList1.resp.checkList.concat(data.resp.checkList);
							}
							publicData.hasNextBtn1=data.resp.hasNext;
							if(data.resp.hasNext){
								publicData.time1=data.resp.time;
							}
							publicData.pageIndex1++;
							me.setState({getList1:data});
							console.log('个人进展:',me.state.getList1);
							$(".msgType1 .list").css("min-height",0);
							$(".msgType1 .part").eq(0).css("padding-top",0);
							$(".msgType1 .partLeft").eq(0).css("top",0);
							// $(".msgType1 .partRight-img-li").css("height",($(window).width()-(2.5+3.75)*fontHeight)/3);
							// $(".msgType1 .partRight-img-li2").css("height",($(window).width()-(2.5+3.75)*fontHeight)*3/4);
							// $(".msgType1 .partRight-img-li3").css("height",($(window).width()-(2.5+3.75)*fontHeight)/2);
							publicData.pageBtn=true;
							for(var i=0;i<$(".partLeft-p5 span").length;i++){
									$(".partLeft-p5").eq(i).css("padding-left",($(".partLeft-p4 span").eq(i).width())/4);
									
							}
						}
						else{
							publicData.ajaxBtn1=true;
						}
					}
					else{
						publicData.pageBtn=true;
						publicData.ajaxBtn1=true;
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display","block");
						$(".error-main").css("margin-top",-$(".error-main").height()/2);
					}
				}
			})
		}
	},
	getList2Fc:function(){
		//card2
		var me=this;
		if(publicData.hasNextBtn2 && publicData.ajaxBtn2){
			publicData.ajaxBtn2=false;
			var ajaxStr2;
			if(publicData.pageIndex2==0){
				ajaxStr2="&count="+publicData.count;
			}
			else{
				ajaxStr2="&count="+publicData.count+"&time="+publicData.time2;
			}
			var finalUrl=ajaxLink+"/v1/api/camp/checkList"+window.location.search+"&type=2&targetRoleId="+roleId+ajaxStr2+"&checkType="+publicData.checkType2;
			$.ajax({
				type:"get",
				url:finalUrl,
				dataType:"json",
				success:function(data){
					if(data.code == 200){

						publicData.isCampStatus = data.resp.isCamp;//是否在营
						
						if(!publicData.ajaxBtn2){
							publicData.ajaxBtn2=true;
							if(publicData.pageIndex2>0){
								data.resp.checkList=me.state.getList2.resp.checkList.concat(data.resp.checkList);
							}
							publicData.hasNextBtn2=data.resp.hasNext;
							if(data.resp.hasNext){
								publicData.time2=data.resp.time;
							}
							publicData.pageIndex2++;
							me.setState({getList2:data});
							console.log('营内动态', me.state.getList2);
							$(".msgType2 .list").css("min-height",0);
							$(".msgType2 .part").eq(0).css("padding-top",0);
							$(".msgType2 .partLeft").eq(0).css("top",0);
							// $(".msgType2 .partRight-img-li").css("height",($(window).width()-(2.5+3.75)*fontHeight)/3);
							// $(".msgType2 .partRight-img-li2").css("height",($(window).width()-(2.5+3.75)*fontHeight)*3/4);
							// $(".msgType2 .partRight-img-li3").css("height",($(window).width()-(2.5+3.75)*fontHeight)/2);
							publicData.pageBtn=true;
							for(var i=0;i<$(".partLeft-p5 span").length;i++){
									$(".partLeft-p5").eq(i).css("padding-left",($(".partLeft-p4 span").eq(i).width())/4);
									
							}
						}
						else{
							publicData.ajaxBtn2=true;
						}
					}
					else{
						publicData.pageBtn=true;
						publicData.ajaxBtn2=true;
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display","block");
						$(".error-main").css("margin-top",-$(".error-main").height()/2);
					}
				}
			})
		}
	},
	componentDidMount:function(){
		var me=this;
		if(parseInt(getParamByUrl("jumpToStudent"))==0 && getCookie("campTrend")!=2 && getCookie("stuPageJump")!=2 ){
			window.location.hash = "#jumpToStudentHash";
		}
		$(window).scroll(function(){
			if(publicData.pageIndex==1){

				if($(".msgType1").height()-$(window).height()-$(window).scrollTop()<550){
					//alert(publicData.pageBtn);
					//alert(publicData.tabBtn);
					//alert(publicData.commentBtn);
					if(publicData.pageBtn && publicData.tabBtn && !publicData.commentBtn){
						if(publicData.functionType==1){
							me.getList1Fc("hasDelete");
						}
						else if(publicData.functionType==2){
							me.getList1Fc("noDelete");
						}
						publicData.pageBtn=false;
					}
				}
			}
			else if(publicData.pageIndex==2){
				if($(".msgType2").height()-$(window).height()-$(window).scrollTop()<550){
					if(publicData.pageBtn && publicData.tabBtn && !publicData.commentBtn){
						if(publicData.functionType==3){
							//publicData.indexOfCheckList=0;
							me.getList2Fc(2,0);
						}
						else if(publicData.functionType==4){
							//indexOfCheckList=0;
							me.getList2Fc(type2,campId2);
						}
						publicData.pageBtn=false;
					}
				}
			}
			if($(window).scrollTop()==0){
				if($(".shaixuan1")!=undefined){
					$(".shaixuan1").css("position","relative");
					$(".shaixuan1").css("top",0);
					$(".campstatusContainer1").css("margin-top","0.6rem");
					$(".shaixuan1").css("display","block");
					$(".shaixuan1").css("left",0);
					$(".msgType1 .list").css("margin-top",0);
				}
			}
			//console.log($("body").height()+"|"+$(window).height());
			// if($(window).scrollTop()>$("body").height()-$(window).height()-2){
			// 	//$('body').animate({scrollTop:$("body").height()-$(window).height()-10},10);
			// 	//$('body').css("scrollTop",$("body").height()-$(window).height()-10);
			// 	$(window).scrollTop($("body").height()-$(window).height()-2);
			// }

			/*
			if($(window).scrollTop()==0){
				if($(".shaixuan1")!=undefined){
					$(".shaixuan1").css("position","relative");
					$(".shaixuan1").css("top",0);
					$(".campstatusContainer1").css("margin-top","0.6rem");
					$(".shaixuan1").css("display","block");
					$(".shaixuan1").css("left",0);
					$(".msgType1 .list").css("margin-top",0);
				}
				
				if($(".shaixuan")!=undefined){
					if(card2Type==4){
						$(".shaixuan").css("position","fixed");
						$(".shaixuan").css("top","5.25rem");
					}
					else{
						if($(".msgType2").css("display")=="block" && $(".msgType2 .part").length>0){
							var parttopheight = $(".msgType2 .part").eq(0).offset().top-$(window).scrollTop();
							
							if(parttopheight>=fontHeight*3){
								$(".campstatusContainer").css("margin-top","0.6rem");
								$(".shaixuan").css("position","relative");
								$(".shaixuan").css("top",0);
								$(".shaixuan").css("left",0);
								// $(".msgType2 .part").eq(0).css("margin-top","0");
								$(".msgType2 .partLeft3").eq(0).css("top","2.8rem");	
							}else{
								$(".campstatusContainer").css("margin-top",0);
								$(".shaixuan").css("position","fixed");
								$(".shaixuan").css("top","3rem");
								$(".shaixuan").css("left",0);
								// $(".msgType2 .part").eq(0).css("margin-top","1.5rem");
								$(".msgType2 .partLeft3").eq(0).css("top","0.5rem");
							}
						}
					}
				}

			}*/
		})
		PubSub.subscribe("listState",function(evName,listState){
			//修改listState
			this.setState({listState:listState});
			$('body').animate({scrollTop:0},0);
			if(publicData.pageIndex==1){
				//publicData.checkType1=9;
				//publicData.pageIndex1=0;
				
					publicData.time1=0;
					publicData.hasNextBtn1=true;
					publicData.pageIndex1=0;//type1的接口页数
					publicData.checkType1=9;//接口的请求类型,用于筛选
					publicData.checkTypeNum1=9;//存储checkType1上一个数值，用于与checkType1当前数值对比，筛选时参数
					publicData.checkTypeBtn=false;//判断是不是和筛选
					publicData.ajaxBtn1=true;
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
				
				this.getList1Fc();
			}
			else if(publicData.pageIndex==2){
				// publicData.checkType2=9;
				// publicData.pageIndex2=0;
				publicData.time2=0;
				publicData.hasNextBtn2=true;
				publicData.pageIndex2=0;//type2的接口页数
				publicData.checkType2=9;//接口的请求类型,用于筛选
				publicData.checkTypeNum2=9;//存储checkType1上一个数值，用于与checkType1当前数值对比，筛选时参数
				publicData.checkTypeBtn2=false;//判断是不是和筛选
				publicData.ajaxBtn2=true;
				this.getList2Fc();
				
			}
		}.bind(this));
		PubSub.subscribe("shaixuan",function(evName,shaixuan){
			//修改listState
			//this.setState({listState:listState});
			//console.log("shaixuan执行");
			if(shaixuan==1){

				publicData.time1=0;
				publicData.pageIndex1=0;
				publicData.hasNextBtn1=true;
				publicData.ajaxBtn1=true;
				this.getList1Fc();
			}
			else if(shaixuan==2){
				publicData.time2=0;
				publicData.pageIndex2=0;
				publicData.hasNextBtn2=true;
				publicData.ajaxBtn2=true;
				this.getList2Fc();
				
			}
		}.bind(this));
		PubSub.subscribe("bigImgData",function(evName,bigImgData){
			//添加大图预览
			this.setState({bigImgArr:bigImgData});
		}.bind(this));
		PubSub.subscribe("addZan",function(evName,addZanData){
			//console.log('添加点赞',addZanData);
			//添加点赞
			// 	pageIndex:publicData.pageIndex,//判断是个人主页还是营内动态
			// 	partIndex:partIndex,//判断是第几部分
			// 	resp://点赞的数据


			if(addZanData.pageIndex==1){
				var getList1Data=this.state.getList1;
				getList1Data.resp.checkList[addZanData.partIndex].praises.push(addZanData.resp);
				getList1Data.resp.checkList[addZanData.partIndex].hasPraised=true;
				getList1Data.resp.checkList[addZanData.partIndex].praiseNum=parseInt(getList1Data.resp.checkList[addZanData.partIndex].praiseNum)+1;
				this.setState({getList1:getList1Data});
				publicData.isCanDianZan = true;
			}
			else{
				var getList2Data=this.state.getList2;
				//console.log('getList2Data', getList2Data);
				getList2Data.resp.checkList[addZanData.partIndex].praises.push(addZanData.resp);
				getList2Data.resp.checkList[addZanData.partIndex].hasPraised=true;
				getList2Data.resp.checkList[addZanData.partIndex].praiseNum=parseInt(getList2Data.resp.checkList[addZanData.partIndex].praiseNum)+1;
				this.setState({getList2:getList2Data});
				publicData.isCanDianZan = true;
			}
		}.bind(this));
		PubSub.subscribe("deleteZan",function(evName,deleteZanData){
			//console.log('删除赞',deleteZanData);
			//删除点赞
   //      	var deleteZanData={
			// 	pageIndex:publicData.pageIndex,//判断是个人主页还是营内动态
			// 	partIndex:partIndex,//判断是第几部分
			// 	deleteZanIndex:deleteZanIndex//判断是第几个
				
			// }
			//alert(deleteZanData.pageIndex);
			if(deleteZanData.pageIndex==1){
				var getList1Data=this.state.getList1;
				getList1Data.resp.checkList[deleteZanData.partIndex].praises.splice(deleteZanData.deleteZanIndex,1);
				getList1Data.resp.checkList[deleteZanData.partIndex].hasPraised=false;
				getList1Data.resp.checkList[deleteZanData.partIndex].praiseNum=parseInt(getList1Data.resp.checkList[deleteZanData.partIndex].praiseNum)-1;
				this.setState({getList1:getList1Data});
				publicData.isCanDianZan = true;
			}
			else{
				var getList2Data=this.state.getList2;
				//console.log('getList2Data', getList2Data);
				getList2Data.resp.checkList[deleteZanData.partIndex].praises.splice(deleteZanData.deleteZanIndex,1);
				getList2Data.resp.checkList[deleteZanData.partIndex].hasPraised=false;
				getList2Data.resp.checkList[deleteZanData.partIndex].praiseNum=parseInt(getList2Data.resp.checkList[deleteZanData.partIndex].praiseNum)-1;
				this.setState({getList2:getList2Data});
				publicData.isCanDianZan = true;
			}
		}.bind(this));
		PubSub.subscribe("addMsg",function(evName,addMsgData){  
			//console.log('添加评论',addMsgData);
		//添加评论
		//pageIndex//判断是个人主页还是营内动态
		//partIndex//判断是第几部分
		//resp//评论的参数
		//	alert(addMsgData.partIndex);
		   if(addMsgData.pageIndex==1){
				var getList1Data=this.state.getList1;
				getList1Data.resp.checkList[addMsgData.partIndex].replys.unshift(addMsgData.resp);
				this.setState({getList1:getList1Data});
		   }
		   else{
				var getList2Data=this.state.getList2;
				getList2Data.resp.checkList[addMsgData.partIndex].replys.unshift(addMsgData.resp);
				
				this.setState({getList2:getList2Data});
		   }
		}.bind(this)); 
		PubSub.subscribe("deleteComment",function(evName,deleteCommentData){
			//删除评论
			//pageIndex//判断是个人主页还是营内动态
			//partIndex//判断是第几部分
			//deleteCommentIndex//判断是第几个
			//console.log(deleteCommentData);
			if(deleteCommentData.pageIndex==1){
				var getList1Data=this.state.getList1;
				getList1Data.resp.checkList[deleteCommentData.partIndex].replys.splice(deleteCommentData.deleteCommentIndex,1);
				this.setState({getList1:getList1Data});
		   }
		   else{
		   		var getList2Data=this.state.getList2;
				getList2Data.resp.checkList[deleteCommentData.partIndex].replys.splice(deleteCommentData.deleteCommentIndex,1);
				this.setState({getList2:getList2Data});
		   }
		   
		}.bind(this)); 
		PubSub.subscribe("deletePart",function(evName,deleteIndex){
			//删除模块
			//pageIndex//判断是个人主页还是营内动态
			//deleteIndex//判断是第几部分
			//console.log(deleteIndex);

			if(publicData.pageIndex==1){
				var getList1Data=this.state.getList1;
				//console.log(getList1Data.resp);
				//alert(typeof getList1Data.resp.checkList[deleteIndex+1].isDayDisplay);
				if(getList1Data.resp.checkList[deleteIndex+1].isDayDisplay===null){
					getList1Data.resp.checkList[deleteIndex+2].isDayDisplay="deletePartNext";
				}
				if(getList1Data.resp.checkList[deleteIndex].isDayDisplay && getList1Data.resp.checkList.length>deleteIndex+1 ){
					getList1Data.resp.checkList[deleteIndex+1].isDayDisplay=true;
				}
				getList1Data.resp.checkList.splice(deleteIndex,1);

				this.setState({getList1:getList1Data});
		   }
		   else{
		   		var getList2Data=this.state.getList2;
				getList2Data.resp.checkList.splice(deleteIndex,1);
				this.setState({getList2:getList2Data});
		   }
		   
		}.bind(this)); 
	},
	render:function (){
		//console.log(typeof this.state.getList1.resp +1);
		//console.log(typeof this.state.getList1);
		publicData.type1Week={//第几周修改，用于筛选时重置
			checkDayBtn:0,
			isFirstLoad:0,
			isCampOver:false,
			joinweek:0
		};
		publicData.type1left={//左部分显示，用于筛选时重置
			checkDayBtn:0,
			isCampOver:false,
			joinweek:0
		};
		var objStudentMsgType1,objStudentMsgType2,objPublic_bigImg;
		
		//判断type1是否显示
		if(typeof this.state.getList1.resp != "undefined" && publicData.pageIndex ==1){
			objStudentMsgType1=<StudentMsgType1 getList1={this.state.getList1} style={{display:"block"}}/>;

		}
		else{
			objStudentMsgType1=null;
		}
		

		if(typeof this.state.getList2.resp != "undefined" && publicData.pageIndex !=1){
			objStudentMsgType2=<StudentMsgType2 getList2={this.state.getList2}/>;
		}
		else{
			objStudentMsgType2=null;
		}

		if(this.state.bigImgName!=""){
			objPublic_bigImg=<Public_bigImg  getList1={this.state.getList1} bigImgArr={this.state.bigImgArr} />;
		}
		else{
			objPublic_bigImg=null;
		}
		return (
			<div className="row" style={{position:"relative"}}>

				{/*1.7新增弹窗*/}
				<div className="row newAlertBox">
					<div className="col-xs-12 col-sm-12 newAlert">
						<div className="row">
							<div className="col-xs-12 col-sm-12 content">111</div>
							<div className="col-xs-12 col-sm-12 iKnow">
								<div className="row">
									<div className="col-xs-12 col-sm-12 iKnow1" onClick={this.newAlertKnow}>我知道了</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<StudentTop />
				{objStudentMsgType1}
				{objStudentMsgType2}
				{objPublic_bigImg}
				<Student_otherInfo />
				<Public_comment />
				<Public_error />
				<Public_deleteComment />
				<Student_titleRight />
				<Version />
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
	<Student />,
	document.getElementById('main')
);



