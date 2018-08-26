
var util = require('../../../util/util.js');
Page({
    data: {
        songDataList: [],
        hotshidden: false, // 显示加载更多 loading
        hothidden: true,
        page: 1
    },
    onLoad: function (options) {
        var that = this;
        util.Ajax('v1/song/list', {
            album_id: options.album_id
        }, function (res) {
            if (res.data.errno == 0) {
                if (res.data.response.length == 0 && that.data.page == 1) {
                    that.setData({
                        hotshidden: false,
                        hothidden: false,
                        hidden: true
                    })
                    return;
                }
                that.setData({
                    songDataList: res.data.response,
                    hotshidden: true
                })

            }
            wx.setNavigationBarTitle({
                title: that.data.songDataList[0].title
            })
        });

    },
    goSong: function (event) {
        var idx = event.currentTarget.dataset.idx;
        var url = '?play_url=' + encodeURIComponent(this.data.songDataList[idx]['play_url']) + '&download_url=' + encodeURIComponent(this.data.songDataList[idx]['download_url']) + '&title=' + this.data.songDataList[idx]['title'] + '&singer=' + this.data.songDataList[idx]['singer'] + '&album_id=' + this.data.songDataList[idx]['album_id'] + '&thumb=' + encodeURIComponent(this.data.songDataList[idx]['thumb']) + '&duration=' + this.data.songDataList[idx]['duration'] + '&id=' + this.data.songDataList[idx]['id'];

        wx.navigateTo({
            url: 'songplay' + url
        })
    },
    onReady: function () {

    },
    scrolltolower: function (e) {


    }
    , onShareAppMessage: function () {
        return {
            title: '99广场舞 - 专业广场舞视频教学网站',
            desc: '99广场舞,人人都是舞蹈家',
            path: 'page/999d/index/index'
        }
    }

});


