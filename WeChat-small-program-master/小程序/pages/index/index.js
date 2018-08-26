//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrls: [
            {
                link: 'www.baidu.com',
                url: '/images/banner-2.png'
            }, {
                link: 'www.baidu.com',
                url: '/images/banner-2.png'
            }, {
                link: 'www.baidu.com',
                url: '/images/banner-empty.png'
            }
        ],
        indicatorDots: true,//是否出现焦点
        autoplay: true,   //是否自动播放
        interval: 5000,   //自动播放时间间隔
        duration: 1000,   //滑动动画时间
        userInfo: {},
        activeId: 0,
        coursetypes: [
           /* {
                coursetypeuid: '0',
                coursetypename: '全部',
            },
            {
                coursetypeuid: '58',
                coursetypename: '试听课',
            },
            {
                coursetypeuid: '59',
                coursetypename: '主修课',
            },
            {
                coursetypeuid: '60',
                coursetypename: '公开课',
            },
            {
                coursetypeuid: '58',
                coursetypename: '数学',
            },
            {
                coursetypeuid: '59',
                coursetypename: '英语',
            },
            {
                coursetypeuid: '60',
                coursetypename: '法语',
            },
            {
                coursetypeuid: '58',
                coursetypename: '意大利',
            },
            {
                coursetypeuid: '59',
                coursetypename: '雅马哈',
            },
            {
                coursetypeuid: '60',
                coursetypename: '新玛拉',
            },
            {
                coursetypeuid: '58',
                coursetypename: '新马泰',
            },*/
        ],
        courseList: [
        /*     {
                 hot_id: '1',
                 cover: '',
                 hot_course_name: 'Spotlight G2',
                 teacher_name: 'Kathryn',
                 price: '128.00'
             },
             {
                 hot_id: '2',
                 cover: '',
                 hot_course_name: '试听课',
                 teacher_name: 'Eve',
                 price: '28.00'
             },
             {
                 hot_id: '3',
                 cover: '',
                 hot_course_name: '免费课',
                 teacher_name: 'See',
                 price: '免费'
             },
             {
                 hot_id: '4',
                 cover: '',
                 hot_course_name: 'Reader: The Shark King’s Cave - 绘本：王者荣耀鲨的洞穴',
                 teacher_name: 'Jimmy',
                 price: '688.00'
             },
             {
                 hot_id: '5',
                 cover: '',
                 hot_course_name: 'Treasures G3',
                 teacher_name: 'Alex',
                 price: '138.00'
             },*/
        ],
        courseListLength:false,
        scrollTop: 0
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../index/index'
        })
    },
    onLoad: function (opt) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }


        var that = this;
        // 获取轮播图

        // 获取课程列表接口
        wx.request({
            url: 'https://dev.classchimp.cn/api/courses/hot',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if(res.data.data.length==0){
                    that.setData({
                        courseListLength: false,
                    })
                }else{
                    that.setData({
                        courseList: res.data.data,
                        courseListLength:true
                    })
                }
            }
        });

        //coursetypes 获取课节列表
        wx.request({
            url: 'https://demo.schooin.com/api/coursetypes',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                //将获取到的json数据，存在名字叫zhihu的这个数组中
                that.setData({
                    coursetypes: res.data.data,
                })
            }
        });





        /*转发
        * shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket
        * */
        wx.showShareMenu({
            withShareTicket: true //表示允许转发时是否携带 shareTicket。
        })
        if (opt.scene == 1044) {
            wx.getShareInfo({
                shareTicket: opt.shareTicket,
                success: function (res) {
                    var encryptedData = res.encryptedData;
                    var iv = res.iv;
                }
            })
        }
    },
    onShareAppMessage: function () {
        return {
            title: '自定义转发标题',
            path: '/page/user?id=123',
            success: function (res) {
                console.log(res, '转发成功的')
                var shareTickets = res.shareTickets;
                if (shareTickets.length == 0) {
                    return false;
                }
                wx.getShareInfo({
                    shareTicket: shareTickets[0],
                    success: function (res) {
                        console.log(res, '这是群发获取信息的')
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;
                    }
                })
            },
            fail: function (res) {
                // 转发失败
                console.log(res)
                wx.showToast({
                    title: '转发失败' + res,
                    icon: 'success',
                    duration: 2000
                })
            }
        }
    },

    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    //滚动监听
    scroll: function (e) {
        var that = this;
        var scrollTop = that.scrollTop;
        that.setData({
            scrollTop: e.detail.scrollTop
        });
        console.log(e.detail.scrollTop)
        //console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
        // console.log('scrollTop:'+scrollTop)
    },

    //点击商品跳转详情页
    fotableinfo: function (e) {
        console.log(e)
        var id = e.currentTarget.dataset.id;
        var coursetypename = e.currentTarget.dataset.coursetypename;
        console.log(e.currentTarget.dataset)
        wx.navigateTo({
            url: '../course/course?id=' + id + '&coursetypename=' + coursetypename
        })
    },

    //点击课程请求数据
    readDetail: function (e) {
        var id = e.currentTarget.dataset.id;
        var that = this;
        this.setData({
            activeId: e.target.dataset.id
        })
        if (id == 0) {
            var url = 'https://dev.classchimp.cn/api/courses/hot';
        } else {
            var url = 'https://dev.classchimp.cn/api/courses/hot?coursetype=' + id;
        }
        wx.request({
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if(res.data.data.length==0){
                    that.setData({
                        courseListLength: false,
                    })
                }else{
                    that.setData({
                        courseList: res.data.data,
                        courseListLength:true
                    })
                }
            }
        })
    },
    //点击我的跳转个人中心
    my: function () {
        wx.navigateTo({
            url: '../login/login'
        })
       /* console.log('执行')
        wx.getUserInfo({
            success(res) {
                console.log(res, '获取数据')
                if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success(res) {
                            console.log(res,'用户信息')
                            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                            //   wx.startRecord()
                        }
                    })
                }
            },
            fail: function () {
                wx.showModal({
                    title: '警告',
                    content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                    success: function (res) {
                        if (res.confirm) {
                            wx.openSetting({
                                success: (res) => {
                                    if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                                        wx.getUserInfo({
                                            success: function (res) {
                                                var userInfo = res.userInfo;
                                                that.setData({
                                                    nickName: userInfo.nickName,
                                                    avatarUrl: userInfo.avatarUrl,
                                                })
                                            }
                                        })
                                    }
                                }, fail: function (res) {

                                }
                            })

                        }
                    }
                })
            },
            complete: function (res) {
            }
        })*/
    }
});
