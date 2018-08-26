var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");
//显示大图
var Public_bigImg=require("./Public_bigImg.jsx");



//删除评论
var Public_deleteComment=require("./Public_deleteComment.jsx");
//评论区域
var Fc_comment=require("./Fc_comment.jsx");
//打卡列表
var StudentMsgType1_list=require("./StudentMsgType1_list.jsx");
//公共评论
var Public_comment=require("./Public_comment.jsx");

var SWoDeGeRenZhuYe={
    SWoDeGeRenZhuYe_ChaKanTiZhong:5061204,//查看体重
    SWoDeGeRenZhuYe_ChaKanZhiFang:5061205,//查看脂肪
    SWoDeGeRenZhuYe_ChaKanYaoWei:5061206,//查看腰围
};

var StudentInfo_cardList = React.createClass({
	getInitialState:function(){
		var me = this;
		me.getList1Fc();
		return {
			bigImgArr:[],
			listState:publicData.pageIndex,
			getList1:{},
			bigImgName:""
		}
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
			//alert(publicData.time1);
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
					publicData.ajaxBtn1=true;
					if(data.code == 200){
						publicData.isCampStatus = data.resp.isCamp;
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
						//console.log(me.state.getList1);
						$(".msgType1 .list").css("min-height",0);
						$(".msgType1 .part").eq(0).css("padding-top",0);
						$(".msgType1 .partLeft").eq(0).css("top",0);
						$(".msgType1 .partRight-img-li").css("height",($(window).width()-(2.5+3.75)*fontHeight)/3);
						$(".msgType1 .partRight-img-li2").css("height",($(window).width()-(2.5+3.75)*fontHeight)*3/4);
						$(".msgType1 .partRight-img-li3").css("height",($(window).width()-(2.5+3.75)*fontHeight)/2);
						publicData.pageBtn=true;
						for(var i=0;i<$(".partLeft-p5 span").length;i++){
							$(".partLeft-p5").eq(i).css("padding-left",($(".partLeft-p4 span").eq(i).width())/4);	
						}
					}
					else{
						publicData.pageBtn=true;
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display","block");
						$(".error-main").css("margin-top",-$(".error-main").height()/2);
					}
				}
			})
		}
	},
	componentDidUpdate:function(){
		if(this.props.reload){
			PubSub.publish("reload",false);
			this.getList1Fc();
		}
	},
	componentDidMount:function(){
		var me = this;
		
		PubSub.subscribe("shaixuan",function(evName,shaixuan){
			//修改listState
			//this.setState({listState:listState});

			publicData.time1=0;
			publicData.pageIndex1=0;
			publicData.hasNextBtn1=true;
			this.getList1Fc();
		}.bind(this));
		PubSub.subscribe("bigImgData",function(evName,bigImgData){
			//添加大图预览
			this.setState({bigImgArr:bigImgData});
		}.bind(this));
		PubSub.subscribe("addZan",function(evName,addZanData){
			//添加点赞
			// 	pageIndex:publicData.pageIndex,//判断是个人主页还是营内动态
			// 	partIndex:partIndex,//判断是第几部分
			// 	resp://点赞的数据
			var getList1Data=this.state.getList1;
			getList1Data.resp.checkList[addZanData.partIndex].praises.push(addZanData.resp);
			getList1Data.resp.checkList[addZanData.partIndex].hasPraised=true;
			getList1Data.resp.checkList[addZanData.partIndex].praiseNum=parseInt(getList1Data.resp.checkList[addZanData.partIndex].praiseNum)+1;
			this.setState({getList1:getList1Data});
			publicData.isCanDianZan = true;
			
		}.bind(this));
		PubSub.subscribe("deleteZan",function(evName,deleteZanData){
			//删除点赞
   //      	var deleteZanData={
			// 	pageIndex:publicData.pageIndex,//判断是个人主页还是营内动态
			// 	partIndex:partIndex,//判断是第几部分
			// 	deleteZanIndex:deleteZanIndex//判断是第几个
				
			// }
			var getList1Data=this.state.getList1;
			getList1Data.resp.checkList[deleteZanData.partIndex].praises.splice(deleteZanData.deleteZanIndex,1);
			getList1Data.resp.checkList[deleteZanData.partIndex].hasPraised=false;
			getList1Data.resp.checkList[deleteZanData.partIndex].praiseNum=parseInt(getList1Data.resp.checkList[deleteZanData.partIndex].praiseNum)-1;
			this.setState({getList1:getList1Data});
			publicData.isCanDianZan = true;
			
		}.bind(this));
		PubSub.subscribe("addMsg",function(evName,addMsgData){   
		//添加评论
		//pageIndex//判断是个人主页还是营内动态
		//partIndex//判断是第几部分
		//resp//评论的参数
			var getList1Data=this.state.getList1;
			getList1Data.resp.checkList[addMsgData.partIndex].replys.unshift(addMsgData.resp);
			
			this.setState({getList1:getList1Data});
		   
		}.bind(this)); 
		PubSub.subscribe("deleteComment",function(evName,deleteCommentData){
			//删除评论
			//pageIndex//判断是个人主页还是营内动态
			//partIndex//判断是第几部分
			//deleteCommentIndex//判断是第几个
			var getList1Data=this.state.getList1;
			getList1Data.resp.checkList[deleteCommentData.partIndex].replys.splice(deleteCommentData.deleteCommentIndex,1);
			this.setState({getList1:getList1Data});
		}.bind(this)); 
		PubSub.subscribe("deletePart",function(evName,deleteIndex){
			//删除模块
			//pageIndex//判断是个人主页还是营内动态
			//deleteIndex//判断是第几部分

			var getList1Data=this.state.getList1;
			//console.log(getList1Data.resp);
			if(getList1Data.resp.checkList[deleteIndex].isDayDisplay && getList1Data.resp.checkList.length>deleteIndex+1){
				getList1Data.resp.checkList[deleteIndex+1].isDayDisplay=true;
			}
			getList1Data.resp.checkList.splice(deleteIndex,1);
			this.setState({getList1:getList1Data});
		}.bind(this));




		//线上bug处理：
		//数据大于20条重新请求接口
		$(window).scroll(function(){
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
		});





	},
	render:function (){
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
    	var me = this;
    	var objStudentMsgType1,objPublic_bigImg;
    	console.info(this.state.getList1.resp);
    	//判断type1是否显示
		if(typeof this.state.getList1.resp != "undefined" && publicData.pageIndex ==1){
			objStudentMsgType1 = <StudentMsgType1_list getList1type={me.state.getList1} shaixuan1ComeFrom="studentInfo" />;
		}else{
			objStudentMsgType1 = <i></i>;
		}
		objPublic_bigImg=<Public_bigImg  getList1={this.state.getList1} bigImgArr={this.state.bigImgArr} />;
		//me.setState({reload:me.props.reload});
        return (
        	<div className="row page1">
	            <div className="row msgType1" onClick={Fc_comment.hiddenComment2}>
	            	{objStudentMsgType1}
	            </div>
	            {objPublic_bigImg}
	            <Public_comment />
            </div>
        );
    }
});
module.exports = StudentInfo_cardList;