
var GLOBAL_PAGE
var APP = getApp()
var API = require('../../utils/api.js');

var WxParse = require('../../wxParse/wxParse.js');
var STORY_TRACE = "story_trace"
Page({
    data: {

        storyId:"1", //故事id
        stepCurrent:"", //当前步骤  1,2,3,4
        hiddenBackBtn:true,  //隐藏返回按钮，第一篇文章生效
        canIUseRichText:false, //判断是否使用富文本
        article:"",
        hiddenChoiceBtn:false, //防止双击
    },


    onLoad: function (options) {

        var story_id = options.story_id
        var that = this
        GLOBAL_PAGE = this

        GLOBAL_PAGE.setData({ //设置引入的故事id
        storyId: story_id,
        canIUseRichText: wx.canIUse('rich-text')
        })

        var story_trace = wx.getStorageSync(STORY_TRACE)//用户浏览所有故事的本地存储
        if (story_trace == "")//1、 第一次阅读故事，创建object
        {
            wx.setStorageSync(STORY_TRACE,{}) //创建object
            GLOBAL_PAGE.nextAndBack("") //获取显示文章
        }else if (story_trace[story_id]) {//2、已经阅读该文章，获取步骤
                GLOBAL_PAGE.setData({
                    stepCurrent: story_trace[story_id]
                })
                GLOBAL_PAGE.nextAndBack(story_trace[story_id])
                wx.setStorageSync(STORY_TRACE, {})
        }else{//3、第一次阅读本篇文章，步骤为“”
            GLOBAL_PAGE.nextAndBack("")
        }
    },

    test: function (options) {
        //   console.log(options)
        wx.request({
            url: API.ARTICALE() , 
            method:"GET",
            data: {
                // "art_id":options.art_id,
                "story_id": GLOBAL_PAGE.data.storyId,
                "step_current": GLOBAL_PAGE.data.stepCurrent,
            },
            success: function(res) {
                console.log("collect success:",res.data)
                var object = res.data
                if (object.status == "true")
                {
                        var step_current = res.data.step_current
                        //设置基础信息
                        GLOBAL_PAGE.setData({
                            swiper:res.data.swiper,
                            title:res.data.title,
                            stepCurrent: step_current,
                            stepNext: res.data.step_next,
                        })

                        //设置文章内容
                        var article = res.data.content
                        // if (GLOBAL_PAGE.data.canIUseRichText)
                        //     GLOBAL_PAGE.UseRichText(article)
                        // else
                        GLOBAL_PAGE.UseWxParse(article)

                        //浏览记录本地存储{ '故事id':'当前步骤step_current' }
                        var trace = wx.getStorageSync(STORY_TRACE)
                        trace[GLOBAL_PAGE.data.storyId.toString()] = step_current
                        wx.setStorageSync(STORY_TRACE, trace)
                    //   var next = res.data.step_next

                        //滚动到初始位置
                        wx.pageScrollTo({
                            scrollTop: 0
                        })
                    }
            },
            fail:function(res){
                wx.showModal({
                    title: '网络连接失败，请重试',
                    showCancel:false,
                })
            },
            complete:function(){
                GLOBAL_PAGE.setData({
                    hiddenChoiceBtn: false, //防止双击
                })
            }
        })
    },

    //微信自带富文本，有Bug不用
    UseRichText: function (article) { 
        GLOBAL_PAGE.setData({
            article: article,
        })
    },

    //使用wxparse，还行
    UseWxParse: function (article) { 
            WxParse.wxParse('article', 'html', article, GLOBAL_PAGE, 5)
    },

    //进入下一篇
    nextArticle:function(e){
        var next_id = e.currentTarget.dataset.next_id
        var step_current = GLOBAL_PAGE.data.stepCurrent
        GLOBAL_PAGE.nextAndBack(step_current + "," + next_id)
        // GLOBAL_PAGE.test()

    },
    //返回上一篇
    backArticle:function(){
        var temp = GLOBAL_PAGE.data.stepCurrent
        temp = temp.split(",")
        temp.pop()
        var step_current = temp.join(",")

        GLOBAL_PAGE.nextAndBack(step_current)

    },
    //进入新的文章
    nextAndBack: function (step_current){
        var hiddenBackBtn = true
        if (step_current.split(',').length > 1 )
            hiddenBackBtn = false
        GLOBAL_PAGE.setData({
            stepCurrent: step_current,
            hiddenBackBtn: hiddenBackBtn,
            hiddenChoiceBtn:true, //防止双击
        })
        GLOBAL_PAGE.test()
    },

    onShareAppMessage: function () { 
        return {
            title: '手绘故事',
            desc: '历史有农药',
            path: '/pages/detail/detail?story_id=' + GLOBAL_PAGE.data.storyId,
            }
    },


    onReady: function () {
        // 生命周期函数--监听页面初次渲染完成

    },
    onShow: function () {
        // 生命周期函数--监听页面显示

    },
    onHide: function () {
        // 生命周期函数--监听页面隐藏

    },
    onUnload: function () {
        // 生命周期函数--监听页面卸载

    },
    onPullDownRefresh: function () {
        // 页面相关事件处理函数--监听用户下拉动作

    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数

    },
})