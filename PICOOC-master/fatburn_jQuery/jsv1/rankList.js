var SPaiHangBang={
    SCategory_SPaiHangBang:5061400,
    SPaiHangBang_TiaoZhuanGeRenZhuYe:5061401,//跳转个人主页
    SPaiHangBang_FenXiangPaiHangBang:5061402//分享排行榜
};

$(function(){
    
    getRankList();

     
});

function getRankList(){
    var targetRoleId=getParamByUrl("roleId");
    var classID=getParamByUrl("campId");
    var host=window.location.protocol+"//"+window.location.host;
    /*var finalUrl=host+"/v1/api/camp/getBodyChange"+window.location.search;*/
    var finalUrl=host+"/v1/api/campCommon/campRankList"+window.location.search;
    console.info(finalUrl);
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            if(data.code == 200){
                var rankLists=data.resp.stuList;
                var rankHtml="";
                var headerImg="";
                var userSex="";
                var rankNo="";
                var userRank="";
                var fatNum="";
                var weightNum="";
                /*//燃脂营排行榜动态获取标题
                appShare(data.resp.campName);*/
                appShare("有品燃脂营减脂排名",data.resp.roleName);
                //燃脂营title信息
                $(".rankTime").text("更新时间: "+data.resp.day);
                var isOverCamp= getParamByUrl("targetCampId")== "false" ? false:true;
                if(isOverCamp){
                    $(".title").text(data.resp.campName);
                }else{
                    $(".title").text("第"+data.resp.week+"周减脂排名");
                }
                for(var i=0;i<data.resp.count;i++){
                    //判断默认图片性别
                    if(rankLists[i].sex == 0){
                        headerImg="'http://cdn2.picooc.com/web/res/sex0.png'";
                        userSex='<img class="userSex" src="image/rankList/girl.png">';
                    }else{
                        headerImg="'http://cdn2.picooc.com/web/res/sex1.png'";
                        userSex='<img class="userSex" src="image/rankList/boy.png">';
                    }

                    //判断左上角的排位
                    if(rankLists[i].rankList == 1){
                        rankNo='<img class="rankIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/rankList/jin.png" />';
                        userRank='<span class="userRank1">'+rankLists[i].rankList+'</span>';
                    }else if(rankLists[i].rankList == 2){
                        rankNo='<img class="rankIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/rankList/yin.png" />';
                        userRank='<span class="userRank2">'+rankLists[i].rankList+'</span>';
                    }else if(rankLists[i].rankList == 3){
                        rankNo='<img class="rankIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/rankList/tong.png" />';
                        userRank='<span class="userRank3">'+rankLists[i].rankList+'</span>';
                    }else if(rankLists[i].rankList == "" || rankLists[i].rankList == null){
                        rankNo="";
                        userRank='<span class="userRank4"></span>';
                        /*userRank='<span class="userRank4">'+rankLists[i].rankList+'</span>';*/
                    }else{
                        rankNo="";
                        userRank='<span class="userRank4">'+rankLists[i].rankList+'</span>';
                    }

                    //判断体重体脂增减
                    if(rankLists[i].weightChange.substring(0,1) == "+" ){
                        weightNum='<div style="color:#fb5562;"><span class="weightNum">'+rankLists[i].weightChange+'</span>KG</div>';
                    }else if(rankLists[i].weightChange.substring(0,2) == "--" ){
                         weightNum='<div><span class="weightNum">'+rankLists[i].weightChange+'</span></div>';
                    }else{
                        weightNum='<div><span class="weightNum">'+rankLists[i].weightChange+'</span>KG</div>';
                    } 

                    if(rankLists[i].fatChange.substring(0,1) == "+" ){
                        fatNum='<div style="color:#fb5562;"><span class="fatNum">'+rankLists[i].fatChange+'</span>%</div>';
                    }else if(rankLists[i].fatChange.substring(0,2) == "--" ){
                        fatNum='<div><span class="fatNum">'+rankLists[i].fatChange+'</span></div>';
                    }else{
                        fatNum='<div><span class="fatNum">'+rankLists[i].fatChange+'</span>%</div>';
                    }  

                    var roleId=getParamByUrl("roleId");
                    var infoUrl="studentOtherInfo.html"+window.location.search+"&targetRoleId="+rankLists[i].roleId+"&targetCampId="+classID;
                    if(roleId == rankLists[i].roleId){
                        infoUrl="studentStudentInfo.html"+window.location.search+"&targetRoleId="+rankLists[i].roleId+"&targetCampId="+classID;
                    }else{
                        infoUrl="studentOtherInfo.html"+window.location.search+"&targetRoleId="+rankLists[i].roleId+"&targetCampId="+classID;
                    }
                    
                    rankHtml+='<div class="row rankItem" onclick="getNewWebWiew('+"'"+infoUrl+"'"+')">'
                                +'<div class="rankLeft col-xs-6 col-sm-6">'
                                    +'<img class="userHeader" src="'+rankLists[i].url+'" onerror="this.src='+headerImg+'" />'
                                    +'<span class="userName">'+rankLists[i].name+'</span>'
                                    +rankNo+userSex+userRank
                                +'</div>'
                                +'<div class="rankRight col-xs-6 col-sm-6">'
                                    +'<div class="row">'
                                        +'<div class="col-xs-6 col-sm-6">'
                                            +'<div>脂肪</div>'
                                            +fatNum
                                        +'</div>'
                                        +'<div class="col-xs-6 col-sm-6">'
                                            +'<div>体重</div>'
                                            +weightNum
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>';
                }
                $(".rankList").empty();
                $(".rankList").append(rankHtml);
            }else{
                // alert("服务器开小差了～");
                $(".error-main-t").html("服务器开小差了～");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);

            }
        }
    })
}

