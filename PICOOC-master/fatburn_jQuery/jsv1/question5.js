$(function(){
    var orderId = 100102;
    var result = getCookie("question5"+orderId) == null ? "" : getCookie("question5"+orderId);
    console.info(result);

    getQuestion(5,"radio",result);

    $(".container").css("minHeight",$(window).height()+"px");

    $(".nextBtn").unbind("click").bind("click",function(){
        var isAllSpace=$('#textContent').val().replace(/\s/g,"") =='' ? true:false;
        if($(".active").length == 0){
            $(".pointAlert").css("display","block");
            $(".pointAlert").text("请选择答案~");
            setTimeout(function(){
                $(".pointAlert").css("display","none");
            },2000);  
        }else if($(".other").hasClass("active") && isAllSpace){
            $(".pointAlert").css("display","block");
            $(".pointAlert").text("请输入内容~");
            setTimeout(function(){
                $(".pointAlert").css("display","none");
            },2000);  
        }else{
            var radioResult= parseInt($(".active").attr("value"));
            console.info(radioResult);
            setCookie("question5"+orderId,radioResult,30);
            var resultText=$("#textContent").val();
            setCookie("question5Text"+orderId,resultText,30);

            //将答案存储
            saveResult("radio");
            window.location.href="question6.html"+ window.location.search;
        }
    });

    $(".preBtn").unbind("click").bind("click",function(){
        history.go(-1);
        /*closePage(1);*/
    });

    //标题设置
    appNoShare("问题 5/6");
    leftControl(true,false);
})


//设置退出页面前话术
function returnPage(){
    leftControl(false,true);
    $(".returnAlert").css("display","block");
    $(".return-main-btn0").unbind("click").click(function(){
        leftControl(false,false);
        closePage(6);
    });
    $(".return-main-btn1").unbind("click").click(function(){
        $(".returnAlert").css("display","none");
        leftControl(true,false);
    });
} 
