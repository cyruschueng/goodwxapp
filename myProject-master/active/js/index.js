$(function(){
    getCodeFn = function (name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    };
    //alert(111);
    var code = getCodeFn("code");
    var token = localStorage.getItem("token");
    var openid = localStorage.getItem("openid");
    var trueToken = localStorage.getItem("trueToken");
    console.log(token);
    console.log(openid);
    //alert(222);
        if(!token){
            //alert("token");
            function getOpenidBycode2() {
                $.ajax({
                    url: "http://m.benxiangbentu.cn/api/h5/wechatPay/getOpenidBycode2?code=" + code,
                    type: "GET",
                    async: false,
                    dataType: "json",
                    jsonp: "callback",
                    jsonpCallback: "receive",
                    success: function (data) {
                        var token = data.data.openToken;
                        var openid = data.data.openid;
                        console.log(token);
                        console.log(data);
                        localStorage.setItem("token", token);
                        localStorage.setItem("openid",openid);

                    }
                });
            };
            getOpenidBycode2();
        }
    //alert(3333);
        var token = localStorage.getItem("token");
        var openid = localStorage.getItem("openid");
        openlogin(openid,token);
    //alert(4444);
    function openlogin(openid, openToken) {
            var jsonObj = {};
            jsonObj.mark = 2;
            jsonObj.openId = openid;
            jsonObj.openToken = openToken;
            $.ajax({
                url: "http://m.benxiangbentu.cn/api/h5/openlogin",
                type: 'POST',
                dataType: 'json',
                async: false,//这里选择异步为false，那么这个程序执行到这里的时候会暂停，等待
                contentType: 'application/json',
                data: JSON.stringify(jsonObj),
                //添加额外的请求头
                headers: {'Access-Control-Allow-Origin': '*'},
                success: function (data) {
                    //alert("success");
                    var trueToken = data.data.user.token;
                    console.log(trueToken);
                    localStorage.setItem("trueToken",trueToken);
                    console.log(data);

                },
                error:function(){
                    //alert("error");
                }
            })
        }
    //alert(555);
    var loca = "";
    // $("li:first").addClass("active");
    //点击城市加背景，城市选项不为空，开始游戏按钮也改变
    $("ul li.all_click").click(function(){
        $(this).removeClass("active_y").addClass("active").siblings().addClass('active_y').removeClass("active");
        loca = $(this).text();
        $(".game").addClass("gameOne");
    });
    //答题规则弹窗
    $(".layer").click(function(){
        $(".tan").fadeIn();
    });
    $(".tan").click(function(){
        $(this).fadeOut();
    });
    //选择城市，加上对应城市id
    $(".game").click(function(){
        var tokenc = localStorage.getItem("trueToken");
        console.log(token);
        //判断，如果用户选择城市，那么跳转
        if($(".game").hasClass("gameOne")){
            var openId = "";
            if(loca === "南通"){
                openId = "21619";
            }else if(loca === "苏州"){
                openId = "21628";
            }else if(loca === "常州"){
                openId = "21582";
            }else if(loca === "武汉"){
                openId = "21319";
            }
            //根据所选城市，跳转到用户选择城市的对应背景图的答题页面
            console.log(token);
            var localResUrl = "game.html?city=" + openId + "&getSpeak=" +tokenc;
            window.location.href  = localResUrl;
        }
        //否则，弹窗选择城市提示
        else if(!$(".game").hasClass("gameOne")) {
            alert("请先选择考评城市~~");
            //    layer.msg('请先选择考评城市~~');
            return false;
        }
    });
})
