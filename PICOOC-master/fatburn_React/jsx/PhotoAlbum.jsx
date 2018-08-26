// 加载相关组件
var React = require("react");
var ReactDOM = require("react-dom");
var Public_Error = require('./Public_error.jsx');
var PubSub = require("pubsub-js");
var Public_BIGImg = require('./Public_bigImg.jsx');
var Fc_bindBigImg = require('./Fc_bindBigImg.jsx');

// 默认图片
var frontdefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-m.png"];
var sidedefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-m.png"];

var campId = getParamByUrl("campId");
var roleId = getParamByUrl("roleId");
// 相关埋点参数
var SWoDeXiangCe = {
    SCategory_SWoDeXiangCe: 5060900,
    SWoDeXiangCe_ShanChuZhaoPian: 5060901,//删除照片
    SWoDeXiangCe_BianJiZhaoPian: 5060902,//编辑照片
    SWoDeXiangCe_TiaoZhuanShangChuanZhaoPian: 5060903,//跳转上传照片
    SWoDeXiangCe_TuPianYuLan: 5060904,//图片预览
};
// 定义预览图的URL数组
var publicData = {
    objImg: {
    }
};
window.publicData = publicData;
// 相册组件
var MyPHoneAlbum = React.createClass({
    componentDidMount: function () {
        // 设置相关css样式
        $(".partRight-img-li2").css("height", $(".partRight-img-li2").width() * 366 / 275);
        //part左边距离
        for (var i = 0; i < $(".partLeft-p1-span").length; i++) {
            if ($(".partLeft-p1 .partLeft-p1-span").eq(i).width() > $(".partLeft-p2 .partLeft-p2-span").eq(i).width()) {
                console.log(i);
                if ($(".partLeft-p3 .partLeft-p3-span").width() > $(".partLeft-p1 .partLeft-p1-span").width()) {
                    $(".partLeft-p1").css("padding-left", ($(".partLeft-p3 .partLeft-p3-span").width() - $(".partLeft-p1 .partLeft-p1-span").width()) / 2);
                }
                else {
                    $(".partLeft-p3").css("padding-left", ($(".partLeft-p1 .partLeft-p1-span").width() - $(".partLeft-p3 .partLeft-p3-span").width()) / 2);
                }
                $(".partLeft-p2").eq(i).css("padding-left", parseInt($(".partLeft-p1").eq(0).css("padding-left")) + ($(".partLeft-p1 .partLeft-p1-span").eq(i).width() - $(".partLeft-p2 .partLeft-p2-span").eq(i).width()) / 2 - 1);
            }
            else {
                console.log("a:"+i);
                $(".partLeft-p1 .partLeft-p1-span").eq(i).css("padding-left", ($(".partLeft-p2 .partLeft-p2-span").eq(i).width() - $(".partLeft-p1 .partLeft-p1-span").eq(i).width()) / 2);
                $(".partLeft-p3 .partLeft-p3-span").eq(i).css("padding-left", ($(".partLeft-p2 .partLeft-p2-span").eq(i).width() - $(".partLeft-p3 .partLeft-p3-span").eq(i).width()) / 2);
            }
        }
    },
    // 点击删除
    delImgClick: function (event) {
        event.stopPropagation();
        var ele = event.currentTarget;
        //删除图片
        $(".fixbg").css("display", "block");
        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
        $(".deltime").html($(ele).attr("data-datetime"));
        var campPictureId = $(ele).attr("data-camppictureid");

        var createTime = $(ele).attr("data-createtime");
        var waistMeasureId = $(ele).attr("data-waistmeasureid");

        var waistMeasure = $(ele).attr("data-waistmeasure");
        if (waistMeasure == "--") {
            waistMeasure = 0;
        }
        var delImgParmData = {
            campPictureId: campPictureId,
            createTime: createTime,
            waistMeasureId: waistMeasureId,
            waistMeasure: waistMeasure
        };
        PubSub.publish('delImgParm', delImgParmData);
        setMaiDian(SWoDeXiangCe.SCategory_SWoDeXiangCe, SWoDeXiangCe.SWoDeXiangCe_ShanChuZhaoPian);

    },
    //编辑图片
    editPhoneClick: function (event) {
        event.stopPropagation();
        var ele = event.currentTarget;
        var campPictureId = $(ele).attr("data-camppictureid");
        if (getParamByUrl("imgId") != "false") {
            var searchLink = removeParamByUrl("imgId");
            window.location.href = "editPhoto.html" + searchLink + "&imgId=" + campPictureId;
        }
        else {
            window.location.href = "editPhoto.html" + window.location.search + "&imgId=" + campPictureId;
        }
        setMaiDian(SWoDeXiangCe.SCategory_SWoDeXiangCe, SWoDeXiangCe.SWoDeXiangCe_BianJiZhaoPian);
    },
    render: function () {
        var PhoneData = this.props.PhoneData;
        var index = this.props.index;
        return (
            <aside className="row page1 msgType1" data-pictureid={PhoneData[index].id} key={index}>
                <article className="row list">
                    <aside className="row part ">
                        <div className="col-xs-2 col-sm-2 partLeft2">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 partLeft-p1">
                                    <span className='partLeft-p1-span'>DAY</span></div>
                                <div className="col-xs-12 col-sm-12 partLeft-p2">
                                    <span className='partLeft-p2-span'>{PhoneData[index].day}</span></div>
                                <div className="col-xs-12 col-sm-12 partLeft-p3">
                                    <span className='partLeft-p3-span'>{PhoneData[index].time}</span></div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 partRight" part="2">
                            <div className="content">
                                <span className="" style={{ 'width': '35%' }}>体重:
									<span className="weight">{PhoneData[index].weight + 'KG'}</span>
                                </span>
                                <span className="" style={{ 'width': '30%' }}>脂肪:
									<span className="fat">{PhoneData[index].fat + '%'}</span>
                                </span>
                                <span className="" style={{ 'width': '35%' }}>腰围:
									<span className="waistline">{PhoneData[index].waistMeasure + 'CM'}</span>
                                </span>
                            </div>
                            <div className="row ">
                                <div className="col-xs-6 col-sm-6 partRight-img">
                                    <div className="col-xs-12 col-sm-12 partRight-img-li partRight-img-li2 " objimg="img2" objimgindex="0" style={{ 'backgroundImage': 'url(' + PhoneData[index].frontPicture + '@500h_500w_1e)' }}
                                        data-obj_img={'frontPicture' + index} onClick={Fc_bindBigImg.bindBigImg}>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 partRight-img">
                                    <div className="col-xs-12 col-sm-12 partRight-img-li partRight-img-li2 " objimg="img2" objimgindex="0" style={{ 'backgroundImage': 'url(' + PhoneData[index].facePicture + '@500h_500w_1e)' }}
                                        data-obj_img={'facePicture' + index} onClick={Fc_bindBigImg.bindBigImg}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </article>
                <div className="manage">
                    <a className="edit" data-camppictureid={PhoneData[index].id} data-day={PhoneData[index].day}
                        data-waistmeasure={PhoneData[index].waistMeasure} data-fat={PhoneData[index].fat}
                        data-weight={PhoneData[index].weight} data-facepicture={PhoneData[index].facePicture}
                        data-frontpicture={PhoneData[index].frontPicture} data-datetime={PhoneData[index].time} data-camppictureid={PhoneData[index].id} onClick={this.editPhoneClick}><span></span></a>
                    <span className="del" data-datetime={PhoneData[index].time} data-camppictureid={PhoneData[index].id}
                        data-waistmeasureid={PhoneData[index].waistMeasureId} data-createtime={PhoneData[index].createTime}
                        data-waistmeasure={PhoneData[index].waistMeasure} onClick={this.delImgClick}><span></span></span>
                </div>
            </aside>
        )
    }
});
// 页面总容器
var PHoneAlbumBox = React.createClass({
    // 初始化相关参数
    getInitialState: function () {
        var mytitleData = {
            title: '我的相册',
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        mytitleData = JSON.stringify(mytitleData);
        appFc.controlTitle(mytitleData);
        //左上角返回控制
        var loadtourl = getCookie("loadtourl");
        // 如果图片删除完，返回二级
        if (loadtourl && loadtourl == 0) {
            if (getParamByUrl("testtype") != "tanchao") {
                var data = {
                    iconType: 0,
                    iconColor: "",
                    backNum: 2,
                    closeWebview: 0,
                    hidden: false,
                    isHandle: false,
                    functionName: ""
                };
                data = JSON.stringify(data);
                appFc.controlLeft(data);
            }
        } else {
            // 没有删除完图片返回一级
            if (getParamByUrl("testtype") != "tanchao") {
                var data = {
                    iconType: 0,
                    iconColor: "",
                    backNum: 1,
                    closeWebview: 0,
                    hidden: false,
                    isHandle: false,
                    functionName: ""
                };
                data = JSON.stringify(data);
                appFc.controlLeft(data);
            }
        }
        // 右上角管理编辑
        function getControl1() {
            $(".manage").show();
            var getPageInfo1 = function () {
                var data = {
                    iconType: 1,//走文案
                    id: "2",
                    functionName: "getControl2",
                    iconUrl: "",
                    iconName: "完成",
                    redDotType: "1",
                    redDotShow: false,
                    redDotNum: "0",
                    nativeType: "",
                    content: "",
                    str: "完成",
                    color: "",
                    opacity: ""

                };
                return JSON.stringify(data);
            };
            appFc.controlRightInfo(getPageInfo1());
        }
        function getControl2() {
            $(".manage").hide();
            var getPageInfo1 = function () {
                var data = {
                    iconType: 1,//走文案
                    id: "2",
                    functionName: "getControl1",
                    iconUrl: "",
                    iconName: "管理",
                    redDotType: "1",
                    redDotShow: false,
                    redDotNum: "0",
                    nativeType: "",
                    content: "",
                    str: "管理",
                    color: "",
                    opacity: ""
                };
                return JSON.stringify(data);
            };
            appFc.controlRightInfo(getPageInfo1());
        }
        window.getControl2 = getControl2;
        window.getControl1 = getControl1;
        var getPageInfo6 = function () {
            var data = {
                iconType: 1,//0走图片逻辑，1走文案逻辑
                rightStr: {
                    str: "管理",
                    color: "",
                    opacity: "",
                    id: "0",
                    type: "0",
                    functionName: "getControl1",
                    redDotType: "1",
                    redDotShow: false,
                    redDotNum: "0",
                    nativeType: "",
                    content: ""
                },
                rightIcon: []
            };
            return JSON.stringify(data);
        };
        window.getPageInfo6 = getPageInfo6();
        appFc.controlRight(getPageInfo6());
        return {
            phoneData: [],
            bigImgArr: [],
            delImgParmData: {}
        }
    },
    componentWillMount: function () {
        var finalUrl = ajaxLink + "/v1/api/campStu/pictureList" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;

        this.serverRequest = $.get(finalUrl, function (data) {
            if (data.code == 200) {
                if (data.resp.sex == 0) {
                    var defaultFrontUrl = frontdefaultImg[0];
                    var defaultSideUrl = sidedefaultImg[0];
                } else {
                    var defaultFrontUrl = frontdefaultImg[1];
                    var defaultSideUrl = sidedefaultImg[1];
                }
                if (data.resp.data.length > 0) {
                    for (var i = 0; i < data.resp.data.length; i++) {
                        if (data.resp.data[i].frontPicture == "" || data.resp.data[i].frontPicture == null) {
                            data.resp.data[i].frontPicture = defaultFrontUrl;
                        }
                        if (data.resp.data[i].facePicture == "" || data.resp.data[i].facePicture == null) {
                            data.resp.data[i].facePicture = defaultSideUrl;
                        }
                        if (data.resp.data[i].weight == null || data.resp.data[i].weight == "") {
                            data.resp.data[i].weight = "--";
                        }
                        if (data.resp.data[i].fat == null || data.resp.data[i].fat == "") {
                            data.resp.data[i].fat = "--";
                        }
                        if (data.resp.data[i].waistMeasure == null || data.resp.data[i].waistMeasure == "") {
                            data.resp.data[i].waistMeasure = "--";
                        }
                    }
                }
                this.setState({
                    phoneData: data.resp.data
                });
            }
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.serverRequest.abert();
    },
    componentDidMount: function () {
        // 接收图片数据
        PubSub.subscribe('bigImgData', function (ev, bigImgDate) {
            this.setState({
                bigImgArr: bigImgDate
            });
        }.bind(this));
        // 接收删除照片需要的参数
        PubSub.subscribe('delImgParm', function (ev, delImgParmData) {
            this.setState({
                delImgParmData: delImgParmData
            });
        }.bind(this));
        $(".msg").css("margin-bottom", $(".upload-container").height() + 30);
        // var deviceType8 = isMobile();
        // if (deviceType8 == "isApp" && (typeof mobileApp != "undefined")) {
        //     $(".test").css("display", "none");
        // } else {
        //     alert(345);
        //     $(".test").css("display", "block");
        //     $(".bianji").unbind("click").click(function () {
        //         $(".manage").show();
        //     });
        //     $(".wancheng").unbind("click").click(function () {
        //         $(".manage").hide();
        //     });
        // };
    },
    // 删除照片-取消
    CancelClick: function () {
        $(".fixbg").css("display", "none");
    },
    // 删除照片-确认
    SureClick: function () {
        var delImgParmData = this.state.delImgParmData,
            campPictureId = delImgParmData.campPictureId,
            createTime = delImgParmData.createTime,
            waistMeasureId = delImgParmData.waistMeasureId,
            waistMeasure = delImgParmData.waistMeasure;
        var len = $(".msgType1").length;
        var finalUrl = ajaxLink + "/v1/api/campStu/deletePicture" + window.location.search + "&campPictureId=" + campPictureId;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    // var id = $('[campPictureId='+campPictureId+']').attr("campPictureId");	
                    $('[data-pictureid=' + campPictureId + ']').remove();
                    if (waistMeasureId != null && waistMeasureId != "") {
                        var getPageInfo9 = function () {
                            var param = {
                                roleId: roleId,
                                serverId: waistMeasureId,
                                girthNum: 0,
                                time: data.resp.operateTrime,
                                // isDelete:true,  //删除体围标识，true是，false否
                            };
                            return JSON.stringify(param);
                        };
                        var deviceType = isMobile();
                        if (deviceType == "isApp") {
                            appFc.changeGirth(getPageInfo9());
                        }
                    }
                    len--;
                    alert('还有' + len + '张');
                    if (len == 1 || len == 0) {
                        if (getCookie("toPhoto") == 0) {
                            var getPageInfo = function () {
                                var data = {
                                    iconType: 0,//0:默认箭头，1：叉，2：iconUrl传图片
                                    backNum: 2,//1为正常后退，
                                    closeWebview: 0,//默认为0
                                    iconUrl: ""
                                };
                                return JSON.stringify(data);
                            };
                            var deviceType = isMobile();
                            if (deviceType == "isApp") {
                                appFc.controlLeft(getPageInfo());
                            }
                        } else {
                            var getPageInfo = function () {
                                var data = {
                                    iconType: 0,//0:默认箭头，1：叉，2：iconUrl传图片
                                    backNum: 1,//1为正常后退，
                                    closeWebview: 0,//默认为0
                                    iconUrl: ""
                                };
                                return JSON.stringify(data);
                            };
                            var deviceType = isMobile();
                            if (deviceType == "isApp") {
                                appFc.controlLeft(getPageInfo());
                            }
                        }
                    }
                }
                else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
                }
            }
        })
        $(".fixbg").css("display", "none");
    },
    uploadClick: function (event) {
        var ele = event.currentTarget;
        // ss("opacity", "0.6");
        setCookie("uploadurl", 1, 1); //跳转到上传照片页面的标识
        $(ele).attr("href", "figureContrast.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId+"&uploadurl=1");
        setMaiDian(SWoDeXiangCe.SCategory_SWoDeXiangCe, SWoDeXiangCe.SWoDeXiangCe_TiaoZhuanShangChuanZhaoPian);
        event.stopPropagation();
    },
    render: function () {
        var PhoneData = this.state.phoneData;
        var phoneList = [];
        // 动态加载图片MyPHoneAlbum组件，并把图片的URL存储在publicData对象里面
        if (PhoneData.length > 0) {
            for (var i = 0; i < PhoneData.length; i++) {
                publicData.objImg['frontPicture' + i] = [];
                publicData.objImg['facePicture' + i] = [];
                publicData.objImg['frontPicture' + i].push({ 'url': PhoneData[i].frontPicture });
                publicData.objImg['facePicture' + i].push({ 'url': PhoneData[i].facePicture });
                phoneList.push(<MyPHoneAlbum PhoneData={PhoneData} index={i} key={i} />)
            }
        }
        var obj_bigImg;
        var bigImgArr = this.state.bigImgArr;
        if (bigImgArr != '') {
            obj_bigImg = <Public_BIGImg bigImgArr={this.state.bigImgArr} />;
        }
        else {
            obj_bigImg = <i></i>;
        }
        return (
            <div>
                <section className="container">
                    <div className="row test col-xs-12 col-sm-12">
                        <div className="bianji col-xs-6 col-sm-6">管理</div>
                        <div className="wancheng col-xs-6 col-sm-6">完成</div>
                    </div>
                    <div className="msg">
                        {phoneList}
                    </div>
                    <div className="upload-container">
                        <div className="row upload"><a className="row" onClick={this.uploadClick}>上传照片</a></div>
                    </div>
                    {obj_bigImg}
                </section>
                <div className="row fixbg">
                    <div className="col-xs-12 col-sm-12 fixbg-main">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 fixbg-main-t">是否要删除<span className="deltime"></span>的照片？</div>
                            <div className="col-xs-12 col-sm-12 fixbg-main-btn">
                                <div className="row">
                                    <div className="col-xs-6 col-sm-6 fixbg-main-btn1" onClick={this.CancelClick}>取消</div>
                                    <div className="col-xs-6 col-sm-6 fixbg-main-btn2" onClick={this.SureClick}>确定</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

ReactDOM.render(<PHoneAlbumBox />, document.getElementById('myPhoneAlbumBox'));




