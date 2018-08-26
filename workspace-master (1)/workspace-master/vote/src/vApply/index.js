define(function(require,exports,module){
    var $ = require("$");
    var setup = require("setup");

    var Engine = require("engine");
    var box = Engine.init();
    var wx = require("wxShare");
    var dialog = require("../common.WeUi/index");

    var footerNav = require("../common.footernav/index");
    var reg=/^1[34578]\d{9}$/;

    var vote = {
        activityId: setup.getQueryString("activityId"),
        applyId: setup.getQueryString("applyId"),
        openId: setup.getQueryString("openId"),
        localhost: "http://"+(location.host || "wx.yinnima.com:8088"),
        //活动报名
        activityApply: function(){
            var me = this;
            var name = $("#name").val();
            var phone = $("#phone").val();
            var applySlogan = $("#applySlogan").val();
            var image = $(".image").attr("src")/**/
            

            if(!name || !phone || !image || !applySlogan){
                return false;
            }

            var params = {
                activityId: me.activityId,
                openId: me.openId,
                name: name,
                phone: phone,
                applySlogan: applySlogan,
                image: image
            };
            
             setup.commonAjax("vote/activityApply.do", params, function(msg){ 
                 //console.log(JSON.stringify(msg,null,2));  

                 //判断是不是活动是不是在审核
                 if(msg.isCheck != "n"){
                     dialog.alert("报名成功，请耐心等待审核！", "提示", function(){
                         //跳转页面
                         location.href = "vAppled.html?type=2&applyId=" + msg.applyId +"&activityId="+me.activityId + "&openId="+ me.openId+"&isCheck=n";
                     });
                 }else{
                     dialog.alert("报名成功！恭喜您获得了"+msg.gift +"！", "提示", function(){
                         //跳转页面
                         location.href = "vAppled.html?type=2&applyId=" + msg.applyId +"&activityId="+me.activityId + "&openId="+ me.openId;
                     });
                 }
                 
             });
           
        },
        //图片上传
        uploadImgInit: function(){
            var me = this;
            var PhotoClip = require("../common.photoClip/PhotoClip");
            var winWidth = $(window).width()*0.92;
            var winHeight = winWidth*0.7;
            
            var pc = new PhotoClip('#clipArea', {
                size: [winWidth,winHeight],
                outputSize: [0,0],
                file: '#imageFile',
                ok: '#clipBtn',
                parentBox: "clipBox",
                loadStart: function() {
                    $("body").css({"height": "100%", "overflow": "hidden"});
                    //alert('开始读取照片');
                },
                loadComplete: function() {
                    //alert('照片读取完成');
                },
                done: function(dataURL) {
                    console.log(dataURL);
                    setup.commonAjax("vote/uploadBase64Img.do", {imgData:dataURL}, function(msg){
                        me.imgUrl = msg;
                        $(".image").attr("src",msg);
                        $("#clipBox").hide();
                        $("body").attr("style", "");
                    });
                },
                fail: function(msg) {
                    console.log(msg);
                }
            });
        },
        checkSloganCount: function(self){
            var max = $('#count_max').text();
            var text = self.val();
            var len = text.length;   
            $('#count').text(len);    
            if(len > max){
                self.parents('.weui-cell').addClass('weui-cell-warn');
            }else{
                self.parents('.weui-cell').removeClass('weui-cell-warn');
            }     
        },
        //banner
        getActivityVoteConfig: function(){
            var me = this;
            setup.commonAjax("vote/getActivityVoteConfig.do", {activityId: me.activityId}, function(msg){ 
                var banner = msg.activity.mainImgUrl; 
                $(".banner").html("<img src = '"+banner+"' >");  

                var w = $(window).width();
                $(".banner img").css({"height": (w/2).toFixed(0)+"px"});  

                //给脚部报名按钮添加链接
                footerNav.init({
                    activityId: me.activityId,
                    openId: setup.getQueryString("openId"),
                    activityUrl: msg.activity.activityUrl,
                    host: location.host
                });          
            });
        },
        checkHasApply: function(){
            var me = this;
            var params = {
                activityId: me.activityId,
                openId: me.openId,
            };
            setup.commonAjax("vote/checkHasApply.do", params, function(msg){ 
                $("#wrap").show();
                //图片上传
                vote.uploadImgInit();
                vote.getActivityVoteConfig(msg);
            });
        }
    };


    vote.checkHasApply();


    //输入宣言时提示  
    $('#applySlogan').on('input', function(){
        vote.checkSloganCount($(this));   
    });

    //点击我要报名
    $("#submitform").on("submit", function(ev){
        vote.activityApply();
        ev.preventDefault(); 
        return false;
    }); 

    $("#phone").blur(function(){ //手机号验证
        if(!reg.test($(this).val())){
             dialog.alert("手机号填写错误,请重新输入！", "提示");
        }
    })
    
});