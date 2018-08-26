webpackJsonp([34],{

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
//数据错误提示
var Public_error = __webpack_require__(3);

var publicData = {
	textNumLegal: true,
	textError: true,
	itemName: decodeURIComponent(decodeURIComponent(getParamByUrl("itemName"))),
	itemIndex: getParamByUrl("index"),
	itemValue: decodeURIComponent(getParamByUrl("itemValue")),
	theDevice: getParamByUrl("os"),
	errorText: "",
	hasUpdate: false
};

var SXiuGaiGeRenXinXi = {
	SCategory_SXiuGaiGeRenXinXi: 5060500,
	SXiuGaiGeRenXinXi_ShuRuKuangYi: 5060501, //输入框一
	SXiuGaiGeRenXinXi_ShuRuKuangEr: 5060502, //输入框二
	SXiuGaiGeRenXinXi_QingKongNeiRong: 5060503, //清空内容
	SXiuGaiGeRenXinXi_FangQiBaoCun: 5060504, //放弃保存
	SXiuGaiGeRenXinXi_QueRenBaoCun: 5060505, //确认保存
	SXiuGaiGeRenXinXi_DianjiBaoCun: 5060506 //点击保存
};
var EditInfo = React.createClass({
	displayName: "EditInfo",

	getInitialState: function getInitialState() {
		var me = this;
		window.getMessage = me.getMessage;
		me.leftControl(true, false);
		var title = "修改" + publicData.itemName;
		var titleData = {
			title: title,
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		titleData = JSON.stringify(titleData);
		appFc.controlTitle(titleData);
		return {};
	},
	componentDidMount: function componentDidMount() {
		var me = this;
		$(".editValue").bind("input propertychange", function () {
			var limit = 16;
			var str = $(this).val();
			var charLen;
			var byteLen = 0;
			var nowLen = str.length;
			var oldStrLen = me.getByteLen(publicData.itemValue);
			byteLen = me.getByteLen(str);

			console.info(byteLen);
			if (limit < byteLen) {
				publicData.textNumLegal = false;
				console.info(publicData.textNumLegal);
				//当内容属于过长，并且不是删除
				if (oldStrLen < byteLen) {
					publicData.errorText = "不能超过16个字符哦~";
					$(".fixbg1").text(publicData.errorText);
					$(".fixbg1").css("display", "block");
					setTimeout(function () {
						$(".fixbg1").css("display", "none");
					}, 2000);
				}
			} else {
				publicData.textNumLegal = true;
			}
			if (str.indexOf(",") >= 0 || str.indexOf("，") >= 0) {
				publicData.textError = false;
				publicData.errorText = "昵称不能有逗号哦~";
				$(".fixbg1").text(publicData.errorText);
				$(".fixbg1").css("display", "block");
				setTimeout(function () {
					$(".fixbg1").css("display", "none");
				}, 1000);
			} else {
				publicData.textError = true;
			}
			console.info(publicData.textNumLegal);
			oldStrLen = byteLen;
			publicData.hasUpdate = false;
		});
	},
	getByteLen: function getByteLen(val) {
		var len = 0;
		for (var i = 0; i < val.length; i++) {
			var a = val.charAt(i);
			if (a.match(/[^\x00-\xff]/ig) != null) {
				len += 2;
			} else {
				len += 1;
			}
		}
		return len;
	},
	deleteContent: function deleteContent() {
		setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi, SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_QingKongNeiRong);
		$(".editValue").val("");
		publicData.textNumLegal = true;
	},
	changeInfo: function changeInfo() {
		var me = this;
		setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi, SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_DianjiBaoCun);
		var userInfo = $(".editValue").val();
		var isUpdate = userInfo == publicData.itemValue ? false : true;
		//对原有内容有所修改（空或者修改内容）且合法（不超过限制字数）
		if (isUpdate && publicData.textNumLegal && publicData.textError) {
			//修改的内容是昵称
			if (publicData.itemIndex == 0) {
				userInfo = userInfo.replace(/ /g, "");
				//若用户清空昵称，并点击保存，则浮层提示“昵称不能为空哦~”，并停留在该页面，修改不生效；
				if (userInfo == null || userInfo == "") {
					publicData.errorText = "昵称不能为空哦~";
					$(".fixbg1").text(publicData.errorText);
					$(".fixbg1").css("display", "block");
					setTimeout(function () {
						$(".fixbg1").css("display", "none");
					}, 2000);
				}
				//如果用户昵称合法，提交修改
				else {
						me.updateInfo(publicData.itemIndex, userInfo);
					}
			}
			//修改的是职业和所在地
			else {
					me.updateInfo(publicData.itemIndex, userInfo);
				}
			/*leftControl(false,false);*/
		}
	},
	updateInfo: function updateInfo(itemIndex, itemValue) {
		var me = this;
		var updateName = "";
		if (itemIndex == 0) {
			updateName = "name";
		} else if (itemIndex == 1) {
			updateName = "career";
		} else if (itemIndex == 2) {
			updateName = "area";
		}
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/campStu/updateStudentInfo" + window.location.search + "&" + updateName + "=" + itemValue;
		console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.code == 200) {
					//getMessage();
					publicData.hasUpdate = true;
					me.leftControl(false, false);
					me.closePage();
				} else {
					$(".error-main-t").html(data.message);
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		});
	},
	closePage: function closePage() {
		var getPageInfo = function getPageInfo() {
			var data = {
				backNum: 1, //默认为1，
				closeWebview: 0 //默认为0
			};
			return JSON.stringify(data);
		};
		appFc.deleteHistory(getPageInfo());
		document.documentElement.style.webkitTouchCallout = 'none';
	},
	//左上角关闭页面时控制返回按钮
	leftControl: function leftControl(isHandle, isHidden) {

		var me = this;
		var getPageInfo = function getPageInfo() {
			var data = {
				iconType: 0,
				iconColor: "",
				backNum: 1,
				closeWebview: 0,
				hidden: isHidden,
				isHandle: isHandle,
				functionName: "getMessage"
			};
			return JSON.stringify(data);
		};
		appFc.controlLeft(getPageInfo());
	},
	getMessage: function getMessage() {
		var me = this;

		if (publicData.theDevice == "android") {
			$(".editValue").blur();
		} else {
			me.inputBlur();
		}

		var hasContent = $(".editValue").val().length > 0 ? true : false;
		var isUpdate = $(".editValue").val() == publicData.itemValue ? false : true;
		//有内容没保存(内容不为空，已经做修改，输入内容合法)
		if (hasContent && isUpdate && publicData.textNumLegal) {
			me.leftControl(false, true);
			$(".fixbg").css("display", "block");
			$(".fixbg-main-btn1").click(function () {
				setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi, SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_FangQiBaoCun);
				$(".fixbg").css("display", "none");
				me.leftControl(false, false);
				me.closePage();
			});
			$(".fixbg-main-btn2").click(function () {
				setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi, SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_QueRenBaoCun);
				$(".fixbg").css("display", "none");
				$(".editBtn").click();
			});
		} else {
			me.leftControl(false, false);
			me.closePage();
		}

		/*if(theDevice == "android"){
  	$(".editValue").blur();
  }else{
  	$(".beforeValue").click(function(){
  		$(".editValue").blur();
  	});
  	$(".beforeValue").click();
  }
  
  
  var hasContent=$(".editValue").val().length>0 ? true:false;
  var isUpdate=$(".editValue").val() == $(".beforeValue").val() ? false:true;
  //有内容没保存(内容不为空，已经做修改，输入内容合法)
  if(hasContent && isUpdate && textNumLegal){
  	leftControl(false,true);
  	$(".fixbg").css("display","block");
  	$(".fixbg-main-btn1").click(function(){
  		setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_FangQiBaoCun);
  		$(".fixbg").css("display","none");
  		leftControl(false,false);
  		closePage();
  	});
  	$(".fixbg-main-btn2").click(function(){
  		setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_QueRenBaoCun);
  		$(".fixbg").css("display","none");
  		$(".editBtn").click();
  	});
  }else{
  	leftControl(false,false);
  	closePage();
  }*/
	},
	inputBlur: function inputBlur() {
		$(".editValue").blur();
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "container" },
			React.createElement(
				"div",
				{ className: "row content" },
				React.createElement(
					"div",
					{ className: "col-xs-11 col-sm-11" },
					React.createElement("input", { type: "text", className: "editValue", defaultValue: publicData.itemValue }),
					React.createElement("input", { type: "text", onClick: this.inputBlur, style: { display: "none" } })
				),
				React.createElement(
					"div",
					{ className: "col-xs-1 col-sm-1", onClick: this.deleteContent },
					React.createElement("img", { src: "image/studentInfo/delete.png" })
				)
			),
			React.createElement(
				"div",
				{ className: "editBtn", onClick: this.changeInfo },
				"\u4FDD\u5B58"
			)
		);
	}
});

