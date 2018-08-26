/**
 * Created by acer on 15-4-22.
 */
$(function(){
    $(".mdr-ol").hover(function(){
        $(this).css({"opacity":"1","transition":"all 0.5s linear"})
    },function(){
        $(this).css({"opacity":"0","transition":"all 0.5s linear"})
    });
    $(".module2-ul-hover>li").hover(function(){
        $(this).css({"color":"#F78E21"})
    },function(){
        $(this).css({"color":"#000"})
    });
});