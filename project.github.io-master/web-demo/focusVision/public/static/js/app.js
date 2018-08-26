$(function(){
    $(".big").click(function(){
        if($(this).hasClass("show")){
            $(this).removeClass("show");
            $(".nav").css("display","none");
        }else{
            $(this).addClass("show");
            $(".nav").css("display",'block');
        }
    });

    var sort=document.getElementsByClassName("selectSort")[0];
    var sortul=document.getElementsByClassName("sortul")[0];
    var row=document.getElementById("row");
    sort.onclick=function(){
        if(sort.getAttribute("class").indexOf("showSort")>-1){
            sort.className=sort.className.replace(new RegExp("(\\s|^)"+"showSort"+"(\\s|$)")," ");
            sortul.style.display="none";
            row.src="http://localhost/focusVision/public/static/img/rightRow.png";
        }else{
            sort.className=sort.className+" "+"showSort";
            sortul.style.display="block";
            row.src="http://localhost/focusVision/public/static/img/bottomRow.png";
        }
    };

    /*娱乐中心图片上下左右居中 img.html*/
    var windowWidth=$(window).width();
    var windowHeight=$(window).height();
    var img_height=$(".center img").height();
    var turn_width=$(".turn img").width();
    var center_width=$(".center img").height();
    var marginLeft=(windowWidth-turn_width*2-center_width)/2;
    var marginTop=(windowHeight-img_height-100)/2;
    $(".img_show").css('margin-left',marginLeft);
    $(".img_show").css('margin-top',marginTop);



});