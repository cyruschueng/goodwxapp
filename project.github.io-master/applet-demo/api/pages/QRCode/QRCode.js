// pages/QRCode/QRCode.js
var config = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     *  获取小程序码-接口A: 适用于需要的码数量较少的业务场景
     */
    interfaceA:function(){
        var that = this;
        let promise1 = new Promise(function(resolve, reject){
            wx.request({
                url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`,
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    console.log(res.data);
                    resolve(res);
                }
            })
        }).then(function(res){
            let access_token = res.data.access_token;
            let imgData;
            let promise2 = new Promise(function(resolve, reject){
                wx.request({
                    url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`,
                    method:"POST",
                    data: {
                        path:'/pages/QRCode/QRCode',
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function(res) {
                        //console.log(res.data)
                        imgData = res.data;
                        resolve(imgData);
                    }
                })
            }).then(function(res2){
                // wx.request({
                //     url: 'http://localhost/api/qrcode/binaryToImg.php',
                //     header: {
                //         'content-type': 'application/x-www-form-urlencoded'
                //     },
                //     method: "POST",
                //     data: {
                //         imgData:imgData
                //     },
                //     success: function(res) {
                //         console.log(res)
                //     }
                // })
            });
           // 小程序的问题，开发者通过接口获取小程序码,返回的结果乱码

        });
    },

    /**
     *  获取小程序码-接口B: 适用于需要的码数量极多的业务场景
     */
    interfaceB:function(){

    },


})