$(function(){
    var result = getCookie("question3"+orderId) == null ? "" : getCookie("question3"+orderId);
    console.log(result);
    getQuestion(3,"radio",result);
    //标题设置
    if (getParamByUrl('sex') == 0) {
        
         appNoShare("问题 3/6");
    }
    else{
        appNoShare("问题 3/5");
    }
    $(".container").css("minHeight",$(window).height()+"px");

    $(".nextBtn").unbind("click").bind("click",function(){
        if($(".active").length == 0){
            $(".pointAlert").css("display","block");
            $(".pointAlert").text("请选择答案~");
            setTimeout(function(){
                $(".pointAlert").css("display","none");
            },2000);   
        }else{
            var radioResult= parseInt($(".active").attr("value"));
            console.info(radioResult);
            setCookie("question3"+orderId,radioResult,30);
            
            //将答案存储
            saveResult("radio");
            //alert("第三页");
            window.location.href="question4.html"+ window.location.search;
            //setCookie("question1"+roleId,,30);
        }
    });

    $(".preBtn").unbind("click").bind("click",function(){
        window.location.href = 'question2.html'+location.search;
        // history.back(-1);
        /*closePage(1);*/
    });
    
    //标题设置
    // appNoShare("问题 3/6");
    leftControl(true,false);
})


//设置退出页面前话术
function returnPage(){
    leftControl(false,true);
    $(".returnAlert").css("display","block");
    $(".return-main-btn0").unbind("click").click(function(){
        leftControl(false,false);
        // closePage(4);
        closePage();
        closeCookie();

    });
    $(".return-main-btn1").unbind("click").click(function(){
        $(".returnAlert").css("display","none");
        leftControl(true,false);
    });
} 

