/**
 * Created by Administrator on 2017/8/21 0021.
 */


layui.define(function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var obj = {
        hello: function(str){
            alert('Hello '+ (str||'test'));
        }
    };

    //输出test接口
    exports('test', obj);
});