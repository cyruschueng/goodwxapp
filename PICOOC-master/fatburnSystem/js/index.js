var baseUrl="http://a.picooc.com/";
//var absoluteUrl="https://a.picooc.com/web/fatburntest/";
if(window.location.host=="pm.picooc.com:444" || window.location.host=="pm.picooc.com:445"||window.location.host==""){
  var baseUrl="http://pm.picooc.com:9989";
}
else if(window.location.host=="pm.picooc.com:9989"){
  var baseUrl="http://pm.picooc.com:9989/";
}
else{
  var baseUrl="http://a.picooc.com/";
}
$(function(){
    var userName = $.trim($('#userName').val());
    var password = $.trim($('#password').val());

    $('#btn').unbind('click').click(function(){
        var userName = $.trim($('#userName').val());
        var password = $.trim($('#password').val());
        if((userName != '') && (password != '')){
            var urlLogin = baseUrl+"v1/api/campAdmin/backLogin?username="+userName+'&password='+password;
            $.ajax({
                type: "get",
                url: urlLogin,
                dataType: "json",
                success: function (data) {
                    console.log(11,'用户登录',data);
                    if(data.result.code==200){
                        localStorage.setItem('token',data.resp.token);//设置本地存储
                        localStorage.setItem('roleId',data.resp.roleId);//设置本地存储 //String类型
                        localStorage.setItem('userId',data.resp.userId);//设置本地存储 //String类型
                        window.location.href = 'system.html';//跳转到后台系统
                    }else{
                        alert('用户名和密码不匹配！');
                    }
                }
            });
        }else{
            alert('用户名或密码不能为空！');
        }
    });
});