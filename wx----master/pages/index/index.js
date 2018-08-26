var app=getApp();
Page({
    data:{
        bShowDetail:'none'
    },
    onLoad(){
        wx.showShareMenu({
            withShareTicket:true
        })
    },
    onShareAppMessage(res) {
        var that=this;
        var title=app.globalData.userInfo.nickName;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title:`${title}+邀请您挑战`,
            path: '/pages/index/index',
            success: function(res) {
                var shareTickets = res.shareTickets;
                if (shareTickets.length == 0){
                    return false;
                }
                wx.getShareInfo({
                    shareTicket: shareTickets[0],
                    success: function(res){
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;
                        console.log(res)
                    }
                })
                app.globalData.changeNum+=1;
                wx.showToast({
                    title: '转发成功',
                    icon: 'success',
                    duration: 1000
                });
            },
            fail: function(res) {
               wx.showToast({
                  title: '请转发到群哦',
                  icon: 'none',
                  duration: 2000
               });
            }
        }
    },
    toAnswer(){
        var that=this;
        console.log('用户'+app.globalData.userInfo)
        if(!app.globalData.userInfo){
            wx.showToast({
                title: '没有授权无法挑战哦',
                icon: 'none',
                duration: 2000
            })
            wx.getUserInfo({
                success: function(res) {
                    app.globalData.userInfo = res.userInfo
                }
            });
            return;
        }
        if(app.globalData.changeNum==0){
            wx.showToast({
                title: '次数不足挑战失败',
                icon: 'none',
                duration: 1000
            })
            return
        };
        wx.showLoading({
            title: '加载题目中~',
        })
        wx.request({
            url: 'https://xcx3.zhuozhida.cn/server.php',
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                for(var i=0;i<res.data.length;i++){
                    res.data[i].content=res.data[i].content.split(',');
                }
                console.log(res.data)
                app.globalData.postData=res.data;
                wx.navigateTo({
                    url:'../question/question'
                })
                app.globalData.changeNum-=1;
                app.globalData.hasChanged+=1;
                wx.hideLoading()
            },
            fail:function(){
                wx.showToast({
                    title: '请求数据失败了',
                    icon: 'none',
                    duration: 4000
                })
            }
        })

    },
    share(){
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    detail(){
        if(this.data.bShowDetail=='none'){
            this.setData({
                bShowDetail:'block'
            })
        }else{
            this.setData({
                bShowDetail:'none'
            })
        }

    }
})