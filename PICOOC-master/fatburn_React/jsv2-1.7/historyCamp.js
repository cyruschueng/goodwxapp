webpackJsonp([32],{

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);
var CampStateContainer = React.createClass({
	displayName: "CampStateContainer",


	getInitialState: function getInitialState() {
		var me = this;
		me.historyCampFun();
		var titleData = {
			title: "历史燃脂营",
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		titleData = JSON.stringify(titleData);
		appFc.controlTitle(titleData);

		return {
			historyCampData: {}
		};
	},

	historyCampFun: function historyCampFun() {
		var me = this;
		var historyCampUrl = ajaxLink + "/v1/api/campStu/getCampHistory" + window.location.search;
		//var historyCampUrl = "http://172.17.1.233:8080/v1/api/campStu/getCampHistory" + window.location.search;
		$.ajax({
			type: 'get',
			url: historyCampUrl,
			success: function success(data) {
				if (data.code == 200) {
					console.log(historyCampUrl);
					console.log('历史燃脂营', data);
					me.setState({
						historyCampData: data
					});
				} else {
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}

				$('.common .right').each(function (index) {
					$('.common .right').eq(index).css('height', $('.common .right').eq(index).siblings('.left').height());
				});
			},
			error: function error() {
				$(".error-main-t").html(data.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		});
	},

	render: function render() {
		var me = this;
		var data = me.state.historyCampData;
		if (typeof me.state.historyCampData.resp != "undefined") {
			var historyArr = data.resp;
			var historyList = [];
			historyArr.map(function (item, index) {
				historyList.push(React.createElement(
					"aside",
					{ className: "row common marginBottom", key: index, onClick: me.goToHistory, "data-id": item.id },
					React.createElement(
						"div",
						{ className: "col-xs-6 col-sm-6 left" },
						React.createElement(
							"span",
							{ className: "leftText" },
							item.name
						)
					),
					React.createElement(
						"div",
						{ className: "col-xs-6 col-sm-6 right" },
						React.createElement(
							"div",
							{ className: "rightInner" },
							React.createElement(
								"span",
								{ className: "rightText" },
								item.beginTime,
								"-",
								item.endTime
							),
							React.createElement("img", { className: "rightImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/confirmOrder/more.png" })
						)
					)
				));
			});

			var myFatBurnStr = React.createElement(
				"section",
				{ className: "container", style: { display: "block" } },
				historyList
			);
		}
		return React.createElement(
			"div",
			null,
			myFatBurnStr
		);
	},
	componentDidMount: function componentDidMount() {
		var me = this;
	},

	goToHistory: function goToHistory(event) {

		var me = this;
		var data = me.state.historyCampData;
		var id = event.currentTarget.getAttribute("data-id");
		var url = "student.html" + window.location.search + "&targetCampId=" + id + "&campId=" + id;
		if (isOutApp() || getParamByUrl("testtype") == "tanchao") {
			window.location.href = url;
		} else {
			var data2 = {
				link: absoluteUrl + "student.html" + window.location.search + "&targetCampId=" + id + "&campId=" + id,
				animation: 1 //默认1从右到左，2从下到上
			};
			data2 = JSON.stringify(data2);
			appFc.openWebview(data2);
		}
		//window.location.href = "student.html" + window.location.search + "&targetCampId="+id + "&campId=" + id;
	}
});

var Component = React.createClass({
	displayName: "Component",

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(CampStateContainer, null),
			React.createElement(Public_error, null)
		);
	}
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('campStateBox'));

/***/ })

},[215]);