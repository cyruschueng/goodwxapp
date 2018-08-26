$('.success-right').click(function () {
    var current = $('.success-pagination  a.pag-cur').index();
    var reconLen = $('.success-pagination  a').length;
    current++;
    if (current >= reconLen) {
        current = 0;
    }
    $('.success-pagination a').removeClass('pag-cur');
    $('.success-pagination a').eq(current).addClass('pag-cur');
    $('.success .su-items').removeClass('show');
    $('.success .su-items').eq(current).addClass('show');
});
$('.success-left').click(function () {
    var current = $('.success-pagination  a.pag-cur').index();
    var reconLen = $('.success-pagination  a').length;
    current--;
    if (current == -1) {
        current = reconLen-1;
    }
    $('.success-pagination a').removeClass('pag-cur');
    $('.success-pagination a').eq(current).addClass('pag-cur');
    $('.success .su-items').removeClass('show');
    $('.success .su-items').eq(current).addClass('show');
});
$('.success-pagination a').click(function () {
    var curs = $(this).index();
    $('.success-pagination a').removeClass('pag-cur');
    $(this).addClass('pag-cur');
    $('.success .su-items').removeClass('show');
    $('.success .su-items').eq(curs).addClass('show');
});
//合作伙伴
/*$('.swf p a:first').css({'background' : '#3d96ef'});*/
function next(cl,mo){
    var a;
    var b;
    $('.' + cl).find('ul').stop().animate({'margin-left' : mo},function(){
        b = $(this).find('li').attr('class');
        $('.swf p a.' + b).css({'background' : '#23344b'});
        $(this).find('li:first').appendTo(this);
        a = $(this).find('li:first').attr('class');
        $(this).css({'margin-left' : '0'});
        $('.swf p a.' + a).css({'background' : '#3d96ef'});
    });
}
function prev(cl,mo){
    $('.' + cl + ' ul li:last').prependTo('.' + cl + ' ul');
    $('.' + cl + ' ul').css({'margin-left' : mo});
    $('.' + cl + ' ul').stop().animate({'margin-left' : '0'})
}
var i = 0,
    a = 1,
    all_li = $(".wrapx li").length - 1,
    circleLi=$(".circle li"),
    key=0;
circleLi.on("click",function(){
    i=key=$(this).index();
    banner_change();
    circles();
});

function banner_change() {
    a = 0;
    $(".wrapx li").eq(i).animate({
        opacity: "1"
    }).siblings().animate({
        opacity: "0"
    }, function() {
        a = 1;
    });
    $(".circle li").eq(i).css("background", "#3d96ef").siblings().css("background", "#23344b");
}
banner_change();
/*添加小圆点函数*/
function circles(){
    circleLi.eq(i).addClass('current').siblings().removeClass('current');
}
function banner_change_self() {
    i++;
    if (i > all_li) {
        i = 0;
    }
    banner_change();
}
var banner_timer= setInterval(banner_change_self, 2000);
$(".banner").on("mouseover", function() { //鼠标进入轮播区域时，自动切换暂停
    clearInterval(banner_timer);
})
$(".banner").on("mouseout", function() { //鼠标离开轮播区域时，自动切换继续
    banner_timer = setInterval(banner_change_self, 2000);
})
/*
var swf = setInterval(function(){
    next('swf','-100%');
},3000);
$('.swf').mouseover(function(){
    clearInterval(swf);
});
$('.swf').mouseleave(function(){
    swf = setInterval(function(){
        next('swf','-100%');
    },3000);
    var clear = setInterval(function(){
        $('.swf p a').css({'background' : '#23344b'});
        clearInterval(clear);
    },3000);
});
$('.swf p a').click(function(e){
    e.preventDefault();
    var a;
    var b;
    a = $(this).attr('class');
    b = $('.swf ul li.' + a).index();
    $('.swf p a').css({'background' : '#23344b'});
    $(this).css({'background' : '#3d96ef'});
    $('.swf ul').stop().animate({'margin-left' : -100*b + '%'},function(){
    });
});*/
function prev(cl,mo){
    $('.' + cl + ' ul li:last').prependTo('.' + cl + ' ul');
    $('.' + cl + ' ul').css({'margin-left' : mo});
    $('.' + cl + ' ul').stop().animate({'margin-left' : '0'})
}
$('.he-left').click(function(){
    next('flish','-176px');
});
$('.he-right').click(function(){
    prev('flish','-176px')
});
$('.inactive').click(function(){
    if($(this).siblings('ul').css('display')=='none'){
        $(this).siblings('ul').slideDown(100).children('li');
    }else{
        $(this).removeClass('store-inactive');
        $(this).siblings('ul').slideUp(100);
    }
});
$('.ifs').find("em:nth-of-type(1)").hide();
$('.table-body li .body-first').click(function () {
    $(this).find(".ifs em").toggle();
    $(this).next(".body-second").animate({height: 'toggle', opacity: 'toggle'}, "slow");
    $(this).css("background-color","#f3f3f3");
});
$('#modal').hide();
$('.apply').click(function () {
    $('#modal').show();
    $('#modalbg').show();
});
$('.close').click(function () {
    $('#modal').hide();
    $('#modalbg').hide();
});
$('.up-button').click(function () {
    $('.upload').hide();
    $('.upload2').show();
});
$('.news-right ul li a').click(function () {
    if($(this).next(".cen-content").css('display')=='none'){
        $(this).addClass('circle')
    }else{
        $(this).removeClass('circle')
    }
    $(this).next(".cen-content").animate({height: 'toggle', opacity: 'toggle'}, "slow");
});
$('.case-sec').click(function () {
    $(this).next(".cur-son").animate({height: 'toggle', opacity: 'toggle'}, "slow");
});
$('.del').click(function (){
     $(".upload").show();
     $(".upload2").hide();
});



