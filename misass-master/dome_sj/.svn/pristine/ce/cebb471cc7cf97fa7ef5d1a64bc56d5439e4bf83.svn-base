/********************发现页面开始   ***************/
$(".lazy").click(function (event) {
    event.preventDefault();

})
//点赞
$('.icon-zan').each(function (i,obj) {
    $(this).click(function () {
        $(this).toggleClass('icon-zan-red')

    })

});
//点击爱心
$('.icon-heart').each(function (i,obj) {
    $(this).click(function () {
        $(this).toggleClass('icon-heart-red')

    })

})

/********************发现页面结束***************/

/********************购物车页面开始***************/
//显示 隐藏删除按钮
$(".car_manage").click(function () {
    let that = this;
    if($(that).text() == '管理'){
        $(that).html("完成");
        $(".car_del").addClass('car_main_del');
        // $('.tick').css('visibility','inherit');
        return
    }
    if($(that).text() == '完成'){
        $(that).html("管理");
        $(".car_del").removeClass('car_main_del');
        return;
    }
})

//点击单个选中
$('.tick').click(function () {
    let that = this;
    if($(that).hasClass('icon-checked')){
        $(that).parent().parent().parent().find('.tickList').removeClass('icon-checked')
        $(that).removeClass('icon-checked');
        setTotal();
        $('.tickAll').removeClass('icon-checked')
    }else {
        $(that).addClass('icon-checked');
        setTotal();
    }
    //列表关联单个
    let ifArr = [];
    let listChecked = $(that).parent().parent().find('.tick');
    $(listChecked).each(function (i,obj) {
        let thar = this;
        let ifTrue = true;
        ifTrue *=$(thar).hasClass("icon-checked");
        ifArr.push(ifTrue);
    })

    let ifNum = ifArr.reduce((x ,y)=>{return x+y;}) //累计相加
    if(ifNum == listChecked.length){    //判断全部有icon-checked的
        $(that).parent().parent().parent().find('.tickList').addClass('icon-checked');
    }
    //全选关联单个
    let tickListArr = [];
    $('.tickList').each(function (o,arr) {
        let haveTrue = true;
        haveTrue *=$(this).hasClass("icon-checked");
        tickListArr.push(haveTrue)

    })
    let haveNum = tickListArr.reduce((x ,y)=>{return x+y;}) //累计相加
    if(haveNum == $('.tickList').length){    //判断全部有icon-checked的
        $('.tickAll').addClass('icon-checked');
    }
})

//点击勾选列表
$('.tickList').click(function () {
    if($(this).hasClass('icon-checked')){
        $(this).parent().siblings().find('.tick').removeClass('icon-checked')
        $(this).removeClass('icon-checked');
        $('.tickAll').removeClass('icon-checked')
        setTotal();
    }else {
        $(this).parent().siblings().find('.tick').addClass('icon-checked')
        $(this).addClass('icon-checked');
        setTotal();
    }
    //全选关联列表
    let tickListArr = [];
    $('.tickList').each(function (o,arr) {
        let haveTrue = true;
        haveTrue *=$(this).hasClass("icon-checked");
        tickListArr.push(haveTrue)

    })
    let haveNum = tickListArr.reduce((x ,y)=>{return x+y;}) //累计相加
    if(haveNum == $('.tickList').length){    //判断全部有icon-checked的
        $('.tickAll').addClass('icon-checked');
    }


})

//跳转到地址栏
$('.jumpAddress').click(function () {
    window.location.href='address.html';
})
//返回上一层
$('.address_back').click(function () {
    window.history.go(-1)
})

//点击全选
$('.tickAll').click(function () {
    if($(this).hasClass('icon-checked')){
        $(this).removeClass('icon-checked');
        $('.tick,.tickList').removeClass('icon-checked');
        setTotal();
    }else {
        $(this).addClass('icon-checked');
        $('.tick,.tickList').addClass('icon-checked');
        setTotal();
    }
})
//减
$('.icon-minus').click(function () {
    let count = $(this).parent().find('span').text();
    count --;
    if(count == 0) return;
    $(this).parent().find('span').html(count);
    setTotal()
})
//加
$('.icon-add').click(function () {
    let count = $(this).parent().find('span').text();
    count ++;
    $(this).parent().find('span').html(count);
    setTotal()
})



//总价格
function setTotal() {
    let totalNum = 0;
    $('.car_li>.icon-checked').siblings('.car_list_detail').each(function(i,obj){
        let price = parseFloat($('.car_li>.icon-checked').siblings('.car_list_detail').find('.car_detail_price>.car_detail_pri>p:nth-of-type(2)')[i].textContent);
        let num = parseInt($('.car_li>.icon-checked').siblings('.car_list_detail').find('.car_detail_price>.car_detail_num>span')[i].textContent);
        totalNum += num*price;
    })
    $("#car_total").html(totalNum.toFixed(2));
//寻找所有选中状态的value值
    let idStr = '',id = null;
    $('.tick').each(function (i,obj) {
        if($(this).hasClass('icon-checked')){
            idStr += $(this).attr('value') + '_';
        }
    })
    id = idStr.slice(0,-1);
    if(id ==''){   //判断总价是否为零状态
        $(".car_btn").removeClass('active')
    }else {
        $(".car_btn").addClass('active')
    }
}

/********************购物车页面结束***************/


/********************分类开始***************/

//tab切换
$('.tab_li').click(function () {
    let index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.tab_detail').eq(index).addClass('active').siblings().removeClass('active');

})
/********************分类结束***************/


/********************结算页面开始***************/

//点击手动添加地址
$('.detail_hand').click(function () {
    $('#maskDol').show();
    $('#mask').removeClass('mask_hide')
})


//点击弹窗关闭
$('.mask_close').click(function () {
    $('#maskDol').hide();
    $('#mask').addClass('mask_hide')
})

/********************结算页面结束***************/


/********************地址栏开始***************/
//点击手动添加
$('.address_hand').click(function () {
    $('#maskDol').show();
    $('#mask').removeClass('mask_hide');
})

//选择
$('.address_icon').click(function () {
    $('.address_icon').removeClass('icon-checked');
    $(this).addClass('icon-checked')
})
$('.address_default').click(function () {
    $('.address_default').removeClass('icon-checked');
    $(this).addClass('icon-checked')
})

//点击编辑

$('.address_edit').click(function () {
    $('#maskDol').show();
    $('#mask').removeClass('mask_hide');
})



/********************地址栏结束**************/

