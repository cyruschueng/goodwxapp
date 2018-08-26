//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        requestResult: '',
        canIUseClipboard: wx.canIUse('setClipboardData')
    },
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '分享文章',
        path: '/page/addCgi/addCgi',
        success: function (res) {
          // 转发成功
          wx.getShareInfo({
            shareTicket: res.shareTickets,
            success:function(info){
              console.log(info.encryptedData)
              console.log(info.iv)
            },
            fail:function(info){
              console.log(info.errMsg)
            }
          })
        },
        fail: function (res) {
          // 转发失败
        }
      }
    },

    testCgi: function () {
        util.showBusy('请求中...')
        var that = this
        qcloud.request({
            url: `${config.service.host}/weapp/demo`,
            login: false,
            success (result) {
                util.showSuccess('请求成功完成')
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    },

    copyCode: function (e) {
        var codeId = e.target.dataset.codeId
        wx.setClipboardData({
            data: code[codeId - 1],
            success: function () {
                util.showSuccess('复制成功')
            }
        })
    },
    getRect: function () {
      wx.createSelectorQuery().select('#the-id').boundingClientRect(function (rect) {
        console.log(rect.id)      // 节点的ID
        rect.dataset // 节点的dataset
        rect.left    // 节点的左边界坐标
        rect.right   // 节点的右边界坐标
        rect.top     // 节点的上边界坐标
        rect.bottom  // 节点的下边界坐标
        rect.width   // 节点的宽度
        console.log(rect.height)  // 节点的高度
      }).exec()
    },
    getAllRects: function () {
      wx.createSelectorQuery().selectAll('.a-class').boundingClientRect(function (rects) {
        rects.forEach(function (rect) {
         console.log(rect.id)    // 节点的ID
          rect.dataset // 节点的dataset
          rect.left    // 节点的左边界坐标
          rect.right   // 节点的右边界坐标
          rect.top     // 节点的上边界坐标
          rect.bottom  // 节点的下边界坐标
          console.log(rect.width)   // 节点的宽度
          rect.height  // 节点的高度
        })
      }).exec()
    }
})

var code = [
`router.get('/demo', controllers.demo)`,
`module.exports = ctx => {
    ctx.state.data = {
        msg: 'Hello World'
    }
}`
]
