// pages/map/map.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        message:'aaa',
        markers:[{
            // iconPath:'/images/iqiyi.png',
            // id:0,
            // longitude: 120.3826045990,
            // latitude: 36.0701922812,
            // width:50,
            // height:50
        }]
    },
    onLoad: function (options) {
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude
                var longitude = res.longitude
                console.log(res)
                that.setData({
                    latitude: latitude,
                    longitude: longitude
                })
            },
        })
    }
})

var types = ['default', 'primary', 'warn']
var pageObject = {
    data: {
        defaultSize: 'default',
        primarySize: 'default',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false,
        markers: [{
            // iconPath:'/images/iqiyi.png',
            // id:0,
            // longitude: 120.3826045990,
            // latitude: 36.0701922812,
            // width:50,
            // height:50
        }]
    },
    onLoad: function (options) {
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                console.log(res)
                that.setData({
                    latitude: latitude,
                    longitude: longitude
                })
            }
        })
    },
    setDisabled: function (e) {
        this.setData({
            disabled: !this.data.disabled
        })
    },
    setPlain: function (e) {
        this.setData({
            plain: !this.data.plain
        })
    },
    setLoading: function (e) {
        this.setData({
            loading: !this.data.loading
        })
    }
}

// for (var i = 0; i < types.length; ++i) {
//     (function (type) {
//         pageObject[type] = function (e) {
//             var key = type + 'Size'
//             var changedData = {}
//             changedData[key] =
//                 this.data[key] === 'default' ? 'mini' : 'default'
//             this.setData(changedData)
//         }
//     })(types[i])
// }
//
// Page(pageObject)