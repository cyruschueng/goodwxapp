webpackJsonp([16],{

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);

var CardShareContainer = React.createClass({
	displayName: "CardShareContainer",


	getInitialState: function getInitialState() {
		var me = this;
		window.cardShareFun = me.cardShareFun;
		me.cardShareFun();
		me.clientControlFun();
		return {
			cardShareData: {}
		};
	},

	render: function render() {
		var me = this;
		var data = me.state.cardShareData;
		console.log(data);
		var str = "";
		var cardType = ["早餐", "午餐", "晚餐", "加餐", "运动", "饮食", "小结"];

		var pointIndex = 0;
		setInterval(function () {
			if (pointIndex == 4) {
				pointIndex = 0;
			}
			if (pointIndex == 0) {
				$('.loadingBox .point').html('');
			} else if (pointIndex == 1) {
				$('.loadingBox .point').html('.');
			} else if (pointIndex == 2) {
				$('.loadingBox .point').html('..');
			} else if (pointIndex == 3) {
				$('.loadingBox .point').html('...');
			}
			pointIndex++;
			/*if($('.loadingBox .point').html() == '...'){
   	$('.loadingBox .point').html('.');
   }else{
   	$('.loadingBox .point').append('.');
   }*/
			//$('.loadingBox .point').eq(0).append('.');
		}, 500);

		if (typeof me.state.cardShareData.resp != "undefined") {

			var cardShareData = me.state.cardShareData.resp;
			console.log('cardShareData', cardShareData);

			//是否有图片显示规则
			//var shareImgsArr = ["https://cdn2.picooc.com/web/res/fatburn/image/cardShare/shareImg1.png", "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/shareImg1.png"];
			var shareImgsArr = [];
			for (var i = 0; i < cardShareData.imgs.length; i++) {
				shareImgsArr.push(cardShareData.imgs[i].url);
			}
			console.log(shareImgsArr);
			var shareImgs = [];
			if (shareImgsArr.length == 0) {
				shareImgs = React.createElement(
					"div",
					{ className: "noImgs" },
					React.createElement("div", { className: "dottedLine" })
				);
			} else {
				shareImgsArr.map(function (item, index) {
					shareImgs.push(React.createElement("img", { src: shareImgsArr[index], alt: "", key: index }));
				});
			}

			var coachComment = cardShareData.evaluate;
			//如果有教练评价
			if (coachComment.id != null) {

				//星星显示规则
				var haveStar = coachComment.starLevel;
				var starShow = [];
				for (var i = 0; i < haveStar; i++) {
					starShow.push(React.createElement("img", { className: "star", src: "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/haveStar.png", alt: "", key: i }));
				}
				for (var j = 0; j < 5 - haveStar; j++) {
					starShow.push(React.createElement("img", { className: "star", src: "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/noStar.png", alt: "", key: j + 5 }));
				}

				//标签字符串
				var labelStr = (coachComment.proteinText != null && coachComment.proteinText != '' ? coachComment.proteinText + '，' : '') + (coachComment.waterText != null && coachComment.waterText != '' ? coachComment.waterText + '，' : '') + (coachComment.fatText != null && coachComment.fatText != '' ? coachComment.fatText + '，' : '') + (coachComment.vegetablesText != null && coachComment.vegetablesText != '' ? coachComment.vegetablesText + '，' : '') + (coachComment.performanceText != null && coachComment.performanceText != '' ? coachComment.performanceText + '，' : '') + (coachComment.cookingText != null && coachComment.cookingText != '' ? coachComment.cookingText + '，' : '');
				labelStr = labelStr.substring(0, labelStr.length - 1);

				var shareCoachSay = React.createElement(
					"div",
					{ className: "shareCoachSay" },
					React.createElement(
						"div",
						{ className: "aboutSay" },
						React.createElement(
							"div",
							{ className: "comments" },
							React.createElement(
								"span",
								{ className: "key" },
								"\u6559\u7EC3\u8BC4\u4EF7\uFF1A"
							),
							React.createElement(
								"span",
								null,
								starShow
							),
							React.createElement(
								"span",
								{ className: "number" },
								coachComment.starLevel + '.0'
							)
						),
						React.createElement(
							"div",
							{ className: "desc" },
							labelStr
						),
						React.createElement(
							"div",
							{ className: "desc" },
							coachComment.content
						)
					)
				);
			}

			str = React.createElement(
				"div",
				{ className: "cardShareWrap" },
				React.createElement(
					"div",
					{ className: "row shareHeader" },
					React.createElement(
						"div",
						{ className: "col-xs-6 col-sm-6 left" },
						React.createElement(
							"span",
							{ className: "label" },
							React.createElement(
								"i",
								null,
								cardType[cardShareData.type]
							),
							"\u6253\u5361"
						)
					),
					React.createElement(
						"div",
						{ className: "col-xs-6 col-sm-6 right" },
						React.createElement(
							"span",
							{ className: "name" },
							cardShareData.roleName
						),
						React.createElement("img", { className: "headImg", src: cardShareData.roleImg, onError: imgError.bind(me, cardShareData.roleSex) })
					)
				),
				React.createElement(
					"div",
					{ className: "row shareImgs" },
					shareImgs
				),
				React.createElement(
					"div",
					{ className: "shareDesc" },
					React.createElement("p", { className: "descText", dangerouslySetInnerHTML: { __html: cardShareData.content } })
				),
				shareCoachSay
			);
		}
		return React.createElement(
			"div",
			null,
			React.createElement(
				"p",
				{ className: "loadingBox" },
				"LOADING",
				React.createElement(
					"span",
					{ className: "point" },
					"..."
				)
			),
			React.createElement(
				"section",
				{ className: "container", style: { display: 'none' } },
				str
			)
		);
	},

	//获取打卡详情
	cardShareFun: function cardShareFun() {
		var me = this;
		var finalUrl = ajaxLink + "/v1/api/camp/checkDetail" + window.location.search + "&type=1";
		console.log(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.code == 200) {
					me.setState({ cardShareData: data });

					/*setTimeout(function(){
     	
     	if(getCookie('reloadNum') == 1){
     		//如果当前页面高度小于window高度，则垂直居中显示（数据交互之后将这部分放在componentDidMount）
     		//alert($(window).height());
     		//alert($('.container').height());
     		var windowHeight = $(window).height();
     		var containerHeight = $('.container').height();
     		if(containerHeight < windowHeight){
     			$('.container').css('marginTop', (windowHeight - containerHeight)/2).show();
     		}else{
     			$('.container').show();
     		}
     	}else{
     		setCookie('reloadNum', 1, 1);
     		setTimeout(function(){
     			window.location.reload();
     		}, 200);
     	}
     }, 800);*/

					/*var timer = setInterval(function(){
     	if($('.cardShareWrap .shareHeader .right .name').html() != ''){
     		clearInterval(timer);
     		//如果当前页面高度小于window高度，则垂直居中显示（数据交互之后将这部分放在componentDidMount）
     		//alert($(window).height());
     		//alert($('.container').height());
     		var windowHeight = $(window).height();
     		var containerHeight = $('.container').height();
     		if(containerHeight < windowHeight){
     			$('.container').css('marginTop', (windowHeight - containerHeight)/2).show();
     		}else{
     			$('.container').show();
     		}
     	}
     }, 500);*/

					/*var img1 = document.getElementById("img1");
     var p1 = document.getElementById("p1");
     function imgLoad(img, callback) {
     	var timer = setInterval(function() {
     		if (img.complete) {
     			callback(img);
     			clearInterval(timer);
     		}
     	}, 50);
     }
     imgLoad(img1, function() {
     	p1.innerHTML = '加载完毕';
     })*/

					/*alert($('.cardShareWrap .shareImgs img').length);
     for(var i=0; i<data.resp.imgs.length; i++){
     		}*/

					//所有分享图片加载出来之后展示container
					var totalImg = $('.cardShareWrap .shareImgs img').length;
					var currentImg = 0;
					if (totalImg == 0) {
						var windowHeight = $(window).height();
						var containerHeight = $('.container').height();
						if (containerHeight < windowHeight) {
							$('.loadingBox').hide();
							$('.container').css('marginTop', (windowHeight - containerHeight) / 2).show();
						} else {
							$('.loadingBox').hide();
							$('.container').show();
						}
					} else {
						$('.cardShareWrap .shareImgs img').on('load', function () {
							currentImg++;
							if (currentImg === totalImg) {
								//alert('所有图片加载完毕');
								var windowHeight = $(window).height();
								var containerHeight = $('.container').height();
								if (containerHeight < windowHeight) {
									$('.loadingBox').hide();
									$('.container').css('marginTop', (windowHeight - containerHeight) / 2).show();
								} else {
									$('.loadingBox').hide();
									$('.container').show();
								}
							}
						});
					}
				} else {
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		});
	},

	//客户端控制left, title, right
	clientControlFun: function clientControlFun() {

		//控制左上角
		if (getParamByUrl('webver') > 2) {
			var getPageInfo1 = function getPageInfo1() {
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
		} else {
			var getPageInfo2 = function getPageInfo2() {
				var data = {
					iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
					backNum: 1,
					closeWebview: 0, //默认为0
					iconUrl: "",
					hidden: false,
					isHandle: false,
					functionName: ""
				};
				return JSON.stringify(data);
			};
			if (deviceType == "isApp" && typeof mobileApp != "undefined") {
				mobileApp.showLeftBtn(getPageInfo2());
			}
			document.documentElement.style.webkitTouchCallout = 'none';
		}

		//截图分享
		//高版本
		if (getParamByUrl('webver') > 2) {
			var titleData = {
				iconType: 0,
				title: "分享",
				color: "",
				opacity: "",
				backgroundColor: "",
				backgroundOpacity: ""
			};
			titleData = JSON.stringify(titleData);
			appFc.controlTitle(titleData);

			//右上角
			var iconUrl = "";
			var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
			if (getParamByUrl("os") == "android") {
				iconUrl = iconShare[0];
			} else {
				iconUrl = iconShare[1];
			}
			var getPageInfo3 = function getPageInfo3() {
				var data5 = {
					iconType: 0, //0走图片逻辑，1走文案逻辑
					rightStr: {
						str: "",
						color: "",
						opacity: "",
						id: "0"
					},
					rightIcon: [{
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
							shareType: 2,
							shareBackgroundColor: "",
							shareTypeDesc: "",
							fatBurnName: ""
						}
					}]
				};
				return JSON.stringify(data5);
			};
			appFc.controlRight(getPageInfo3());
		} else {
			//低版本
			var getPageInfo4 = function getPageInfo4() {
				var data = {
					title: '分享',
					backgroundColor: '#2c2f31',
					isShare: true,
					shareTitle: '有品·燃脂营',
					shareUrl: "",
					shareIcon: '',
					shareDesc: '#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
					shareType: 2,
					shareTypeDesc: "",
					color: "",
					opacity: "",
					backgroundOpacity: ""
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp" && typeof mobileApp != "undefined") {
				mobileApp.getShareInfo(getPageInfo4());
			}
			document.documentElement.style.webkitTouchCallout = 'none';
		}
	}

});

var Component = React.createClass({
	displayName: "Component",


	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(CardShareContainer, null),
			React.createElement(Public_error, null)
		);
	}
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('cardShareBox'));

/***/ })

},[245]);