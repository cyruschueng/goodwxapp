App({
    //globalData 是要往数据库里面直接添加的！！
    globalData:{
      userInfo:null,
      changeNum:1,
      hasChanged:0,
      nToy:0,
      postData:null,
      openId:0,
      arrOpenGId:[]
    },
    //不需要网数据库里添加的 全局bus
    //全局session
    globalSession:'',
    //随机分享图片
    shareImages:["https://xcx3.zhuozhida.cn/answerImg/shareImg.jpg",
                "https://xcx3.zhuozhida.cn/answerImg/shareImg1.jpg",
                "https://xcx3.zhuozhida.cn/answerImg/shareImg2.jpg",
                "https://xcx3.zhuozhida.cn/answerImg/shareImg3.jpg",
                "https://xcx3.zhuozhida.cn/answerImg/shareImg4.jpg",
                "https://xcx3.zhuozhida.cn/answerImg/shareImg5.jpg"
    ],
    onShow(opt){

    },
    onLaunch(){
        var that=this;
        wx.getUserInfo({
            success: function(res) {
                console.log(res);
                that.globalData.userInfo = res.userInfo;
            }
        });
    }
})