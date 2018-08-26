/**
 * @description: 错误编码表
 * @author: Franco
 * @update:
 */
define('common/errCode', [], function(){

    return {
        /**
         * 根据code获取错误信息
         */
        get: function(code){
            var error = '';
            switch (code){
                case "10000":
                    error = '系统错误，请联系客服详询。';
                    break;
                case "10001":
                    error = '非法访问，请<a href="login.html">重新登录</a>后再试。';
                    break;
                case "10002":
                    error = '参数错误，请联系客服详询。';
                    break;
                case "10005":
                    error = '验证码错误，请重新输入';
                    break;
                case "10012":
                    error = '用户状态异常无法登录';
                    break;
                case "10018":
                    error = '手机号码错误，请重新输入';
                    break;
                case "10019":
                    error = '请求的资源不存在';
                    break;
                case "10020":
                    error = '非法访问';
                    break;
                case "10021":
                    error = 'loginToken错误或过期';
                    break;
                case "20001":
                    error = 'openid不存在';
                    break;
                case "30000":
                    error = '无效的签名';
                    break;
                default:
                    error = '未知错误，请联系客服详询。错误代码：' + code;
                    break;
            }
            return error;
        }
    }
});