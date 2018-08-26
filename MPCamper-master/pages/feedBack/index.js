// pages/feedBack/index.js
import { $wuxGallery } from '../../components/wux'

const app = getApp()
import { $wuxToast } from '../../components/wux'

const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({

        /**
         * 页面的初始数据
         */
        data: {
                items: [
                        { name: '0', value: '功能异常', checked: 'true' },
                        { name: '1', value: '优化建议' },
                ],

                content: '请描述你的问题或建议，如果有系统截图，请在添加图片处上传截图，我们将尽快优化体验，感谢您的反馈。',

                urls: [],

                hideAddImg: false

        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {

        },

        chooseImg: function () {
                var that = this;
                wx.showActionSheet({
                        itemList: ['从相册中选择', '拍照'],
                        itemColor: "#3bae78",
                        success: function (res) {
                                if (!res.cancel) {
                                        if (res.tapIndex == 0) {
                                                that.chooseWxImage('album')
                                        } else if (res.tapIndex == 1) {
                                                that.chooseWxImage('camera')
                                        }
                                }
                        }
                })
        },

        chooseWxImage: function (type) {
                var that = this;
                wx.chooseImage({
                        sizeType: ['original', 'compressed'],
                        sourceType: [type],
                        success: function (res) {
                                console.log(res.tempFilePaths);
                                that.setData({
                                        urls: res.tempFilePaths,
                                })
                        }
                })
        },

        showGallery: function (e) {
                const dataset = e.currentTarget.dataset
                const current = dataset.current
                const urls = this.data.urls

                $wuxGallery.show({
                        current: current,
                        urls: urls,
                        [`delete`](current, urls) {
                                urls.splice(current, 1)
                                this.setData({
                                        urls: urls,
                                })
                                return !0
                        },
                        cancel: () => console.log('Close gallery')
                })
        },
        previewImage: function (e) {
                const dataset = e.currentTarget.dataset
                const current = dataset.current
                const urls = this.data.urls

                wx.previewImage({
                        current: current,
                        urls: urls,
                })
        },
        successFun: function (id, res, selfObj) {
                var that = selfObj;
                if (res.res_code == 200) {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: res.res_msg
                        })
                        setTimeout(function(){
                                wx.navigateBack({
                                        delta: 1
                                })
                        }, 2000)
                       
                } else {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: res.res_msg
                        })
                }
        },
        failFun: function (id, res, selfObj) {
                console.log('failFun', res)
        },
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },

        radioChange: function (e) {
                console.log('radio发生change事件，携带value值为：', e.detail.value)
                // this.setData({ type: e.detail.value});
        },

        submitForm: function (e) {
                console.log(e.detail.value.textarea + e.detail.value.radiogroup)

                var that = this;
                var suggestcontent = e.detail.value.textarea.trim();
                var iType = e.detail.value.radiogroup;
                if (suggestcontent == "") {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '请填写问题或建议'
                        })
                        return
                }

                var params = {
                        Suggestcontent: suggestcontent,
                        Remark: "",
                        type: iType
                }

                var url = CONFIG.API_URL.POST_SuggestData

                var path = this.data.urls;
                if(path.length>0){
                        var token = wx.getStorageSync('token')
                        var memberguid = wx.getStorageSync('memberguid')

                        if (params != null) {
                                params.token = token
                                params.memberguid = memberguid
                        }
                        var path = this.data.urls;
                        uploadimg({
                                url: url,//这里是你图片上传的接口
                                path: path,//这里是选取的图片的地址数组
                                formData: params,
                        });
                }else{
                 
                        request.GET(url, params, 100, true, that, that.successFun, that.failFun)
                }
               
        }

})

function uploadimg(data) {
        wx.showLoading({
                title: '提交中...',
        })
        var that = this,
                i = data.i ? data.i : 0,//当前上传的哪张图片
                success = data.success ? data.success : 0,//上传成功的个数
                fail = data.fail ? data.fail : 0;//上传失败的个数
        wx.uploadFile({
                url: data.url,
                filePath: data.path[i],
                name: 'file',//这里根据自己的实际情况改
                formData: data.formData,//这里是上传图片时一起上传的数据
                success: (resp) => {
                        success++;//图片上传成功，图片上传成功的变量+1
                        console.log(resp)
                        console.log(i);
                        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
                },
                fail: (res) => {
                        fail++;//图片上传失败，图片上传失败的变量+1
                        console.log('fail:' + i + "fail:" + fail);
                },
                complete: () => {
                        console.log(i);
                        i++;//这个图片执行完上传后，开始上传下一张
                        if (i == data.path.length) {   //当图片传完时，停止调用          
                                console.log('执行完毕');
                                console.log('成功：' + success + " 失败：" + fail);
                                wx.hideLoading()
                                $wuxToast.show({
                                        type: 'text',
                                        timer: 2000,
                                        color: '#fff',
                                        text: "提交成功"
                                })
                                setTimeout(function () {
                                        wx.navigateBack({
                                                delta: 1
                                        })
                                }, 1000)
                        } else {//若图片还没有传完，则继续调用函数
                                console.log(i);
                                data.i = i;
                                data.success = success;
                                data.fail = fail;
                                uploadimg(data);
                        }

                }
        });
}