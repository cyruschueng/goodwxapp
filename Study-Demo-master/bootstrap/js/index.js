   

$(function(){
    $(".navbar-nav li").click(function(){
    // console.log($(this));
    $(this).addClass("active").siblings().removeClass('active');

    })
})