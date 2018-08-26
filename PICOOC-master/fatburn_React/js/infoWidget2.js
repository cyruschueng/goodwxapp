var SGeRenZiLiao={
    SCategory_SGeRenZiLiao:5060400,
    SGeRenZiLiao_NiCheng:5060401,//昵称
    SGeRenZiLiao_ZhiYe:5060402,//职业
    SGeRenZiLiao_SuoZaiDi:5060403,//所在地

    SGeRenZiLiao_ShenGao:5060404,//身高
    SGeRenZiLiao_ShengRi:5060405,//生日
    SGeRenZiLiao_ShangCiShengLiQi:5060406,//上次生理期
    SGeRenZiLiao_XiGuanCeLiang:5060407,//习惯测量
    SGeRenZiLiao_BianJiTouXiang:5060408//编辑头像
};
$(function () {
    $(".noJump").change(function(index){
        if(index == 0){
            setMaiDian(SGeRenZiLiao.SCategory_SGeRenZiLiao,SGeRenZiLiao.SGeRenZiLiao_ShenGao);
        }else if(index == 1){
            setMaiDian(SGeRenZiLiao.SCategory_SGeRenZiLiao,SGeRenZiLiao.SGeRenZiLiao_ShengRi);
        }else if(index == 2){
            setMaiDian(SGeRenZiLiao.SCategory_SGeRenZiLiao,SGeRenZiLiao.SGeRenZiLiao_ShangCiShengLiQi);
        }else if(index == 3){
            setMaiDian(SGeRenZiLiao.SCategory_SGeRenZiLiao,SGeRenZiLiao.SGeRenZiLiao_XiGuanCeLiang);
        }
        var itemValue=$(this).children("input").val();
        var index=$(".noJump").index(this);
        console.info(index);
        console.info($(this).children("input").val());
        updateInfo(index,itemValue);
    });

    $(".head").click(function(){
        setMaiDian(SGeRenZiLiao.SCategory_SGeRenZiLiao,SGeRenZiLiao.SGeRenZiLiao_BianJiTouXiang);
        var deviceType=isMobile();//判断是不是app的方法
        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
            var data={
                maxNum:1 ,//上传图片的最大个数
                imageType:"userHeader"
            }
            data=JSON.stringify(data);
            mobileApp.uploadImg(data);
        }
    });
});

function getHeightData(){
    var heightHtml="";
    for(var i=50;i<=220;i++){
        heightHtml+='<li data-val="'+i+'CM">'
                       +'<p>'+i+'CM</p>'
                    +'</li>';
    }
    $("#height").empty();
    $("#height").append(heightHtml);
}


function updateInfo(itemIndex,itemValue){
    var updateName="";
    var birth=itemValue;
    if(itemIndex == 0){
    //身高数据设置
        updateName="height";
        if(itemValue.length == 5){
            itemValue=itemValue.substring(0,3);
        }else{
            itemValue=itemValue.substring(0,2);
        }
    }else if(itemIndex == 1){
    //生日数据设置
        updateName="birthday";
        birth=birth.substring(0,4)+""+birth.substring(5,7)+""+birth.substring(8,10);
        itemValue=itemValue.substring(0,4)+"-"+itemValue.substring(5,7)+"-"+itemValue.substring(8,10);
        /*itemValue=itemValue.substring(0,4)+"/"+itemValue.substring(5,7)+"/"+itemValue.substring(8,10);
        itemValue=new Date(itemValue);*/
        console.info(itemValue);
    }else if(itemIndex == 2){
    //生理期数据设置
        updateName="physicalPeriod";
        itemValue=(new Date().getYear()+1900)+"-"+itemValue.substring(0,2)+"-"+itemValue.substring(3,5);
    }else if(itemIndex == 3){
    //测量时段数据设置
        updateName="weightPeriod";
        /*if(itemValue == "凌晨 (00:00-04:00)"){
            itemValue = 0 ;
        }else */
        if(itemValue == "上午时段 (04:00-12:00)"){
            itemValue = 1 ;
        }else if(itemValue == "下午时段 (12:00-16:00)"){
            itemValue = 2 ;
        }else if(itemValue == "傍晚时段 (16:00-20:00)"){
            itemValue = 3 ;
        }else if(itemValue == "夜晚时段 (20:00-24:00)"){
            itemValue = 4 ;
        }
    }
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/campStu/updateStudentInfo"+window.location.search+"&"+updateName+"="+itemValue;
    console.info(finalUrl);
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            if(data.code == 200){
                if(itemIndex == 0){
                    getDataSame(itemValue,"");
                }else if(itemIndex == 1){
                    getDataSame("",birth);
                }
            }else{
                // alert("服务器开小差了～");
                $(".error-main-t").html("服务器开小差了～");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }
    });
}

//上传头像
function getImg(url){
    var userHeader=url[0];
   /* alert(userHeader);*/
    $(".head").attr("src",userHeader);
}

