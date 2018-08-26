//logs.js

const app = getApp()
Page({
    data: {
        list: [],
        pkId:''

    },
    onShareAppMessage: function (res) {


        console.log(res)
        let _this=this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }

        return {
            title:"发起pk",
            path: '/pages/index/index?fromuserid='+_this.data.userId,
            success: function(res) {
                // 转发成功
                console.log(res)
                wx.getShareInfo({
                    shareTicket: res.shareTickets[0],
                    success: function (res) {

                        wx.login({
                            success: function (loginRes) {
                                wx.request({
                                    url: app.API_URL + "wei/xin/post/decrypt/data",
                                    method: "POST",
                                    data: {
                                        iv: res.iv,
                                        encryptedData: res.encryptedData,
                                        code: loginRes.code
                                    },
                                    success: function (data) {
                                        console.log(data.data.data);
                                        console.log(data.data.data.openGId);
                                        _this.setData({
                                            ggggggid:data.data.data.openGId
                                        })

                                    }
                                })
                            }
                        })
                        console.log(res)
                    },
                    fail: function (res) {
                        console.log(res)
                    },
                })
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },

    onLoad: function (option) {
        console.log(option.pkId)
        this.setData({
            pkId : option.pkId
        })
        this.getList();
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    initRunDataItem:function (item) {
        item.nickName=  item.nickName.substring(0,7);
        item.faceUrl= app.string.smallFace(item.faceUrl);
        if(item.sex==1){
            item.km= Math.ceil(item.step * 0.74 / 1000);
            item.kll=Math.ceil(item.step * 0.74 / 1000 * 40)
        }else{
            item.km= Math.ceil(item.step * 0.66 / 1000);
            item.kll=Math.ceil(item.step * 0.66 / 1000 * 35)
        }
        return item;
    },
    getList:function () {
        let _this= this;
        let userId = app.getUserId();
        wx.request({
            url: app.API_URL + "werun/rank/pk/"+userId+'/'+_this.data.pkId,
            method: "GET",
            success: function (data) {
                for(let i=0;i<data.data.data.list.length;i++){
                    data.data.data.list[i] =_this.initRunDataItem( data.data.data.list[i] );
                }
                _this.setData({
                    list: data.data.data.list
                })
            }
        })
    }
})
