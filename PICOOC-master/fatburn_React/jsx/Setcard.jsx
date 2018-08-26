var React = require("react");
var ReactDOM = require("react-dom");

var Public_error = require('./Public_error.jsx');
var Fc_bindBigImg = require("./Fc_bindBigImg.jsx");
var Public_bigImg = require('./Public_bigImg.jsx');
var Version = require("./Version.jsx");
var SXueYuanDaKa = {
	SCategory_SXueYuanDaKa: 5060300,
	SXueYuanDaKa_ShuRuKuang: 5060301,//输入框
	SXueYuanDaKa_TianJiaTuPian: 5060302,//添加图片
	SXueYuanDaKa_XianShiYuLanTu: 5060303,//显示预览图
	SXueYuanDaKa_BaoCunTuPian: 5060304,//保存图片
	SXueYuanDaKa_QuXiaoBaoCunTuPian: 5060305,//取消保存图片
	SXueYuanDaKa_ShanChuTuPian: 5060306,//删除图片
	SXueYuanDaKa_XuanZeDaKaBiaoQian: 5060307,//选择打卡标签
	SXueYuanDaKa_DianJiDaKa: 5060308,//点击打卡
	SXueYuanDaKa_ShouYeDianJiDaKa: 5060309,//从首页过来点击打卡
};


//部分页面公用参数
var publicData = {
	cardType: ["早餐", "午餐", "晚餐", "加餐", "运动"],
	arrbg1: ["image/setcard/setcard-2.png", "image/setcard/setcard-3.png", "image/setcard/setcard-4.png", "image/setcard/setcard-5.png", "image/setcard/setcard-7.png"],
	arrbg2: ["image/setcard/setcard-31.png", "image/setcard/setcard-32.png", "image/setcard/setcard-33.png", "image/setcard/setcard-34.png", "image/setcard/setcard-36.png"],
	arrbg3: [],
	objImg: {},//图片预览对象
	btnShow: false,
	loadImg: [],
	focusBtn: false,
	btnType: 0,
	arrgetImg: 0,
	imgMaxNum: 6
}
window.publicData = publicData;
var imgUrls = ["http://cdn2.picooc.com/ranzhiying/201703/09/20170309_17254386576474.png@300h_300w_1e", "http://cdn2.picooc.com/ranzhiying/201703/09/20170309_17254387635643.png@300h_300w_1e"];
/*getImg(imgUrls);*/

