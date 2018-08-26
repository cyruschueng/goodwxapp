$(function(){
    var height = $(window).height();
    $('.aboutInfo').css('height', height);
    $('.common, .aboutCoach').css('min-height', height);

    /*点击一级菜单*/
    $('.firstMenu1').unbind('click').click(function(){
        $('.secondMenu').hide().eq(0).show();
        $('.firstMenu span').removeClass('active');
        $(this).children().addClass('active');

        $('.middle,.right').show();
        $('.specialRight,.sale,.actManager').hide();
    });


    $('.firstMenu2').unbind('click').click(function(){//比较特殊
        $('.firstMenu span').removeClass('active');
        $(this).children().addClass('active');

        $('.middle,.right').hide();
        $('.specialRight').show();
    });


    $('.firstMenu3').unbind('click').click(function(){
        $('.secondMenu').hide().eq(1).show();
        $('.firstMenu span').removeClass('active');
        $(this).children().addClass('active');

        $('.specialRight,.right').hide();
        $('.middle,.sale').show();
        //上传图片到阿里云
        uploadImgToOSS();
        findGoods(1,10);

    });
    /*点击二级菜单*/
    $('.secondMenu:first div').unbind('click').click(function(){
        $('.one').hide().eq($(this).index()).show();
        $('.secondMenu div').children().removeClass('active2');
        $(this).children().addClass('active2');
        //$('.head1').children('span').eq(0).addClass('active3');
    });
    $('.secondMenu:last div').unbind('click').click(function(){
        $('.two').hide().eq($(this).index()).show();
        $('.secondMenu div').children().removeClass('active2');
        $(this).children().addClass('active2');
    });

     $('.goodshops').on('click',function(){
        window.location.href = 'createchildgoods.html';
    })

    /*点击head*/
    $('.head1').children('span').unbind('click').click(function(){
        $('.innerChoose').hide().eq($(this).index()).show();
       
        $('.head1').children('span').removeClass('active3');
        $(this).addClass('active3');
        
    });
    $('.head2').children('span').unbind('click').click(function(){
        $('.goods .innerChoose2').hide().eq($(this).index()).show();
        $('.head2').children('span').removeClass('active3');
        $(this).addClass('active3');
    });
    // 切换学员子模块
    // $('.stus').children('span').unbind('click').click(function(){
    //     $(this).addClass('active3').siblings().removeClass('active3');
    //     $('.stus1').hide().eq($(this).index()).show();

    // });
    /*商品列表的第一列*/
    // $('.tableStyle1 th:first-child,.tableStyle1 td:first-child').css({
    //     'border':'none',
    //     'backgroundColor':'#fff'
    // });


    /*切换优惠券管理*/
    getSendCouponsList();
    $('.aboutCoupon').children('span').unbind('click').click(function(){
        $('.coupon .innerChoose2').hide().eq($(this).index()).show();
        $('.aboutCoupon').children('span').removeClass('active3');
        $(this).addClass('active3');
    });
    $("#sendCouponsBtn").unbind("click").click(function(){
        var ajaxLink = baseUrl + "v1/api/campAdmin/insertUserCoupon"+"?"+"&couponId="+$("#sendCoupons").val()+"&userId="+$("#sendCouponsUserId").val();
        $.ajax({
            type: "get",
            url: ajaxLink,
            dataType: "json",
            success: function (data) {
                // console.log(data);
                if (data.result.code == 200) {
                    alert("优惠券发放成功");
                }
                else{
                    alert(data.message);
                }
            }
        })
    });
    /*点击码库*/
    // $('#storehouse').unbind('click').click(function(){
    //     $('.couponsList').hide();
    //     $('.storehouse').show();
    // });

    //点击编辑
    $('#orderList .editOrder').unbind("click").click(function(){
        $('.orderTop,.orderContent').hide();
        $('.orderModify').show();
    });

    /*点击订单管理*/
    $('.orderManage').unbind('click').click(function(){
        $('.orderTop,.orderContent').show();
        $('.orderModify').hide();
    });

    /*点击学员管理-编辑*/
    /*$('#questionList .editStudent').unbind('click').click(function(){ //在studentsManage.js里面
        $('.studentsTop,.studentsContent').hide();
        $('.orderModify2').show();
    });*/


    /*点击学员管理-*/
    /*$('.studentManage').unbind('click').click(function(){
        $('.studentsTop,.studentsContent').show();
        $('.orderModify2').hide();
    });*/

    /*教练管理*/
    $('.headHD span').unbind('click').click(function(){
        $('.headHD').children('span').removeClass('active3');
        $(this).addClass('active3');
        $('.coachM>div').hide().eq($(this).index()).show();
    });
    // 新增动作
    $('.addAct1').unbind('click').click(function(){
        window.open('addActive.html','_blank ');
    });
    // 新增视频
    $('.addVideo1').unbind('click').click(function(){
        window.open('addVideo.html','_blank ');
    });
    // 新增音频
    $('.addAudio1').unbind('click').click(function(){
        window.open('addAudio.html','_blank ');
    });
    // 取消
    $('.Acancel,.Vcancel,.Dcancel').unbind('click').click(function(){
        window.location.href = 'actManager.html';
    });
    // window.onscroll = function(){
    //     $('.left').height($('.right:visible').height()).css('background','#ccc');
    // };
});