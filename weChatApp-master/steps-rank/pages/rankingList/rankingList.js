const app = getApp()
const api = require("../../api.js")
Page({
    data: {
        user_avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ephM5MKRNqiaJHykaMBOpicBDZLt45lMPNEFaxFjvKxm0EwuW44c3N5OcaxjuoNcTfJuj2qkdoicwGBA/0',
        // rankList:[
        //     {
        //         todayRanks:5900,
        //         user:{
        //             avatar:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ephM5MKRNqiaJHykaMBOpicBDZLt45lMPNEFaxFjvKxm0EwuW44c3N5OcaxjuoNcTfJuj2qkdoicwGBA/0',
        //             name:"sliderwater"
        //         },
        //     },
        //      {
        //         todayRanks:4900,
        //         user:{
        //             avatar:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ephM5MKRNqiaJHykaMBOpicBDZLt45lMPNEFaxFjvKxm0EwuW44c3N5OcaxjuoNcTfJuj2qkdoicwGBA/0',
        //             name:"sliderwater"
        //         },
        //     },
        //      {
        //         todayRanks:4700,
        //         user:{
        //             avatar:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ephM5MKRNqiaJHykaMBOpicBDZLt45lMPNEFaxFjvKxm0EwuW44c3N5OcaxjuoNcTfJuj2qkdoicwGBA/0',
        //             name:"sliderwater"
        //         },
        //     },
        //      {
        //         todayRanks:6400,
        //         user:{
        //             avatar:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ephM5MKRNqiaJHykaMBOpicBDZLt45lMPNEFaxFjvKxm0EwuW44c3N5OcaxjuoNcTfJuj2qkdoicwGBA/0',
        //             name:"sliderwater"
        //         },
        //     },
        // ],
        rankList: "",
        userInfo: "",
        selfRank: "",
    },
    onShareAppMessage: function() {
        return {
            path: "pages/rankingList/rankingList",
            success(res) {

                console.log("res.shareTickets[0]")
                console.log(res.shareTickets[0])
            }
        }
    },
    onLoad: function(options) {
        console.log("listoptions", options)
        var that = this;

        wx.showShareMenu({
            withShareTicket: true
        })
        wx.getUserInfo({
            success(res) {
                console.log("loadasda", res)
                that.setData({
                    userInfo: res.userInfo
                })
            }
        })
        console.log(123123)
    },
    onShow() {
        var that = this;
        var opts = app.globalData.opts;
        if(!this.data.rankList){
            wx.showLoading({
              title: '加载中',
            })
        api.login(function(res) {
            var userInfo = res;
            console.log("login", userInfo)
            console.log("scene", opts)
            that.setData({
                myOpenid:userInfo.openid
            })
            if (opts.scene == 1044) {
                console.log(opts.shareTicket)

                wx.login({
                    success(res) {
                        var js_code = res.code;

                        wx.getShareInfo({
                            shareTicket: opts.shareTicket,
                            complete(res) {
                                console.log("getTicket", res)
                                console.log(res.iv)
                                var share_info_encryptedData = res.encryptedData;
                                var share_info_iv = res.iv;
                                console.log("share_info", res)
                                wx.getWeRunData({
                                    success(res) {
                                        console.log("getWeRunData", res)
                                        var run_data_encryptedData = res.encryptedData;
                                        var run_data_iv = res.iv;
                                        wx.request({
                                            url: "https://ai.maiyizhi.cn/producter/php/frontend/web/index.php?r=steps/default/index",
                                            method: "POST",
                                            data: {
                                                js_code: js_code,
                                                share_info_encryptedData: share_info_encryptedData,
                                                share_info_iv: share_info_iv,
                                                openid: userInfo.openid,
                                                name: userInfo.user_name,
                                                avatar: userInfo.avatar,
                                                run_data_encryptedData: run_data_encryptedData,
                                                run_data_iv: run_data_iv,

                                            },
                                            header: {
                                                'content-type': 'application/json' // 默认值
                                            },
                                            success: function(res) {
                                                console.log("qun", res)
                                                if(res.data){
                                                var obj = res.data.data.group_ranks;
                                                var users = obj.users;
                                                var rankList = [];
                                                var selfRank = {
                                                    user_rank: res.data.data.user_rank,
                                                    user_steps: res.data.data.user_steps
                                                }
                                               
                                                for (var key in users) {

                                                    var newObj = {
                                                        user: users[key],
                                                        todayRanks: obj["today_ranks"][key],
                                                        key:key
                                                    }
                                                    rankList.push(newObj);

                                                    


                                                }
                                                console.log("rankList", rankList)
                                               

                                                if (rankList) {
                                                    rankList.sort((a, b) => {
                                                        return b.todayRanks - a.todayRanks
                                                    })
                                                    rankList.forEach((item,index)=>{
                                                        if(item.key == userInfo.openid){
                                                            item.index = index
                                                            selfRank = item
                                                        }
                                                    })
                                                    that.setData({
                                                        rankList: rankList,
                                                        selfRank: selfRank
                                                      
                                                    })
                                                    console.log("selfRank",selfRank)
                                                    // console.log("onload2", that.data.rankList)
                                                }
                                                wx.hideLoading()
                                            }
                                            },
                                            fail(res) {
                                                console.log("fail")
                                            }
                                        })

                                    }
                                })

                            }
                        })
                    }
                })
            }
        });
    }},

})