var clickStatus2 = 0;
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
            if(clickStatus2 == 0){
                clickStatus2 = 1;
                pushQuestionResult();
            }
            
        }
    });

    $(".preBtn").unbind("click").bind("click",function(){
        window.location.href = 'question5.html'+location.search;
        // history.back(-1);
        // beforePage();
    });
    // var tips = $('.tip2').text().split(':')[1].split('-');
    // var tips1 = tips[0];
    // var tips2 = tips[1];
    // var currYear = new Date().getFullYear();
    // 预计开始时间范围
    // 前十天
    // var beforeDays11 = new Date(new Date(currYear,tips1.split('.')[0],tips1.split('.')[1]).getTime() - 86400000*10);
    // console.log()
    // var beforeMouth1 = beforeDays11.getMonth()+1;
    //  var beforeDays1 = beforeDays11.getDate();
    //  console.log(beforeMouth1)
    // console.log(beforeDays1)
    // 后30天
    //  var afterDays22 = new Date(new Date(currYear,tips1.split('.')[0],tips1.split('.')[1]).getTime() + 86400000*30);
    //  var afterMouth2 = afterDays22.getMonth()+1;
    //  var afterDays2 = afterDays22.getDate();
    // console.log(afterMouth2)
    // console.log(afterDays2)
    //  预计结束时间

    // 开营当天
    // var beforeDays33 = new Date(new Date(currYear,tips2.split('.')[0],tips2.split('.')[1]).getTime());
    // var beforeMouth3 = beforeDays33.getMonth()+1;
    //  var beforeDays3 = beforeDays33.getDate();
    // 后10天
    //  var afterDays44 = new Date(new Date(currYear,tips2.split('.')[0],tips2.split('.')[1]).getTime() + 86400000*10);
    //  var afterMouth4 = afterDays44.getMonth()+1;
    //  var afterDays4 = afterDays44.getDate();
    //标题设置
    appNoShare("问题 6/6");
    leftControl(true,false);

    // getPhysicalPeriodTime("startTime",beforeMouth1,beforeDays1,afterMouth2,afterDays2);
    // getPhysicalPeriodTime("endTime",beforeMouth3,beforeDays3,afterMouth4,afterDays4);
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
        type:"post",
        data:questionResult,
        url:finalUrl,
        dataType:"json",
        contentType: 'application/json',
        success:function(data){
            if(data.code == 200){
                clickStatus2 = 1;
                closeCookie();
                jumpSport(data.resp.campId);
            }else{
                clickStatus2 = 0;
                alert(data.message);
            }
        },
        error:function(){
            clickStatus2 = 0;
        }
    });
}

var deviceType=isMobile();
//设置跳到运动视频的方法
function jumpSport(campId){
    	var orderId = getParamByUrl("orderId");
    //alert("campId:"+campId);
    var roleId = getParamByUrl("roleId");
    var type = 1;
    var getPageInfo = function (){
        var data = {
            roleId:roleId,
            type:type,
            campId:campId,
            orderId:orderId
        };
        return JSON.stringify(data);
    };
    if(deviceType == "isApp"){
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
        // closePage(7);
        closePage();
        closeCookie();
    });
    $(".return-main-btn1").unbind("click").click(function(){
        $(".returnAlert").css("display","none");
        leftControl(true,false);
    });
} 


// function getPhysicalPeriodTime(physicalPeriodId,beforeMouth,beforeDays,afterMouth,afterDays){
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
        // minDate:new Date(currYear, beforeMouth, beforeDays),
        // maxDate: new Date(currYear, afterMouth, afterDays),
        onBeforeShow: function (event, inst) {
            leftControl(false,true);
        },
        onClose: function (event, inst) {
            leftControl(true,false);
        }
        /*max: new Date()*/
        /*min: new Date(new Date().setFullYear(currYear - 80)),*/
    });
}