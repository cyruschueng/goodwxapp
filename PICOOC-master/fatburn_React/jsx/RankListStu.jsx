var React=require("react");
var ReactDOM=require("react-dom");
var Public_error = require('./Public_error.jsx');

var RankListStuContainer=React.createClass({
	getInitialState:function(){
		var me=this;
		me.rankListStuFun();

		return {
			rankListStuData:{}
		}
	},
	render:function (){
		var me=this;
		var data= me.state.rankListStuData;

        var infoUrl = "";
        var roleId=getParamByUrl("roleId");
        var classID=getParamByUrl("campId");

		if(typeof me.state.rankListStuData.resp != "undefined"){



            //客户端控制方法
            me.clientControlFun(data.resp.week, data.resp.roleName);

            var stuList = data.resp.stuList;

            var rankTitle = '';
            var rankList = [];
            rankTitle =
                <aside className="row rankTitle">
                    <div className="col-xs-4 col-sm-4 part">
                        <div className="headImgBox">
                            <img className="ranking" src="https://cdn2.picooc.com/web/res/fatburn/image/rankListStu/yin.png" alt=""/>
                            <img className="headImg" src={stuList[1].url} onError={imgError.bind(this,data.resp.stuList[1].sex)}/>
                            <span className="number">2</span>
                        </div>
                        <div className="rankName">{stuList[1].name}</div>
                    </div>
                    <div className="col-xs-4 col-sm-4 middle">
                        <div className="headImgBox">
                            <img className="ranking" src="https://cdn2.picooc.com/web/res/fatburn/image/rankListStu/jin.png" alt=""/>
                            <img className="headImg" src={stuList[0].url} onError={imgError.bind(this,data.resp.stuList[0].sex)}/>
                            <span className="number">1</span>
                        </div>
                        <div className="rankName">{stuList[0].name}</div>
                    </div>
                    <div className="col-xs-4 col-sm-4 part">
                        <div className="headImgBox">
                            <img className="ranking" src="https://cdn2.picooc.com/web/res/fatburn/image/rankListStu/tong.png" alt=""/>
                            <img className="headImg" src={stuList[2].url} onError={imgError.bind(this,data.resp.stuList[2].sex)}/>
                            <span className="number number2">3</span>
                        </div>
                        <div className="rankName">{stuList[2].name}</div>
                    </div>
                    <div className="col-xs-12 col-sm-12 updateTime"><span className="">更新时间：</span><span className="">{data.resp.day}</span></div>
                </aside>;

            stuList.map(function(item, index){


                //infoUrl="studentOtherInfo.html"+window.location.search+"&targetRoleId="+item.roleId+"&targetCampId="+classID;
                infoUrl="studentOtherInfo.html"+removeParamByUrl('targetRoleId')+"&targetRoleId="+item.roleId+"&targetCampId="+classID;
                if(roleId == item.roleId){
                    //infoUrl="studentStudentInfo.html"+window.location.search+"&targetRoleId="+item.roleId+"&targetCampId="+classID;
                    infoUrl="studentStudentInfo.html"+removeParamByUrl('targetRoleId')+"&targetRoleId="+item.roleId+"&targetCampId="+classID;
                }else{
                    //infoUrl="studentOtherInfo.html"+window.location.search+"&targetRoleId="+item.roleId+"&targetCampId="+classID;
                    infoUrl="studentOtherInfo.html"+removeParamByUrl('targetRoleId')+"&targetRoleId="+item.roleId+"&targetCampId="+classID;
                }

                var rankStr = '';
                if(index == 0){
                    rankStr = <img className="rank" src="https://cdn2.picooc.com/web/res/fatburn/image/rankListStu/jin.png"/>;
                }else if(index == 1){
                    rankStr = <img className="rank" src="https://cdn2.picooc.com/web/res/fatburn/image/rankListStu/yin.png"/>;
                }else if(index == 2){
                    rankStr = <img className="rank" src="https://cdn2.picooc.com/web/res/fatburn/image/rankListStu/tong.png"/>;
                }

                rankList.push(
                    <div className="row rankItem" key={index} onClick={me.getNewWebView} data-info-url={infoUrl}>
                        <div className="col-xs-5 col-sm-5 left"
                             style={{background:(index==0)?'url("https://cdn2.picooc.com/web/res/fatburn/image/rankListStu/jin-bg.png") no-repeat left top':
                              (index==1?'url("https://cdn2.picooc.com/web/res/fatburn/image/rankListStu/yin-bg.png") no-repeat left top':
                              (index==2?'url("https://cdn2.picooc.com/web/res/fatburn/image/rankListStu/tong-bg.png") no-repeat left top':'')),backgroundSize:'2.5625rem 2.8125rem'}}>
                        <span className="headBox">
                            <span className="orderNum" style={{color:(index>2?"#7C8995":'#FFF')}}>{index+1}</span>
                            {rankStr}
                            <img className="head" src={item.url} onError={imgError.bind(this,item.sex)}/>
                        </span>
                            <span className="userName">{item.name}</span>
                        </div>
                        <div className="col-xs-7 col-sm-7 right">
                            <div className="col-xs-4 col-sm-4 fat"><span className="fatName">脂肪</span><br/><span className="fatSize">{item.fatChange}<span className="danWei">%</span></span></div>
                            <div className="col-xs-4 col-sm-4 weight"><span className="weightName">体重</span><br/><span className="weightSize">{item.weightChange}<span className="danWei">kg</span></span></div>
                            <div className="col-xs-4 col-sm-4 rate">
                                <div className="prg-cont rad-prg indicatorContainer">
                                    <img src="https://cdn2.picooc.com/web/res/fatburn/image/rankListStu/daKaText.png" className="daKaText" />
                                    <div className="rad-con">
                                        <span className='percentNum'>{item.clockRate}</span><span className="percent">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });

		}

		return (
			<div className="container">
                {rankTitle}
                <aside className="rankList">
                    {rankList}
                </aside>
			</div>
		);
	},
	rankListStuFun:function(){
		var me=this;
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrl=host+"/v1/api/campCommon/campRankList"+window.location.search;
		//var finalUrl="http://pm.picooc.com:9989/v1/api/campCommon/campRankList"+window.location.search;
		//var finalUrl="http://pm.picooc.com:9989/v1/api/campCommon/campRankList?campId=60&roleId=257256252";
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function (data) {
				console.log('周减脂排名', data);
				if(data.code == 200){
					if(typeof me.state.rankListStuData.resp != "undefined"){
						if(me.state.rankListStuData.resp.stuList.length > 0){
							data.resp.stuList =  me.state.rankListStuData.resp.stuList.concat(data.resp.stuList);
						}
					}
					me.setState({rankListStuData:data});

                    for(var i=0; i<data.resp.stuList.length; i++){
                        var clockRate = data.resp.stuList[i].clockRate;
                        if(clockRate == 100){
                            $('.indicatorContainer .percentNum').eq(i).css('paddingLeft', '0.0625rem');
                        }
                        $('.indicatorContainer').eq(i).radialIndicator({
                            barColor: '#C1C7D2',
                            barWidth: 1,
                            initValue: clockRate*0.75,//数据交互的时候动态获取
                            roundCorner : true,
                            percentage: true,
                            displayNumber: false,
                            radius: 16
                        });
                    }

				}else{
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		});

	},


    //打开一个新的webWiew
    getNewWebView:function (event){
        //$(event.currentTarget).addClass('rankItemActive');
        //$(event.currentTarget).find('.daKaText').addClass('daKaTextActive');

        
        var url = absoluteUrl + event.currentTarget.getAttribute("data-info-url");

        //event.currentTarget
        //url=absoluteUrl+url;
        console.log(url);
        //console.info(url);
        var getPageInfo = function (){
            var data = {
                link:url,
                animation: 1//默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };
        //appFc.openWebview(getPageInfo());
        var deviceType=isMobile();
        if(deviceType == "isApp"){
            if(getParamByUrl('webver')>2){
                appFc.openWebview(getPageInfo());
            }else {
                mobileApp.openWebview(getPageInfo());
            }
        }else{
            window.location.href=url;
        }
    },


    //设置截图分享数据
    //客户端控制left, title, right
    clientControlFun: function (weekName, roleName){


        //控制左上角
        if(getParamByUrl('webver')>2){
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
        }else{
            var getPageInfo11 = function () {
                var data = {
                    iconType: 0,//0:默认箭头，1：叉，2：iconUrl传图片
                    backNum: 1,
                    closeWebview: 0,//默认为0
                    iconUrl: "",
                    hidden:false,
                    isHandle:false,
                    functionName:""
                };
                return JSON.stringify(data);
            };
            if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                mobileApp.showLeftBtn(getPageInfo11());
            }
            document.documentElement.style.webkitTouchCallout='none';
        }



        //title right
        if(getParamByUrl('webver')>2){//高版本

            //控制title
            var titleData = {
                title:"第"+weekName+"周减脂排名",
                color:"",
                opacity:"",
                backgroundColor:"",
                backgroundOpacity:""
            };
            titleData=JSON.stringify(titleData);
            appFc.controlTitle(titleData);


            //右上角：设置截图分享数据
            var iconUrl = "";
            var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
            //var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_shareNew.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_shareNew.png"];
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
                                shareType: 1,
                                shareBackgroundColor: "#eeeff3",
                                shareTypeDesc: "有品燃脂营 · 减脂排名",
                                fatBurnName: roleName
                            }
                        }]
                };
                return JSON.stringify(data5);
            };
            appFc.controlRight(getPageInfo2());


        }else {//低版本
            var getPageInfo4 = function (){
                var data = {
                    title: "第"+weekName+"周减脂排名",
                    backgroundColor: '#eeeff3',
                    isShare: true,
                    shareTitle: '有品·燃脂营',
                    shareUrl: "",
                    shareIcon: '',
                    shareDesc: '#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
                    shareType: 1,
                    shareTypeDesc: "",
                    color: "",
                    opacity: "",
                    backgroundOpacity: ""
                };
                return JSON.stringify(data);
            };
            var deviceType=isMobile();
            if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                mobileApp.getShareInfo(getPageInfo4());
            }
            document.documentElement.style.webkitTouchCallout='none';
        }



    }
});

var Component=React.createClass({

	render:function (){
		return (
			<div>
				<RankListStuContainer />
				<Public_error />
			</div>
		);
	}
});

ReactDOM.render(
	<Component />,document.getElementById('rankListStu')
);