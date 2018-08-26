//二级移动添加类
$('.wsb_two_li').hover(function () {
    $('.wsb_two_li').removeClass('active');
    $(this).addClass('active');
}).mouseleave(function () {
    $(this).removeClass('active');
});
//禁止事件冒泡
$('.wsb_two_li>a').click(function (e) {
    e.stopPropagation();
});
//二级点击功能
$('.wsb_two_li').click(function (e) {
    e.stopPropagation();
    console.log($('.wsb_right_content'))
    // $('.wsb_right_content').empty();

    if($(this).text()=='产品详情'){
        $('.wsb_right_content').load('project.html');

    }
});
//一级移动添加类
// $('.wsb_li').hover(function () {
//     $(this).addClass('active').siblings().removeClass('active')
// });
//一级点击功能
$('.wsb_li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    if($(this).find('.wsb_two').hasClass('show')){
        $(this).find('.wsb_two').removeClass('show');
        $(this).find('.icon_down').removeClass('icon_triangle')
    }else {
        $('.wsb_two').removeClass('show');
        $(this).find('.wsb_two').addClass('show');
        $(this).find('.icon_down').addClass('icon_triangle')
    }
});
//点击一级页面时候
$('.wsb_li').click(function () {
    if($(this).text() == '首页'){
        $('.wsb_right_title>span').text('');
        $('.wsb_right_content').load('homepage.html');
        $.get('../data/list.json',function (res) {
            $.each(res.data,function (i,obj) {
                addOul(obj)
            })
        });
    }
});

function addOul(data) {
    let dataName  = data.name;
    let temp = ` <ul class="home_oul">`;
    for (let i = 0, len = dataName.length; i < len; i++) {

        temp += `<li>${data.name[i]}</li>`
    }
    return   $(".home_box").append(`${temp+= '</ul>'}`)
}


$.get('../data/list.json',function (res) {
    $.each(res.data,function (i,obj) {
        addOul(obj)
    })
});



