var React = require("react");
var ReactDOM = require("react-dom");
var Public_Error = require('./Public_error.jsx');
var PubSub = require("pubsub-js");
var Public_BIGImg = require('./Public_bigImg.jsx');
var Fc_bindBigImg = require('./Fc_bindBigImg.jsx')

var frontdefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-m.png"];
var sidedefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-m.png"];
// 设置图片存储对对象
var publicData = {
	objImg: {
		'LeftBigIMG1': [],
		'LeftBigIMG2': [],
		'RightBigIMG1': [],
		'RightBigIMG2': [],
	}
};
window.publicData = publicData;
var campId = getParamByUrl("campId");
var roleId = getParamByUrl("roleId");
var SWoDeShenCaiDuiBi = {
	SCategory_SWoDeShenCaiDuiBi: 5061100,
	SWoDeShenCaiDuiBi_TiaoZhuanWoDeXiangCe: 5061101,//跳转我的相册
	SWoDeShenCaiDuiBi_TiaoZhuanShangChuanZhaoPian: 5061102,//跳转上传照片
	SWoDeShenCaiDuiBi_TuPianYuLan: 5061103,//图片预览
};

var PhoneBody = React.createClass({
	getInitialState: function () {
		return {
			day1: '',
			datetime1: '',
			firstweight: '',
			firstfat: '',
			firstwaist: '',
			day2: '',
			datetime2: '',
			lastweight: '',
			lastfat: '',
			lastwaist: ''

		}
	},
	componentWillMount: function () {

		var finalUrl = ajaxLink + "/v1/api/campCommon/compareTOPicture" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;
		//获取身材对比数据
		this.serverRequest = $.get(finalUrl, function (data) {
			if (data.code == 200) {
				console.log(data)
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
						} else { }
						if (data.resp.campPictureLast.fat == "" || data.resp.campPictureLast.fat == null) {
							data.resp.campPictureLast.fat = "--";
						} else { }
						if (data.resp.campPictureLast.waistMeasure == "" || data.resp.campPictureLast.waistMeasure == null) {
							data.resp.campPictureLast.waistMeasure = "--";
						} else { }
						if (data.resp.campPictureLast.frontPicture == "" || data.resp.campPictureLast.frontPicture == null) {
							data.resp.campPictureLast.frontPicture = defaultFrontUrl;
						}
						if (data.resp.campPictureLast.facePicture == "" || data.resp.campPictureLast.facePicture == null) {
							data.resp.campPictureLast.facePicture = defaultSideUrl;
						}
						this.setState({
							day1: data.resp.campPictureLast.day,
							datetime1: data.resp.campPictureLast.time,
							firstweight: data.resp.campPictureLast.weight,
							firstfat: data.resp.campPictureLast.fat,
							firstwaist: data.resp.campPictureLast.waistMeasure
						});
						publicData.objImg['LeftBigIMG1'].push({ 'url': data.resp.campPictureLast.frontPicture });
						publicData.objImg['LeftBigIMG2'].push({ 'url': data.resp.campPictureLast.facePicture });
						console.log(data.resp.campPictureLast);
						$(".partLeft-img-li1").css("background-image", 'url(' + data.resp.campPictureLast.frontPicture + '@500h_500w_1e)');
						$(".partLeft-img-li2").css("background-image", 'url(' + data.resp.campPictureLast.facePicture + '@500h_500w_1e)');

					} else { }
					if (data.resp.campPictureFirst) {
						if (data.resp.campPictureFirst.weight == "" || data.resp.campPictureFirst.weight == null) {
							data.resp.campPictureFirst.weight = "--";
						} else { }
						if (data.resp.campPictureFirst.fat == "" || data.resp.campPictureFirst.fat == null) {
							data.resp.campPictureFirst.fat = "--";
						} else { }
						if (data.resp.campPictureFirst.waistMeasure == "" || data.resp.campPictureFirst.waistMeasure == null) {
							data.resp.campPictureFirst.waistMeasure = "--";
						} else { }
						if (data.resp.campPictureFirst.frontPicture == "" || data.resp.campPictureFirst.frontPicture == null) {
							data.resp.campPictureFirst.frontPicture = defaultFrontUrl;
						} else { }
						if (data.resp.campPictureFirst.facePicture == "" || data.resp.campPictureFirst.facePicture == null) {
							data.resp.campPictureFirst.facePicture = defaultSideUrl;
						} else { }
						this.setState({
							day2: data.resp.campPictureFirst.day,
							datetime2: data.resp.campPictureFirst.time,
							lastweight: data.resp.campPictureFirst.weight,
							lastfat: data.resp.campPictureFirst.fat,
							lastwaist: data.resp.campPictureFirst.waistMeasure
						});
						publicData.objImg['RightBigIMG1'].push({ 'url': data.resp.campPictureFirst.frontPicture });
						publicData.objImg['RightBigIMG2'].push({ 'url': data.resp.campPictureFirst.facePicture });

						$(".partRight-img-li3").css("background-image", 'url(' + data.resp.campPictureFirst.frontPicture + ')');
						$(".partRight-img-li4").css("background-image", 'url(' + data.resp.campPictureFirst.facePicture + ')');

						$(".changeContent").css("width", window.innerWidth * 182 / 750);
						$(".changeContent").css("top", $(".partRight-img-li3").height() - $(".changeContent").height() / 2 - 8);
						$(".changeContent").css("left", $(".partRight-img-li3").width() - $(".changeContent").width() / 2);
						if ($(".container").height() < $(window).height()) {
							$(".container").css("height", $(window).height());
						}
					} else { }
				}

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
		$(".part-img-li").css("height", $(".part-img-li").width() * 500 / 376);
		$(".bodyChange").css("height", $(".partLeft").height());
	},
	render: function () {
		var day1 = this.state.day1,
			datetime1 = this.state.datetime1,
			firstweight = this.state.firstweight,
			firstfat = this.state.firstfat,
			firstwaist = this.state.firstwaist,
			day2 = this.state.day2,
			datetime2 = this.state.datetime2,
			lastweight = this.state.lastweight,
			lastfat = this.state.lastfat,
			lastwaist = this.state.lastwaist;
		return (
			<aside className="bodyChange" ref='bodyChange'>
				<aside className="row col-xs-6 col-sm-6 partLeft" ref='partLeft'>
					<div className="col-xs-12 col-sm-12 part-img-li partLeft-img-li1" objimg="img2" ref='part_img_li' onClick={Fc_bindBigImg.bindBigImg} data-obj_img='LeftBigIMG1'>
						<div className="date-content">
							<div className="day">DAY<span id="day1">{day1}</span></div>
							<div className="datetime" id="datetime1">{datetime1}</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 part-img-li partLeft-img-li2" objimg="img2" onClick={Fc_bindBigImg.bindBigImg} data-obj_img='LeftBigIMG2'>
					</div>
				</aside>
				<aside className="row col-xs-6 col-sm-6 partRight">
					<div className="col-xs-12 col-sm-12 part-img-li partRight-img-li3" objimg="img2" onClick={Fc_bindBigImg.bindBigImg} data-obj_img='RightBigIMG1'>
						<div className="date-content">
							<div className="day">DAY<span id="day2">{day2}</span></div>
							<div className="datetime" id="datetime2">{datetime2}</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 part-img-li partRight-img-li4" objimg="img2" onClick={Fc_bindBigImg.bindBigImg} data-obj_img='RightBigIMG2'>
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
var PhoneContainer = React.createClass({
	getInitialState: function () {
		var titleData = {
			title: '身材对比',
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		titleData = JSON.stringify(titleData);
		appFc.controlTitle(titleData);

		var getPageInfo = function () {
			var iconUrl = '';
			if (getParamByUrl("os") == "android") {
				iconUrl = "https://cdn2.picooc.com/web/res/event/chrome/android_share.png";
			} else {
				iconUrl = "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png";
			}
			var data = {
				iconType: 0,//0走图片逻辑，1走文案逻辑
				rightStr: {
					str: "",
					color: "",
					opacity: "",
					id: "0"
				},
				rightIcon: [
					{
						type: "0",
						id: "2",
						functionName: "getControl",
						iconUrl: iconUrl,
						iconName: "分享",
						redDotType: "1",
						redDotShow: false,
						redDotNum: "0",
						nativeType: "",
						content: ""
					}
				]
			};
			return JSON.stringify(data);
		};
		window.getPageInfo = getPageInfo;
		appFc.controlRight(getPageInfo());
		window.getControl = getControl;
		function getControl() {
			var data = {
				link: absoluteUrl + "figureContrastShare.html" + window.location.search,
				animation: 2//默认1从右到左，2从下到上
			};
			data = JSON.stringify(data);
			appFc.openWebview(data);
		}
		return {
			bigImgArr: []
		}
	},
	componentDidMount: function () {
		PubSub.subscribe('bigImgData', function (ev, bigImgDate) {
			this.setState({
				bigImgArr: bigImgDate
			});
		}.bind(this));
	},
	myPhoneClick: function (event) {
		event.stopPropagation();
		var ele = event.currentTarget;
		$(ele).css("opacity", "0.6");
		setCookie("toPhoto", 0, 1);
		$(ele).attr("href", "photoAlbum.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId);
		event.stopPropagation();
		setMaiDian(SWoDeShenCaiDuiBi.SCategory_SWoDeShenCaiDuiBi, SWoDeShenCaiDuiBi.SWoDeShenCaiDuiBi_TiaoZhuanWoDeXiangCe);
	},
	upLoadClick: function (event) {
		event.stopPropagation();
		var ele = event.currentTarget;
		$(ele).css("opacity", "0.6");
		setCookie("uploadurl", 1, 1); //跳转到上传照片页面的标识
		$(ele).attr("href", "figureContrast.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId+"&uploadurl=1");
		setMaiDian(SWoDeShenCaiDuiBi.SCategory_SWoDeShenCaiDuiBi, SWoDeShenCaiDuiBi.SWoDeShenCaiDuiBi_TiaoZhuanShangChuanZhaoPian);
	},
	render: function () {
		var bigImgArr = this.state.bigImgArr;
		var obj_bigImg;
		if (bigImgArr != '') {
			obj_bigImg = <Public_BIGImg bigImgArr={this.state.bigImgArr} />;
		}
		else {
			obj_bigImg = <i></i>;
		}
		return (
			<div>
				<section className="container">
					<PhoneBody />
					<div style={{ "clear": "both" }}></div>
					<div className="buttons">
						<a className="button1" onClick={this.myPhoneClick}>我的相册</a>
						<a className="button2" onClick={this.upLoadClick}>上传照片</a>
					</div>
					{obj_bigImg}
				</section>
				<Public_Error />
				<div className="saveImg-ceng">
					<aside className="row saveImg">
						<div className="col-xs-12 col-sm-12 saveImg-btn saveImg-item" onClick={Fc_bindBigImg.saveImgBtnTouchStart}>保存图片</div>
						<div className="col-xs-12 col-sm-12 cancelImg-btn saveImg-item" onClick={Fc_bindBigImg.cancelImgBtnTouchStart}>取消</div>
					</aside>
				</div>
			</div>
		)
	}
});
ReactDOM.render(<PhoneContainer />, document.getElementById('phoneBox'));








