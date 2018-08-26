/**
 * @description: 登录CEMP
 * @author: Franco
 * @update:
 */

require([
    'common/interface',
    'common/util',
    'common/errCode',
    'module/cookie',
    'module/checkForm',
    'module/dialog'
], function (inter, util, errCode, cookie, check, dialog) {
    // $("#forgetPwd").click(function(){
    //     location.href = server_luna_host + '/luna-web/common/passport/findPassword?source=company_media';
    // })
    var args=util.location();
    // $(document).keypress(function(e) {  
    // // 回车键事件  
    //     if(e.which == 13) { 
    //         // login();
    //     }
    // })
    // var button = $("#btn-login");
    // var args = util.location();
    // console.log(args);
    // var token = args.token;
    // var unique_id = args.unique_id;
    // button.click(function(){
    //     login();
    // });
    // $("body").keyup(function(event){
    //     if(event.keyCode === 13){
    //         login();
    //     }
    // })
    // function login(){
        
    //     var userName =$("#name-login").val(),
    //         passWord =$("#password-login").val();
    //     if(!userName || !passWord){
    //         alert("请输入用户名和密码");
    //         return;
    //     }
    //     button.attr('disabled',true);
    //     util.setAjax(inter.getApiUrl().loginUrl, {
    //         "userName":userName,
    //         "password":passWord
    //     }, function (json) {
    //         if (json.status != "0") {
    //             $(".alert").slideDown();
    //             button.removeAttr("disabled");
    //             setTimeout(function(){
    //                 $(".alert").slideUp();
    //             },3000)
    //         } else {
    //             var exp= new Date(new Date().getTime() + 18000000);
    //             // cookie.set('cemp_session', json.session , exp);
    //             cookie.set('username', json.username , exp);
    //             var referer = util.location().referer;
    //             window.location.href = referer?decodeURIComponent(referer):"main.html";
    //         }
    //     }, function () {
    //         // $.alert('服务器繁忙，请稍后再试。');
    //         button.removeAttr("disabled");
    //     },"POST");
    // }
    // function loginIfream () {
    //     util.setAjax(inter.getApiUrl().checkToken, {
    //         token: token,
    //         unique_id:unique_id
    //     }, function (json) {
    //         if (json.status != "0") {
    //             $.alert(json.msg);
    //         } else {
    //           console.log(json);
    //           window.location.href = "./index.html";
    //         }
    //     }, function () {
    //         alert('服务器繁忙，请稍后再试。');
    //     },"GET");
    // }
    // if ($("body").hasClass('iframe-wrap')) {
    //     loginIfream();
    // };
    
    function tockenLogin(data){
        var data = {
            uniqueId:args.uniqueId,
            token:args.token,
            userName: $('#userName').val(),
            password: $('#password').val()
        };
        $.ajax({
            type: 'post',
            url: inter.getApiUrl().tockenLogin,
            data: data,
            success: function(data) {
                if(data.result == 0 ){
                    // localStorage.userName = $('#userName').val();
                    // var referer = util.location().referer;
                    // window.location.href = 'admin/index.html';
                    window.location.href = "admin/mediaList.html";
                } else {
                    // var d = new Dialog({title: '提示', content: '用户名或密码错误。'});
                    console.log(data.msg);
                    // alert('用户名或密码错误。');
                }
            }
        });
    }
    // function login() {
    //     var data = {
    //         userName: $('#userName').val(),
    //         password: $('#password').val()
    //     };
    //     if(!data.userName || !data.password) {
    //         var d = new dialog.init({title: '提示', content: '用户名或密码不能为空。'});
    //         return;
    //     }
    //     $.ajax({
    //         type: 'post',
    //         url: inter.getApiUrl().loginUrl,
    //         data: data,
    //         success: function(data) {
    //             if(data.result == 0 ){
    //                 localStorage.userName = $('#userName').val();
    //                 var referer = util.location().referer;
    //                 // window.location.href = 'admin/index.html';
    //                 window.location.href = referer ? decodeURIComponent(referer) : "admin/index.html";
    //             } else {
    //                 // var d = new Dialog({title: '提示', content: '用户名或密码错误。'});
    //                 alert('用户名或密码错误。');
    //             }
    //         }
    //     });
    // }
    $(function() {
        $.ajaxSetup({
            xhrFields: {
                withCredentials: true
            }
        });
        // $('#login').on('click', function() {
            // login();
            tockenLogin();
        // });

        // $('.login-form .input-item').keydown(function(e) {
        //     if(e.keyCode == 13) {
        //         // login();
        //     }
        // });
    });
    enablePano();
    function enablePano() {
            var panoContainer = new com.vbpano.Panorama(document.getElementById("appContainer"),{
            panoId : "5213FAA717734E9A90BF1B8730808F9E",
            heading : 90,
            pitch : 0,
            roll : 0,
            autoplayEnable : true,
            gravityEnable : false 
        });
    }

});