function tabJq(event) {  
    $(".tabCheck .tabTitle>li").eq(0).addClass("on");
    $(".tabCheck .tabContent>div").eq(0).fadeIn();

    if (event == "click" || event == null) {        
        $(".tabCheck  .tabTitle>li").click(choose);      
    } else if (event == "mouseover") {    
        $(".tabCheck  .tabTitle>li").hover(choose);      
    }

    function choose() {
        $(this).addClass('on').siblings().removeClass('on');
        $(".tabCheck .tabContent>div").eq($(this).index()).fadeIn().siblings().hide();
    }
};


function backTop(className, showDis, spentTime) {

    $(window).scroll(function() {

        var backDis = $(window).scrollTop();
        if (backDis < showDis) {
            $("." + className).fadeOut()
        } else {
            $("." + className).fadeIn()
        };
    })
    

    $("." + className).on("click", function() {
        $('bady,html').animate({ scrollTop: 0 }, spentTime);
        return false;
    })
}
        
// $(document).ready(function() {
// 
//     //tab切换封装,.tabCheck最外面，.tabTitle切换标题，.tabContent切换内容
//     (function tabJq(event) {  
//         $(".tabCheck .tabTitle>li").eq(0).addClass("on");
//         $(".tabCheck .tabContent>div").eq(0).fadeIn();

//         if (event == "click" || event == null) {        
//             $(".tabCheck  .tabTitle>li").click(choose);      
//         } else if (event == "mouseover") {    
//             $(".tabCheck  .tabTitle>li").hover(choose);      
//         }

//         function choose() {
//             $(this).addClass('on').siblings().removeClass('on');
//             $(".tabCheck .tabContent>div").eq($(this).index()).fadeIn().siblings().hide();
//         }
//     })();

// });