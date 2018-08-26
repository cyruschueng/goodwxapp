var React=require("react");
var ReactDOM=require("react-dom");
var Public_error = require('./Public_error.jsx');
var SWoDeDingDan={
	SCategory_SWoDeDingDan:5080400,
	SWoDeDingDan_DengDaiFuKuan:5080401,//等待付款
	SWoDeDingDan_YiWanCheng:5080402,//已完成
	SWoDeDingDan_YiGuanBi:5080403,//已关闭
	SWoDeDingDan_YiQuXiao:5080404,//已取消
	SWoDeDingDan_QuZhiFu:5080405//去支付
};
var MyOrderContainer=React.createClass({

	getInitialState:function(){
		var me=this;
		window.getOrders = me.getOrders;
		me.getOrders();
		return {
			myOrderData:{}
		}

		if(getParamByUrl('webver')>2){
			var titleData = {
				title:"燃脂营订单",
				color:"",
				opacity:"",
				backgroundColor:"",
				backgroundOpacity:""
			};
			titleData=JSON.stringify(titleData);
			appFc.controlTitle(titleData);

		}else {
			var getPageInfo = function (){
				var data = {
					title:"燃脂营订单",
					isShare:false,
					backgroundColor:'#2c2f31'
				};
				return JSON.stringify(data);
			};
			var deviceType=isMobile();
			if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
				mobileApp.getShareInfo(getPageInfo());
			}
			document.documentElement.style.webkitTouchCallout='none';
		}
	},
	render:function(){
		var me = this;
		var data= me.state.myOrderData;
		console.log(data);
		var str = "";
		if(typeof me.state.myOrderData.resp != "undefined"){
			if(data.resp.records.length>0){
				var str1 = "";
				var str2 = <span className="wait">等待付款</span>;
				var str3 = <span className="ok">已完成</span>;
				var str4 = <span className="ok">已关闭</span>;
				var str5 = <span className="ok">已取消</span>;
				var str6 = "";
				var str7 = "";
				var str8 = <span className="ok">退款中</span>;
				var str9 = <span className="ok">退款完成</span>;

				var list=[];
				for(var i=0;i<data.resp.records.length;i++){
					if(data.resp.records[i].orderType==0){
						str6 = str2;
						str7 = <div className="col-xs-4 col-sm-4 gotoPay"><span onClick={me.payToFunction} className="PayTo" data-goods_type={data.resp.records[i].goodsType} data-price={data.resp.records[i].currentPrice} data-order_id={data.resp.records[i].orderId} data-source_type={data.resp.records[i].sourceType} >去支付</span></div>;
					}else if(data.resp.records[i].orderType==1){
						str6 = str3;
						str7 = "";
					}else if(data.resp.records[i].orderType==2){
						str6 = str5;
						str7 = "";
					}else if(data.resp.records[i].orderType==3){
						str6 = str4;
						str7 = "";
					}else if(data.resp.records[i].orderType==4){
						str6 = str8;
						str7 = "";
					}else if(data.resp.records[i].orderType==5){
						str6 = str9;
						str7 = "";
					}

					//var goodsUrl = JSON.parse(data.resp.records[i].goodsUrl);
					//var goodsUrl = JSON.parse(data.resp.records[i].goodsUrl);
					if(data.resp.records[i].goodsType == 1){
						list.push(
							<aside key={i} data-index={i} className="row order" data-goods_type={data.resp.records[i].goodsType}
								   data-order_id={data.resp.records[i].orderId} onClick={me.orderFunction} >
								<div className="row col-xs-12 col-sm-12 orderDetail">
									<div className="col-xs-8 col-sm-8 number">订单编号：{data.resp.records[i].orderId}</div>
									<div className="col-xs-4 col-sm-4 waitPay">{str6}<img
										src="http://cdn2.picooc.com/web/res/fatburn/image/myOrder/more.png"/>
									</div>
								</div>
								<div className="row col-xs-12 col-sm-12 info">
									<div className="col-xs-3 col-sm-3 infoImg"><img src={data.resp.records[i].goodsUrl}/></div>
									<div className="col-xs-9 col-sm-9 infoDesc">
										<h3>{data.resp.records[i].goodsName}</h3>
										<p>开营时间：{data.resp.records[i].beginTime}</p>
									</div>
								</div>
								<div className="row col-xs-12 col-sm-12 pay">
									<div className="col-xs-8 col-sm-8 payNum">实付款：<span
										className="payprice">¥{data.resp.records[i].currentPrice}</span>
									</div>
									{str7}</div>
							</aside>
						);
					}else if(data.resp.records[i].goodsType == 2){
						var saleTime = (data.resp.records[i].createTime).substring(0, 10);
						list.push(
							<aside key={i} data-index={i} className="row order" data-goods_type={data.resp.records[i].goodsType}
								   data-order_id={data.resp.records[i].orderId} onClick={me.orderFunction}>
								<div className="row col-xs-12 col-sm-12 orderDetail">
									<div className="col-xs-8 col-sm-8 number">订单编号：{data.resp.records[i].orderId}</div>
									<div className="col-xs-4 col-sm-4 waitPay">{str6}<img src="http://cdn2.picooc.com/web/res/fatburn/image/myOrder/more.png"/>
									</div>
								</div>
								<div className="row col-xs-12 col-sm-12 info">
									<div className="col-xs-3 col-sm-3 infoImg"><img src={data.resp.records[i].goodsUrl}/></div>
									<div className="col-xs-9 col-sm-9 infoDesc">
										<h3>{data.resp.records[i].goodsName}</h3>
										<p>购买时间：{saleTime}</p>
									</div>
								</div>
								<div className="row col-xs-12 col-sm-12 pay">
									<div className="col-xs-8 col-sm-8 payNum">实付款：<span className="payprice">¥{data.resp.records[i].currentPrice}</span>
									</div>
									{str7}
								</div>
							</aside>
						);
					}
				}
				str = list;
			}else{
				 str = <div className="row noOrder">暂无相关订单信息~</div>;
			}
		}
		return(
			<section className="container">
				<div className="myOrders">
					{str}
				</div>
			</section>
		);
	},

    //获取订单列表
	getOrders:function(){
		var me = this;
		var finalUrl=ajaxLink+"/v1/api/campOrder/findOrders"+window.location.search;
		//var finalUrl='http://172.17.1.233:8080/v1/api/campOrder/findOrders'+window.location.search;
		console.log(finalUrl);
		$.ajax({
				type:"get",
				url:finalUrl,
				dataType:"json",
				success:function(data){
					if(data.code == 200){
						//console.log(data);
						//console.log(finalUrl);
						if(typeof me.state.myOrderData.resp != "undefined"){
							if(me.state.myOrderData.resp.records.length > 0){
								data.resp.records =  me.state.myOrderData.resp.records.concat(data.resp.records);
							}
						}
						me.setState({myOrderData:data});
					}else{
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display","block");
						$(".error-main").css("margin-top",-$(".error-main").height()/2);
					}
				}
		});
	},

	//跳转到订单详情页
	orderFunction:function(event){
		event.stopPropagation();
		var me = this;
		var data= me.state.myOrderData;
		$(event.currentTarget).css("opacity","0.6");
		var index = event.currentTarget.getAttribute("data-index");//设置埋点
		if(data.resp.records[index].orderType==0){
			setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan,SWoDeDingDan.SWoDeDingDan_DengDaiFuKuan);//等待付款
		}else if(data.resp.records[index].orderType==1){
			setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan,SWoDeDingDan.SWoDeDingDan_YiWanCheng);//已完成
		}else if(data.resp.records[index].orderType==2){
			setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan,SWoDeDingDan.SWoDeDingDan_YiQuXiao);//已取消
		}else if(data.resp.records[index].orderType==3){
			setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan,SWoDeDingDan.SWoDeDingDan_YiGuanBi);//已关闭
		}
		var orderId = event.currentTarget.getAttribute("data-order_id");
		setCookiePath("toOrderDetails","1",1,"/;domain=picooc.com");
		// setCookie("toOrderDetails","1",1); //在cookie中存放跳转到订单详情页面的标识 1为从订单列表跳转的
		if(event.currentTarget.getAttribute("data-goods_type")==1){
			window.location.href="orderDetails.html"+window.location.search+"&orderId="+orderId;
		}else if(event.currentTarget.getAttribute("data-goods_type")==2){
			window.location.href="hdOrderDetails.html"+window.location.search+"&orderId="+orderId;
		}
	},

	//去支付
	payToFunction:function(event){
		event.stopPropagation();
		setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan,SWoDeDingDan.SWoDeDingDan_QuZhiFu);//去支付
		//$(event.currentTarget).css("opacity","0.6");
		delCookie("toOrderSuccess");
		setCookiePath("toOrderSuccess","1",1,"/;domain=picooc.com");
		// alert("测试toOrderSuccess:"+getCookie("toOrderSuccess"));

		var orderId = event.currentTarget.getAttribute("data-order_id");
		var currentPrice = event.currentTarget.getAttribute("data-price");
		var sourceType = $.trim(event.currentTarget.getAttribute("data-source_type"));
		// alert(sourceType);
		var deviceType=isMobile();
		if(event.currentTarget.getAttribute("data-goods_type")==1){
			if(sourceType == '燃脂营APP' || sourceType == '有赞'){
				if(deviceType == "isApp"){
					var getPageInfo = function (){
						var paydata = {
							orderId:orderId,
							url:absoluteUrl+"orderSuccess.html"+window.location.search+"&orderId="+orderId,
							price:currentPrice,
							isRefresh:true,
							function:""
						};
						return JSON.stringify(paydata);
					};
					if(getParamByUrl('webver')>2){
						appFc.gotoPay(getPageInfo());
					}else {
						mobileApp.gotoPay(getPageInfo());
					}
				}
			}
			else if (sourceType == '微信') {
                $(".error-main-t").html('该订单在微信上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
			else if (sourceType == '微博') {
                $(".error-main-t").html('该订单在微博上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
            else if (sourceType == 'QQ') {
                $(".error-main-t").html('该订单在qq上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
            else {
                $(".error-main-t").html('该订单在浏览器上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
		}else if(event.currentTarget.getAttribute("data-goods_type")==2){
			if(deviceType == "isApp"){
				var getPageInfo2 = function (){
					var paydata = {
						orderId:orderId,
						url:absoluteUrl+"hdPaySuccess.html"+window.location.search+"&orderId="+orderId,
						price:currentPrice,
						isRefresh:true,
						function:"getOrders"
					};
					return JSON.stringify(paydata);
				};
				if(getParamByUrl('webver')>2){
					appFc.gotoPay(getPageInfo2());
				}else {
					mobileApp.gotoPay(getPageInfo2());
				}
			}
		}
	}
});

var Component=React.createClass({

	render:function (){
		return (
			<div>
				<MyOrderContainer />
				<Public_error />
			</div>
		);
	}
});

ReactDOM.render(
	<Component />,document.getElementById('myOrderBox')
);