var CardContainer = React.createClass({
	getInitialState: function () {
		var me = this;
		window.getImg = me.getImg;
		var titleData = {
			title: "打卡",
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		titleData = JSON.stringify(titleData);
		appFc.controlTitle(titleData);
		me.leftControl();
		return {
			imgArr: "",
			bigImgArr: ""
		}
	},
	selectTag: function (index) {
		var me = this;
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_XuanZeDaKaBiaoQian);
		publicData.btnType = index;
		if (publicData.arrbg3.length != 0) {
			$(".icon").eq(publicData.arrbg3[0]).find("img").attr("src", publicData.arrbg1[publicData.arrbg3[0]]);
		}
		publicData.arrbg3[0] = index;
		$(".icon").eq(index).find("img").attr("src", publicData.arrbg2[index]);
		me.showBtn();
	},
	showBtn: function () {
		if ((publicData.arrbg3.length > 0 && $(".getImg-img").length > 0) || (publicData.arrbg3.length > 0 && $.trim($("#msgInfo").val()).replace(/[ ]/g, "").length > 0)) {
			publicData.btnShow = true;
			$(".footbtn-btn").css("background", "#ffc36e");
		}
		else {
			publicData.btnShow = false;
			$(".footbtn-btn").css("background", "#bbb");
		}
	},
	msgInfoFocus: function () {
		publicData.focusBtn = true;
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_ShuRuKuang);
	},
	msgInfoBlur: function () {
		var t3 = setTimeout(function () {
			publicData.focusBtn = false;
			clearTimeout(t3);
		}, 100);
	},
	getImgBg: function () {
		var me = this;
		me.msgInfoBlur();
		//getImg(imgUrls);
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_TianJiaTuPian);
		if (getParamByUrl("testtype") == "tanchao") {
			getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-21.png", "http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
		}
		//alert("添加前："+publicData.imgMaxNum);
		if (publicData.focusBtn) {
			console.log(1);
			var t2 = setTimeout(function () {
				var data = {
					maxNum: publicData.imgMaxNum//上传图片的最大个数
				}

				data = JSON.stringify(data);
				appFc.uploadImg(data);

				clearTimeout(t2);
			}, 250);
		} else {

			var data = {
				maxNum: publicData.imgMaxNum//上传图片的最大个数
			}
			data = JSON.stringify(data);
			appFc.uploadImg(data);

		}
	},
	getImgDelete: function (index) {
		var me = this;
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_ShanChuTuPian);
		for (var i = 0; i < me.state.imgArr.length; i++) {
			var temp = me.state.imgArr[i];
			if (i == index) {
				for (var j = i; j < me.state.imgArr.length; j++) {
					me.state.imgArr[j] = me.state.imgArr[j + 1];
					me.state.bigImgArr[j] = me.state.bigImgArr[j + 1];
				}
				me.state.imgArr.length = me.state.imgArr.length - 1;
				me.state.bigImgArr.length = me.state.bigImgArr.length - 1;
			}
		}
		console.info(me.state.imgArr);
		me.setState({ imgArr: me.state.imgArr });
		me.setState({ bigImgArr: me.state.bigImgArr });
		publicData.objImg["cardArr"] = me.state.imgArr;
		publicData.loadImg.splice(index, 1);

	},
	getImg: function (url) {
		var me = this;
		var bigImgListCon = [];
		var getBigImgArr = [];
		if (me.state.imgArr != "") {
			bigImgListCon = me.state.imgArr;
		}
		if (me.state.bigImgArr != "") {
			getBigImgArr = me.state.bigImgArr;
		}
		console.info(me.state.imgArr);
		//var oldArrLength = me.state.
		for (var i = 0; i < url.length; i++) {
			publicData.loadImg.push(url[i]);
			bigImgListCon.push(url[i]);
			getBigImgArr.push({ "url": url[i] });
		}

		console.info(bigImgListCon);
		console.info(getBigImgArr);
		me.setState({ imgArr: bigImgListCon });
		me.setState({ bigImgArr: getBigImgArr });
		publicData.objImg["cardArr"] = me.state.imgArr;
		/*alert("url.length:"+url.length);
		publicData.arrgetImg=url.length;

		//publicData.imgMaxNum=publicData.imgMaxNum-publicData.arrgetImg;
		publicData.imgMaxNum=publicData.imgMaxNum-publicData.arrgetImg;
		alert("imgMaxNum:"+publicData.imgMaxNum);*/
	},
	componentDidMount: function () {
		var me = this;
		if (getParamByUrl('isCamp') == 1) {
			var campImgUrl = getParamByUrl('pictureUrl').split(',');
			$(".icon").eq(4).find("img").attr("src", "image/setcard/setcard-36.png");
			publicData.btnType = 4;
			publicData.arrbg3[0] = 4;
			me.getImg(campImgUrl);
		}
		$("#msgInfo").bind("input propertychange", function () {
			me.showBtn();
		});
	},
	componentDidUpdate: function () {
		var me = this;
		me.showBtn();
		//添加图片在组件完成更新后
		if ($(".getImg-img").length == 6) {
			$(".getImg-bg1").css("display", "none");
		} else if ($(".getImg-img").length > 6) {
			for (var i = 6; i < $(".getImg-img").length; i++) {
				$(".getImg-img").eq(i).remove();
				$(".bigImg-li").eq(i).remove();
			}
			$(".getImg-bg1").css("display", "none");
		}

		//删除图片在组件完成更新后
		if ($(".getImg-img").length < 6) {
			$(".getImg-bg1").css("display", "block");
			/*publicData.arrgetImg=$(".getImg-img").length;
			publicData.imgMaxNum=6-publicData.arrgetImg;
			alert("触发了");*/
		}

		//更新可添加图片数量
		publicData.arrgetImg = $(".getImg-img").length;
		publicData.imgMaxNum = 6 - publicData.arrgetImg;
		//alert("触发了："+publicData.imgMaxNum);

		$(".getImg-bg").css("height", $(".getImg-bg").width());
	},
	imgError: function (event) {
		var index = 0;
		console.log(typeof event.currentTarget.getAttribute("src"));
		var imgSrc = event.currentTarget.getAttribute("src");
		if (imgSrc.split("?")[1] != "" && imgSrc.split("?")[1] != undefined) {
			index = imgSrc.split("?")[1];
		}
		console.log(parseInt(index));
		if (parseInt(index) < 10) {
			event.currentTarget.setAttribute("src", imgSrc.split("?")[0] + '?' + (parseInt(index) + 1));
		}

	},
	//左上角隐藏返回功能
	leftControl: function () {
		var getPageInfo = function () {
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
		}
		appFc.controlLeft(getPageInfo());
	},
	render: function () {
		var me = this;
		/*me.showBtn();*/
		var me = this;
		var mainHeight = $(window).height() - 5 * fontHeight;
		var objPublic_bigImg = "";
		var imgUrlList = "";
		if (me.state.imgArr != "") {
			objPublic_bigImg = <Public_bigImg getList1={this.state.getList1} bigImgArr={me.state.bigImgArr} />;
		}
		else {
			objPublic_bigImg = <i></i>;
		}

		if (me.state.imgArr != "") {
			imgUrlList = [];
			var imgHeight = $(".getImg-bg1").width();
			for (var i = 0; i < me.state.imgArr.length; i++) {
				imgUrlList.push(<div className="col-xs-4 col-sm-4 getImg-img" key={i}>
					<img className="getImg-bg" src={me.state.imgArr[i] + "@500h_500w_1e_1c"} data-obj_img="cardArr" data-obj_img_index={i} onClick={Fc_bindBigImg.bindBigImg} onError={me.imgError} />
					<img className="getImg-delete" onClick={me.getImgDelete.bind(this, i)} src="image/setcard/setcard-10.png" />
				</div>);
			}
			/*me.setState({bigImgArr:getBigImgArr});
			console.info("2---"+me.state.bigImgArr[0].url);*/
		} else {
			imgUrlList = <i></i>;
		}

		return (
			<div className="container main" style={{ minHeight: mainHeight }} >
				<div className="row msg">
					<textarea className="col-xs-12 col-sm-12" id="msgInfo" onPropertyChange={me.test} onFocus={me.msgInfoFocus} onBlur={me.msgInfoBlur} placeholder="今天的表现怎么样～"></textarea>
				</div>
				<div className="row getImg">
					{imgUrlList}
					<div className="col-xs-4 col-sm-4 getImg-add"><img className="getImg-bg1" onClick={me.getImgBg} src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-11.png" /></div>
				</div>
				<div className="row selectCard">
					<span>选择打卡标签</span>
				</div>
				{objPublic_bigImg}
				<div className="row icon-list">
					<div className="icon" onClick={me.selectTag.bind(this, 0)}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-2.png" /></div>
					<div className="icon" onClick={me.selectTag.bind(this, 1)}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-3.png" /></div>
					<div className="icon" onClick={me.selectTag.bind(this, 2)}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-4.png" /></div>
					<div className="icon" onClick={me.selectTag.bind(this, 3)}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-5.png" /></div>
					<div className="icon" onClick={me.selectTag.bind(this, 4)}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-7.png" /></div>
				</div>

			</div>
		);
	}
});

