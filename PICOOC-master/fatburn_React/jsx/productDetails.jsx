var React = require("react");
var ReactDOM = require("react-dom");
var PubSub = require("pubsub-js");
var Public_error = require('./Public_error.jsx');
var ProductDetails_saleState = require('./ProductDetails_saleState.jsx');
var ProductDetails_banner = require('./ProductDetails_banner.jsx');
var ProductDetails_productState = require('./ProductDetails_productState.jsx');
var ProductDetails_productDesc = require('./ProductDetails_productDesc.jsx');
var ProductDetails_chooseFatburn = require('./ProductDetails_chooseFatburn.jsx');
var ProductDetails_alertBox = require('./ProductDetails_alertBox.jsx');
var SShangPinXiangQing = {
	SCategory_SShangPinXiangQing: 5080100,
	SShangPinXiangQing_YuYueXiaQi: 5080101,//预约下期
	SShangPinXiangQing_KaiShouTiXing: 5080102,//开售提醒
	SShangPinXiangQing_LiJiGouMai: 5080103,//立即购买
	SShangPinXiangQing_ShengJiBanBen: 5080104,//升级版本
	SShangPinXiangQing_QuYouZanGouMai: 5080105,//去有赞购买
	SShangPinXiangQing_QuXiaoShengJiBanBen: 5080106,//取消升级版本
	SShangPinXiangQing_ShangPinXiangQing: 5080107,//商品详情
	SShangPinXiangQing_ShangPinPingJia: 5080108,//商品评价
	SShangPinXiangQing_KeFuXiTong: 5080109,//客服系统
	SShangPinXiangQing_BuNengGouMaiDuoCi: 5080110,//不能购买多次
	SShangPinXiangQing_ZhuZhangHaoGouMai: 5080111//主账号购买
};

window.SShangPinXiangQing = SShangPinXiangQing;
var goodsId = "";//当前商品id
var nextId = "";//下一个商品的id
$('.sale .service img').hide().eq(0).show();//默认不显示客服小红点
//1.6取消刷新页面
var deviceType = isMobile();
/*if(deviceType == "isApp" && getParamByUrl('webver')>1){
	//兼容低版本
	if((getParamByUrl('webver') == 2) && (typeof mobileApp.markedAsNeedToRefresh != "undefined")){
		mobileApp.markedAsNeedToRefresh();//客户端刷新当前页面
	}else{
		appFc.markedAsNeedToRefresh();//客户端刷新当前页面
	}
}*/

//部分页面公用参数stock
var publicData = {
	stock: 0,
	//nowType:0, //当前类型
	nowClass: '', //当前班级
	outAppLogin: (getCookie('appOutPhone') == false) ? false : true,//app外进入页面
	phoneNum: '',//app外用户手机号
	code: '',//app外验证码
	verifyTimer: '',//获取验证码倒计时
	verifyAgainTimer: ''//重新获取验证码倒计时
};
window.publicData = publicData;

