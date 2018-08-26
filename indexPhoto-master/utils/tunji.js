import {md5} from './md5'
// 统计页面函数
function statistic(params={}) {
    let url = getCurrentPageUrl();
    var timestamp = Date.parse(new Date());
    let SystemInfo = wx.getSystemInfoSync();
        SystemInfo.page = url,
        SystemInfo.sign = wx.getStorageSync('sign');
        SystemInfo.time = timestamp;
        SystemInfo.app = 'zhenjiaguimi'; //moqikaoyandazhan
        SystemInfo.token = md5('wKbYWC9fxCrwbiXHLNXXDufu#' + timestamp);
    params.data = SystemInfo;
    console.log('url',url)
    wx.request({
        url: 'https://tj.zealcdn.cn/?_a_=clientReport',
        data: params.data,
        method: 'POST', 
        success: function(res){
            console.log(res)
        },
        fail: function() {
            // fail
        },
        complete: function() {
            // complete
        }
    })
}

// 获取当前页面路径
function getCurrentPageUrl() {
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    return url
}

// 统计用户来源
function fromPageData(params={}) {
    var timestamp = Date.parse(new Date());
    params.data = params.data ? params.data:{};
    params.data = {
        openid : wx.getStorageSync('openid'),
        unionid : wx.getStorageSync('unionid'),
        scene : wx.getStorageSync('sence'),
        sign : wx.getStorageSync('sign'),
        is_fresh : wx.getStorageSync('is_fresh'),
        time : timestamp,
        token : md5('wKbYWC9fxCrwbiXHLNXXDufu#' + timestamp),
        app : 'zhenjiaguimi'
    }
    wx.request({
        url: 'https://tj.zealcdn.cn/?_a_=serverReport',
        data: params.data,
        method: 'POST',
        success: function(res){
            console.log('上报来源数据',res)
        },
        fail: function() {
            // fail
        },
        complete: function() {
            // complete
        }
    })
}

// 用户事件
function userEvent(params = {}) {
    var timestamp = Date.parse(new Date());
    params.time = timestamp;
    params.sign = wx.getStorageSync('sign');
    params.token = md5('wKbYWC9fxCrwbiXHLNXXDufu#' + timestamp);
    params.app = 'zhenjiaguimi'
     wx.request({
         url: 'https://tj.zealcdn.cn/?_a_=clientEvent',
         data: params,
         method: 'POST', 
         success: function(res){
             // success
         },
         fail: function() {
             // fail
         },
         complete: function() {
             // complete
         }
     })
}


module.exports = {
    statistic,
    fromPageData,
    userEvent
}