webpackJsonp([11],{

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);

var Public_loading1 = React.createClass({
	displayName: "Public_loading1",

	getInitialState: function getInitialState() {
		var me = this;
		return {
			loadingTime: ""
		};
	},
	startLoading: function startLoading() {
		//loading动画
		/*var me = this;*/
		var loadingIndex = 1;
		/*loadingTime=setInterval(function(){
      if(loadingIndex==$(".loading-point").length){
          loadingIndex=0;
      }
      $(".loading-point").removeClass("loading-point-active");
      $(".loading-point").eq(loadingIndex).addClass("loading-point-active");
      loadingIndex++; 
  		},300);*/
		this.setState({ loadingTime: setInterval(function () {
				if (loadingIndex == $(".loading-point").length) {
					loadingIndex = 0;
				}
				$(".loading-point").removeClass("loading-point-active");
				$(".loading-point").eq(loadingIndex).addClass("loading-point-active");
				loadingIndex++;
			}, 300) });
	},
	stopLoading: function stopLoading() {
		$(".loading-load").css("display", "none");
		clearInterval(this.state.loadingTime);
	},
	render: function render() {
		return React.createElement(
			"aside",
			{ className: "loading-load" },
			React.createElement("span", { className: "loading-point loading-point-active" }),
			React.createElement("span", { className: "loading-point" }),
			React.createElement("span", { className: "loading-point" })
		);
	}
});

module.exports = Public_loading1;

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
//数据错误提示
var Public_error = __webpack_require__(3);
var Public_loading1 = __webpack_require__(127);

var ShareInfo = React.createClass({
	displayName: "ShareInfo",

	getInitialState: function getInitialState() {
		var me = this;
		var titleData = {
			title: "分享",
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		titleData = JSON.stringify(titleData);
		appFc.controlTitle(titleData);
		me.getShare();
		me.getList();
		return {
			shareArr: []
		};
	},
	getShare: function getShare() {
		//右上角
		var iconUrl = "";
		var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
		if (getParamByUrl("os") == "android") {
			iconUrl = iconShare[0];
		} else {
			iconUrl = iconShare[1];
		}
		var getPageInfo2 = function getPageInfo2() {
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
		appFc.controlRight(getPageInfo2());
	},
	componentDidMount: function componentDidMount() {
		this.pStartLoading();
	},
	componentDidUpdate: function componentDidUpdate() {
		var os = getParamByUrl("os");
		if (os == "android") {
			$(".container").css("minHeight", $(window).height() - 70);
		} else {
			$(".container").css("minHeight", $(window).height() - 68);
		}

		if ($(".cardContainer").height() < parseInt($(".container").css("minHeight")) - 3 * fontHeight) {
			var marginTop = (parseInt($(".container").css("minHeight")) - $(".cardContainer").height()) * 0.2;
			$(".cardContainer").css("marginTop", marginTop);
		} else {
			$(".cardContainer").css("marginTop", "1.5rem");
			$(".cardContainer").css("marginBottom", "1.5rem");
		}

		this.pStopLoading();
		$(".cardContainer").css("display", "block");
		if ($(".info-content").height() == fontHeight * 2) {
			$(".info-content").css("text-align", "center");
		}
	},
	getList: function getList() {
		var me = this;
		//me.pStartLoading();
		/*loading();*/
		var finalUrl = ajaxLink + "/v1/api/camp/checkDetail" + window.location.search + "&type=1";
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.code == 200) {
					me.setState({ shareArr: data });
				} else {
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		});
	},
	pStartLoading: function pStartLoading() {
		var me = this;
		me.refs.getLoading.startLoading();
	},
	pStopLoading: function pStopLoading() {
		var me = this;
		me.refs.getLoading.stopLoading();
	},
	render: function render() {
		var me = this;
		var data = me.state.shareArr;
		var imgArr = [];
		var cardTop, cardUserInfo, cardInfo, cardBottom;
		if (typeof data.resp != "undefined") {
			//打卡分享头部
			if (data.resp.imgs.length > 0) {
				for (var i = 0; i < data.resp.imgs.length; i++) {
					var picWidth = $(window).width() - parseInt(3 * fontHeight);
					// if(i == 0){
					if (i == 0) {
						imgArr.push(React.createElement(
							"div",
							{ key: i, className: "col-xs-12 col-sm-12 pic-item pic-item-left pic-item-right" },
							React.createElement("img", { src: data.resp.imgs[i].url, style: { 'width': '100%' } })
						));
					} else {
						imgArr.push(React.createElement(
							"div",
							{ key: i, className: "col-xs-12 col-sm-12 pic-item" },
							React.createElement("img", { src: data.resp.imgs[i].url, style: { "width": "100%" } })
						));
					}
					{/* imgArr.push(<div key={i} className="col-xs-12 col-sm-12 pic-item pic-item-left pic-item-right" style={{backgroundImage:"url("+data.resp.imgs[i].url+")",height:picWidth*0.75}}></div>); */}
					{/* }else{
      imgArr.push(<div key={i} className="col-xs-12 col-sm-12 pic-item" style={{backgroundImage:"url("+data.resp.imgs[i].url+")",height:picWidth*0.75}}></div>);
      } */}
				}
				cardTop = React.createElement(
					"div",
					{ className: "row cardPic_item" },
					imgArr
				);
			} else {
				cardTop = React.createElement("div", { className: "row cardTop", style: { display: "block" } });
			}
			//打卡分享个人信息部分
			cardUserInfo = React.createElement(
				"div",
				{ className: "row cardHeader" },
				React.createElement("img", { src: data.resp.roleImg, onError: imgError.bind(this, data.resp.roleSex) }),
				React.createElement(
					"div",
					null,
					data.resp.roleName
				)
			);

			if (data.resp.content == "" || data.resp.content == null) {
				//打卡分享个人信息部分
				cardUserInfo = React.createElement(
					"div",
					{ className: "row cardHeader", style: { backgroundColor: "#00bfb3", color: "#fff" } },
					React.createElement("img", { src: data.resp.roleImg, onError: imgError.bind(this, data.resp.roleSex) }),
					React.createElement(
						"div",
						{ className: "shareLine" },
						data.resp.roleName
					)
				);
			} else {
				//打卡分享个人信息部分
				cardUserInfo = React.createElement(
					"div",
					{ className: "row cardHeader" },
					React.createElement("img", { src: data.resp.roleImg, onError: imgError.bind(this, data.resp.roleSex) }),
					React.createElement(
						"div",
						null,
						data.resp.roleName
					)
				);
				cardInfo = React.createElement(
					"div",
					{ className: "row cardInfo" },
					React.createElement("div", { className: "info-quote-left" }),
					React.createElement("div", { className: "info-content", dangerouslySetInnerHTML: { __html: data.resp.content } }),
					React.createElement("div", { className: "info-quote-right" })
				);
			}

			//打卡时间，打卡类型
			var cardType = ["早餐", "午餐", "晚餐", "加餐", "运动"];
			var cardBottom = React.createElement(
				"div",
				{ className: "row cardBottom" },
				React.createElement(
					"div",
					null,
					"\u6709\u54C1\u71C3\u8102\u8425 \u2022\xA0",
					React.createElement(
						"span",
						{ className: "cardType" },
						cardType[data.resp.type]
					),
					"\u6253\u5361"
				),
				React.createElement(
					"div",
					{ className: "cardTime" },
					data.resp.checkDay + " " + data.resp.checkTime
				)
			);
		}
		/*me.pStopLoading();
  $(".cardContainer").css("display","block");*/
		return React.createElement(
			"div",
			{ className: "container" },
			React.createElement(
				"div",
				{ className: "cardContainer" },
				React.createElement(
					"div",
					{ className: "row cardPic" },
					cardTop,
					cardUserInfo
				),
				cardInfo,
				cardBottom
			),
			React.createElement(Public_loading1, { ref: "getLoading" })
		);
	}
});

var Component = React.createClass({
	displayName: "Component",

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(ShareInfo, null),
			React.createElement(Public_error, null)
		);
	}
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('infoMain'));

/***/ })

},[218]);