/*function appNoShare(title){
    var getPageInfo = function (){
        var data = {
            title:title,
            isShare:false,
            backgroundColor:'#2c2f31'
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        mobileApp.getShareInfo(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}*/
//打开一个新的webWiew
function getNewWebWiew(url){
    setMaiDian(SPaiHangBang.SCategory_SPaiHangBang,SPaiHangBang.SPaiHangBang_TiaoZhuanGeRenZhuYe);
    url=absoluteUrl+url;
    console.info(url);
    /*url="http://"+location.host+"/web/fatburntest/"+url;*/
    var getPageInfo = function (){
        var data = {
            link:url,
            animation: 1//默认1从右到左，2从下到上
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        if(getParamByUrl("os")=="android"){
            mobileApp.openWebview(getPageInfo());
        }
        else{
            mobileApp.openWebview.postMessage(getPageInfo());
        }
        //mobileApp.openWebview(getPageInfo());
    }else{
        window.location.href=url;
    }
    document.documentElement.style.webkitTouchCallout='none';
}

//设置截图分享数据
function appShare(title,userName){
    var fromType=getParamByUrl("fromType");
    var roleId=getParamByUrl("roleId");
    //学员自己查看排行榜
    var isShowShare=true;
    /*var isShowShare=false;
    if(fromType == "false" || fromType == ""){
        isShowShare=true;
    }else{
        isShowShare=false;
    }  */
    var getPageInfo = function (){
        var data = {
            title:title,
            /*backgroundColor:'#2c2f31',
            isShare:isShowShare,
            shareTitle:'有品·燃脂营',
            shareUrl:"",
            shareIcon:'',
            shareDesc:'#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
            shareType:1,
            shareBackgroundColor:'#eeeff3',
            fatBurnName:userName,
            shareTypeDesc:"有品燃脂营 · 减脂排名"*/
            color:"",
            opacity:"",
            backgroundColor:"",
            backgroundOpacity:""
        };
            return JSON.stringify(data);
    };
    var deviceType=isMobile();
        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        setMaiDian(SPaiHangBang.SCategory_SPaiHangBang,SPaiHangBang.SPaiHangBang_FenXiangPaiHangBang);
            if(getParamByUrl("os")=="android"){
                mobileApp.controlTitle(getPageInfo());
            }
            else{
                mobileApp.controlTitle.postMessage(getPageInfo());
            }
        //mobileApp.getShareInfo(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';


    //右上角
    var iconUrl = "";
    var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
    if (getParamByUrl("os") == "android") {
        iconUrl = iconShare[0];
    }
    else {
        iconUrl = iconShare[1];
    }
    var getPageInfo2 = function (){
        var data5 = {
            iconType:0,//0走图片逻辑，1走文案逻辑
            rightStr:{
                str:"",
                color:"",
                opacity:"",
                id:"0"
            },
            rightIcon:[
                {
                    type:"1",
                    id:"1",
                    functionName:"",
                    iconUrl:iconUrl,
                    iconName:"分享",
                    redDotType:"1",
                    redDotShow:false,
                    redDotNum:"0",
                    nativeType:"0",
                    content:{
                        shareTitle:'有品·燃脂营',
                        shareUrl:"",
                        shareIcon:"",
                        shareDesc:'#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
                        shareTag:"",
                        shareType:1,
                        shareBackgroundColor:"#eeeff3",
                        shareTypeDesc:"有品燃脂营 · 减脂排名",
                        fatBurnName:userName
                    }
                }]
        };
        return JSON.stringify(data5);
    };
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        if(getParamByUrl("os")=="android"){
            mobileApp.controlRight(getPageInfo2());
        }
        else{
            mobileApp.controlRight.postMessage(getPageInfo2());
        }
    }
}