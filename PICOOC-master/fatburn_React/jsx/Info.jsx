var React=require("react");

var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");
var Public_bigImg=require("./Public_bigImg.jsx");
var Public_comment=require("./Public_comment.jsx");
var Fc_comment=require("./Fc_comment.jsx");
var Public_error=require("./Public_error.jsx");
var Public_deleteComment=require("./Public_deleteComment.jsx");
//card2的筛选
var StudentMsgType2_list=require("./StudentMsgType2_list.jsx");
var Version=require("./Version.jsx");
//card2的打卡列表
var Fc_comment=require("./Fc_comment.jsx");
//部分页面公用参数
var publicData={
	pageIndex:2,//判断在个人主页还是营内动态
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
	isInfoHtmlPage:true //info.html页面
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
var Info=React.createClass({
	getInitialState:function(){

		//控制left
		if(getParamByUrl('webver')>2){
			var getPageInfo11 = function (){
				var data = {
					iconType:0,
					iconColor:"",
					backNum:1,
					closeWebview:0,
					hidden:false,
					isHandle:false,
					functionName:""
					//isRefreshPage:true
				};
				return JSON.stringify(data);
			};
			appFc.controlLeft(getPageInfo11());
		}else{
			var getPageInfo12 = function (){
				var data = {
					iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
					backNum:1,
					closeWebview:0,//默认为0
					iconUrl:""
					//isRefreshPage:true
				};
				return JSON.stringify(data);
			};
			mobileApp.showLeftBtn(getPageInfo12());
		}

		//title
		if (getParamByUrl('webver') > 2){
			var getPageInfo1 = function (){
				var data = {
					title:'打卡详情',
					color:"",
					opacity:"",
					backgroundColor:"",
					backgroundOpacity:""
				};
				return JSON.stringify(data);
			};
			appFc.controlTitle(getPageInfo1());
		}else {
			var getPageInfo2 = function (){
				var data = {
					title:"打卡详情",
					isShare:false,
					backgroundColor:'#2c2f31'
				};
				return JSON.stringify(data);
			};
			var deviceType=isMobile();
			if(deviceType == "isApp"){
				mobileApp.getShareInfo(getPageInfo2());
			}
			document.documentElement.style.webkitTouchCallout='none';
		}

		this.getList2Fc();
		return {
			bigImgArr:[],
			getList2:{}
		}
	},
	getList2Fc:function(){
		//card2
		var me=this;
		var finalUrl=ajaxLink+"/v1/api/camp/checkDetail"+window.location.search+"&type=1";
		console.log(finalUrl);
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					var resp=data.resp;
					data.resp.checkList=[resp];
					me.setState({getList2:data});
					console.log(me.state.getList2);
					$(".msgType2 .list").css("min-height",0);
					$(".msgType2 .part").eq(0).css("padding-top",0);
					$(".msgType2 .partLeft").eq(0).css("top",0);
					$(".msgType2 .partRight-img-li").css("height",($(window).width()-(2.5+3.75)*fontHeight)/3);
					$(".msgType2 .partRight-img-li2").css("height",($(window).width()-(2.5+3.75)*fontHeight)*3/4);
					$(".msgType2 .partRight-img-li3").css("height",($(window).width()-(2.5+3.75)*fontHeight)/2);
					publicData.pageBtn=true;
					for(var i=0;i<$(".partLeft-p5 span").length;i++){
						$(".partLeft-p5").eq(i).css("padding-left",($(".partLeft-p4 span").eq(i).width())/4);
							
					}
				}
				else{
					publicData.pageBtn=true;
					$(".error-main-t").html("您好,该打卡已被删除!");
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2+64);

					//点击我知道了
					$('.error-main .error-main-btn1').click(function(){
						alert(2);
					});

					var getPageInfo = function (){
				        var data = {
				            backNum:0,//默认为1，
				            closeWebview:1,//默认为0
				        };
				      return JSON.stringify(data);
				    };
				    appFc.deleteHistory(getPageInfo());



				}
			}
		})
		
	},
	componentDidMount:function(){
		var me=this;
		PubSub.subscribe("bigImgData",function(evName,bigImgData){
			//添加大图预览
			this.setState({bigImgArr:bigImgData});
		}.bind(this));
		PubSub.subscribe("addZan",function(evName,addZanData){
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
				getList2Data.resp.checkList[addZanData.partIndex].praises.push(addZanData.resp);
				getList2Data.resp.checkList[addZanData.partIndex].hasPraised=true;
				getList2Data.resp.checkList[addZanData.partIndex].praiseNum=parseInt(getList2Data.resp.checkList[addZanData.partIndex].praiseNum)+1;
				this.setState({getList2:getList2Data});
				publicData.isCanDianZan = true;
			}
		}.bind(this));
		PubSub.subscribe("deleteZan",function(evName,deleteZanData){
			//删除点赞
   //      	var deleteZanData={
			// 	pageIndex:publicData.pageIndex,//判断是个人主页还是营内动态
			// 	partIndex:partIndex,//判断是第几部分
			// 	deleteZanIndex:deleteZanIndex//判断是第几个
				
			// }
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
				getList2Data.resp.checkList[deleteZanData.partIndex].praises.splice(deleteZanData.deleteZanIndex,1);
				getList2Data.resp.checkList[deleteZanData.partIndex].hasPraised=false;
				getList2Data.resp.checkList[deleteZanData.partIndex].praiseNum=parseInt(getList2Data.resp.checkList[deleteZanData.partIndex].praiseNum)-1;
				this.setState({getList2:getList2Data});
				publicData.isCanDianZan = true;
			}
		}.bind(this));
		PubSub.subscribe("addMsg",function(evName,addMsgData){   
		//添加评论
		//pageIndex//判断是个人主页还是营内动态
		//partIndex//判断是第几部分
		//resp//评论的参数
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
			console.log(deleteCommentData);
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
	},
	render:function (){
		var me = this;
		var objStudentMsgType2, objPublic_bigImg;
		if(typeof this.state.getList2.resp != "undefined"){
			objStudentMsgType2=<StudentMsgType2_list getList2type={this.state.getList2}/>;
		}
		else{
			objStudentMsgType2=<i></i>;
		}
		if (me.state.bigImgArr.length>0) {
			objPublic_bigImg=<Public_bigImg bigImgArr={me.state.bigImgArr} />;
		}
		else {
			objPublic_bigImg = <i></i>;
		}
		return (
			<div className="row">
				<div className="row msgType2" style={{paddingTop:"1rem",minHeight:$(window).height()-(3.1875+1.5)*fontHeight}} onClick={Fc_comment.hiddenComment2}>
					{objStudentMsgType2}

				</div>
				<Public_comment />
				<Public_error />
				<Public_deleteComment />
				<Version />
				{objPublic_bigImg}
			</div>
		);
	}
})
ReactDOM.render(
	<Info />,
	document.getElementById('main')
);