var BtnContainer = React.createClass({
	footbtnFc: function () {
		if (publicData.btnShow) {
			setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_DianJiDaKa);
			if (parseInt(getParamByUrl("source")) == 1) {
				setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_ShouYeDianJiDaKa);
			}
			var imgs = [];
			for (var i = 0; i < publicData.loadImg.length; i++) {
				imgs.push({ "url": publicData.loadImg[i], "labels": [] });
			};
			imgs = JSON.stringify(imgs);
			console.log(imgs);
			var content = $.trim($("#msgInfo").val());
			content = content.replace(/\%/g, "%25");
			content = content.replace(/\&/g, "%26");
			content = content.replace(/\+/g, "%2B");
			content = content.replace(/\#/g, "%23");
			content = content.replace(/\n/g, "<br />");
			var finalUrl = ajaxLink + "/v1/api/campStu/checkIn" + window.location.search + "&type=" + publicData.btnType + "&content=" + content + "&imgs=" + imgs;

			//var finalUrl="http://pm.picooc.com:9989/v1/api/camp/checkIn?roleId="+roleId+"&type="+btnType+"&content="+$("#msgInfo").val()+"&imgs="+imgs;
			$.ajax({
				type: "get",
				url: finalUrl,
				dataType: "json",
				success: function (data) {
					if (data.code == 200) {
						setCookie("setCardL", "1", 1);
						setCookie("setCardId", data.resp, 1);
						if(getParamByUrl("os")=="iOS"){
							localStorage.setItem("setCardL","1");
							localStorage.setItem("setCardId", data.resp);
						}
						if (getParamByUrl("testtype") == "tanchao") {
							console.log(imgs);
						}
						else if (parseInt(getParamByUrl("source")) == 1) {
							window.location.href = ajaxLink + "/web/fatburn/student.html" + window.location.search;
						}
						else {
							var deviceType = isMobile();
							if (deviceType == "isApp" && (getParamByUrl("testtype") != "tanchao")) {
								var getPageInfo = function () {
									var data = {
										backNum: 1,//默认为1，
										closeWebview: 0//默认为0
									};
									return JSON.stringify(data);
								};
								appFc.deleteHistory(getPageInfo());
							}
							else {
								window.location.href = ajaxLink + "/web/fatburntestReact/student.html" + window.location.search;
							}

						}
					}
					else {
						// alert(data.result.message);
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				}
			})
		}
	},
	render: function () {
		var me = this;
		return (
			<div>
				<div className="row footbtn">
					<div className="col-xs-12 col-sm-12 footbtn-btn" onClick={me.footbtnFc} >打卡</div>
				</div>
			</div>
		);
	}
});


var Component = React.createClass({
	render: function () {
		return (
			<div>
				<CardContainer />
				<BtnContainer />
				<Public_error />
				<Version />
			</div>
		);
	}
})
ReactDOM.render(
	<Component />, document.getElementById('cardContainer')
);