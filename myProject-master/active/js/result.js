$(function(){
    GetQueryString=function (name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    var answer_num = GetQueryString("answer_num");
//根据用户回答正确数量，判断几级达人
    if(answer_num>=0 && answer_num<=3){
        $(".container").css("background-image","url(img/point" + 12+".jpg)");
        $(".point").css("color","#aba29a");
    }else if(answer_num>=4 && answer_num<=6){
        $(".container").css("background-image","url(img/point" + 22+".jpg)");
        $(".point").css("color","#bf7129");
    }else if(answer_num>=7 && answer_num<=9){
        $(".container").css("background-image","url(img/point" + 33+".jpg)");
        $(".point").css("color","#90b6c0");
    }else if(answer_num==10){
        $(".container").css("background-image","url(img/point" + 44+".jpg)");
        $(".point").css("color","#c47724");
    }
//得分
    $(".point_answer").text(answer_num);
//再评一次，跳转到首页
    $(".again_play").click(function(){
        var city ="index.html";
        window.location.href = city;
    });
//点击抽奖，转盘弹出
    $(".choujiang").click(function(){
        $(".g-content").fadeIn();
    });
//转盘界面的x按钮，关闭抽奖转盘
    $(".hideLottery").click(function(){
        $(".g-content").fadeOut();
    });
    var $btn = $('.playbtn');
    $btn.click(function() {
        if(navigator.onLine === false){
            alert("网络网络连接失败,请检查网络~");
        }else {
            var postNumRadom = Math.floor(Math.random()*10);
            var postNum = {};
            postNum.a = postNumRadom;
            $.ajax({
                url: "http://m.benxiangbentu.cn/api/h5/wxQuestion/luckyDraw",
                type: "post",
                dataType: "json",
                timeout:20000,
                data: JSON.stringify(postNum),
                headers: {'Content-type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*'},
                //headers : {},
                success: function (data) {
                    var awardNum = data.data;
                    console.log(data);
                    var luckySuccess = data.success;
                    console.log(luckySuccess);
                    if (!luckySuccess) {
                        alert("已经抽奖或暂未答题");
                        return;
                    } else {
                        clickfunc();
                    }
                    function clickfunc() {
                        var angleNum1;
                        var angleNum2;
                        var angleNum3 = 115;
                        var angleNum4 = 205;
                        var angleNum5;
                        var awardMessage1 = "";
                        var awardMessage2 = "";
                        var awardMessage4 = "<span>点个赞先……</span><br><span>恭喜你，获得10元本鄉本土本味卡礼券，点X填写手机号绑定，登陆本鄉本土APP，即可使用，再接再厉哦！ </span>";
                        var awardMessage3 = "<span>哎呦！不错哦……</span><br><span>恭喜你，获得20元本鄉本土本味卡礼券，点X填写手机号绑定，登陆本鄉本土APP，即可使用，期待您获得大奖哦！ </span>";
                        var awardMessage5 = "<span>不要放弃啊，亲……！</span><br><span>这次可能运气不太好，建议选个吉日良辰，换个姿势，再来一次，一定有机会得奖的，说不定下个大奖就是你的哦！</span>";
                        var angleNumArr = [67, 155, 250, 340];
                        var index = Math.floor((Math.random() * angleNumArr.length));
                        angleNum5 = angleNumArr[index];
                        if (awardNum == 3) {
                            $("#awardMessage").html(awardMessage3);
                            $(".reword_main").css("background-image", "url(img/resord_main_lucky.png)");
                            rotateFunc(angleNum3, '');
                        } else if (awardNum == 4) {
                            $("#awardMessage").html(awardMessage4);
                            $(".reword_main").css("background-image", "url(img/resord_main_lucky.png)");
                            rotateFunc(angleNum4, '');
                        } else if (awardNum == 5) {
                            rotateFunc(angleNum5, '');
                            $("#awardMessage").html(awardMessage5);
                            $(".reword_main").css("background-image", "url(img/reword_main.png)");
                        }
                        if(awardNum == 3 || awardNum == 4){
                            $(".reword").click(function(){
                                $(this).fadeOut();
                                $(".bindPhone").fadeIn();
                            });
                            $(".bindBtn").click(function(){
                                var mobile = $(".phoneNum").val();
                                var mobileNum = {};
                                mobileNum.mobile = mobile;
                                if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile))){
                                    alert("不是完整的11位手机号或者正确的手机号前七位");
                                    return;
                                }
                                //alert(mobile);
                                $.ajax({
                                    //后台接收电话号码接口
                                    url: "http://m.benxiangbentu.cn/api/h5/wxQuestion/bindingMobile",
                                    type: "post",
                                    dataType: "json",
                                    timeout:20000,
                                    //data:{"mobile":mobile},
                                    data: JSON.stringify(mobileNum),
                                    headers: {'Content-type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*'},
                                    success:function(data){
                                        var btnHide = data.success;
                                        if(btnHide) {
                                            alert("绑定成功");
                                            $(".bindPhone").fadeOut();
                                        }else {
                                            alert("绑定失败");
                                        }
                                        console.log("success");
                                    }
                                })
                            })
                        }

                    }
                    function rotateFunc(angle, text) {
                        $btn.stopRotate();
                        $btn.rotate({
                            angle: 0,
                            duration: 5000, //旋转时间
                            animateTo: angle + 2160, //让它根据得出来的结果加上1440度旋转
                            callback: function () {
                               
                                $(".g-content").fadeOut();
                                $(".reword").fadeIn();
                            }
                        });
                    };
                },
                error:function(){
                    alert("网络网络连接失败，请重试~");
                }
            });
        }
    });
    $(".share").click(function(){
        $(this).fadeOut();
    });
    $(".point_f").click(function(){
        $(".share").fadeIn();
    })
    $(".reword").click(function(){
        $(this).fadeOut();
    })
    //验证手机号码
    //点击确定，向后台发送电话号码
    //$(".bindBtn").click(function(){
    //    var phoneNum = $(".phoneNum").val();
    //    alert(phoneNum);
    //    return;
    //    $.ajax({
    //        //后台接收电话号码接口
    //        //url: "http://m.benxiangbentu.cn/api/h5/wxQuestion/luckyDraw",
    //        type: "post",
    //        dataType: "json",
    //        //timeout:20000,
    //        data:{"phoneNum":phoneNum},
    //        headers: {'Content-type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*'},
    //        success:function(data){
    //            var btnHide = data.success;
    //            if(btnHide) {
    //                $(".bindPhone").fadeOut();
    //            }
    //            console.log("success");
    //        }
    //    })
    //})




//监听微信浏览器的返回事件
    pushHistory();
    var bool=false;
    setTimeout(function(){
        bool=true;
    },1000);
    window.addEventListener("popstate", function(e) {
        if(bool)
        {
            window.location.href = "index.html";
        }
        pushHistory();
    }, false);
    function pushHistory() {
        var state = {
            title: "title",
            url: "index.html"
        };
        window.history.pushState(state, "title", "index.html");
    }
})
