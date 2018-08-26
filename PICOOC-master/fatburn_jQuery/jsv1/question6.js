$(function(){
    /*var orderId = 100102;*/
    var result = getCookie("question6"+orderId) == null ? "" : getCookie("question6"+orderId);
    console.info(result);

    getQuestion(6,"input",result);

    $(".container").css("minHeight",$(window).height()+"px");

    $(".nextBtn").unbind("click").bind("click",function(){
        if($(".active").length == 0){
            $(".pointAlert").css("display","block");
            $(".pointAlert").text("请选择答案~");
            setTimeout(function(){
                $(".pointAlert").css("display","none");
            },2000);  
        }else if($(".hasMenstruation").hasClass("active") && ($("#startTime").val() == "" || $("#endTime").val() == "")){
            $(".pointAlert").css("display","block");
            $(".pointAlert").text("请选择生理期~");
            setTimeout(function(){
                $(".pointAlert").css("display","none");
            },2000);  
        }else{
            var radioResult= parseInt($(".active").attr("value"));
            console.info(radioResult);
            setCookie("question6"+orderId,radioResult,30);

            var startTime=$("#startTime").val();
            var endTime=$("#endTime").val();

            setCookie("question6Start"+orderId,startTime,30);
            setCookie("question6end"+orderId,endTime,30);

             //将答案存储
            saveResult("input");
            pushQuestionResult();
        }
    });

    $(".preBtn").unbind("click").bind("click",function(){
        history.go(-1);
    });

    //标题设置
    appNoShare("问题 6/6");
    leftControl(true,false);

    getPhysicalPeriodTime("startTime");
    getPhysicalPeriodTime("endTime");
})


function pushQuestionResult(){
    var targetRoleId=getParamByUrl("roleId");
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/campQuestion/question"+window.location.search;
    //questionResult = JSON.parse(questionResult);
    console.info(questionResult);
    $.ajax({
        type:"POST",
        data:questionResult,
        url:finalUrl,
        dataType:"json",
        contentType: 'application/json',
        success:function(data){
            if(data.code == 200){
                jumpSport(data.resp.campId);
            }else{
                alert(data.message);
            }
        }
    });
}

var deviceType=isMobile();
//设置跳到运动视频的方法
function jumpSport(campId){
    //alert("campId:"+campId);
    var roleId = getParamByUrl("roleId");
    var type = 1;
    var getPageInfo = function (){
        var data = {
            roleId:roleId,
            type:type,
            campId:campId
        };
        return JSON.stringify(data);
    };
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        if(getParamByUrl("os")=="android"){
            mobileApp.jumpSport(getPageInfo());
        }else{
            window.webkit.messageHandlers.jumpSport.postMessage(getPageInfo());
        }
    }
    document.documentElement.style.webkitTouchCallout='none';
}

//设置退出页面前话术
function returnPage(){
    leftControl(false,true);
    $(".returnAlert").css("display","block");
    $(".return-main-btn0").unbind("click").click(function(){
        leftControl(false,false);
        closePage(7);
    });
    $(".return-main-btn1").unbind("click").click(function(){
        $(".returnAlert").css("display","none");
        leftControl(true,false);
    });
} 


function getPhysicalPeriodTime(physicalPeriodId){
   //生理期选择
    var physicalPeriodTime=$("#"+physicalPeriodId).val();
    var currYear = new Date().getFullYear();
    if(physicalPeriodTime != "" && physicalPeriodTime != null){
        physicalPeriodTime=new Date(currYear+"-"+physicalPeriodTime.substring(0,2)+"-"+physicalPeriodTime.substring(3,5));
    }else{
        physicalPeriodTime=new Date();
    }
    
    console.info(physicalPeriodTime);
    $('#'+physicalPeriodId).mobiscroll().date({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'bottom',
       /* closeOnOverlayTap:false,  //true的时候点击遮罩消失控件*/
        cancelText:"",
        setText:"",
        headerText:'选择日期',
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
}