var ProductDetailsContainer = React.createClass({

	getInitialState: function () {
		var me = this;
		me.showGoodsStatus();//展示商品信息
		return {
			verifyStatus: 'none',//验证手机号弹窗
			hasOnLine: 1,//是否有商品在售
			productDetailsData: {}
		};
	},
	componentWillMount: function () {

	},
	componentDidMount: function () {
		var me = this;
		//app外：点击立即购买时，如果用户没有登陆手机号，则显示该弹窗
		PubSub.subscribe("outAppPhone", function (msg, outAppPhone) {
			me.setState({
				verifyStatus: outAppPhone
			});
		});
	},

	render: function () {
		//alert('render');
		var me = this;
		var data = me.state.productDetailsData;
		//alert(typeof me.state.productDetailsData.resp);
		//客户端控制方法(左上角，title，右上角)
		if (typeof me.state.productDetailsData.resp != "undefined") {
			//alert(typeof isOutApp);
			//alert(isOutApp());
			if (isOutApp() == false) {//app内才执行此方法
				console.log(me);
				if (typeof me.state.productDetailsData.resp != "undefined") {
					//低版本兼容（低版本的title和右上角是在一起的）
					if (getParamByUrl('webver') > 2) {//高版本控制title和右上角方法
						//中间title
						var titleData = {
							title: "有品燃脂营",
							color: "",
							opacity: "",
							backgroundColor: "",
							backgroundOpacity: ""
						};
						titleData = JSON.stringify(titleData);
						appFc.controlTitle(titleData);


						//如果有商品在线，才展示右上角分享
						//if(me.state.hasOnLine != 0){
						if (data.resp.info.length != 0) {

							//右上角
							var iconUrl = "";
							var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
							if (getParamByUrl("os") == "android") {
								iconUrl = iconShare[0];
							}
							else {
								iconUrl = iconShare[1];
							}
							var getPageInfo4 = function () {
								var data3 = {
									iconType: 0,//0走图片逻辑，1走文案逻辑
									rightStr: {
										str: "",
										color: "",
										opacity: "",
										id: "0"
									},
									rightIcon: [
										{
											type: "1",//调用客户端方法
											id: "1",
											functionName: "",
											iconUrl: iconUrl,
											iconName: "分享",
											redDotType: "1",
											redDotShow: false,
											redDotNum: "0",
											nativeType: "0",//分享
											content: {
												shareTitle: data.resp.share.shareTitle,
												//shareUrl:data.resp.share.shareUrl,
												 shareUrl:data.resp.share.link,
												shareIcon: data.resp.share.shareIcon,
												shareDesc: data.resp.share.shareDesc,
												shareTag: data.resp.share.shareTag,
												/*shareTitle:'',
												 shareUrl:'',
												 shareIcon:'',
												 shareDesc:'',
												 shareTag:'',*/
												shareType: "0",
												shareBackgroundColor: '',
												shareTypeDesc: "",
												fatBurnName: ''
											}
										}
									]
								};
								return JSON.stringify(data3);
							};
							appFc.controlRight(getPageInfo4());
						}

					} else {//低版本控制title和右上角的方法
						var getPageInfo = function () {
							if (getParamByUrl('webver') > 1) {
								//if(me.state.hasOnLine != 0){
								if (data.resp.info.length != 0) {
									var data2 = {
										title: '有品燃脂营',
										backgroundColor: '#2c2f31',
										isShare: true,
										shareTitle: data.resp.share.shareTitle,
										//shareUrl:data.resp.share.shareUrl,
										shareUrl:data.resp.share.link,
										shareIcon: data.resp.share.shareIcon,
										shareDesc: data.resp.share.shareDesc,
										shareTag: data.resp.share.shareTag
									};
								}

							} else {
								var data2 = {
									title: '有品燃脂营',
									backgroundColor: '#2c2f31',
									isShare: false
								};
							}
							return JSON.stringify(data2);
						};
						var deviceType = isMobile();
						if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
							mobileApp.getShareInfo(getPageInfo());
						}
						document.documentElement.style.webkitUserSelect = 'none';
						document.documentElement.style.webkitTouchCallout = 'none';
					}


					if (deviceType == "isApp" && getParamByUrl('webver') > 2) {
						if (getCookie("saveCampFrom") == "1") { //如果是从燃脂营学员首页续营
							//左上角
							var getPageInfo = function () {
								var data = {
									iconType: 0,
									iconColor: "",
									backNum: 3,
									closeWebview: 0,
									hidden: false,
									isHandle: false,
									functionName: ""
								};
								return JSON.stringify(data);
							};
							appFc.controlLeft(getPageInfo());
						}
						else if (parseInt(getParamByUrl("refer")) == 3) {
							var getPageInfo2 = function () {
								var data = {
									iconType: 1,
									iconColor: "",
									backNum: 1,
									closeWebview: 0,
									hidden: false,
									isHandle: false,
									functionName: ""
								};
								return JSON.stringify(data);
							};
							appFc.controlLeft(getPageInfo2());
						}
						else {
							var getPageInfo1 = function () {
								var data = {
									iconType: 0,
									iconColor: "",
									backNum: 1,
									closeWebview: 0,
									hidden: false,
									isHandle: false,
									functionName: ""
								};
								return JSON.stringify(data);
							};
							appFc.controlLeft(getPageInfo1());
						}

					} else if (getParamByUrl('webver') >1) {
						//低版本兼容
						if (deviceType == "isApp" && (typeof mobileApp != "undefined") && getParamByUrl('webver') == 2) {
							if (getCookie("saveCampFrom") == "1") { //如果是从燃脂营学员首页续营
								var getPageInfo3 = function () {
									var data = {
										iconType: 0,//0:默认箭头，1：叉，2：iconUrl传图片
										backNum: 3,
										closeWebview: 0,//默认为0
										iconUrl: ""
									};
									return JSON.stringify(data);
								};
								mobileApp.showLeftBtn(getPageInfo3());
							} else {
								var getPageInfo4 = function () {
									var data = {
										iconType: 0,//0:默认箭头，1：叉，2：iconUrl传图片
										backNum: 1,
										closeWebview: 0,//默认为0
										iconUrl: ""
									};
									return JSON.stringify(data);
								};
								mobileApp.showLeftBtn(getPageInfo4());
							}
						}
					}
				}
			}
			else {
				//app外微信分享
				setShare();
				function setShare() {
					var host = window.location.protocol + "//" + window.location.host;
					var finalUrl = host + "/getWxData";
					var shareUrl = location.href.split('#')[0];
					$.ajax({
						type: "post",
						url: finalUrl,
						data: {
							reqUrl: shareUrl
						},
						dataType: "json",
						success: function (result) {
							if (result.status == "success") {
								wx.config({
									debug: false,
									appId: result.data.appId,
									timestamp: result.data.timestamp,
									nonceStr: result.data.nonceStr,
									signature: result.data.signature,
									jsApiList: [
										'onMenuShareTimeline',
										'onMenuShareAppMessage',
										'onMenuShareQQ',
										'onMenuShareWeibo'
									]
								});

								wxShare();
							}
						}
					});

				}
				function wxShare() {
					var shareObject = {
						title: data.resp.share.shareTitle,
						desc: data.resp.share.shareDesc,
						link: window.location.protocol + "//" + window.location.host + window.location.pathname + '?linkId=' + getParamByUrl('linkId'),
						imgUrl: data.resp.share.shareIcon
					}
					//检测api是否生效
					wx.ready(function () {
						console.log(shareObject);
						// 分享到朋友圈
						wx.onMenuShareTimeline(shareObject);
						// 分享给朋友
						wx.onMenuShareAppMessage(shareObject);
						// 分享到QQ
						wx.onMenuShareQQ(shareObject);
						// 分享到微博
						wx.onMenuShareWeibo(shareObject);

					});
				}
			}
		}

		var str = '';
		console.log(data.code);
		if (data.code == 200) {
			//alert('a');
			if (me.state.hasOnLine == 0) {
				str =
					<div>
						<section className="offLine">
							<p className="offLineTip">啊喔~该商品已下架...</p>
							<div className="offLineImg"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/offLine.png" /></div>
							<div><button className="offLineBtn" onClick={me.offLineBtn}>查看最新燃脂营商品</button></div>
						</section>
					</div>
			} else {
				str =
					<div>
						<section className="container aboutSale">
							{/*售卖状态*/}
							{/*<div id="clearCookie">清除用户手机号</div>*/}
							<ProductDetails_saleState saleState={data} serviceFunction={me.serviceFunction} />
							<div className="row noAppTitle" style={{ display: (isOutApp() == true || (isLowVersion() == true) || (getParamByUrl('innerToOut') == 1)) ? 'block' : 'none' }}>
								<div className="col-xs-4 col-sm-4 middle middle2"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/logoLeft.png" /></div>
								<div className="col-xs-4 col-sm-4"></div>
								<div className="col-xs-4 col-sm-4 right right2"><img onClick={this.alertsVerifyFun} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/mine.png" /></div>
							</div>
							{/*轮播图*/}
							<ProductDetails_banner banner={data} />

							{/*产品状态*/}
							<ProductDetails_productState productState={data} />


							{/*产品描述*/}
							<ProductDetails_productDesc productDesc={data} />

							{/*选择燃脂营*/}
							<ProductDetails_chooseFatburn chooseFatburn={data} />

							{/*弹出框*/}
							<ProductDetails_alertBox alertBox={data} verifyStatus={me.state.verifyStatus} verifyFun={this.verifyFun} />

						</section>
					</div>
			}

		} else {
			str = <i></i>
		}

		return (
			<div>{str}</div>

		);
	},


	/*获取商品详情页信息*/
	showGoodsStatus: function () {
		var me = this;

		//燃脂营1.6新接口
		var finalUrl = ajaxLink + "/v1/api/campSell/findSellById" + window.location.search;//获取商品信息
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function (data) {
				if (data.result.code == 200) {
					//alert(data.code);
					console.log('商品详情页', data);
					//全部售罄状态
					if (data.resp.info.length == 0) {
						me.setState({
							hasOnLine: 0
						});
					}
					if (typeof me.state.productDetailsData.resp != "undefined") {
						if (me.state.productDetailsData.resp.info.length > 0) {
							data.resp.info = me.state.productDetailsData.resp.info.concat(data.resp.info);
						}
					}
					me.setState({
						productDetailsData: data
					});


					if (getParamByUrl('chaojie') == 'chaojie') {
						$('#clearCookie').show().unbind('click').click(function () {
							//alert(getCookie('appOutPhone'));
							delCookie('appOutPhone');
						});
					}



					$('.alertsVerify .verifyBox .phone').bind('input propertychange', function () {
						if ($.trim($(this).val()) != '') {
							$('.alertsVerify .verifyBox .verifyBtn2').css('background', '#00AFF0');
						} else {
							$('.alertsVerify .verifyBox .verifyBtn2').css('background', '#999999');
						}
					});
					$('.alertsVerify .verifyBox .code').bind('input propertychange', function () {
						if ($.trim($(this).val()) != '') {
							$('.alertsVerify .verifyBox .verifyBtn1').css('background', '#00AFF0');
						} else {
							$('.alertsVerify .verifyBox .verifyBtn1').css('background', '#999999');
						}
					});

					if ((isOutApp() == false) && (getParamByUrl('innerToOut') != 1)) {//app内才执行
						//客服小红点

						var deviceType4 = isMobile();
						if (deviceType4 == "isApp" && getParamByUrl('webver') > 1) {
							//低版本兼容
							if (deviceType4 == "isApp" && (typeof mobileApp != "undefined") && getParamByUrl('webver') == 2) {
								var data6 = {
									type: 1,//燃脂营售前
									function: "showDot"//展示小红点的方法名
								};
								data6 = JSON.stringify(data6);
								mobileApp.easeModChatDot(data6);
							} else {
								var data4 = {
									type: 1,//燃脂营售前
									function: "showDot"//展示小红点的方法名
									//function:"me.showDot"//展示小红点的方法名
								};
								data4 = JSON.stringify(data4);
								appFc.easeModChatDot(data4);
							}

							//访问的是全局的方法showDot
							window.showDot = showDot;
							//显示客服小红点
							function showDot() {
								//alert("展示小红点成功");
								$('.sale .service img').hide().eq(1).show(); //客服：展示小红点
								$('.sale .service2 img').hide().eq(1).show(); //客服：展示小红点
							}
						}
					}

					//detailOrComment文字可编辑
					/*var str =
						'<p style="padding: 0.25rem 0;"><a href="https://www.picooc.com/wap/?lag=zh">PICOOC官网</a></p>' +
						'<p><span>夏天=空调+wifi+西瓜，这不就是夏天最准确的描述么！嗜瓜如命的我最近很纠结，西瓜虽好，但是有人说吃西瓜是减肥的，又有人说西瓜含糖高，不能多吃，会长胖的。<strong>所以，正在减脂的我到底能不能吃西瓜？</strong></span></p>' +
						'<p style="text-align:center;"> <span style="font-size:16px;color:#64451D;"></span><img src="http://detection.picooc.com/data/upload/editor/2017-07-06/595dfe1f6e628.jpg" alt=""> </p>';

					$('.detailOrComment1').append('<div id="expandDetails">'+str+'</div>');*/


				} else {
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			},
			error: function () {
				//alert(data.code);
				$(".error-main-t").html(data.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		});
	},



	//去往客服
	goToEaseModChat: function () {
		var me = this;
		var deviceType = isMobile();
		if (deviceType == "isApp") {
			if (getParamByUrl('webver') > 1) {//正常版本

				//兼容低版本
				if (getParamByUrl('webver') == 2) {
					mobileApp.goToEaseModChat();
				} else {
					appFc.goToEaseModChat();
				}
				$('.sale .service img').hide().eq(0).show(); //客服：不展示小红点
				$('.sale .service2 img').hide().eq(0).show(); //客服：不展示小红点
			} else {//低版本
				if (getParamByUrl("os") == "iOS") {// 判断如果是ios

					//燃脂营售卖
					$('.alertBox .alerts2').hide().eq(4).show();//遮罩显示升级
					$('.alerts2 .isUpdate .cancelNew').unbind('click').click(function () {
						setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_QuXiaoShengJiBanBen);//取消升级版本
						$('.alertBox .alerts2').hide();//遮罩隐藏
					});
					$('.alerts2 .isUpdate .updataNew').unbind('click').click(function () {
						setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_ShengJiBanBen);//版本升级埋点
						window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8'; //跳转到APP版本升级页面
					});

				} else if (getParamByUrl("os") == "android") {// 判断如果是android

					//燃脂营售卖
					$('.alertBox .alerts2').hide().eq(5).show();//遮罩显示
					$('.alerts2 .forSelfInnerNew').unbind('click').click(function () {
						$('.alertBox .alerts2').hide();//遮罩隐藏
					});
				}
			}
		}
	},

	//点击客服
	serviceFunction: function () {
		var me = this;
		setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_KeFuXiTong);//客服系统埋点
		me.goToEaseModChat();
	},

	//点击我的
	alertsVerifyFun: function () {
		var me = this;
		// 判断无痕浏览
		try {
				window.localStorage.foobar = "foobar";
			} catch (_) {
				alert("请取消浏览器无痕浏览再购买哦~");
			}
		//alert(publicData.phoneNum);
		//alert(publicData.outAppLogin);
		if (publicData.outAppLogin == false) {
			//alert(1);
			PubSub.publish('outAppPhone', 'block');//app外：用户没有登陆，则显示验证手机号弹窗
			$('.alertsVerify .verifyBox').hide().eq(1).show();//如果弹窗关闭，下次进来需要再次弹出输入手机号的弹框
			$('.alertBox .alertsVerify .verifyBox .warning').hide().eq(0).show();
			//禁止滚动条
			$('html, body').css('overflow', 'hidden').on("touchmove", function (ev) {
				ev = ev || event;
				if (ev.preventDefault) {
					ev.preventDefault();
				} else {
					return false;
				}
			});

		} else {
			
			window.location.href = absoluteUrl + 'myInfo.html' + window.location.search + "&phoneNo=" + getCookie('appOutPhone');

		}
	},
	//点击验证
	verifyFun: function () {
		$('html, body').css('overflow', 'auto').off("touchmove");
		clearInterval(publicData.verifyTimer);
		clearInterval(publicData.verifyAgainTimer);
		$('.alertBox .alertsVerify .verifyBox .warning .nowLeftTime').html(60);
		var me = this;
		me.setState({
			verifyStatus: 'none'
		});
	},

	//查看其他最新商品
	offLineBtn: function () {
		var me = this;
		var data = me.state.productDetailsData;
		removeParamByUrl('linkId');
		var url = window.location.search.substring(1);
		var arr = url.split("&");
		var result = [];
		var str = '?';
		for (var i = 0; i < arr.length; i++) {
			var param = arr[i].split("=");
			if ('linkId' != param[0]) {
				str += '&' + param[0] + '=' + param[1];
				//return  param[1];
			}
		}
		var linkId = data.resp.share.linkId;
		window.location.href = 'productDetails.html' + str + '&linkId=' + linkId;
	}

});

var Component = React.createClass({

	render: function () {
		return (
			<div>
				<ProductDetailsContainer />
				<Public_error />
			</div>
		);
	}
});

ReactDOM.render(
	<Component />, document.getElementById('productDetailsBox')
);