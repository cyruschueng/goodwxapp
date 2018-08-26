<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="partin.aspx.cs" Inherits="SfSoft.web.game.november.partin" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>国学达人</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class=" container">
        <div class="row">
            <div class="col-xs-12">
                <div class=" img-thumbnail"></div>
                <div class="alert alert-danger" role="alert">
                    <strong>提示：</strong> 
                  <a href="javascript:void(0)" class="alert-link" id="images">点击这里上传图片<span class="glyphicon glyphicon-hand-left"></span></a>
                </div>

            </div>
        </div>
        <div class="row">
            <div class=" col-xs-12">
                <audio></audio>
                <div class="alert alert-danger" role="alert">
                    <strong>提示：</strong> 
                    <a href="javascript:void(0)" class="alert-link" id="record">点击这里上传你的音频<span class="glyphicon glyphicon-hand-left"></span></a>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-inverse navbar-fixed-bottom">
        <div class="container">
            <a class=" btn" href="javascript:void(0)" style=" width:48%;" >提交</a>
            <a class=" btn" href="javascript:void(0)" style=" width:48%;">返回</a>
        </div>
    </nav>
    
<a href="partin.aspx" class=" btn btn-default " >&nbsp;刷新</a>
<button class="btn btn_primary" id="checkJsApi">checkJsApi</button>

    <!--上传音频-->
    <div class="modal fade" id="audioModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="audioModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="audioModalLabel">音频录制</h4>
                </div>
              <div class="modal-body">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                        60%
                    </div>
                </div>
                <div class=" btn-group">
                    <span class=" btn btn-default glyphicon glyphicon-play" id="startRecord">开始录制</span>
                    <span class=" btn btn-default glyphicon glyphicon-stop">停止录制</span>
                    <span class=" btn btn-default glyphicon glyphicon-headphones">试听</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">上传音频</button>
              </div>
            </div>
          </div>
    </div>
    
    <!--上传图片-->
    <div class="modal fade" id="imgModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="imgModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="imgModalLabel">上传图片</h4>
                </div>
              <div class="modal-body">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                        60%
                    </div>
                </div>
                <div class=" btn-group">
                    <span class=" btn btn-default glyphicon glyphicon-folder-open" id="chooseImage">&nbsp;选择图片</span>
                    <span class=" btn btn-default glyphicon glyphicon-upload" id="uploadImage">&nbsp;上传图片</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">上传图片</button>
              </div>
            </div>
          </div>
    </div>

     
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/partin.js" type="text/javascript"></script>
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
  /*
   * 注意： 
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  if( typeof wx =='undefined'){
            alert("defined");
        }
  wx.config({
      debug: true,
      appId: '<%=HTMLAppid %>',
      timestamp: <%=HTMLTimestamp %>,
      nonceStr: '<%=HTMLNoncestr %>',
      signature: '<%=HTMLSignature %>',
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
  });
</script>
<script src="js/zepto.min.js" type="text/javascript"></script>
<script src="js/wx.js" type="text/javascript"></script>
</html>
