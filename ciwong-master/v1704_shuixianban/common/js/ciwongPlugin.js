/**
 * Created by taoyingbin on 2016/7/21.
 */
var ciwongPlugin = {
    /**
     * 调用法
     * @param method 要调用IOS插件的方法名
     * @param parameter 参数[数组]
     * @param successCallback 成功回调
     * @param errorCallback 失败回调
     * @returns {*}
     */
    createEvent: function (method, parameter, successCallback, errorCallback) {
        cordova && typeof cordova.exec=='function' && cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'CiwongPlugin', // mapped to our native Java class called "CalendarPlugin"
            method, // with this action name
            parameter
        );
    }
};