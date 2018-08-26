//index.js
Page({
    data: {
        tempImage: '../../images/xiaofeiji.png',
        tempTitle: '每个孩子都有一个飞翔的梦想！',
        hiddenmodalput: true,
        //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框 
    },
    onLoad: function () {

    },

    /**
  * 用户点击右上角分享
  */
    onShareAppMessage: function (ops) {
        if (ops.from === 'button') {
            // 来自页面内转发按钮
            console.log(ops.target)
        }
        return {
            title: this.data.tempTitle,
            imageUrl: this.data.tempImage,
            path: 'pages/index/index',
            success: function (res) {
                // 转发成功
                console.log("转发成功:" + JSON.stringify(res));
            },
            fail: function (res) {
                // 转发失败
                console.log("转发失败:" + JSON.stringify(res));
            }
        }

    },
    chooseimage: function () {
        console.log('chooseimage');
        var _this = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                _this.setData({
                    tempImage: res.tempFilePaths[0]
                })

                // _this.onShareAppMessage();
                _this.modalinput();
            }
        })
    },
    //点击按钮弹框指定的hiddenmodalput弹出框  
    modalinput: function () {
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },
    //取消按钮  
    cancel: function () {
        this.setData({
            hiddenmodalput: true
        });
    },
    //确认  
    confirm: function () {
        console.log('tempTitle:' + this.data.tempTitle)
        this.setData({
            hiddenmodalput: true
        })
    },
    bindTextAreaBlur: function (e) {
        console.log(e.detail.value)
        this.setData({
            tempTitle: e.detail.value
        })
        console.log('tempTitle:' + this.data.tempTitle)
    }
})
