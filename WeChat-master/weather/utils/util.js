//获取App
var app = getApp();
//console.log(app);

function getWeatherData(cityName, callback){
    if(!cityName){
        cityName = app.city;
    }

    //调用天气API查询气象信息
    var weApi = "https://free-api.heweather.com/v5/weather";
    wx.request({
        url:weApi,
        data:{
          city:cityName,
          key:'8971dbd46ef44708a62f0ce8cf6ff012'
        },
        success:res=>{
            console.log('天气API',res);

            var hw = res.data.HeWeather5[0];

            var weatherData = { status: "error" };

            if(hw.status == 'ok'){
                weatherData = {
                    requestok:true,
                    city: hw.basic.city, //城市
                    upTime: hw.basic.update.loc.slice(-5), //更新时间
                    now: formatTime(), // 当前日期
                    temp: 　hw.now.tmp, // 当前温度
                    desc: hw.now.cond.txt, //描述
                    status: "ok", //状态
                    suggestion:hw.suggestion //气象指数
                };
            }

            //信息封装完毕，调用回调函数发回信息
            callback && callback(weatherData);
        }
    })
}

/*创建一个数组，表示星期 */
var dayArr = ["周日","周一","周二","周三","周四","周五","周六"];

/* 格式化时间
 传递一个时间对象，返回月日星期
 */
function formatTime(dt){
    //判断对象是否存在
    if(!dt){
        //若没传对象
        //创建一个当前日期对象
        dt = new Date();
    }

    //对日期进行格式化并返回
    //期望格式 2月12日 周日

    //获取月份
    var m = dt.getMonth()+1;
    //获取日
    var date = dt.getDate();
    //获取星期
    var day = dayArr[dt.getDay()];

    return m + "月" + date +"日 "+day;

}

module.exports = {
    getWeatherData : getWeatherData
};