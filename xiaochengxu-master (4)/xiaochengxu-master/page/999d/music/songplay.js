
var util = require('../../../util/util.js');
Page({
    data: {
        hidden: false,
        isplay: true,
        iscollect: true,
        empty: {
            isshow: true,
            title: '还没有相关视频哦!'
        },
        songData: {
            title: '',
            play_url: '',
            download_url: '',
            singer: '',
            thumb: '',
            duration: 0,

        },//视频数据
        hotshidden: false, // 显示加载更多 loading
        hothidden: true,
        loadingMore: false, //是否正在加载
        page: 1,
        pagesize: 20,
        timer: null,
        startpay: 0,
        timestart: "00:00",
        timeend: "00:00",
        recommendData: [],//推荐视频
    },
    onLoad: function (options) {

        var that = this;
        

        that.setData({
            'songData.title': options.title,
            'songData.play_url': decodeURIComponent(options.play_url),
            'songData.download_url': decodeURIComponent(options.download_url),
            'songData.singer': options.singer,
            'songData.thumb': decodeURIComponent(options.thumb),
            'songData.album_id': decodeURIComponent(options.album_id),
            'songData.duration': options.duration,
             'songData.id': options.id,
            'timeend': util.formatSeconds(options.duration, 1)
        })
        that.iscollect();
        that.audioCtx = wx.createAudioContext('audio-source');
        util.Ajax('v1/video/list', {
            album_id: options.album_id,
            page: that.data.page,
            pagesize: that.data.pagesize
        }, function (res) {
            if (res.data.errno == 0) {
                // setTimeout(function () {
                //     that.audioPlay();//自动播放音乐
                // }, 500)
                if (res.data.response.length == 0 && that.data.page == 1) {
                    that.setData({
                        hotshidden: true,
                        hidden: true,
                        'empty.isshow': false
                    })
                    return;
                }

                that.setData({
                    recommendData: res.data.response,
                    hidden: true,
                    hotshidden: true
                })
            }
        });

    },
    iscollect:function() {
        let songCollectData = wx.getStorageSync('songCollectData') || {};
            for (var key in songCollectData) {
                
                if (songCollectData[key][this.data.songData.id]){  
                    this.setData({
                        iscollect: false
                    })                 
                }

            }
    },
    collect: function () {
        let id = this.data.songData.id;
        if (this.data.iscollect) {
            //存储收藏记录
            let songCollectData = wx.getStorageSync('songCollectData') || {};
           
            let curDate = util.getTime();
            songCollectData[curDate] = songCollectData[curDate] || {};
            songCollectData[curDate][id] = {
                id: id,
                title: this.data.songData.title,
                thumb: this.data.songData.thumb,
                play_url: this.data.songData.play_url,
                download_url: this.data.songData.download_url,
                singer: this.data.songData.singer,
                duration: this.data.songData.duration,
            }
            wx.setStorageSync('songCollectData', songCollectData);
            this.setData({
                iscollect: false
            })
        } else {
            let songCollectData = wx.getStorageSync('songCollectData');
            for (var key in songCollectData) {
                
                if (songCollectData[key][id]){  
                    delete songCollectData[key][id];

                    this.setData({
                        iscollect: true
                    })
                    if(JSON.stringify(songCollectData[key])=="{}") {
                       delete songCollectData[key]; 
                    }
                    
                }

            }
            
             wx.setStorageSync('songCollectData', songCollectData);

        }

    },
    sliderchange: function (e) {
        clearInterval(this.data.timer);
        let that = this;
        let startpay = e.detail.value;

        if (that.data.isplay) {
            that.setData({
                startpay: startpay,
                timestart: util.formatSeconds(startpay, 1)
            })
            return;
        }

        let timer = setInterval(function () {
            startpay++;
            that.setData({
                startpay: startpay,
                timestart: util.formatSeconds(startpay, 1)
            })

            if (that.data.startpay >= that.data.songData.duration) {
                clearInterval(timer);
                // that.audioCtx.pause()
                that.setData({
                    timestart: '00:00',
                    startpay: 0,
                    isplay: true
                })
            }

        }, 1000);

        that.setData({
            timer: timer
        })

        this.setData({
            startpay: e.detail.value
        })
        this.audioCtx.seek(e.detail.value);
    },
    audioPlay: function () {
        clearInterval(this.data.timer);
        this.setData({
            isplay: false
        })
        let that = this;
        let startpay = that.data.startpay;

        this.audioCtx.seek(startpay);
        this.audioCtx.play()

        let timer = setInterval(function () {
            startpay++;
            that.setData({
                startpay: startpay,
                timestart: util.formatSeconds(startpay, 1)
            })

            if (that.data.startpay >= that.data.songData.duration) {
                clearInterval(timer);
                // that.audioCtx.pause()
                that.setData({
                    timestart: '00:00',
                    startpay: 0,
                    isplay: true
                })
            }

        }, 1000);

        that.setData({
            timer: timer
        })


    },
    audioPause: function () {
        clearInterval(this.data.timer);
        this.setData({
            isplay: true
        })
        this.audioCtx.pause()
    },
    onShow: function () {
    },
    onHide: function () {
        this.audioPause();
    },
    scrolltolower: function () {
        if (this.data.loadingMore) return;
        var that = this;
        // 加载更多 loading
        that.setData({
            hotshidden: false
        })
        that.setData({ loadingMore: true });
        that.data.page++;

        util.Ajax('v1/video/list', {
            album_id: that.data.songData.album_id,
            page: that.data.page,
            pagesize: that.data.pagesize
        }, function (res) {

            if (res.data.errno == 0) {
                if (res.data.response.length < that.data.pagesize) {
                    that.setData({
                        hothidden: false
                    })
                }

                that.setData({
                    recommendData: that.data.recommendData.concat(res.data.response),
                    loadingMore: false
                })

            }
        });
    },
    onReady: function () {
        this.audioPlay();
        // 页面渲染完成
        // 修改页面标题
        wx.setNavigationBarTitle({
            title: this.data.songData.title
        })
    },
    audioErrorCallback: function (e) {
        //errMsg.code
        //MEDIA_ERR_ABORTED	获取资源被用户禁止
        //MEDIA_ERR_NETWORD	网络错误
        //MEDIA_ERR_DECODE	解码错误
        //MEDIA_ERR_SRC_NOT_SUPPOERTED	不合适资源

        clearInterval(this.data.timer);
        this.setData({
            isplay: true
        })
        this.audioCtx.pause();

        var msg = '';

        if (e.detail.errMsg == 'MEDIA_ERR_ABORTED') {
            msg = '获取资源被禁止';
        } else if (e.detail.errMsg == 'MEDIA_ERR_NETWORD') {
            msg = '网络错误';
        } else if (e.detail.errMsg == 'MEDIA_ERR_DECODE') {
            msg = '解码错误';
        } else if (e.detail.errMsg == 'MEDIA_ERR_SRC_NOT_SUPPOERTED') {
            msg = '不合适资源';
        }
        wx.showToast({
            title: '不合适资源',
            icon: 'error',
            duration: 2000
        })

    }, onShareAppMessage: function () {
        return {
            title: this.data.songData.title,
            desc: '99广场舞 - 专业广场舞视频教学网站',
            path: 'page/999d/music/songplay' + '?play_url=' + encodeURIComponent(this.data.songData.play_url) + '&download_url=' + encodeURIComponent(this.data.songData.download_url) + '&title=' + this.data.songData.title + '&singer=' + this.data.songData.singer + '&album_id=' + this.data.songData.album_id + '&thumb=' + encodeURIComponent(this.data.songData.thumb) + '&duration=' + this.data.songData.duration + '&id=' + this.data.songData.id
        }
    }

});

