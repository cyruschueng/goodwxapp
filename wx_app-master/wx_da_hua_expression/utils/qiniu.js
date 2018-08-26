// var API = require('../../utils/api.js');
//上传图片
function uploadQiniuImage () {
    wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        success: function (res) {
            GLOBAL_PAGE.uploadPrepare(1, res.tempFilePaths)
            var tempFilePath = res.tempFilePaths[0] //图片 
            console.log(res.tempFilePaths)
            GLOBAL_PAGE.uploadFile(tempFilePath)
        },
        fail: function (res) {
            console.log(res)
        }
    })
}
/**
 * requst_url, 上传地址
 * user_session, 用户sessin
 * file_path, 上传文件路径
 * upload_info 附带执行信息
 */
function uploadFile(
    requst_url,
    user_session, 
    file_path, 
    category_id ,
    callback
    ) {
    var _type = file_path.split(".").pop()
    console.log(file_path, category_id)

    //为默认目录
    if ( category_id == undefined)
        category_id = ""

    wx.request({
        url: requst_url,
        data: {
            'session': user_session,
            "type": _type,
            // "upload_info": _upload_info,
            "category_id": category_id,
        },
        success: function (res) {
            var data = res.data
            console.log(data)
            if (data.status == "true") {
               
                // callback("../../images/icon_big_hot.png")
                wx.uploadFile({
                    url: 'https://up.qbox.me',
                    // filePath: tempFilePaths[0],//图片
                    filePath: file_path,//小视频
                    name: 'file',
                    formData: {
                        'key': data.key,
                        'token': data.token,
                    },
                    success: function (res) {
                        console.log("上传成功")
                        var data = JSON.parse(res.data);
                        console.log(data)
                        if (data.status == "true") {
                            if (callback)
                                callback(data.img)
                            // var e = wx.getStorageSync(Key.emoticon)
                            // e.splice(0, 0, data.img); //从第一位插入
                            // // e.push(data.img)
                            // wx.setStorageSync(Key.emoticon, e)
                            // GLOBAL_PAGE.renderEmoticon()

                            // GLOBAL_PAGE.uploadCompelte()//上传成功，继续上传
                        }
                        else {
                            wx.showModal({
                                title: '网络连接失败，请重试',
                                showCancel: false,
                            })
                            GLOBAL_PAGE.setData({ isUpload: false })
                        }
                    },
                    fail(error) {
                        console.log(error)
                        wx.showModal({
                            title: '网络连接失败，请重试',
                            showCancel: false,
                        })
                        GLOBAL_PAGE.setData({ isUpload: false })
                    },
                    complete(res) {
                        console.log(res)

                    }
                })
            }
            else {
                wx.showModal({
                    title: '网络连接失败，请重试',
                    showCancel: false,
                })
                GLOBAL_PAGE.setData({ isUpload: false })
            }
        },
        fail: function (res) {
            wx.showModal({
                title: '网络连接失败，请重试',
                showCancel: false,
            })
            GLOBAL_PAGE.setData({ isUpload: false })
        },
        complete: function (res) {
            // GLOBAL_PAGE.setData({isUpload:false})
        },
    })
}

module.exports = {
    UPLOAD: uploadFile,
}