var SaveInfo = React.createClass({
	displayName: "SaveInfo",

	render: function render() {
		return React.createElement(
			"aside",
			{ className: "row fixbg" },
			React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 fixbg-main" },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 fixbg-main-t" },
						"\u60A8\u8F93\u5165\u7684\u4FE1\u606F\u8FD8\u6CA1\u6709\u4FDD\u5B58\uFF0C\u73B0\u5728\u8981\u4FDD\u5B58\u5417\uFF1F"
					),
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 fixbg-main-btn" },
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "col-xs-6 col-sm-6 fixbg-main-btn1" },
								"\u653E\u5F03"
							),
							React.createElement(
								"div",
								{ className: "col-xs-6 col-sm-6 fixbg-main-btn2" },
								"\u4FDD\u5B58"
							)
						)
					)
				)
			)
		);
	}
});

var ErrorInfo = React.createClass({
	displayName: "ErrorInfo",

	render: function render() {
		return React.createElement("aside", { className: "fixbg1" });
	}
});

var Component = React.createClass({
	displayName: "Component",

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(EditInfo, null),
			React.createElement(ErrorInfo, null),
			React.createElement(SaveInfo, null),
			React.createElement(Public_error, null)
		);
	}
});
ReactDOM.render(React.createElement(Component, null), document.getElementById('editInfoMain'));

/***/ })

},[210]);