//同步数据
function getDataSame(height,birth){
    /*alert("触发了~");*/
    var getPageInfo = function (){
        var data = {
            roleHeight:height,
            roleBirth:birth
        };
        return JSON.stringify(data);
    }
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        mobileApp.makeDataAccord(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}

function getBasicData(birth,height,weightTime,physicalPeriodTime){
    $(".mbsc-sc-whl-c").eq(0).find(".mbsc-sc-itm").each(function(index,domEle){$(domEle).text($(domEle).text()+"月");})
    $(".mbsc-sc-whl-c").eq(1).find(".mbsc-sc-itm").each(function(index,domEle){$(domEle).text($(domEle).text()+"日");})
    //生日选择
    var currYear = new Date().getFullYear();
    console.info(birth);
    var birthday=birth.substring(0,4)+"-"+birth.substring(5,7)+"-"+birth.substring(8,10);
    console.info(birthday);
    $('#birthday').mobiscroll().date({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'bottom',
        /*closeOnOverlayTap:false,  //true的时候点击遮罩消失控件*/
        cancelText:"",
        setText:"",
        yearText:"年",
        monthText:"月",
        dayText:"日",
        headerText:'生日',
        dateWheels: 'yyyy mm  dd',
        /*dateFormat: 'yyyy.mm.dd', //面板中日期排列格式 */
        dateFormat: 'yyyy年mm月dd日', //面板中日期排列格式 
        defaultValue: new Date(birthday),
       /* dateFormat: 'yyyy-mm-dd', //面板中日期排列格式 */
        //defaultValue: new Date("1991-12-21"),
        max: new Date(new Date().setFullYear(currYear - 2)),
        min: new Date(new Date().setFullYear(currYear - 80)),
        onBeforeShow: function (event, inst) {
            leftControl(true);
        },
        onShow: function (event, inst) {
            console.info($(".mbsc-dt-whl-y").find(".mbsc-sc-whl-sc").children());
            $(".mbsc-dt-whl-y").find(".mbsc-sc-whl-sc").children().each(function(){
                if($(this).text() != ""){
                    $(this).append("年");
                }
            });
        },
        onClose: function (event, inst) {
            leftControl(false);
        }
    });
    
    //身高选择
    getHeightData();
    /*console.info("defaultHeight"+defaultHeight);*/
    $('#height').mobiscroll().image({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'bottom',
        /*closeOnOverlayTap:false,  //true的时候点击遮罩消失控件*/
        cancelText:"",
        setText:"",
        circular:false,
        /*placeholder: 'Please Select ...',*/
        labels: [''],
        headerText:'身高',
        enhance: true,
        defaultValue: [height],
        onBeforeShow: function (event, inst) {
            leftControl(true);
        },
        onClose: function (event, inst) {
            leftControl(false);
        }
    });

    //生理期选择
   /* var physicalPeriodTime=$("#physicalPeriodInput").val();*/
    if(physicalPeriodTime != "" && physicalPeriodTime != null){
        physicalPeriodTime=new Date(currYear+"-"+physicalPeriodTime.substring(0,2)+"-"+physicalPeriodTime.substring(3,5));
    }else{
        physicalPeriodTime=new Date();
    }
    
    console.info(physicalPeriodTime);
    $('#physicalPeriodInput').mobiscroll().date({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'bottom',
       /* closeOnOverlayTap:false,  //true的时候点击遮罩消失控件*/
        cancelText:"",
        setText:"",
        headerText:'上次生理期',
        dateWheels: 'mm  dd',
        dateFormat: 'mm月dd日', //面板中日期排列格式
        defaultValue: physicalPeriodTime,
        monthText: '月',
        dayText: '日',
        onBeforeShow: function (event, inst) {
            leftControl(true);
        },
        onClose: function (event, inst) {
            leftControl(false);
        }
        /*max: new Date()*/
        /*min: new Date(new Date().setFullYear(currYear - 80)),*/
    });

    //测量时段选择
    $('#weightTime').mobiscroll().image({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'bottom',
       /* closeOnOverlayTap:false,  //true的时候点击遮罩消失控件*/
        cancelText:"",
        setText:"",
        /*placeholder: 'Please Select ...',*/
        labels: [''],
        headerText:'选择测量时段',
        enhance: true,
        defaultValue: [weightTime],
        onBeforeShow: function (event, inst) {
            leftControl(true);
        },
        onClose: function (event, inst) {
            leftControl(false);
        }
    });
}

//左上角刷新返回功能
function leftControl(isHidden){
    /*alert("leftControl++");*/
    var getPageInfo = function (){
        var data = {
            iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
            backNum:1,//1为正常后退，
            closeWebview:0,//默认为0
            hidden:isHidden,
            iconUrl:""
        };
        return JSON.stringify(data);
    }
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        mobileApp.showLeftBtn(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}
