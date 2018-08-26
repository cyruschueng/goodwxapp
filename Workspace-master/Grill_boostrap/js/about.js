/**
 * Created by acer on 15-4-22.
 */
$(function(){
    $(".mdr-ol").hover(function(){
        $(this).css({"opacity":"1","transition":"all 0.5s linear"})
    },function(){
        $(this).css({"opacity":"0","transition":"all 0.5s linear"})
    });
    $(".mdr-ol1").hover(function(){
        $(this).css({"opacity":"1","transition":"all 0.5s linear"})
    },function(){
        $(this).css({"opacity":"0","transition":"all 0.5s linear"})
    });
});