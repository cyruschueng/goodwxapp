using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.WxApi.WxJs
{
    /// <summary>
    /// jssdk接口
    /// </summary>
    public enum EnumJsRight
    {
        /// <summary>
        /// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        /// </summary>
        onMenuShareTimeline = 0,
        /// <summary>
        /// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        /// </summary>
        onMenuShareAppMessage = 1,
        /// <summary>
        /// 获取“分享到QQ”按钮点击状态及自定义分享内容接口
        /// </summary>
        onMenuShareQQ = 2,
        /// <summary>
        /// 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        /// </summary>
        onMenuShareWeibo = 3,
        /// <summary>
        /// 获取“分享到QZone”按钮点击状态及自定义分享内容接口
        /// </summary>
        onMenuShareQZone = 4,
        /// <summary>
        /// 开始录音接口
        /// </summary>
        startRecord = 5,
        /// <summary>
        /// 停止录音接口
        /// </summary>
        stopRecord = 6,
        /// <summary>
        /// 
        /// </summary>
        onVoiceRecordEnd = 7,
        /// <summary>
        /// 播放语音接口
        /// </summary>
        playVoice = 8,
        /// <summary>
        /// 暂停播放接口
        /// </summary>
        pauseVoice = 9,
        /// <summary>
        /// 停止播放接口
        /// </summary>
        stopVoice = 10,
        /// <summary>
        /// 
        /// </summary>
        onVoicePlayEnd = 11,
        /// <summary>
        /// 上传语音接口
        /// </summary>
        uploadVoice = 12,
        /// <summary>
        /// 下载语音接口
        /// </summary>
        downloadVoice = 13,
        /// <summary>
        /// 拍照或从手机相册中选图接口
        /// </summary>
        chooseImage = 14,
        /// <summary>
        /// 预览图片接口
        /// </summary>
        previewImage = 15,
        /// <summary>
        /// 上传图片接口
        /// </summary>
        uploadImage = 16,
        /// <summary>
        /// 下载图片接口
        /// </summary>
        downloadImage = 17,
        /// <summary>
        /// 识别音频并返回识别结果接口
        /// </summary>
        translateVoice = 18,
        /// <summary>
        /// 获取网络状态接口
        /// </summary>
        getNetworkType = 19,
        /// <summary>
        /// 使用微信内置地图查看位置接口
        /// </summary>
        openLocation = 20,
        /// <summary>
        /// 获取地理位置接口
        /// </summary>
        getLocation = 21,
        /// <summary>
        /// 隐藏右上角菜单接口
        /// </summary>
        hideOptionMenu = 22,
        /// <summary>
        /// 显示右上角菜单接口
        /// </summary>
        showOptionMenu = 23,
        /// <summary>
        /// 批量隐藏功能按钮接口
        /// </summary>
        hideMenuItems = 24,
        /// <summary>
        /// 
        /// </summary>
        showMenuItems = 25,
        /// <summary>
        /// 隐藏所有非基础按钮接口
        /// </summary>
        hideAllNonBaseMenuItem = 26,
        /// <summary>
        /// 显示所有功能按钮接口
        /// </summary>
        showAllNonBaseMenuItem = 27,
        /// <summary>
        /// 关闭当前网页窗口接口
        /// </summary>
        closeWindow = 28,
        /// <summary>
        /// 调起微信扫一扫接口
        /// </summary>
        scanQRCode = 29,
        /// <summary>
        /// 发起一个微信支付请求
        /// </summary>
        chooseWXPay = 30,
        /// <summary>
        /// 跳转微信商品页接口
        /// </summary>
        openProductSpecificView = 31,
        /// <summary>
        /// 批量添加卡券接口
        /// </summary>
        addCard = 32,
        /// <summary>
        /// 调起适用于门店的卡券列表并获取用户选择列表
        /// </summary>
        chooseCard = 33,
        /// <summary>
        /// 查看微信卡包中的卡券接口
        /// </summary>
        openCard = 34,
        /// <summary>
        /// 编辑收货地址
        /// </summary>
        editAddress=35,
        /// <summary>
        /// 获取最亲的收货地址
        /// </summary>
        getLatestAddress=36

    }
    /// <summary>
    /// 活动名称定义
    /// </summary>
}
