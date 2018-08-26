var React = require("react");
var ReactDOM = require("react-dom");
var PubSub = require("pubsub-js");
var Public_Error = require('./Public_error.jsx');
// 无图时默认显示
var frontdefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-m.png"];
var sidedefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-m.png"];

var campId = getParamByUrl("campId");
var roleId = getParamByUrl("roleId");

var PartTop = React.createClass({
	getInitialState: function () {
		return {
			username: '',
			headImg: ''
		}
	},

	componentWillMount: function () {
		var finalUrl = ajaxLink + "/v1/api/campStu/getBodyChange" + window.location.search + "&targetRoleId=" + roleId;

		this.serverRequest = $.get(finalUrl, function (data) {
			if (data.code == 200) {
				//用户昵称显示
				if (data.resp.title.name) {
					var username = data.resp.title.name;
				} else {
					var username = '';
				}
				//用户头像显示
				if (data.resp.title.head && data.resp.title.head != "") {
					var headImg = data.resp.title.head;
				} else {
					var headImg = arrHeadImg[data.resp.title.sex];
				}
				// 存储数据
				this.setState({
					username: username,
					headImg: headImg
				});
			}
			else {
				$(".error-main-t").html(data.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}.bind(this));
	},
	componentWillUnmount: function () {
		this.serverRequest.abort();
	},
	componentDidMount: function () {
		$(".partTop").css("height", $(".partTop").width() * 845 / 1242);
		$(".partTop-content").css("margin-top", $(".partTop").height() * 110 / 510);
		$(".headimg").css("height", $(".headimg").width());
		$(".line").css("height", $(".line").width() * 7 / 527);
	},
	render: function () {
		var now = new Date();
		// var year = now.getFullYear();       //年
		var month = now.getMonth() + 1;     //月
		var day = now.getDate();            //日
		var hh = now.getHours();            //时
		var mm = now.getMinutes();          //分
		var checkDay = "";
		var checkTime = "";
		if (month < 10) {
			month = "0" + month + "月";
		} else {
			month = month + "月";
		}
		if (day < 10) {
			day = "0" + day + "日";
		} else {
			day = day + "日";
		}
		checkDay = month + day;
		if (hh < 10) {
			hh = "0" + hh;
		}
		if (mm < 10) {
			mm = '0' + mm;
		};
		checkTime = hh + ":" + mm;

		var username = this.state.username,
			headImg = this.state.headImg;
		return (
			<aside className="row partTop">
				<div className="partTop-content">
					<div className="headimg" style={{ 'backgroundImage': 'url(' + headImg + ')', 'backgroundSize': '100% 100%' }}></div>
					<div className="username">{username}</div>
					<div className="theme">有品燃脂营•身材对比</div>
					<div className="line"></div>
					<div>
						<span className="date">{checkDay}</span><span className="time">{checkTime}</span>
					</div>
				</div>
			</aside>
		)
	}
});

var BodyChange = React.createClass({
	getInitialState: function () {
		return {
			day1: '',
			datetime1: '',
			leftImg1: '',
			leftImg2: '',
			firstweight: '',
			firstfat: '',
			firstwaist: '',
			day2: '',
			datetime2: '',
			rightImg1: '',
			rightImg2: '',
			lastweight: '',
			lastfat: '',
			lastwaist: ''
		}
	},
	componentWillMount: function () {
		var finalUrl = ajaxLink + "/v1/api/campCommon/compareTOPicture" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;
		this.serverRequest = $.get(finalUrl, function (data) {
			console.log(data);
			if (data.code == 200) {
				if (data.resp.sex == 0) {
					var defaultFrontUrl = frontdefaultImg[0];
					var defaultSideUrl = sidedefaultImg[0];
				} else {
					var defaultFrontUrl = frontdefaultImg[1];
					var defaultSideUrl = sidedefaultImg[1];
				}
				if (data.resp != "") {
					if (data.resp.campPictureLast) {
						if (data.resp.campPictureLast.weight == "" || data.resp.campPictureLast.weight == null) {
							data.resp.campPictureLast.weight = "--";
						}
						if (data.resp.campPictureLast.fat == "" || data.resp.campPictureLast.fat == null) {
							data.resp.campPictureLast.fat = "--";
						}
						if (data.resp.campPictureLast.waistMeasure == "" || data.resp.campPictureLast.waistMeasure == null) {
							data.resp.campPictureLast.waistMeasure = "--";
						}
						if (data.resp.campPictureLast.frontPicture == "" || data.resp.campPictureLast.frontPicture == null) {
							data.resp.campPictureLast.frontPicture = defaultFrontUrl;
						}
						if (data.resp.campPictureLast.facePicture == "" || data.resp.campPictureLast.facePicture == null) {
							data.resp.campPictureLast.facePicture = defaultSideUrl;
						}
						this.setState({
							day1: data.resp.campPictureLast.day,
							datetime1: data.resp.campPictureLast.time,
							leftImg1: data.resp.campPictureLast.frontPicture,
							leftImg2: data.resp.campPictureLast.facePicture,
							firstweight: data.resp.campPictureLast.weight,
							firstfat: data.resp.campPictureLast.fat,
							firstwaist: data.resp.campPictureLast.waistMeasure
						});
					}
					if (data.resp.campPictureFirst) {
						var isscale1 = "getImg-bg";
						var isscale2 = "getImg-bg";
						if (data.resp.campPictureFirst.weight == "" || data.resp.campPictureFirst.weight == null) {
							data.resp.campPictureFirst.weight = "--";
						}
						if (data.resp.campPictureFirst.fat == "" || data.resp.campPictureFirst.fat == null) {
							data.resp.campPictureFirst.fat = "--";
						}
						if (data.resp.campPictureFirst.waistMeasure == "" || data.resp.campPictureFirst.waistMeasure == null) {
							data.resp.campPictureFirst.waistMeasure = "--";
						}
						if (data.resp.campPictureFirst.frontPicture == "" || data.resp.campPictureFirst.frontPicture == null) {
							data.resp.campPictureFirst.frontPicture = defaultFrontUrl;
						}
						if (data.resp.campPictureFirst.facePicture == "" || data.resp.campPictureFirst.facePicture == null) {
							data.resp.campPictureFirst.facePicture = defaultSideUrl;
						} 
						this.setState({
							day2: data.resp.campPictureFirst.day,
							datetime2: data.resp.campPictureFirst.time,
							rightImg1: data.resp.campPictureFirst.frontPicture,
							rightImg2: data.resp.campPictureFirst.facePicture,
							lastweight: data.resp.campPictureFirst.weight,
							lastfat: data.resp.campPictureFirst.fat,
							lastwaist: data.resp.campPictureFirst.waistMeasure
						});

					}
				}
			}
			else {
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);

			}
		}.bind(this));
	},
	componentWillUnmount: function () {
		this.serverRequest.abort();
	},
	componentDidMount: function () {
		$(".part-img-li").css("height", $(".part-img-li").width() * 500 / 376);
		$(".bodyChange").css("height", $(".partLeft").height());
		$(".changeContent").css("width", window.innerWidth * 182 / 750);
		$(".changeContent").css("top", $(".partRight-img-li3").height() - $(".changeContent").height() / 2 - 8);
		$(".changeContent").css("left", $(".partRight-img-li3").width() - $(".changeContent").width() / 2);
	},
	render: function () {
		var day1 = this.state.day1,
			datetime1 = this.state.datetime1,
			leftImg1 = this.state.leftImg1,
			leftImg2 = this.state.leftImg2,
			firstweight = this.state.firstweight,
			firstfat = this.state.firstfat,
			firstwaist = this.state.firstwaist,
			day2 = this.state.day2,
			datetime2 = this.state.datetime2,
			rightImg1 = this.state.rightImg1,
			rightImg2 = this.state.rightImg2,
			lastweight = this.state.lastweight,
			lastfat = this.state.lastfat,
			lastwaist = this.state.lastwaist;
		return (
			<aside className="bodyChange">
				<aside className="row col-xs-6 col-sm-6 partLeft">

					<div className="col-xs-12 col-sm-12 part-img-li partLeft-img-li1" objimg="img2" objimgindex="0" style={{ 'backgroundImage': 'url(' + leftImg1 + ')' }}>
						<div className="date-content">
							<div className="day">DAY<span id="day1">{day1}</span></div>
							<div className="datetime" id="datetime1">{datetime1}</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 part-img-li partLeft-img-li2" objimg="img2" objimgindex="0" style={{ 'backgroundImage': 'url(' + leftImg2 + ')' }}>
					</div>

				</aside>
				<aside className="row col-xs-6 col-sm-6 partRight">
					<div className="col-xs-12 col-sm-12 part-img-li partRight-img-li3" objimg="img2" objimgindex="0" style={{ 'backgroundImage': 'url(' + rightImg1 + ')' }}>
						<div className="date-content">
							<div className="day">DAY<span id="day2">{day2}</span></div>
							<div className="datetime" id="datetime2">{datetime2}</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 part-img-li partRight-img-li4" objimg="img2" objimgindex="0" style={{ 'backgroundImage': 'url(' + rightImg2 + ')' }}>
					</div>
				</aside>
				<div className="changeContent">
					<div className="weightKg">体重[KG]</div>
					<div><span className="span-left" id='firstweight'>{firstweight}</span>|<span className="span-right" id="lastweight">{lastweight}</span></div>
					<div className="fattt">脂肪[%]</div>
					<div><span className="span-left" id="firstfat">{firstfat}</span>|<span className="span-right" id="lastfat">{lastfat}</span></div>
					<div className="waistCm">腰围[CM]</div>
					<div><span className="span-left" id="firstwaist">{firstwaist}</span>|<span className="span-right" id="lastwaist">{lastwaist}</span></div>
				</div>
			</aside>
		)
	}
});

var PartBottom = React.createClass({
	componentDidMount: function () {
		$(".partBottom").css("height", $(".partBottom").width() * 357 / 1242);

	},
	render: function () {

		return (
			<aside className="row partBottom">
				<span className="fatburnTag"></span>
				<span className="fatburnArticle">
					<span className="fatburnArticle1" style={{ "fontSize": "1.0625rem", "color": "#fff" }}>有品•燃脂营</span><br></br>
					<span className="fatburnArticle2" style={{ "fontSize": "0.8125rem", "color": "#fff" }}>随时减脂有效塑形</span>
				</span>
				<div className="two-dimension">
					<span className="erwei"></span><br></br>
					<span style={{ 'fontSize': '0.625rem', 'color': '#fff' }}>长按二维码关注</span>
				</div>
			</aside>
		)
	}
});

var PhotoShareBox = React.createClass({
	render: function () {
		shareInfo();
		return (
			<div>
				<section className="container">
					<PartTop />
					<BodyChange />
					<PartBottom />
					<div className="backall"></div>
				</section>
				<Public_Error />
			</div>
		)
	}
});

ReactDOM.render(<PhotoShareBox />, document.getElementById('photoShareBox'));

//关闭webview
function closeWebview() {
	var getPageInfo = function () {
		var data = {
			backNum: 1,//默认为1，
			closeWebview: 0,//默认为0
		};
		return JSON.stringify(data);
	};
	var deviceType = isMobile();
	if (deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")) {
		appFc.deleteHistory(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout = 'none';
}

//截图分享
function shareInfo() {
	var getPageInfo = function () {
		var data = {
			title: '分享',
			/*backgroundColor:'#2c2f31',
			isShare:true,
			shareTitle:'有品·燃脂营',
			shareUrl:"",
			shareIcon:'',
			shareDesc:'#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
			shareType:2,
			shareTypeDesc:""*/
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		return JSON.stringify(data);
	};
	var deviceType = isMobile();
	if (deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")) {
		appFc.controlTitle(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout = 'none';

	//右上角
	var iconUrl = "";
	var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
	if (getParamByUrl("os") == "android") {
		iconUrl = iconShare[0];
	}
	else {
		iconUrl = iconShare[1];
	}
	var getPageInfo2 = function () {
		var data5 = {
			iconType: 0,//0走图片逻辑，1走文案逻辑
			rightStr: {
				str: "",
				color: "",
				opacity: "",
				id: "0"
			},
			rightIcon: [
				{
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
}
