import config from './config'

export var isType = function (type) {
    return function (obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
    }
}
export var isObject = isType("Object")
export var isString = isType("String")
export var isArray = Array.isArray || isType("Array")
export var isFunction = isType("Function")
export var isUndefined = isType("Undefined")

/**
 * 格式化时间
 */
export var time = function (date) {
    var date = new Date(date);
    var h = date.getHours();
    var m = date.getMinutes()
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    return h + ' : ' + m;
}

/**
 * 逗号分隔的字符串
 * '1,2,3'
 * 返回 [1,2,3]
 */
export var split = function (date) {
    return date.split(',').filter(function (item) {
        return item;
    }).map(function (item) {
        if (item.indexOf('/') === 0) {
            return item.substring(1, item.length);
        } else {
            return item;
        }
    });
}

/**
 *用来解析url参数
 *返回 key value 键值对对象
 */
export var parseQueryString = function (url) {
    var obj = {};
    var start = url.indexOf("?") + 1;
    var str = url.substr(start);
    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}

export var toFixed = function (number) {
    return (number / 100).toFixed(2);
}

export var getUrl = function (url) {
    return `${config.websocket_data_src}/${url}`;
}

export var getHeadSrc = function (str) {
    if (str && str.indexOf('/0') != -1) {
        return str.substr(0, str.length - 1) + '96';
    } else {
        return str;
    }
}

export var rdNum = function () {
    return Math.random().toString(36).substr(3);
}

export var setPageTile = function (str) {
    if (!str) return;
    wx.setNavigationBarTitle({
        title: str
    })
}

export var countDown = (t) => {


    var h = Math.floor(t / 3600);
    var f = Math.floor((t- h * 3600) / 60);
    var m = Math.floor(t % 60);

    var d = [];

    if (h >= 10) {
        d.push((h + '').substr(0, 1));
        d.push((h + '').substr(1, 1));
    } else {
        d.push(0 + '');
        d.push((h + '').substr(0, 1));
    }

    if (f >= 10) {
        d.push((f + '').substr(0, 1));
        d.push((f + '').substr(1, 1));
    } else {
        d.push(0 + '');
        d.push((f + '').substr(0, 1));
    }

    if (m >= 10) {
        d.push((m + '').substr(0, 1));
        d.push((m + '').substr(1, 1));
    } else {
        d.push(0 + '');
        d.push((m + '').substr(0, 1));
    }

    return d;

}

//将对象元素转换成字符串以作比较
function obj2key(obj, keys) {
    var n = keys.length,
        key = [];
    while (n--) {
        key.push(obj[keys[n]]);
    }
    return key.join('|');
}
//去重操作
export let uniqeByKeys = (array, keys) => {
    var arr = [];
    var hash = {};
    for (var i = 0, j = array.length; i < j; i++) {
        var k = obj2key(array[i], keys);
        if (!(k in hash)) {
            hash[k] = true;
            arr.push(array[i]);
        }
    }
    return arr;
}


/**
 * 微信选择地址
 */
export let wxAddress = (cb) => {

    let chooseAddress = () => {
        wx.chooseAddress({
            success: (res) => {
                cb && cb(res)
            }
        })
    }

    wx.getSetting({
        success(res) {
            if (!res.authSetting['scope.address']) {
                wx.authorize({
                    scope: 'scope.address',
                    success() {
                        chooseAddress();
                    },
                    fail: () => {
                        wx.openSetting({
                            success: (res) => {
                                if (res.authSetting["scope.address"]) {
                                    chooseAddress();
                                }
                            }
                        })
                    }
                })
            } else {
                chooseAddress();
            }
        }
    })
}

/**
 * 分享提示
 */

export let wxShareMsg = (res) => {
    if (!res.shareTickets) {
        wx.showModal({
            showCancel: false,
            title: '提示',
            content: '分享到群，才能领红包！'
        })
    } else {
        var redpackId = res.redpackId;
        var shareTicket = res.shareTickets[0]
        wx.getShareInfo({
            shareTicket,
            success: (res) => {
                console.log("分享内容", res);
                let {iv,encryptedData} = res;
                //分享到群
                // wx.showModal({
                //     title: '提示',
                //     confirmText: '去抢红包',
                //     cancelText: '暂时不去',
                //     content: '分享成功，现在就去抢红包吗？',
                //     success: (res) => {
                //         if (res.confirm) {
                //             wx.reLaunch({
                //               url: `/pages/packagePopup/index?redpackId=${redpackId}&iv=${iv}&encryptedData=${encryptedData}`,
                //             })
                //         } else if (res.cancel) {
                //             console.log('用户点击取消')
                //         }

                //     }

                // })
                wx.showModal({
                  showCancel: false,
                  title: '提示',
                  content: '从分享的群中进入，才可领取红包哦~'
                })
            },
            fail: (res) => {
                //分享到个人
                wx.showModal({
                    showCancel: false,
                    title: '提示',
                    content: '分享到群，才能领红包！'
                })
            }
        });
    }
}

function rnd(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
}

export let randomImg = () => {
    return `https://1251097942.cdn.myqcloud.com/1251097942/tv/scws/wozhidao/images/head/touxiang${rnd(1, 1000)}.jpg`;
}


/**
 * 保存最新的5条聊天记录
 * data 是socket用户发送的消息
 *
 * 不同 program_code 的初始化topicListArr数据不一样
 * 
 */
export let saveTopicList = (data) => {

    try {
        var topicListArr = wx.getStorageSync('topicListArr');
        if (!topicListArr) {
            topicListArr = [];
            topicListArr.push(data);
        } else {
            topicListArr = JSON.parse(topicListArr);
            if (topicListArr.length > 9) {
                topicListArr.shift();
            }
            topicListArr.push(data);
        }
        wx.setStorageSync('topicListArr', JSON.stringify(topicListArr));

    } catch (e) {

    }
}

export let getTopicList = (program_code) => {

    //console.log('program_code:', wx.getStorageSync('program_code'), program_code);

    if (wx.getStorageSync('program_code') != program_code) {
        wx.removeStorageSync('topicListArr');
        wx.setStorageSync('program_code', program_code);
    }

    //console.log('新：', program_code)

    try {
        var topicListArr = wx.getStorageSync('topicListArr');
        if (topicListArr) {
            return JSON.parse(topicListArr);
        } else {
            return [];
        }
    } catch (e) {

    }
}


//年月日
export let getNYR = (date)=>{
    let d = new Date(date);

    let Y = d.getFullYear();
    let M = d.getMonth() < 10 ? (d.getMonth()-0) + 1 : d.getMonth();
    let D = d.getDate() < 10 ? (d.getDate()-0) + 1 : d.getDate(); 

    return `${Y}-${M}-${D}`; 

}