
var util = require('../../../util/util.js');
Page({
    data: {
        hidden: false,
        iscollect: true,
        videoData: { title: '' },//视频数据
        recommendData: [],//推荐视频
        pgstart: 0,
        pgoffset: 20,
        hotshidden: false, // 显示加载更多 loading
        hothidden: true,
        loadingMore: false, //是否正在加载
        video_id: 0
    },
    onLoad: function (options) {
    
        var that = this;
        that.setData({
            video_id: options.video_id
        })
        that.videoContext = wx.createVideoContext('video-source');

        that.iscollect();
        util.Ajax('v2/app/video/detail', {
            id: options.video_id
        }, function (res) {
            if (res.data.code == 0) {
                res.data.data.duration = util.formatSeconds(res.data.data.duration);
                that.setData({
                    videoData: res.data.data,
                    hidden: true
                })

                //存储浏览记录
                let watchRecordData = wx.getStorageSync('watchRecordData') || {};
                let curDate = util.getTime();
                watchRecordData[curDate] = watchRecordData[curDate] || {};
                watchRecordData[curDate][options.video_id] = {
                    id: options.video_id,
                    title: res.data.data.title,
                    thumb: res.data.data.thumb.normal
                }
                wx.setStorageSync('watchRecordData', watchRecordData);


            }
        });

        util.Ajax('v2/app/video/recommendList', {
            id: options.video_id,
            pgoffset: that.data.pgoffset,
            pgstart: that.data.pgstart
        }, function (res) {
            if (res.data.data.length == 0 && that.data.pgstart == 0) {

                that.setData({
                    hotshidden: false,
                    hothidden: false
                })
                return;
            }

            if (res.data.code == 0) {
                that.setData({
                    recommendData: res.data.data,
                    hotshidden: true
                })
            }
        });

    },
    scrolltolower: function () {
        if (this.data.loadingMore) return;
        var that = this;
        // 加载更多 loading
        that.setData({
            hotshidden: false
        })
        that.setData({ loadingMore: true });
        that.data.pgstart++;

        util.Ajax('v2/app/video/recommendList', {
            id: that.data.videoData.id,
            pgstart: that.data.pgstart,
            pgoffset: that.data.pgoffset
        }, function (res) {

            if (res.data.code == 0) {

                if (res.data.data.length < that.data.pgoffset) {
                    that.setData({
                        hothidden: false
                    })
                }

                that.setData({
                    recommendData: that.data.recommendData.concat(res.data.data),
                    loadingMore: false
                })

            }
        });
    },
    iscollect:function() {
        let collectData = wx.getStorageSync('collectData') || {};
            for (var key in collectData) {
                
                if (collectData[key][this.data.video_id]){  
                    this.setData({
                        iscollect: false
                    })                 
                }

            }
    },
    collect: function () {
        if (this.data.iscollect) {
            //存储收藏记录
            let collectData = wx.getStorageSync('collectData') || {};
            let curDate = util.getTime();
            collectData[curDate] = collectData[curDate] || {};

            collectData[curDate][this.data.video_id] = {
                id: this.data.video_id,
                title: this.data.videoData.title,
                thumb: this.data.videoData.thumb.normal
            }
            
            wx.setStorageSync('collectData', collectData);
            this.setData({
                iscollect: false
            })
        } else {
            let collectData = wx.getStorageSync('collectData');
            for (var key in collectData) {
                
                if (collectData[key][this.data.video_id]){  
                    delete collectData[key][this.data.video_id];

                    this.setData({
                        iscollect: true
                    })
                    if(JSON.stringify(collectData[key])=="{}") {
                       delete collectData[key]; 
                    }
                    
                }

            }
            
             wx.setStorageSync('collectData', collectData);

        }

    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.videoData.title
        })
    },
    onHide: function () {
        this.videoContext.pause()
    },
    videoErrorCallback: function (e) {
        console.log('视频错误信息:');
        console.log(e.detail.errMsg);
    }, onShareAppMessage: function () {
        return {
            title: this.data.videoData.title,
            desc: '99广场舞 - 专业广场舞教学网站',
            path: 'page/999d/video/video?video_id='+ this.data.video_id
        }
    }

});

